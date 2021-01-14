const oldGOPDs = Object.getOwnPropertyDescriptors;
Object.getOwnPropertyDescriptors = null;

try {
  ({ ...{ a: 1 }, b: 1, ...{} });
} finally {
  Object.getOwnPropertyDescriptors = oldGOPDs;
}

