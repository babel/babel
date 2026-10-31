const [k, { a: { b, ...r } }, z] = it;
for (const [x, { o: { ...s } = {} }] of list) {
}
[k, { a: { c: { ...t } }, d }] = it;
function f([k, { a: { ...u } }], v) {}
// The default and the key read a hoisted binding: the element is hoisted
const [{ a: { ...w }, b: y = w }] = it;
const [{ a: { ...q }, [q.key]: p }] = it;
