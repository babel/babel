// https://github.com/babel/babel/issues/9266

export function x() {
  return "YES";
}

export { x as someFunction } from './lib2.js'
