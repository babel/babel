if (a?.b?.c) {
  console.log(a?.b?.c);
} else if (a?.b.c?.d?.e.f) {
  console.log(a?.b.c?.d?.e.f);
}

if (a?.b?.c === 'foobar') {
}

if (a?.b()?.c) {
  
}

if (a?.b?.()?.c) {

}