class Cl {
  #privateField = 0;

  get #getSet() {
    return this.#privateField;
  }
  
  set #getSet(newValue) {
    this.#privateField = newValue;
  }
}