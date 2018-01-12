declare class A {
  @@iterator(): Iterator<File>;
}

declare class A {
  @@asyncIterator(): Iterator<File>;
}

interface A {
  @@iterator(): Iterator<File>;
}

interface A {
  @@asyncIterator(): Iterator<File>;
}
