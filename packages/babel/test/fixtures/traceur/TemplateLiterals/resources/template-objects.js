export let cooked;
export let raw;

function setCooked(obj) {
  cooked = obj;
}

function setRaw(obj) {
  raw = obj;
}

setCooked `a${1}b`;
setRaw `c${3}d\n`;
