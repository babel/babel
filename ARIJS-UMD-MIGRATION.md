# @arijs UMD plugin — Babel 7 → 8 migration notes

Working notes for porting the `@arijs/babel-plugin-transform-modules-umd` fork to
Babel 8. Pick this up in WSL to finish building/testing/publishing.

Branch: `modules-umd-imports-get-module-id` (this repo, `github.com:arijs/babel.git`).
As of the last push it is rebased onto upstream **Babel 8 `main`** with one commit
re-applying the custom feature.

---

## 1. Why this exists

`front-end` (`d:/dev/github/front-end`) builds its UMD `lib/` with a custom Babel
plugin published as two `@arijs` packages, forked from Babel **7.12.12**:

- `@arijs/babel-plugin-transform-modules-umd` — the UMD plugin
- `@arijs/babel-helper-module-transforms` — forked helper holding the custom
  functions the plugin needs

Both peer-depend on `@babel/core ^7`. front-end's `package.json` was bumped to
Babel **8**, which broke the build (`ConfigError: Unknown option: .moduleIds`,
and the `^7` peer of the @arijs packages). Goal: make the @arijs packages work on
Babel 8 so front-end can build on Babel 8.

## 2. The custom feature (what the fork adds over stock Babel)

Original commit: `bc974c69f` "Make option getModuleId be used with relative imports".
Rationale + maintainer discussion: https://github.com/babel/babel/pull/12582
(opened against babel, never merged — JLHwung wanted a broader `getSource` design
covering amd/cjs too). We keep it as a private fork.

What it does: makes the `getModuleId()` Babel option apply to **relative imports**
in UMD output, and adds an `importFileExt` option for the CommonJS `require()` paths.
So an import like `./mylib/foo-bar` becomes a custom AMD module id
(`custom-module-id/mylib/foo-bar`) and `require("./mylib/foo-bar.js")` instead of
being left as the bare relative source.

The shared logic lives in the **helper** package (not the plugin) on purpose, so
the same functions could later be reused by the amd/cjs transformers — even though
we only publish the umd plugin. This is why we keep `@arijs/babel-helper-module-transforms`
as a real fork rather than inlining the functions into the plugin.

Four functions added to the helper:
- `withExtension(filename, ext)` — swap/add a file extension
- `normalizePathSeparators(srcPath)` — `\` → `/` on Windows
- `resolveRelativeImportPaths(importRelative, rootOpts)` — resolve a relative
  import to `{ filename, filenameRelative }` against the importing file
- `amdImportId(importRelative, rootOpts, pluginOpts)` — run `getModuleName`/
  `getModuleId` on a relative import, falling back to `withExtension`

front-end consumes it via `babel.config.mjs`:
`{ globals: dfResult, exactGlobals: true, importFileExt: ".js" }` + top-level
`moduleIds: true` / `getModuleId(name)`.

## 3. Babel 7 → 8 API deltas that mattered

Confirmed against upstream `main`:

- Stock `@babel/helper-module-transforms@8` still exports everything the plugin
  needs: `isModule`, `rewriteModuleStatementsAndPrepareHeader`, `hasExports`,
  `isSideEffectImport`, `buildNamespaceInitStatements`, `ensureStatementsHoisted`,
  `wrapInterop`, `getModuleName`.
- Source files moved `.js` → `.ts`. Imports use explicit `.ts` extensions.
- `loose` is gone → split into `constantReexports` / `enumerableModuleMeta`
  (read via `api.assumption(...)`, with `options.loose` as deprecated fallback +
  a `console.warn`).
- `rewriteModuleStatementsAndPrepareHeader(path, opts)` now also takes
  `importInterop` and `filename`.
- `buildNamespaceInitStatements(meta, metadata, loose)` →
  `(metadata, sourceMetadata, constantReexports?, wrapReference?)`.
- `api.assertVersion(7)` → `api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"))`.
- `getModuleName` is now a **re-export** in the helper index; to call it locally
  inside `amdImportId` we changed it to a local `import` + added it to the
  `export {}` list.
- UMD plugin renamed `moduleName` literal handling to `moduleNameLiteral`.

## 4. What was changed on this branch (commit `9d5b6b825d`)

`packages/babel-helper-module-transforms/src/index.ts`
- `import path from "node:path"`
- `export { default as getModuleName } ...` → `import getModuleName ...` +
  added `getModuleName` to the `export { hasExports, ... }` list (kept the
  `export type { PluginOptions }`).
