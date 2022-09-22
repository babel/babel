const hasOwn: <O extends object>(obj: O, key: unknown) => key is keyof O =
  Function.call.bind(Object.prototype.hasOwnProperty) as any;

export function getInternal(type: "plugin" | "preset", name: string) {
  const match = name.match(/^internal:transform-(.+)/);
  if (type === "plugin" && match && hasOwn(plugins, match[1])) {
    return plugins[match[1]];
  }

  return null;
}

import arrowFunctions from "@babel/plugin-transform-arrow-functions";

const plugins = {
  "arrow-functions": arrowFunctions,
};
