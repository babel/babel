const getAdder = () => (x, y) => x + y;
expect(getAdder?.()~(?, 1)(2)).toBe(3);
const none = null;
expect(none?.()~(?, 1)).toBe(undefined);
