exports.log = function (msg, ...args) {
  const time = new Date().toLocaleTimeString("en-US", { hour12: false });
  console.log(`[${time}] ${msg}`, ...args);
};
