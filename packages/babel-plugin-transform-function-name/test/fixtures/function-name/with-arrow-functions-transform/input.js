const x = () => x;
const y = x => x();
const z = { z: () => y(x) }.z;
