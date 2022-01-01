function f(a = x?.y) {}

function g({ a, b = a?.c }) {}

function h(a, { b = a.b?.c?.d.e }) {}

function i(a, { b = (a.b?.c?.d).e }) {}

function j(a, { b = a?.b?.c().d.e }) {}
