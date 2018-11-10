
case (input) {
  when { name: { firstName },  age: x} -> console.log('object ', firstName, x);
  when { name: "Chen",  age: 3, number: [1, 2, 3] } -> console.log('object');
  when [1, { type: 3 }, b] -> console.log('array', b);
}
