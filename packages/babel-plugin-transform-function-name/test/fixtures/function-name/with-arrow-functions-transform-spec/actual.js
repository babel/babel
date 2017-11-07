// These are actually handled by transform-arrow-functions
// x's name does not match exactly to avoid shadowing the const x
const x = () => x;
const y = x => x();
const z = { z: () => y(x) }.z;
