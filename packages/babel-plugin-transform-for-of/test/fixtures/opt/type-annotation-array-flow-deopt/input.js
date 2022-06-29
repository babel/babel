// This won't be optimize because when `for-of` is handled, the b's type annotation has been removed by the Flow plugin
function a(b: Array<any>) {
  for (const y of b) {}
}
