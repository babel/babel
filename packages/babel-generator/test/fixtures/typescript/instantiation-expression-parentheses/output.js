(f || g)<string>;
(f && g)<string>;
(f ?? g)<string>;
(f + g)<string>;
(f ? g : h)<string>;
(f = g)<string>;
(() => f)<string>;
(!f)<string>;
(f, g)<string>;
(f || g)<string>('ok');
new (f || g)<string>();
f<string>;
f.g<string>;
(f<string>)<number>;
f!<string>;
async function a() {
  (await f)<string>;
}
function* b() {
  (yield f)<string>;
}
(f<string>)<number>('ok');
new (f<string>)<number>();
(f<string>)<number>`ok`;
g<U>(f<T>);
new g<U>(f<T>);