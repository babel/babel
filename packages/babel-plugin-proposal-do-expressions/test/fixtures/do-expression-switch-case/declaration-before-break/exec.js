const x = (n) => do {
  switch (n) {
    case 0:
    case 6:
      const b = 1;
      break;
    case 1: {
      ("a");
      {
        const c = 1;
        {
          break;
        }
      }
    }
    case 2:
    case 3: {
      ("b");
      if (n === 2) {
        const c = 1;
      } else {
        ("c");
      }
      {
        break;
      }
    }
    default:
      "bar";
  }
};

expect(x(0)).toBeUndefined();
expect(x(1)).toBeUndefined();
expect(x(2)).toBeUndefined();
expect(x(3)).toBe("c");
expect(x(6)).toBeUndefined();
expect(x(7)).toBe("bar");
