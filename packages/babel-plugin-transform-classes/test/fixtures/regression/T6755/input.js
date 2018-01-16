class Example {
  async test1(){
    await Promise.resolve(2);
  }

  *test2(){
    yield 3;
  }
}
