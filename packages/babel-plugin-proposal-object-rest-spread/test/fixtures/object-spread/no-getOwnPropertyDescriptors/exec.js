const oldGOPDs = Object.getOwnPropertyDescriptors;
Object.getOwnPropertyDescriptors = null;

({ ...{ a: 1 }, b: 1, ...{} });

Object.getOwnPropertyDescriptors = oldGOPDs;
