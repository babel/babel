(() => {})``;
(function(){}``);
(a ? b : c)``;

function* fn() {
  (yield)`foo`;
  (yield f)`foo`;
}
