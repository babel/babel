import { readFileSync, writeFileSync } from "node:fs";
// eslint-disable-next-line import/no-extraneous-dependencies
import ts from "typescript";

function extractErrorInfo(filename: string) {
  const program = ts.createProgram([filename], {});
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(filename)!;

  let info = "{";

  ts.forEachChild(sourceFile, node => {
    if (ts.isTypeAliasDeclaration(node) && node.name.text === "__ExtractMe") {
      const type = checker.getTypeAtLocation(node);
      const properties = type.getProperties();
      properties.forEach(prop => {
        const propType = checker.getTypeOfSymbolAtLocation(prop, node);

        if (propType.flags & ts.TypeFlags.String) {
          info += `${prop.name}:[],`;
        } else if (propType.flags & ts.TypeFlags.Object) {
          const code = propType.getProperty("code")!;
          if (code) {
            const codeType = checker.getTypeOfSymbolAtLocation(
              code,
              code.valueDeclaration!
            ) as ts.StringLiteralType;
            info += `${prop.name}:[object,${JSON.stringify(codeType.value)}],`;
          } else {
            const signatures = propType.getCallSignatures();
            const param = signatures[0].getParameters()[0];
            const paramType = checker.getTypeOfSymbolAtLocation(
              param,
              param.valueDeclaration!
            );
            info += `${prop.name}:[${checker.typeToString(paramType, undefined, ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.InTypeAlias)}],`;
          }
        }
      });
    }
  });
  info += "}";
  return info;
}

export function patchErrorInfo(filename: string) {
  const info = extractErrorInfo(filename);
  let file = readFileSync(filename, "utf8");
  file = file.replaceAll("__PatchMe = never &", `__PatchMe =`);
  file = file.replaceAll(
    "ErrorInfoCompressed = {}",
    `ErrorInfoCompressed = ${info}`
  );
  file = file.replace("ErrorsObjects[keyof ErrorsObjects]", "never");
  writeFileSync(filename, file);
}
