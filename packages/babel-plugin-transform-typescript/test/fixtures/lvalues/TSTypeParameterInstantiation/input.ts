export abstract class AbstractClass {
    public static myFunc?: <M extends AbstractClass>(
        this: AbstractClass,
        instance: M,
    ) => void;
}

export class ConcreteClass extends AbstractClass {
}

export const init = () => {
    const cls = ConcreteClass;

    cls.myFunc<ConcreteClass> = (instance) => {
    }
}
