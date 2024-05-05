export class AbstractClass {
  static myFunc;
}
export class ConcreteClass extends AbstractClass {}
export const init = () => {
  const cls = ConcreteClass;
  cls.myFunc = instance => {
    console.log(instance.myField);
  };
};
