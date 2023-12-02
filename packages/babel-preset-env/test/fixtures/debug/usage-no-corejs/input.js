const foo = new Promise((resolve) => {
  resolve(new Map());
});

queueMicrotask(() => globalThis);

Observable.from(10);
