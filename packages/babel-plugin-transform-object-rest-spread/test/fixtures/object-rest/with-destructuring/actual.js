var { a, b: { c: { ...c} }, d } = obj;
({ a, b: { c: { ...c} }, d } = obj);

for (const { a, b: { c: { ...c} }, d } of []) {
}
