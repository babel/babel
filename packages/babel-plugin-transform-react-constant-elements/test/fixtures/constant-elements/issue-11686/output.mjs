function outer(arg) {
  var _A;
  const valueB = null;
  const valueA = {};
  function inner() {
    console.log(_A || (_A = <A keyA={valueA}>
        <B keyB={valueB}>
          <C keyC={arg} />
        </B>
      </A>));
  }
  inner();
}
