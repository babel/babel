const foo = new Promise((resolve) => {
  resolve(new Map());
});

queueMicrotask(() => '  ab  '.trimStart());

Observable.from(10);
