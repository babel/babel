let getMetadata;
let metadataSymbol = Symbol();

function callCapturedFunc() {
  getMetadata(metadataSymbol);
}

function decMethod(_, context) {
  ({ getMetadata } = context);
  getMetadata(metadataSymbol);
}

expect(() => {
  class C {
    @callCapturedFunc
    @decMethod
    m() {}
  }
}).toThrow('attempted to call getMetadata after decoration was finished')
