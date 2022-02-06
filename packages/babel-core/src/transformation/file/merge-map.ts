type SourceMap = any;
import remapping from "@ampproject/remapping";

export default function mergeSourceMap(
  inputMap: SourceMap,
  map: SourceMap,
  source: string,
): SourceMap {
  const outputSources = map.sources;

  let result;
  if (outputSources.length > 1) {
    // When there are multiple output sources, we can't always be certain which
    // source represents the file we just transformed.
    const index = outputSources.indexOf(source);

    // If we can't find the source, we fall back to the legacy behavior of
    // outputting an empty sourcemap.
    if (index === -1) {
      result = emptyMap(inputMap);
    } else {
      result = mergeMultiSource(inputMap, map, index);
    }
  } else {
    result = mergeSingleSource(inputMap, map);
  }

  if (typeof inputMap.sourceRoot === "string") {
    result.sourceRoot = inputMap.sourceRoot;
  }
  return result;
}

// A single source transformation is the default, and easiest to handle.
function mergeSingleSource(inputMap: SourceMap, map: SourceMap): SourceMap {
  return remapping([rootless(map), rootless(inputMap)], () => null);
}

// Transformation generated an output from multiple source files. When this
// happens, it's ambiguous which source was the transformed file, and which
// source is from the transformation process. We use remapping's multisource
// behavior, returning the input map when we encounter the transformed file.
function mergeMultiSource(inputMap: SourceMap, map: SourceMap, index: number) {
  // We empty the source index, which will prevent the sourcemap from becoming
  // relative the the input's location. Eg, if we're transforming a file
  // 'foo/bar.js', and it is a transformation of a `baz.js` file in the same
  // directory, the expected output is just `baz.js`. Without this step, it
  // would become `foo/baz.js`.
  map.sources[index] = "";

  let count = 0;
  return remapping(rootless(map), () => {
    if (count++ === index) return rootless(inputMap);
    return null;
  });
}

// Legacy behavior of the old merger was to output a sourcemap without any
// mappings but with copied sourcesContent. This only happens if there are
// multiple output files and it's ambiguous which one is the transformed file.
function emptyMap(inputMap: SourceMap) {
  const inputSources = inputMap.sources;

  const sources = [];
  const sourcesContent = inputMap.sourcesContent?.filter((content, i) => {
    if (typeof content !== "string") return false;

    sources.push(inputSources[i]);
    return true;
  });

  return {
    ...inputMap,
    sources,
    sourcesContent,
    mappings: "",
  };
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
