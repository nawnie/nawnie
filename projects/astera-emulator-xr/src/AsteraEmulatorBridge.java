package com.astera.xr.emulator;

import java.util.Collections;
import java.util.EnumSet;
import java.util.List;

public final class AsteraEmulatorBridge {
    private AsteraEmulatorBridge() {}

    public enum FrameCapability {
        NATIVE_STEREO,
        RGB_DEPTH,
        LAYERED_2D,
        MONO_RGB
    }

    public enum Preferred3dPath {
        AUTO,
        NATIVE_STEREO,
        NATIVE_DEPTH,
        LAYER_DEPTH,
        AI_DEPTH,
        HYBRID
    }

    public static final class TextureFrame {
        public final long textureHandle;
        public final int width;
        public final int height;
        public final long presentationTimeNs;

        public TextureFrame(long textureHandle, int width, int height, long presentationTimeNs) {
            this.textureHandle = textureHandle;
            this.width = width;
            this.height = height;
            this.presentationTimeNs = presentationTimeNs;
        }
    }

    public static final class StereoFrame {
        public final TextureFrame left;
        public final TextureFrame right;

        public StereoFrame(TextureFrame left, TextureFrame right) {
            if (left == null || right == null) throw new IllegalArgumentException("Both eyes are required");
            if (left.presentationTimeNs != right.presentationTimeNs) {
                throw new IllegalArgumentException("Left/right eye timestamps must match");
            }
            this.left = left;
            this.right = right;
        }
    }

    public static final class RgbDepthFrame {
        public final TextureFrame rgb;
        public final TextureFrame depth;
        public final boolean depthNearIsOne;

        public RgbDepthFrame(TextureFrame rgb, TextureFrame depth, boolean depthNearIsOne) {
            if (rgb == null || depth == null) throw new IllegalArgumentException("RGB and depth are required");
            if (rgb.presentationTimeNs != depth.presentationTimeNs) {
                throw new IllegalArgumentException("RGB/depth timestamps must match");
            }
            this.rgb = rgb;
            this.depth = depth;
            this.depthNearIsOne = depthNearIsOne;
        }
    }

    public static final class LayerPlane {
        public enum Kind {
            BACKGROUND,
            SPRITE,
            HUD,
            THREE_D_COMPOSITE
        }

        public final TextureFrame frame;
        public final Kind kind;
        public final int hardwarePriority;
        public final float suggestedDepth01;
        public final boolean preserveAsHud;

        public LayerPlane(TextureFrame frame, Kind kind, int hardwarePriority,
                          float suggestedDepth01, boolean preserveAsHud) {
            this.frame = frame;
            this.kind = kind;
            this.hardwarePriority = hardwarePriority;
            this.suggestedDepth01 = Math.max(0f, Math.min(1f, suggestedDepth01));
            this.preserveAsHud = preserveAsHud;
        }
    }

    public static final class LayeredFrame {
        public final List<LayerPlane> layers;
        public final long presentationTimeNs;

        public LayeredFrame(List<LayerPlane> layers, long presentationTimeNs) {
            if (layers == null || layers.isEmpty()) throw new IllegalArgumentException("At least one layer is required");
            this.layers = Collections.unmodifiableList(layers);
            this.presentationTimeNs = presentationTimeNs;
        }
    }

    public interface FrameSource {
        String id();
        String displayName();
        EnumSet<FrameCapability> capabilities();

        default boolean supports(FrameCapability capability) {
            return capabilities().contains(capability);
        }
    }

    public interface Sink {
        void submitStereo(StereoFrame frame);
        void submitRgbDepth(RgbDepthFrame frame);
        void submitLayers(LayeredFrame frame);
        void submitMono(TextureFrame frame);
    }

    public static Preferred3dPath choosePath(FrameSource source, Preferred3dPath requested) {
        if (requested != null && requested != Preferred3dPath.AUTO) {
            Preferred3dPath validated = validateRequested(source, requested);
            if (validated != null) return validated;
        }

        if (source.supports(FrameCapability.NATIVE_STEREO)) return Preferred3dPath.NATIVE_STEREO;
        if (source.supports(FrameCapability.RGB_DEPTH)) return Preferred3dPath.NATIVE_DEPTH;
        if (source.supports(FrameCapability.LAYERED_2D)) return Preferred3dPath.LAYER_DEPTH;
        return Preferred3dPath.AI_DEPTH;
    }

    private static Preferred3dPath validateRequested(FrameSource source, Preferred3dPath requested) {
        switch (requested) {
            case NATIVE_STEREO:
                return source.supports(FrameCapability.NATIVE_STEREO) ? requested : null;
            case NATIVE_DEPTH:
                return source.supports(FrameCapability.RGB_DEPTH) ? requested : null;
            case LAYER_DEPTH:
            case HYBRID:
                return source.supports(FrameCapability.LAYERED_2D) ? requested : null;
            case AI_DEPTH:
                return requested;
            default:
                return null;
        }
    }

    public static final class Settings {
        public boolean enabled = true;
        public Preferred3dPath preferredPath = Preferred3dPath.AUTO;
        public boolean useAsteraOptics = true;
        public boolean curvedScreen = false;
        public float curvatureDegrees = 0f;
        public boolean preserveHudMono = true;
        public float nativeDepthStrength = 1.0f;
        public float layerDepthStrength = 0.65f;
        public float aiDepthStrength = 0.45f;

        public enum SecondaryScreenLayout {
            BELOW, ABOVE, LEFT, RIGHT, PICTURE_IN_PICTURE, HIDDEN
        }

        public SecondaryScreenLayout secondaryScreenLayout = SecondaryScreenLayout.BELOW;
        public boolean secondaryScreenMono = true;
    }
}
