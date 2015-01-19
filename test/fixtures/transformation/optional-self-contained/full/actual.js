import foo, * as bar from "someModule";

export const myWord = Symbol("abc");
function* giveWord () {
  yield myWord;
}
