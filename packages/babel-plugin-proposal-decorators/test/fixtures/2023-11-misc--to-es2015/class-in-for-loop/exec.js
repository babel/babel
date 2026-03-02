{
  const logs = [];
  const classes = [];
  const noop = () => {}

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
  const noop = () => {}

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
  const noop = () => {}

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

{
  const logs = [];
  const classes = [];
  const setValueTo = i => () => () => i

  for (let i = 0; i < 2; i++) {
    classes.push(class C {
      @setValueTo(i) [i];
    })
  }

  for (const clazz of classes) {
    const c = new clazz();
    const key = Reflect.ownKeys(c)[0];
    logs.push([key, c[key]].join(":"));
  }

  expect(logs.join()).toBe("0:0,1:1");
}

{
  const logs = [];
  const classes = [];
  const noop = () => {}
  const setValueTo = i => (_, { access, addInitializer }) => addInitializer(function() { access.set(this, i) })

  for (let i = 0; i < 2; i++) {
    classes.push(@noop class C {
      @setValueTo(i) [i];
    })
  }

  for (const clazz of classes) {
    const c = new clazz();
    const key = Reflect.ownKeys(c)[0];
    logs.push([key, c[key]].join(":"));
  }

  expect(logs.join()).toBe("0:0,1:1");
}
