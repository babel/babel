var value;
const classDec = (Class) => {
  value = (new Class).m();
  return Class
};

const memberDec = () => () => 42;

@classDec
class C {
  @memberDec m() {};
}
