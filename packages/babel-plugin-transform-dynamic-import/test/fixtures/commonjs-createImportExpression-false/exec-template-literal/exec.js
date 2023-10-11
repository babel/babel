let x = 1;
return expect(import(`./${x}.js`))
  .resolves.toHaveProperty("default", 1);
