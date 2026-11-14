function f([{ ...r }, [a]]) {
  return [r, a];
}
var [{ ...s }, [b = s], c] = x;
[{ ...t.u }, [d]] = y;
