// Minimal version of lib.dom.d.ts. @babel/standalone needs these types
// to be defined, but we don't want to load the full lib.dom.d.ts in
// tscondif.dts-bundles.json because we don't want other .d.ts files to
// accidenally rely on DOM features.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface HTMLCollectionOf<T> {}
declare interface HTMLScriptElement {}
