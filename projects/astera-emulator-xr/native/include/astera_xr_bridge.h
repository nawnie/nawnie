#pragma once
#include <cstddef>
#include <cstdint>

#ifdef __cplusplus
extern "C" {
#endif

typedef uint64_t AsteraTextureHandle;

typedef enum AsteraXrFrameKind {
    ASTERA_XR_MONO = 0,
    ASTERA_XR_NATIVE_STEREO = 1,
    ASTERA_XR_RGB_DEPTH = 2,
    ASTERA_XR_LAYERED = 3
} AsteraXrFrameKind;

typedef enum AsteraXrLayerKind {
    ASTERA_LAYER_BACKGROUND = 0,
    ASTERA_LAYER_SPRITE = 1,
    ASTERA_LAYER_HUD = 2,
    ASTERA_LAYER_3D_COMPOSITE = 3
} AsteraXrLayerKind;

typedef struct AsteraXrTexture {
    AsteraTextureHandle handle;
    uint32_t width;
    uint32_t height;
    uint64_t presentation_time_ns;
} AsteraXrTexture;

typedef struct AsteraXrStereoFrame {
    AsteraXrTexture left;
    AsteraXrTexture right;
} AsteraXrStereoFrame;

typedef struct AsteraXrRgbDepthFrame {
    AsteraXrTexture rgb;
    AsteraXrTexture depth;
    uint8_t depth_near_is_one;
} AsteraXrRgbDepthFrame;

typedef struct AsteraXrLayer {
    AsteraXrTexture texture;
    AsteraXrLayerKind kind;
    int32_t hardware_priority;
    float suggested_depth_01;
    uint8_t preserve_as_hud;
} AsteraXrLayer;

typedef struct AsteraXrLayeredFrame {
    const AsteraXrLayer* layers;
    size_t layer_count;
    uint64_t presentation_time_ns;
} AsteraXrLayeredFrame;

typedef struct AsteraXrConsumer {
    void* user_data;
    void (*submit_mono)(void* user_data, const AsteraXrTexture* frame);
    void (*submit_stereo)(void* user_data, const AsteraXrStereoFrame* frame);
    void (*submit_rgb_depth)(void* user_data, const AsteraXrRgbDepthFrame* frame);
    void (*submit_layers)(void* user_data, const AsteraXrLayeredFrame* frame);
} AsteraXrConsumer;

static inline int astera_xr_valid_stereo(const AsteraXrStereoFrame* f) {
    return f && f->left.handle && f->right.handle &&
           f->left.presentation_time_ns == f->right.presentation_time_ns;
}

static inline int astera_xr_valid_rgb_depth(const AsteraXrRgbDepthFrame* f) {
    return f && f->rgb.handle && f->depth.handle &&
           f->rgb.presentation_time_ns == f->depth.presentation_time_ns;
}

#ifdef __cplusplus
}
#endif
