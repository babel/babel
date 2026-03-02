// ts 5.0 feature

const BaseValue = 10;
const Prefix = "/data";
const enum Values {
  First = BaseValue, // 10
  Second, // 11
  Third, // 12
}

const xxx = 100 + Values.First;
const yyy = xxx;

const enum Routes {
  Parts = `${Prefix}/parts`, // "/data/parts"
  Invoices = `${Prefix}/invoices`, // "/data/invoices"
  x = `${Values.First}/x`,
  y = `${yyy}/y`,
}
