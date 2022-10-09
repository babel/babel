let Validation;
(function (_Validation) {
  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;
  class LettersOnlyValidator {
    constructor() {
      console.log("1");
    }
    isAcceptable(s) {
      return lettersRegexp.test(s);
    }
  }
  _Validation.LettersOnlyValidator = LettersOnlyValidator;
  class ZipCodeValidator {
    isAcceptable(s) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
  _Validation.ZipCodeValidator = ZipCodeValidator;
})(Validation || (Validation = {}));
let strings = ["Hello", "98052", "101"];
let validators = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
for (let s of strings) {
  for (let name in validators) {
    console.log(`"${s}" - ${validators[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);
  }
}
export {};
