const [value, other] = await Promise.all([fetch(import.meta.resolve("./x.json")).then(r => r.json()), fetch(import.meta.resolve("./y.json")).then(r => r.json())]);
const ns = {
  default: value
};
use(value, ns, other);
