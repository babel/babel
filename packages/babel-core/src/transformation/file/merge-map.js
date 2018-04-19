// @flow

import type { SourceMap } from "convert-source-map";
import sourceMap from "source-map";

export default function mergeSourceMap(
  inputMap: SourceMap,
  map: SourceMap,
): SourceMap {
  const inputMapConsumer = new sourceMap.SourceMapConsumer(inputMap);
  const outputMapConsumer = new sourceMap.SourceMapConsumer(map);

  const mergedGenerator = new sourceMap.SourceMapGenerator({
    file: inputMapConsumer.file,
    sourceRoot: inputMapConsumer.sourceRoot,
  });

  // This assumes the output map always has a single source, since Babel always compiles a
  // single source file to a single output file.
  const source = outputMapConsumer.sources[0];

  inputMapConsumer.eachMapping(function(mapping) {
    const generatedPosition = outputMapConsumer.generatedPositionFor({
      line: mapping.generatedLine,
      column: mapping.generatedColumn,
      source: source,
    });
    if (generatedPosition.column != null) {
      mergedGenerator.addMapping({
        source: mapping.source,

        original:
          mapping.source == null
            ? null
            : {
                line: mapping.originalLine,
                column: mapping.originalColumn,
              },

        generated: generatedPosition,

        name: mapping.name,
      });
    }
  });

  const mergedMap = mergedGenerator.toJSON();
  inputMap.mappings = mergedMap.mappings;
  return inputMap;
}
