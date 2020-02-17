for (let _i = 0, _array = array; _i < _array.length; _i++) {
  const [head, ...tail] = _array[_i];
  {
    const head = 1;
    console.log(tail);
    console.log(head);
  }
}
