export default class C {
  m() {
    return 'm';
  }
}

expect(C instanceof Function).toBe(true);
