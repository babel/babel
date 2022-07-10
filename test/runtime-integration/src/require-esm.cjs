console.log("================= require - esm =====================");

try {
  const toPrimitive = require("@babel/runtime/helpers/esm/toPrimitive");

  console.log("typeof toPrimitive:", typeof toPrimitive);
  console.log("typeof toPrimitive.default:", typeof toPrimitive.default);

  const value = toPrimitive.default({ valueOf: () => 2 });
  console.log("Value:", value);
} catch (error) {
  console.log("Error:", error.message);
}
