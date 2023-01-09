var value;
const classDec = (Class) => {
  value = (new Class).p;
  return Class
};

const memberDec = () => () => 42;

@classDec
class C {
  @memberDec m;
}
