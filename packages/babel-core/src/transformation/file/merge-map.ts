type SourceMap = any;
import remapping from "@ampproject/remapping";

export default function mergeSourceMap(
  inputMap: SourceMap,
  map: SourceMap,
  sourceFileName: string,
): SourceMap {
  // On win32 machines, the sourceFileName uses backslash paths like
  // `C:\foo\bar.js`. But sourcemaps are always posix paths, so we need to
  // normalize to regular slashes before we can merge (else we won't find the
  // source associated with our input map).
  // This mirrors code done while generating the output map at
  // https://github.com/babel/babel/blob/5c2fcadc9ae34fd20dd72b1111d5cf50476d700d/packages/babel-generator/src/source-map.ts#L102
  const source = sourceFileName.replace(/\\/g, "/");

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

  // remapping returns a SourceMap class type, but this breaks code downstream in
  // @babel/traverse and @babel/types that relies on data being plain objects.
  // When it encounters the sourcemap type it outputs a "don't know how to turn
  // this value into a node" error. As a result, we are converting the merged
  // sourcemap to a plain js object.
  return { ...result };
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
