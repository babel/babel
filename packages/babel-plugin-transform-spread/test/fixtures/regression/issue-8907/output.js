const arr = [];

arr.concat = () => {
  throw new Error('Should not be called');
};

const x = [].concat(arr);
