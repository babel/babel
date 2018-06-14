/** @jsxLit React.literal */

function f(str) {
  return [
      <a href="javascript:go()" valueless>Text</a>,
      // TODO: Should we handle these cases?  Is this an idiom for avoiding HTML decoding?
      <a href={"javascript:go() // in brackets"}>{"Text in brackets"}</a>,
      <a href={str} {...({ spreaded: "" })}>{str}</a>,
      <a href={`${str}`}>Back ticks with an interpolation</a>
  ];
}
