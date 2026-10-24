try {
  throw { message: "boom", code: 1, extra: true };
} catch ({ message, code = 0, ...details }) {
  expect(message).toBe("boom");
  expect(code).toBe(1);
  expect(details).toEqual({ extra: true });
}
