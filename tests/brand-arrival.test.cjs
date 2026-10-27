const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('public/brand-arrival.js', 'utf8');
function boot({ pathname = '/en', path = '/en', seen = false, reduced = false } = {}) {
  const attributes = {};
  const events = {};
  const storage = new Map(seen ? [['entrance-test', 'seen']] : []);
  const html = { setAttribute: (key, value) => { attributes[key] = value; }, removeAttribute: (key) => { delete attributes[key]; } };
  const config = { 'data-path': path, 'data-storage-key': 'entrance-test', 'data-brand': 'test' };
  vm.runInNewContext(source, {
    document: { currentScript: { getAttribute: (key) => config[key] ?? null }, documentElement: html, addEventListener() {}, removeEventListener() {} },
    location: { pathname, hash: '' },
    matchMedia: () => ({ matches: reduced, addEventListener() {}, removeEventListener() {} }),
    sessionStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) },
    window: { addEventListener: (key, handler) => { events[key] = handler; }, removeEventListener: (key) => { delete events[key]; } },
    requestAnimationFrame: (callback) => { callback(); return 1; }, cancelAnimationFrame() {},
    setTimeout: () => 1, clearTimeout() {},
  });
  return { attributes, events };
}
test('the selected entrance route is covered before hydration', () => {
  assert.equal(boot().attributes['data-brand-arrival'], 'test');
  assert.equal(boot({ pathname: '/', path: '/' }).attributes['data-brand-arrival'], 'test');
});
test('nested pages, repeated visits and reduced motion skip the introduction', () => {
  assert.equal(boot({ pathname: '/en/docs' }).attributes['data-brand-arrival'], undefined);
  assert.equal(boot({ seen: true }).attributes['data-brand-arrival'], undefined);
  assert.equal(boot({ reduced: true }).attributes['data-brand-arrival'], undefined);
});
test('Escape dismisses the pre-paint cover', () => {
  const result = boot(); result.events.keydown({ key: 'Escape' });
  assert.equal(result.attributes['data-brand-arrival'], undefined);
});
