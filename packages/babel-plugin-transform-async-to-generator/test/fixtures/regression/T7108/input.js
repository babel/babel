class Test{
  static async method1() {
    console.log(this);

    setTimeout(async () => {
      console.log(this);
    });
  }

  static async method2() {
    console.log(this);

    setTimeout(async (arg) => {
      console.log(this);
    });
  }

  async method1() {
    console.log(this);

    setTimeout(async () => {
      console.log(this);
    });
  }

  async method2() {
    console.log(this);

    setTimeout(async (arg) => {
      console.log(this);
    });
  }
}
