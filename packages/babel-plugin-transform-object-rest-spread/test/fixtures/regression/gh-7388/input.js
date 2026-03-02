function fn0(obj0) {
  const {
    fn1 = (obj1 = {}) => {
      const {
        fn2 = (obj2 = {}) => {
          const {a, ...rest} = obj2;
          console.log(rest);
        }
      } = obj1;
    }
  } = obj0;
}
