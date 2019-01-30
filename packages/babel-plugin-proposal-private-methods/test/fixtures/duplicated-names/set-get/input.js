class Cl {
  #privateField = 0;
  
  set #getSet(newValue) {
    this.#privateField = newValue;
  }

  get #getSet() {
    return this.#privateField;
  }
}