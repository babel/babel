// #15142
var f = async () => [await 0, , ];
f().then(result => {
  expect(result).toStrictEqual([0, , ]);
});
