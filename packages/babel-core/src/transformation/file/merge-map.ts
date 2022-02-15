type SourceMap = any;
import remapping from "@ampproject/remapping";

export default function mergeSourceMap(
  inputMap: SourceMap,
  map: SourceMap,
  source: string,
): SourceMap {
  // Prevent an infinite recursion if one of the input map's sources has the
  // same resolved path as the input map. In the case, it would keep find the
  // input map, then get it's sources which will include a path like the input
  // map, on and on.
  let found = false;
  const result = remapping(rootless(map), (s, ctx) => {
    if (s === source && !found) {
      found = true;
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
