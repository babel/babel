export function report(event) {
  const bench = event.target;
  const timeMs = bench.stats.mean * 1000;
  const time =
    timeMs < 10
      ? `${Math.round(timeMs * 1000) / 1000}ms`
      : `${Math.round(timeMs)}ms`;
  const msg = `${bench.name}: ${formatNumber(bench.hz)} ops/sec ±${
    Math.round(bench.stats.rme * 100) / 100
  }% (${time})`;
  console.log(msg);
}

function formatNumber(x) {
  if (x < 100) return `${Math.round(x * 100) / 100}`;
  return `${Math.round(x)}`.replace(/\d(?=(?:\d{3})+$)/g, "$&_");
}
