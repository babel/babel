// These are actually handled by transform-es2015-arrow-function
const x = () => x;
const y = x => x();
const z = { z: () => y(x) }.z;
