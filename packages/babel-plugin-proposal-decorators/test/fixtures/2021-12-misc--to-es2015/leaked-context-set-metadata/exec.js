let setMetadata;
let metadataSymbol = Symbol();

function callCapturedFunc() {
  setMetadata(metadataSymbol, 'value');
}

function decMethod(_, context) {
  ({ setMetadata } = context);
  setMetadata(metadataSymbol, 'value');
}

expect(() => {
  class C {
    @callCapturedFunc
    @decMethod
    m() {}
  }
}).toThrow('attempted to call setMetadata after decoration was finished')