- Appended the 4 functions (now TS-typed) after `buildNamespaceInitStatements`,
  before `interface ReexportParts`.

`packages/babel-plugin-transform-modules-umd/src/index.ts`
- Started from Babel 8's current plugin (kept all v8 changes) and grafted the feature:
  - import `withExtension`, `resolveRelativeImportPaths`, `amdImportId` from the helper
  - added `importFileExt` to `Options` + destructure
  - `buildBrowserInit`: exact-globals lookup `browserGlobals[filename] || browserGlobals[moduleNameOrBasename]`
  - `buildBrowserArg`: extra `filename` param, lookup `(filename && browserGlobals[filename]) || browserGlobals[source]`
  - loop over `meta.source`: `amdImportId(...)` for AMD args, `withExtension(source, importFileExt)` for the `require()`, pass resolved filename to `buildBrowserArg`
  - module-name + `buildBrowserInit` use `fileOpts = this.file.opts`, with
    `fileOpts.filenameRelative || fileOpts.filename || this.filename || "unknown"`

`packages/babel-plugin-transform-modules-umd/test/fixtures/umd/imports-get-module-id/`
- `input.mjs`, `options.js`, `output.js` carried over from the 7.12 fork.
- **`output.js` will probably need regenerating under Babel 8** (helper interop
  output changed). Run the fixture with `OVERWRITE=true` and eyeball the diff —
  the key assertions: custom AMD ids (`custom-module-id/...`), `.js` extension on
  relative `require()`, exact globals resolved by filename.

## 5. How the rebase was done (already done, FYI)

```
git remote add upstream https://github.com/babel/babel.git
git fetch --no-tags upstream main
git rebase upstream/main          # replays only bc974c69f
# conflicts: helper index.js was modify/deleted (renamed to .ts); umd index.ts content conflict
# resolved by taking Babel 8's .ts files and re-applying the feature by hand
git push --force-with-lease origin modules-umd-imports-get-module-id
```

The branch history was rewritten (rebased onto a new base), hence the force-push.

## 6. TODO in WSL

1. **Bootstrap babel**: `yarn install` (yarn 4; needs `make` for the full
   `make bootstrap`/`make build`, which is why we deferred this off Windows).
2. **Run the umd plugin fixture test** (regenerates `output.js`):
   - something like `yarn jest babel-plugin-transform-modules-umd` (babel-jest
     transforms `src` on the fly, incl. the `REQUIRED_VERSION` macro).
   - use `OVERWRITE=true yarn jest ...` to regenerate the fixture output, then review.
3. **Typecheck (optional)**: `make tscheck` — the real type gate. The 4 helper
   fns were typed loosely; tighten if tscheck complains. (Babel's JS build strips
   types via Babel, so type errors don't block the build itself.)
4. **Build + publish** the two `@arijs` packages (bump versions; they currently
   sit at `0.1.3` peer `@babel/core ^7` — publish a new major that peers `^8`).
5. **Wire front-end** (`d:/dev/github/front-end`):
   - point `package.json` devDeps at the new @arijs versions (or `yarn link` /
     `file:` for local testing before publishing).
   - `npm run build` must regenerate `lib/` cleanly.
   - `npm test` (mjs + cjs). Remember **cjs tests run off built `lib/`**, so
     always `npm run build` before `npm test`.

## 7. Gotchas

- **`REQUIRED_VERSION` macro**: a Babel build-time replacement. Fine when built
  via the monorepo; if the @arijs package is ever compiled standalone, replace it
  with the literal `"^7.0.0-0 || ^8.0.0"` (the old 7.12 fork used the literal
  `api.assertVersion(7)`).
- **IDE type errors** (`node:path`, `console`): just this editor lacking Babel's
  tsconfig/`@types/node`. Not real for Babel's build.
- **front-end Babel 8 config**: the original build error `Unknown option:
  .moduleIds` came from `babel.config.mjs` — verify `moduleIds`/`getModuleId`
  top-level options still validate under Babel 8 once the plugin works; if Babel 8
  rejects them at the top level, move that logic into the plugin options.
- **Fallback** if Babel 8 proves too costly: front-end can stay on the latest
  Babel **7.x** (it's still maintained/patched) and keep the existing @arijs
  packages unchanged.
