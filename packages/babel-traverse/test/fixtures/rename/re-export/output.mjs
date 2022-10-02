// https://github.com/babel/babel/issues/9266

function a() {
  return "YES";
}
export { a as x };
export { x as someFunction } from './lib2.js';
