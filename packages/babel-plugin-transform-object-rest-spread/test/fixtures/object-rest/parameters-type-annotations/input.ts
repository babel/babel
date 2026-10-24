function f({ ...a }: { [key: string]: number }, b: typeof a = a) {}
function g<T extends object>({ ...a }: T, [b]: T[]) {}
