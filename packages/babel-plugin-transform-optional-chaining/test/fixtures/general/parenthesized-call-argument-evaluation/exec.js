const events = [];
const obj = { method: null };
try {
  (obj?.method)(events.push("argument"));
} catch (error) {
  if (!(error instanceof TypeError)) throw error;
}
expect(events).toEqual(["argument"]);
