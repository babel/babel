import "@babel/polyfill/lib/core-js/modules/es7.string.pad-end";
import "@babel/polyfill/lib/core-js/modules/es7.string.pad-start";

for (const {
  padStart
} of foo) {
  console.log('b'.padEnd(5));
}
