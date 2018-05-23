/* global Babel */

const doStuff = () => {
  const name = "world";
  document.getElementById("output").innerHTML = `Hello ${name}`;
  document.getElementById("version").innerHTML = Babel.version;
};
doStuff();
