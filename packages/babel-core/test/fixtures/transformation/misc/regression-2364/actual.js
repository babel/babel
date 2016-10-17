function wrapper(fn) {
  return (...args) => {
    if (someCondition) {
      const val = fn(...args);
      return val.test(() => {
        console.log(val);
      });
    }
  };
}
