const [value, other] = await Promise.all([babelHelpers.processResponse(fetch(import.meta.resolve("./x.json")), "json"), babelHelpers.processResponse(fetch(import.meta.resolve("./y.json")), "json")]);
const ns = {
  default: value
};
use(value, ns, other);
