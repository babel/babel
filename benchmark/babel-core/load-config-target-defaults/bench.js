import { currentCore, baselineCore, Benchmark } from "../../util.mjs";
import url from "node:url";
import { resolve } from "node:path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const benchmark = new Benchmark();

function benchCases(name, implementation, options = {}) {
  const babelConfigFile = resolve(__dirname, "./babel.config.cjs");
  benchmark.add(
    name,
    () => {
      implementation({
        configFile: babelConfigFile,
        babelrc: false,
        ...options,
      });
    },
    {
      // increase minSamples for accuracy
      minSamples: 100,
    }
  );
}

benchCases("baseline", baselineCore.loadOptionsSync);
benchCases("current", currentCore.loadOptionsSync);

benchmark.run();
