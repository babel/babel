let getMetadata;
let metadataSymbol = Symbol();

function decMethod(_, context) {
  ({ getMetadata } = context);
  getMetadata(metadataSymbol);
}

try {
  class C {
    @decMethod
    m() {}
  }
} finally {}

expect(() => {
  getMetadata(metadataSymbol);
}).toThrow('attempted to call getMetadata after decoration was finished')
