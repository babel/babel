type BitDecoratorCall<T> = (
  target: ClassAccessorDecoratorTarget<T, boolean>,
  context: ClassAccessorDecoratorContext<T, boolean> & {
    private: false;
    static: false;
  }
) => ClassAccessorDecoratorTarget<T, boolean>; /*{
  const bitMask = (context.metadata.nextBitMask ??= 1);
  context.metadata.nextBitMask <<= 1;
  return {
    init() {
      return 0;
    },
    get() {
      return (context.metadata.bitsStorage.get(this) & bitMask) > 0;
    },
    set(v) {
      context.metadata.bitsStorage.set(
        this,
        v
          ? context.metadata.bitsStorage.get(this) | bitMask
          : context.metadata.bitsStorage.get(this) & ~bitMask,
      );
    },
  };
}*/

export type BitDecorator<T> = BitDecoratorCall<T> & {
  (assertMask: number): BitDecoratorCall<T>;

  storage(
    value: unknown,
    context: ClassFieldDecoratorContext<T, number>
  ): void /*{
    context.metadata.bitsStorage = context.access;
  }*/;
};
