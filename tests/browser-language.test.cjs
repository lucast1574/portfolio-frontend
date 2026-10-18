const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = ts.transpileModule(fs.readFileSync('lib/browser-language.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const sandbox = { exports: {} };
vm.runInNewContext(source, sandbox);
const { browserLanguage } = sandbox.exports;
for (const [header, expected] of [[null, 'es'], ['', 'es'], ['es-PE,es;q=0.9,en;q=0.8', 'es'], ['en-US,en;q=0.9,es;q=0.8', 'en'], ['en;q=0.1,es;q=0.9', 'es'], ['en;q=0,es;q=1', 'es'], ['fr-FR,es;q=0.8,en;q=0.5', 'es'], ['pt-BR,pt;q=0.9', 'en'], ['es;q=invalid,en;q=0.8', 'en']]) {
 test(`browser language ${JSON.stringify(header)} resolves to ${expected}`, () => assert.equal(browserLanguage(header), expected));
}

const middlewareSource = ts.transpileModule(fs.readFileSync('middleware.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const middlewareSandbox = { exports: {}, Headers, URL, require: name => name === '@/lib/browser-language' ? { browserLanguage } : name === '@/lib/seo' ? { ORIGIN: 'https://lucas.santillan.pro' } : require(name) };
vm.runInNewContext(middlewareSource, middlewareSandbox);
const { middleware } = middlewareSandbox.exports;
test('English browser redirects stay on the public origin behind a reverse proxy', () => {
 const response = middleware({ nextUrl: new URL('http://localhost:3000/?ref=portfolio'), headers: new Headers({ 'accept-language':'en-US', host:'lucas.santillan.pro', 'x-forwarded-proto':'https' }) });
 assert.equal(response.status, 307);
 assert.equal(response.headers.get('location'), 'https://lucas.santillan.pro/en?ref=portfolio');
 assert.match(response.headers.get('cache-control'), /no-store/);
 assert.match(response.headers.get('vary'), /Accept-Language/);
});
test('Spanish requests and explicit English URLs keep stable indexable language routes', () => {
 for(const [path, accept, locale] of [['/','es-PE','es'],['/en','es-PE','en']]) {
  const response = middleware({ nextUrl:new URL('https://lucas.santillan.pro'+path), headers:new Headers({'accept-language':accept}) });
  assert.equal(response.status,200);
  assert.equal(response.headers.get('x-middleware-request-x-portfolio-locale'),locale);
 }
});
