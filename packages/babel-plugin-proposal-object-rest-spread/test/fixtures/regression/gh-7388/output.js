function fn0(obj0) {
  const {
    fn1 = (obj1 = {}) => {
      const {
        fn2 = (obj2 = {}) => {
          const {
            a
          } = obj2,
                rest = babelHelpers.objectWithoutProperties(obj2, ["a"]);
          console.log(rest);
        }
      } = obj1;
    }
  } = obj0;
}
