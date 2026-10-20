(x = (a as any) = 1) => {};
(x = (<any>a) = 1) => {};
(x = (a!) = 1) => {};
function f(x = (a satisfies any) = 1) {}
