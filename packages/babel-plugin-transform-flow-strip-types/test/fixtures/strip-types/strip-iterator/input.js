declare class A {
  @@iterator(): Iterator<File>;
}

declare class A1 {
  @@asyncIterator(): Iterator<File>;
}

interface A2 {
  @@iterator(): Iterator<File>;
}

interface A3 {
  @@asyncIterator(): Iterator<File>;
}
