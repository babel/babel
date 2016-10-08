class C<+T, -U> {}
function f<+T, -U>() {}
type T<+T, -U> = {};
type T = { +p: T };
type T = { -p: T };
type T = { +[k:K]: V };
type T = { -[k:K]: V };
interface I { +p: T };
interface I { -p: T };
interface I { +[k:K]: V };
interface I { -[k:K]: V };
declare class I { +p: T };
declare class I { -p: T };
declare class I { +[k:K]: V };
declare class I { -[k:K]: V };
