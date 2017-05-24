// I don't know if this is a bug with arrow-functions spec: true
// or with function-name, but the functions are missing their names.
const x = () => x;
const y = x => x();
const z = { z: () => y(x) }.z;
