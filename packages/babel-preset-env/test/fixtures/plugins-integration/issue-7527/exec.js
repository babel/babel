class MyDate extends Date {
  constructor(time) {
      super(time);
  }
}
let myDate = new MyDate();

expect(myDate.toString).toBe(Date.prototype.toString);
expect(typeof myDate.toString()).toBe("string");
