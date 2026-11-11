const [value, other] = await Promise.all([babelHelpers.processResponse(fetch(import.meta.resolve("./x.txt")), "text"), babelHelpers.processResponse(fetch(import.meta.resolve("./y.txt")), "text")]);
const ns = {
  default: value
};
use(value, ns, other);
