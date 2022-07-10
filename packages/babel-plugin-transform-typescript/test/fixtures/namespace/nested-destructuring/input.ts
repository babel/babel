class C { }
namespace N {
  export const { a } = C;
  export const [ b ] = C;
  export const [ { a: [{ b: c }] }] = A, { a: { b: { d = 1 } } = {}, ...e } = C;
}
