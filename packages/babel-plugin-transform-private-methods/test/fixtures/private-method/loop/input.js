for (const i of [1, 2]) {
  class C {
    #m() {
      return [C, i];
    }
  }
}

for (const i of [1, 2]) {
  switch (i) {
    default:
      class C {
        #m() {}
      }
  }
  switch (i) {
    default: {
      class C {
        #m() {}
      }
    }
  }
  for (const C of [class { #m() {} }]);
}

for (const i of [1, 2]) {
  try {
  } catch ({ C = class { #m() {} } }) {}
  17;
  class D {
    #x;
    static #y = 1;
  }
}
