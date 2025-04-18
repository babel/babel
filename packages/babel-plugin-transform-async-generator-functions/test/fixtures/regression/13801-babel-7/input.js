async function main() {
  async () => {
    // IIFE: required for babel to crash
    for await (const string of async_iterable) {
      // for await: required for babel to crash
      console.log(string);
    }
  };

  const [one] = [1]; // array destructuring: required for babel to crash
}
