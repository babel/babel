// The statements replacing the arrow body are visited by the other plugins
// (here, discard binding).
let r, a;
const f = () => [{ ...r }, [a, void]] = [{ b: 1 }, [2, 3]];
const value = f();
expect(r).toEqual({ b: 1 });
expect(a).toBe(2);
expect(value).toEqual([{ b: 1 }, [2, 3]]);
