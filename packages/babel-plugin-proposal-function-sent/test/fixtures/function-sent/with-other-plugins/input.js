let t;
const o = {
  *s(){
    t ||= 'value'; // former logical assignment
    function.sent;
    t ||= 'value'; // latter logical assignment
  }
}
