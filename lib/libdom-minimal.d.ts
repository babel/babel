// Minimal version of lib.dom.d.ts. @babel/standalone needs these types
// to be defined, but we don't want to load the full lib.dom.d.ts in
// tsconfig.dts-bundles.json because we don't want other .d.ts files to
// accidentally rely on DOM features.

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type
declare interface HTMLCollectionOf<T> {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
declare interface HTMLScriptElement {}
