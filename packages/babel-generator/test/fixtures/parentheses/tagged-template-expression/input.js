(() => {})``;
(function(){}``);
(a ? b : c)``;

function* fn() {
  (yield)`foo`;
  (yield f)`foo`;
}

((false ? void 0 : String)?.raw)`f${ 1 }`;
(a?.b())`foo`;
