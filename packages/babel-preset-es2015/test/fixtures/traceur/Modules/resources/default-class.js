export default class C {
  m() {
    return 'm';
  }
}

expect(C).toBeInstanceOf(Function);
