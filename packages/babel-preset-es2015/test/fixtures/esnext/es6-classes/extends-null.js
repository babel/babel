class Obj extends null {}

expect(Obj.toString).toBe(Function.toString);
expect(new Obj().toString).toBeUndefined();
