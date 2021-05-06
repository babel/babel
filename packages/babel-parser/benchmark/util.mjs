export function report(event) {
  const bench = event.target;
  const factor = bench.hz < 100 ? 100 : 1;
  const timeMs = bench.stats.mean * 1000;
  const time =
    timeMs < 10
      ? `${Math.round(timeMs * 1000) / 1000}ms`
      : `${Math.round(timeMs)}ms`;
  const msg = `${bench.name}: ${
    Math.round(bench.hz * factor) / factor
  } ops/sec ±${Math.round(bench.stats.rme * 100) / 100}% (${time})`;
  console.log(msg);
}
