function outer(arg) {
  const valueB = null;
  const valueA = {};

  function inner() {
    console.log(
      <A keyA={valueA}>
        <B keyB={valueB}>
          <C keyC={arg} />
        </B>
      </A>
    );
  }

  inner();
}
