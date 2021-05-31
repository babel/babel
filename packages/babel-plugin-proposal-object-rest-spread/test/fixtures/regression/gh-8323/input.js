const get = () => {
  fireTheMissiles();
  return 3;
};

const f = ({ a = get(), b, c, ...z }) => {
  const v = b + 3;
};
