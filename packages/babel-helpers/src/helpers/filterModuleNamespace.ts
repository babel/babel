/* @minVersion 8.1.0 */

import createModuleNsFilter from "./createModuleNsFilter.ts";

type Namespace = Record<string, unknown>;

export default function _filterModuleNamespace(
  doImport: (
    extractExports: (options: unknown) => unknown,
  ) => Promise<Namespace>,
): Promise<Namespace> {
  var names: string[] | undefined;
  var isValidationError = false;

  try {
    var promise = doImport(function (options) {
      if (Object(options) === options) {
        try {
          var { exports } = options as { exports?: Iterable<unknown> };
          if (exports !== undefined) {
            if (Object(exports) !== exports) {
              throw new TypeError("import()'s `exports` must be an object");
            }
            names = [];
            for (var name of exports) {
              if (typeof name !== "string") {
                throw new TypeError("import()'s `exports` must be strings");
              }
              names.push(name);
            }
          }
        } catch (error) {
          isValidationError = true;
          throw error;
        }
      }
      return options;
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    if (isValidationError) return Promise.reject(error);
    throw error;
  }

  if (!names) return promise;
  names.sort();

  return promise.then(createModuleNsFilter(names));
}
