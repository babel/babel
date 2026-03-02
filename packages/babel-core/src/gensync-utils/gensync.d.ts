declare module "gensync" {
  declare type Next = undefined | Function;
  declare type Yield = mixed;

  declare type Callback<Return> =
    | ((err: Error, val: Return) => void)
    | ((err: unknown) => void);

  export type Gensync<Fn extends (...args: any) => any> = {
    (...args: Parameters<Fn>): Handler<ReturnType<Fn>>;
    sync(...args: Parameters<Fn>): ReturnType<Fn>;
    async(...args: Parameters<Fn>): Promise<ReturnType<Fn>>;
    errback(...args: [...Parameters<Fn>, Callback<ReturnType<Fn>>]): void;
  };

  export type Handler<Return> = Generator<Yield, Return, Next>;
  export type Options<Fn extends (...args: any) => any> = {
    sync(...args: Parameters<Fn>): ReturnType<Fn>;
    arity?: number;
    name?: string;
  } & (
    | { async?: (...args: Parameters<Fn>) => Promise<ReturnType<Fn>> }
    | {
        errback(...args: [...Parameters<Fn>, Callback<ReturnType<Fn>>]): void;
      }
  );

  declare const gensync: {
    <Fn extends (...args: any) => any>(
      _: Options<Fn> | ((...args: Parameters<Fn>) => Handler<ReturnType<Fn>>),
    ): Gensync<Fn>;

    all<Return>(gensyncs: Array<Handler<Return>>): Handler<Return[]>;
    race<Return>(gensyncs: Array<Handler<Return>>): Handler<Return>;
  };
  export default gensync;
}
