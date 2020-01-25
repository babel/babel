// We keep this in a seprate file so that in older node versions, where
// import() isn't supported, we can try/catch around the require() call
// when loading this file.

export default function import_(filepath: string) {
  return import(filepath);
}
