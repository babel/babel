let setMetadata;
let metadataSymbol = Symbol();

function decMethod(_, context) {
  ({ setMetadata } = context);
  setMetadata(metadataSymbol, 'value');
}

try {
  class C {
    @decMethod
    m() {}
  }
} finally {}

expect(() => {
  setMetadata(metadataSymbol, 'value');
}).toThrow('attempted to call setMetadata after decoration was finished')
