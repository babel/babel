// ts 5.0 feature

const BaseValue = 10;
const Prefix = "/data";
const enum Values {
  First = BaseValue, // 10
  Second, // 11
  Third, // 12
}
const enum Routes {
  Parts = `${Prefix}/parts`, // "/data/parts"
  Invoices = `${Prefix}/invoices`, // "/data/invoices"
}
