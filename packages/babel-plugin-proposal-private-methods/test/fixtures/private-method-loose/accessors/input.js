class Foo {
  #privateField = "top secret string";

  get #privateFieldValue() {
    return this.#privateField;
  }

  set #privateFieldValue(newValue) {
    this.#privateField = newValue;
  }

  publicGetPrivateField() {
    return this.#privateFieldValue;
  }

  publicSetPrivateField(newValue) {
    this.#privateFieldValue = newValue;
  }

  testUpdates() {
    this.#privateFieldValue++;
    ++this.#privateFieldValue;
    --this.#privateFieldValue;
    this.#privateFieldValue--;
    this.#privateFieldValue = this.#privateFieldValue++;
    this.#privateFieldValue = ++this.#privateFieldValue;
    this.#privateFieldValue = this.#privateFieldValue += 1;
    this.#privateFieldValue = -(this.#privateFieldValue ** this.#privateFieldValue);
  }
}