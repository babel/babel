import foo, * as bar from "someModule";

export const myWord = Symbol("abc");
export function* giveWord () {
  yield myWord;
}

foo;
bar;
