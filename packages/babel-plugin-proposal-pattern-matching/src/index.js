// import { declare } from "@babel/helper-plugin-utils";
// import syntaxPatternMatching from '@babel/plugin-syntax-pattern-matching';
// import { types as t, template } from "@babel/core";
// const caseStatement = template(`
// let RETURN_VALUE_NAME;
// let CONTROL_FLOW_NAME = 0;
// (function () {
//   BODY
// })();
// `);
// export default declare((api, options) => {
//   api.assertVersion(7);
//   function transformPatternMatching(path) {
//   }
//   return {
//     inherits: syntaxPatternMatching,
//     visitor: {
//       CaseStatement(path) {
//       },
//     },
//   };
// });
