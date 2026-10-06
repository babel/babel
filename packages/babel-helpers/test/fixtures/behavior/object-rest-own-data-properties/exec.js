function expectOwnDataProperty(actual, expected, key) {
  expect(Object.getPrototypeOf(actual)).toBe(Object.getPrototypeOf(expected));
  expect(Object.getOwnPropertyDescriptor(actual, key)).toEqual(
    Object.getOwnPropertyDescriptor(expected, key),
  );
  expect(Object.getOwnPropertyDescriptor(actual, key)).toEqual({
    value: expected[key],
    writable: true,
    enumerable: true,
    configurable: true,
  });
}

// Assignment treats __proto__ as a prototype mutation instead of copying an
// own data property. Native rest preserves the prototype and property value.
for (const helper of [COPY_REST, COPY_REST_LOOSE]) {
  for (const value of [{ marker: true }, null, 17]) {
    let reads = 0;
    const source = {};
    Object.defineProperty(source, "__proto__", {
      enumerable: true,
      get() {
        reads++;
        return value;
      },
    });
    const { ...expected } = source;
    reads = 0;
    const actual = helper(source, []);
    expect(reads).toBe(1);
    expectOwnDataProperty(actual, expected, "__proto__");
  }
}

// Copying must not invoke a setter inherited by the newly created target.
for (const helper of [COPY_REST, COPY_REST_LOOSE]) {
  const key = "babelRestOwnDataPropertyTest";
  const previous = Object.getOwnPropertyDescriptor(Object.prototype, key);
  const setterCalls = [];
  let reads = 0;
  try {
    Object.defineProperty(Object.prototype, key, {
      configurable: true,
      set(value) {
        setterCalls.push(value);
      },
    });
    const source = {};
    Object.defineProperty(source, key, {
      enumerable: true,
      get() {
        reads++;
        return 9;
      },
    });
    const { ...expected } = source;
    reads = 0;
    const actual = helper(source, []);
    expect(reads).toBe(1);
    expect(setterCalls).toEqual([]);
    expectOwnDataProperty(actual, expected, key);
  } finally {
    if (previous) Object.defineProperty(Object.prototype, key, previous);
    else delete Object.prototype[key];
  }
}

// The default helper also copies symbols using own data property semantics.
{
  const key = Symbol("babel rest own data property test");
  const setterCalls = [];
  let reads = 0;
  try {
    Object.defineProperty(Object.prototype, key, {
      configurable: true,
      set(value) {
        setterCalls.push(value);
      },
    });
    const source = {};
    Object.defineProperty(source, key, {
      enumerable: true,
      get() {
        reads++;
        return 12;
      },
    });
    const { ...expected } = source;
    reads = 0;
    const actual = COPY_REST(source, []);
    expect(reads).toBe(1);
    expect(setterCalls).toEqual([]);
    expectOwnDataProperty(actual, expected, key);

    reads = 0;
    expect(Reflect.ownKeys(COPY_REST_LOOSE(source, []))).toEqual([]);
    expect(reads).toBe(0);
  } finally {
    delete Object.prototype[key];
  }
}
