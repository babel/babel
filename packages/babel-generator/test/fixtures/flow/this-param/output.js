function one(this: number) {}

function two(this: number, a) {}

function three(this: number, ...a) {}

function four(this: number, a, b, ...c) {}

function five<T>(this: T) {}

type six = (this: number) => void;
type seven = (this: number, a: number) => void;
type eight = (this: number, ...a: any) => void;
type nine = <T>(this: T) => void;
type ten = {
  m1(this: string): void,
  m2(this: string, a: number): void,
  m3(this: string, ...a: any): void,
  m4<T>(this: T): void,
};
declare function eleven(this: number): void;
declare function twelve(this: string, a: number): void;
declare function thirteen(this: string, ...a: any): void;
declare function fourteen<T>(this: T): void;
declare class Fifteen {
  m1(this: string): void,
  m2(this: string, a: number): void,
  m3(this: string, ...a: any): void,
  m4<T>(this: T): void,
}

class Sixteen {
  m1(this: number) {}

  m2(this: number, a) {}

  m3(this: number, ...a) {}

  m4(this: number, a, b, ...c) {}

  m5<T>(this: T) {}

}

let seventeen = {
  m1(this: number) {},

  m2(this: number, a) {},

  m3(this: number, ...a) {},

  m4(this: number, a, b, ...c) {},

  m5<T>(this: T) {}

};