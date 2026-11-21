# Destructuring plugins benchmark

Compares the published `@babel/plugin-transform-destructuring`,
`@babel/plugin-transform-object-rest-spread` and
`@babel/plugin-proposal-destructuring-private` (`@babel-baseline/*`) with the
versions built from this repository, running on the same `@babel/core`.

The benchmarks use the experimental `node:bench` module, available in
Node.js >= 26.

```sh
# quick run, all benchmarks in one process
node --experimental-bench --no-warnings --bench destructuring.bench.mjs

# A/B comparison, one process per benchmark, 5 rounds with alternating order
node run.mjs 5
```
