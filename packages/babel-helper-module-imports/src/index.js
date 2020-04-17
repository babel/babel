import ImportInjector from "./import-injector";

export { ImportInjector };

export { default as isModule } from "./is-module";

export function addDefault(path, importedSource, opts) {
  return new ImportInjector(path).addDefault(importedSource, opts);
}

export function addNamed(path, name, importedSource, opts) {
  return new ImportInjector(path).addNamed(name, importedSource, opts);
}

export function addNamespace(path, importedSource, opts) {
  return new ImportInjector(path).addNamespace(importedSource, opts);
}

export function addSideEffect(path, importedSource, opts) {
  return new ImportInjector(path).addSideEffect(importedSource, opts);
}
