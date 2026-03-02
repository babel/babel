const Cat = 10;
const Dog = 20;
var Animals = /*#__PURE__*/function (Animals) {
  Animals[Animals["Cat"] = 1] = "Cat";
  return Animals;
}(Animals || {});
Animals = /*#__PURE__*/function (Animals) {
  Animals[Animals["Dog"] = 2] = "Dog";
  return Animals;
}(Animals || {});
Animals = /*#__PURE__*/function (Animals) {
  Animals[Animals["CatDog"] = 3] = "CatDog";
  return Animals;
}(Animals || {});
