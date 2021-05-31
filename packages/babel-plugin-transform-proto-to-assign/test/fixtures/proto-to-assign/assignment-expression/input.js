console.log(foo.__proto__ = bar);

console.log(foo[bar].__proto__ = bar);

console.log(foo[bar()].__proto__ = bar);
