class C1<+T, -U> {}
function f<+T, -U>() {}
type T<+T, -U> = {}
type T1 = { +p: T }
type T2 = { -p: T }
type T3 = { +[k:K]: V }
type T4 = { -[k:K]: V }
interface I { +p: T }
interface I2 { -p: T }
interface I3 { +[k:K]: V }
interface I4 { -[k:K]: V }
declare class I5 { +p: T }
declare class I6 { -p: T }
declare class I7 { +[k:K]: V }
declare class I8 { -[k:K]: V }
class C2 { +p: T }
class C3 { -p: T }
