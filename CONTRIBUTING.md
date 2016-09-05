# Contributing

Contributions are always welcome, no matter how large or small. Before
contributing, please read the
[code of conduct](https://github.com/babel/babel/blob/master/CODE_OF_CONDUCT.md).

## Setup local env

To start developing on babylon you only need to install its dependencies:

```bash
npm install
```

After this step you can now start and run the tests:

```bash
npm test
```

## Cross repository changes

If you are making changes to babylon which make it necessary to also change things in babel you will want to link both repositories together. This can be done by doing the following (assuming you have both babel and babylon already checked out):

```bash
cd babylon/
npm link
npm run build
cd ../babel/
make bootstrap
npm link babylon
cd packages/babel-core/
npm link babylon
cd ../../packages/babel-template/
npm link babylon
cd ../../packages/babel-traverse/
npm link babylon
cd ../../packages/babel-generator/
npm link babylon
make build
make test
```

From now on babel will use your local checkout of babylon for its tests.
