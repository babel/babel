// ts 5.0 feature

const BaseValue = 10;
const Prefix = "/data";
var Values; // 12
(function (Values) {
  Values[Values["First"] = 10] = "First";
  Values[Values["Second"] = 11] = "Second";
  Values[Values["Third"] = 12] = "Third";
})(Values || (Values = {}));
var Routes; // "/data/invoices"
(function (Routes) {
  Routes["Parts"] = "/data/parts";
  Routes["Invoices"] = "/data/invoices";
})(Routes || (Routes = {}));
