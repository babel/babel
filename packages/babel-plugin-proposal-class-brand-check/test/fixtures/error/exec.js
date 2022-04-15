// import parse from "@babel/parser";
// 优先解决 argument的问题
// expect(() => {
//     const source = `
//         class Foo {
//             equals(foo){
//                 class.h\x61sInstance(foo)
//             }
//         }
//     `
//     // parse.parse(source)
    
// })

// expect(() => {
//     class Foo {
//         equals(foo){
//             class.h\u61sInstance(foo)
//         }
//     }
// }).toThrow(/unexpect token/);
  
// describe('arguments', () => {
//     it('throws', () => {
//         const source = `
//             class Foo {
//                 equals(foo){
//                     class.hasInstance();
//                 }
//             }
//         `
//         const exec = () => {
//             parse.parse(source);
//         }
//         expect(exec).toThrow();
//     })
// })

expect(() => {
    class Foo {
        equals(){
            class.hasInstance();
        }
    }
}).toThrow();
// expect(() => {
//     class Foo {
//         equals(foo){
//             class.hasInstance(foo, bar);
//         }
//     }
// }).toThrow();

// expect(() => {
//     class Foo {
//         equals(foo){
//             class.hasInstance(...foo);
//         }
//     }
// }).toThrow(/unexpect token/);

// expect(() => {
//     class Foo {
//         equals(foo){
//             class.hasInstance(foo, ...bar);
//         }
//     }
// }).toThrow(/unexpect token/);