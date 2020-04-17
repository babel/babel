tag`\unicode and \u{55}`;

tag`\01`;
tag`\xg${0}right`;
tag`left${0}\xg`;
tag`left${0}\xg${1}right`;
tag`left${0}\u000g${1}right`;
tag`left${0}\u{-0}${1}right`;

function a() {
  var undefined = 4;
  tag`\01`;
}
