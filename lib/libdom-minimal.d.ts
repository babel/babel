// Minimal version of lib.dom.d.ts. @babel/standalone needs these types
// to be defined, but we don't want to load the full lib.dom.d.ts in
// tsconfig.dts-bundles.json because we don't want other .d.ts files to
// accidentally rely on DOM features.

declare interface HTMLCollectionOf<T> {}
declare interface HTMLScriptElement {}
