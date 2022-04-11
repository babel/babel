declare class A {
  @@iterator(): Iterator<File>;
}

declare class A {
  @@asyncIterator(): Iterator<File>;
}

interface A1 {
  @@iterator(): Iterator<File>;
}

interface A2 {
  @@asyncIterator(): Iterator<File>;
}
