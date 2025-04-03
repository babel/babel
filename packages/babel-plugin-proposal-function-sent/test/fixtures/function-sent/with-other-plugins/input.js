let t;
const o = {
  *s(){
    t ||= 'value'; // former logical assignment - ✔ Transformed
    function.sent;
    t ||= 'value'; // latter logical assignment - ❌ Not transformed
  }
}
