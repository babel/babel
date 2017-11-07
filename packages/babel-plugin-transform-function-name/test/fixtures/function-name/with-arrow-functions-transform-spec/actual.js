// These are actually handled by transform-arrow-functions
const x = () => x;
const y = x => x();
const z = { z: () => y(x) }.z;
