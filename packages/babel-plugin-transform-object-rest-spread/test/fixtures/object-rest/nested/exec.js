const defunct = {
  outer: {
    inner: {
      three: 'three',
      four: 'four'
    }
  }
}

const { outer: { inner: { three, ...other } } } = defunct

expect(three).toBe("three");
expect(other).toEqual({ four: "four" });
expect(other).not.toBe(defunct.outer.inner);
