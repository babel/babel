// Process-isolated A/B driver for destructuring.bench.mjs: each benchmark
// runs in its own Node.js process (so that the JIT state of one
// implementation cannot bias the other), the order is rotated at every round
// and the median of the per-round medians is reported.
//
//   node run.mjs [rounds=5]
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const rounds = Number(process.argv[2] ?? 5);
const benchFile = fileURLToPath(
  new URL("./destructuring.bench.mjs", import.meta.url)
);

const suites = [
  "destructuring",
  "object-rest-spread",
  "destructuring + object-rest-spread",
  "destructuring-private",
];
const implementations = ["baseline", "current"];

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function runOne(suite, implementation) {
  const pattern = `^${escapeRegExp(`${suite} ${implementation}`)}$`;
  const { stdout, stderr, status } = spawnSync(
    process.execPath,
    [
      "--experimental-bench",
      "--no-warnings",
      "--bench-reporter=json",
      `--bench-name-pattern=${pattern}`,
      "--bench",
      benchFile,
    ],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }
  );
  if (status !== 0) {
    throw new Error(`node:bench exited with ${status}\n${stderr}`);
  }
  for (const line of stdout.split("\n")) {
    if (!line.startsWith("{")) continue;
    const event = JSON.parse(line);
    if (event.type === "bench:complete" && event.data.summary) {
      return event.data.summary.median;
    }
  }
  throw new Error(`No result for ${suite} ${implementation}\n${stderr}`);
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

const results = new Map(
  suites.map(suite => [
    suite,
    Object.fromEntries(implementations.map(i => [i, []])),
  ])
);

for (let round = 0; round < rounds; round++) {
  // alternate the order at every round
  const order = round % 2 ? [...implementations].reverse() : implementations;
  for (const suite of suites) {
    for (const implementation of order) {
      const rate = runOne(suite, implementation);
      results.get(suite)[implementation].push(rate);
      process.stderr.write(
        `round ${round + 1}/${rounds} ${suite} ${implementation}: ${rate.toFixed(2)} ops/s\n`
      );
    }
  }
}

console.log(
  "| case | baseline (ops/s) | current (ops/s) | current / baseline |"
);
console.log("| --- | ---: | ---: | ---: |");
for (const [suite, byImplementation] of results) {
  const baseline = median(byImplementation.baseline);
  const current = median(byImplementation.current);
  console.log(
    `| ${suite} | ${baseline.toFixed(2)} | ${current.toFixed(2)} | ${(current / baseline).toFixed(3)} |`
  );
}
