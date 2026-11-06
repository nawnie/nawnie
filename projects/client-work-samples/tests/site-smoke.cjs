#!/usr/bin/env node
'use strict';

// No production dependency. Static checks use Node only. Browser checks are
// optional and require Playwright plus an installed Chromium executable.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
let checks = 0;
function check(condition, description) {
  assert.ok(condition, description);
  checks += 1;
  console.log('PASS ' + description);
}

async function main() {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  check(new Set(ids).size === ids.length, 'HTML IDs are unique');
  check(/<html\b[^>]*lang="en"/.test(html), 'Document language is declared');
  check(/name="viewport"/.test(html), 'Responsive viewport is declared');
  const external = [];
  let localLinks = 0;
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^https?:/i.test(value)) { external.push(value); continue; }
    check(!/^(?:mailto|tel|javascript|data):/i.test(value), 'Safe local reference: ' + value);
    if (value.startsWith('#')) {
      check(ids.includes(value.slice(1)), 'Internal target exists: ' + value);
    } else {
      const target = path.resolve(root, value.split('#')[0]);
      check(target.startsWith(root + path.sep) && fs.existsSync(target), 'Local asset exists: ' + value);
      localLinks += 1;
    }
  }
  check(external.length === 1 && external[0] === 'https://github.com/nawnie', 'Only outbound link is the approved GitHub profile');
  check(/id="github-header" class="github-only-link"/.test(html), 'GitHub-only anchor is marked for physical removal');
  check((html.match(/class="project-card(?: featured-card)?"/g) || []).length === 7, 'Seven project cards are present');
  check((html.match(/role="tabpanel"/g) || []).length === 3, 'Three demo panels are present');
  check(!/<form\b[^>]*\baction=/i.test(html), 'Forms have no external submission destination');
  check(!/mailto:|tel:|drive\.google|aiembeddedsystems\.com/i.test(html), 'No personal contacts, private Drive, or company website links');
  check(/proposed Qwen Image 2\.1 preparation and evaluation lane/.test(html), 'ReTrain scope is explicitly proposed Qwen preparation/evaluation');
  check(/No image-model training results or MOSS training support are claimed/.test(html), 'ReTrain does not assert training results or MOSS support');
  check(/\.project-cover\{aspect-ratio:4\/3\}/.test(css) && /\.project-cover img\{object-fit:contain\}/.test(css), 'Complete text-bearing covers are preserved');
  check(/prefers-reduced-motion/.test(css), 'Reduced-motion styling exists');
  for (const filename of ['app.js', 'src/engine.js']) {
    const source = fs.readFileSync(path.join(root, filename), 'utf8');
    new vm.Script(source, { filename });
    check(!/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|localStorage|sessionStorage/.test(source), filename + ' parses and has no network/storage API');
  }
  console.log(`Static summary: ${checks} checks passed; ${localLinks} local references verified.`);
  if (process.argv.includes('--static-only')) {
    console.log('BROWSER NOT RUN: --static-only selected. Layout, DOM interaction, and screenshots are not verified.');
    return;
  }

  let chromium;
  try { ({ chromium } = require('playwright')); }
  catch (error) {
    console.error('BROWSER BLOCKED: Playwright is not installed. Static checks passed; browser checks did not run.');
    process.exitCode = 2;
    return;
  }
  let browser;
  try { browser = await chromium.launch({ headless: true }); }
  catch (error) {
    console.error('BROWSER BLOCKED: compatible Chromium could not launch. ' + error.message.split('\n')[0]);
    process.exitCode = 2;
    return;
  }
  const output = process.env.PORTFOLIO_QA_DIR || path.join(os.tmpdir(), 'shawn-portfolio-qa');
  fs.mkdirSync(output, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  const network = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) network.push(request.url()); });
  const text = selector => page.locator(selector).textContent();
  const submit = id => page.locator('#' + id + ' button[type="submit"]').click();
  try {
    await page.goto(pathToFileURL(path.join(root, 'index.html')).href);
    check(await text('#staff-result-count') === '6', 'Staffing default is 6 staff');
    check(await text('#staff-result-hours') === '30.25 hours', 'Staffing default is 30.25 hours');
    check(await text('#property-result-dscr') === '1.50×', 'Property default DSCR is 1.50');
    check(await text('#room-result-available') === '2', 'Room default availability is 2');
    await page.locator('#departures').fill('81');
    await submit('staffing-form');
    check(await page.locator('#staffing-error').isVisible(), 'Invalid departures show an accessible error');
    check(await text('#staff-result-count') === '6', 'Invalid input preserves previous result');
    await page.locator('#staffing-form button[type="reset"]').click();
    await page.waitForFunction(() => document.getElementById('staffing-error').hidden);
    check(await page.locator('#departures').inputValue() === '30', 'Staffing reset restores default');
    await page.locator('#occupiedRooms').fill('100');
    await submit('staffing-form');
    check(await text('#staff-result-count') === '6', 'Changed staffing scenario is calculated');
    check(await text('#staff-result-hours') === '35.75 hours', 'Changed staffing scenario updates hours');
    await page.locator('#tab-staffing').focus();
    await page.keyboard.press('ArrowRight');
    check(await page.locator('#tab-property').getAttribute('aria-selected') === 'true', 'Arrow keys switch tabs');
    await page.locator('#annualDebtService').fill('0');
    await submit('property-form');
    check(await text('#property-result-dscr') === 'N/A', 'Zero debt service is handled');
    await page.locator('#annualRevenue').fill('');
    await submit('property-form');
    check(await page.locator('#property-error').isVisible(), 'Blank numeric input is rejected');
    await page.locator('#property-form button[type="reset"]').click();
    await page.waitForFunction(() => document.getElementById('property-result-dscr').textContent === '1.50×');
    await page.locator('#tab-rooms').click();
    await page.locator('#hk-102').selectOption('clean');
    await submit('rooms-form');
    check(await text('#room-result-available') === '3', 'Room reconciliation responds to housekeeping changes');
    await page.locator('#pms-101').selectOption('occupied');
    await page.locator('#hk-101').selectOption('out_of_service');
    await submit('rooms-form');
    check(await text('#room-state-101') === 'Out of service', 'Out-of-service takes precedence over occupied state');
    await page.locator('#rooms-form button[type="reset"]').click();
    await page.waitForFunction(() => document.getElementById('room-result-available').textContent === '2');
    check(await page.locator('#hk-102').inputValue() === 'dirty', 'Room reset restores fictional defaults');
    for (const viewport of [{ width: 1440, height: 1000 }, { width: 360, height: 800 }]) {
      await page.setViewportSize(viewport);
      await page.locator('#tab-staffing').click();
      check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'No page overflow at ' + viewport.width + 'px');
      await page.screenshot({ path: path.join(output, 'portfolio-' + viewport.width + '.png'), fullPage: true });
    }
    check(errors.length === 0, 'No page JavaScript errors');
    check(network.length === 0, 'No HTTP network requests during local preview');
    console.log('Browser checks passed. Screenshots: ' + output);
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
