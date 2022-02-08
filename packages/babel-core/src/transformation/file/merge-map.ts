type SourceMap = any;
import remapping from "@ampproject/remapping";

export default function mergeSourceMap(
  inputMap: SourceMap,
  map: SourceMap,
  source: string,
): SourceMap {
  const result = remapping(rootless(map), (s, ctx) => {
    if (s === source) {
      // We empty the source location, which will prevent the sourcemap from
      // becoming relative to the input's location. Eg, if we're transforming a
      // file 'foo/bar.js', and it is a transformation of a `baz.js` file in the
      // same directory, the expected output is just `baz.js`. Without this step,
      // it would become `foo/baz.js`.
      ctx.source = "";

      return rootless(inputMap);
    }

    return null;
  });

  if (typeof inputMap.sourceRoot === "string") {
    result.sourceRoot = inputMap.sourceRoot;
  }
  return result;
}

function rootless(map: SourceMap): SourceMap {
  return {
    ...map,

    // This is a bit hack. Remapping will create absolute sources in our
    // sourcemap, but we want to maintain sources relative to the sourceRoot.
    // We'll re-add the sourceRoot after remapping.
    sourceRoot: null,
  };
}
