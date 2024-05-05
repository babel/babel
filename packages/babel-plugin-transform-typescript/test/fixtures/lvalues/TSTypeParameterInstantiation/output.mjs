export class AbstractClass {}
export class ConcreteClass extends AbstractClass {}
export const init = () => {
  const cls = ConcreteClass;
  cls.myFunc = instance => {};
};
