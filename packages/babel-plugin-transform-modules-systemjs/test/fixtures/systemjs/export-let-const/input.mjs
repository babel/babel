let l_foo = 1;
const c_foo = 2;

{ let l_foo, l_bar; const c_foo = 3; const c_bar = 4; }

export { l_foo, c_foo };

export let l_bar = 4;
export const c_bar = 6;
