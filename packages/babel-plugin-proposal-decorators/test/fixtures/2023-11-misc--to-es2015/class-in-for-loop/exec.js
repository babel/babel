{
  const logs = [];
  const classes = [];
  function noop() {}

  for (let i = 0; i < 2; i++) {
    classes.push(class C {
      @noop [i];
    })
  }

  for (const clazz of classes) {
    logs.push(Reflect.ownKeys(new clazz()));
  }

  expect(logs.join()).toBe("0,1");
}

{
  const logs = [];
  const classes = [];
  function noop() {}

  for (let i = 0; i < 2; i++) {
    classes.push(@noop class C {
      [i];
    })
  }

  for (const clazz of classes) {
    logs.push(Reflect.ownKeys(new clazz()));
  }

  expect(logs.join()).toBe("0,1");
}

{
  const logs = [];
  const classes = [];
  function noop() {}

  for (let i = 0; i < 2; i++) {
    classes.push(@noop class C {
      @noop [i];
    })
  }

  for (const clazz of classes) {
    logs.push(Reflect.ownKeys(new clazz()));
  }

  expect(logs.join()).toBe("0,1");
}
