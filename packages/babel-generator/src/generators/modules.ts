import type Printer from "../printer";
import {
  isClassDeclaration,
  isExportDefaultSpecifier,
  isExportNamespaceSpecifier,
  isImportDefaultSpecifier,
  isImportNamespaceSpecifier,
  isStatement,
} from "@babel/types";
import type * as t from "@babel/types";

export function ImportSpecifier(this: Printer, node: t.ImportSpecifier) {
  if (node.importKind === "type" || node.importKind === "typeof") {
    this.word(node.importKind);
    this.space();
  }

  this.print(node.imported, node);
  // @ts-expect-error todo(flow-ts) maybe check node type instead of relying on name to be undefined on t.StringLiteral
  if (node.local && node.local.name !== node.imported.name) {
    this.space();
    this.word("as");
    this.space();
    this.print(node.local, node);
  }
}

export function ImportDefaultSpecifier(
  this: Printer,
  node: t.ImportDefaultSpecifier,
) {
  this.print(node.local, node);
}

export function ExportDefaultSpecifier(
  this: Printer,
  node: t.ExportDefaultSpecifier,
) {
  this.print(node.exported, node);
}

export function ExportSpecifier(this: Printer, node: t.ExportSpecifier) {
  if (node.exportKind === "type") {
    this.word("type");
    this.space();
  }

  this.print(node.local, node);
  // @ts-expect-error todo(flow-ts) maybe check node type instead of relying on name to be undefined on t.StringLiteral
  if (node.exported && node.local.name !== node.exported.name) {
    this.space();
    this.word("as");
    this.space();
    this.print(node.exported, node);
  }
}

export function ExportNamespaceSpecifier(
  this: Printer,
  node: t.ExportNamespaceSpecifier,
) {
  this.token("*");
  this.space();
  this.word("as");
  this.space();
  this.print(node.exported, node);
}

let warningShown = false;

export function _printAttributes(
  this: Printer,
  node: Extract<t.Node, { attributes?: t.ImportAttribute[] }>,
) {
  const { importAttributesKeyword } = this.format;
  const { attributes, assertions } = node;

  if (
    attributes &&
    !importAttributesKeyword &&
    // In the production build only show the warning once.
    // We want to show it per-usage locally for tests.
    (!process.env.IS_PUBLISH || !warningShown)
  ) {
    warningShown = true;
    console.warn(`\
You are using import attributes, without specifying the desired output syntax.
Please specify the "importAttributesKeyword" generator option, whose value can be one of:
 - "with"        : \`import { a } from "b" with { type: "json" };\`
 - "assert"      : \`import { a } from "b" assert { type: "json" };\`
 - "with-legacy" : \`import { a } from "b" with type: "json";\`
`);
  }

  const useAssertKeyword =
    importAttributesKeyword === "assert" ||
    (!importAttributesKeyword && assertions);

  this.word(useAssertKeyword ? "assert" : "with");
  this.space();

  if (!useAssertKeyword && importAttributesKeyword !== "with") {
    // with-legacy
    this.printList(attributes || assertions, node);
    return;
  }

  this.token("{");
  this.space();
  this.printList(attributes || assertions, node);
  this.space();
  this.token("}");
}

export function ExportAllDeclaration(
  this: Printer,
  node: t.ExportAllDeclaration | t.DeclareExportAllDeclaration,
) {
  this.word("export");
  this.space();
  if (node.exportKind === "type") {
    this.word("type");
    this.space();
  }
  this.token("*");
  this.space();
  this.word("from");
  this.space();
  // @ts-expect-error Fixme: attributes is not defined in DeclareExportAllDeclaration
  if (node.attributes?.length || node.assertions?.length) {
    this.print(node.source, node, true);
    this.space();
    // @ts-expect-error Fixme: attributes is not defined in DeclareExportAllDeclaration
    this._printAttributes(node);
  } else {
    this.print(node.source, node);
  }

  this.semicolon();
}

function maybePrintDecoratorsBeforeExport(
  printer: Printer,
  node: t.ExportNamedDeclaration | t.ExportDefaultDeclaration,
) {
  if (
    isClassDeclaration(node.declaration) &&
    printer._shouldPrintDecoratorsBeforeExport(
      node as t.ExportNamedDeclaration & { declaration: t.ClassDeclaration },
    )
  ) {
    printer.printJoin(node.declaration.decorators, node);
  }
}

export function ExportNamedDeclaration(
  this: Printer,
  node: t.ExportNamedDeclaration,
) {
  maybePrintDecoratorsBeforeExport(this, node);

  this.word("export");
  this.space();
  if (node.declaration) {
    const declar = node.declaration;
    this.print(declar, node);
    if (!isStatement(declar)) this.semicolon();
  } else {
    if (node.exportKind === "type") {
      this.word("type");
      this.space();
    }

    const specifiers = node.specifiers.slice(0);

    // print "special" specifiers first
    let hasSpecial = false;
    for (;;) {
      const first = specifiers[0];
      if (
        isExportDefaultSpecifier(first) ||
        isExportNamespaceSpecifier(first)
      ) {
        hasSpecial = true;
        this.print(specifiers.shift(), node);
        if (specifiers.length) {
          this.token(",");
          this.space();
        }
      } else {
        break;
      }
    }

    if (specifiers.length || (!specifiers.length && !hasSpecial)) {
      this.token("{");
      if (specifiers.length) {
        this.space();
        this.printList(specifiers, node);
        this.space();
      }
      this.token("}");
    }

    if (node.source) {
      this.space();
      this.word("from");
      this.space();
      if (node.attributes?.length || node.assertions?.length) {
        this.print(node.source, node, true);
        this.space();
        this._printAttributes(node);
      } else {
        this.print(node.source, node);
      }
    }

    this.semicolon();
  }
}

export function ExportDefaultDeclaration(
  this: Printer,
  node: t.ExportDefaultDeclaration,
) {
  maybePrintDecoratorsBeforeExport(this, node);

  this.word("export");
  this.noIndentInnerCommentsHere();
  this.space();
  this.word("default");
  this.space();
  const declar = node.declaration;
  this.print(declar, node);
  if (!isStatement(declar)) this.semicolon();
}

export function ImportDeclaration(this: Printer, node: t.ImportDeclaration) {
  this.word("import");
  this.space();

  const isTypeKind = node.importKind === "type" || node.importKind === "typeof";
  if (isTypeKind) {
    this.noIndentInnerCommentsHere();
    this.word(node.importKind);
    this.space();
  } else if (node.module) {
    this.noIndentInnerCommentsHere();
    this.word("module");
    this.space();
  }

  const specifiers = node.specifiers.slice(0);
  const hasSpecifiers = !!specifiers.length;
  // print "special" specifiers first. The loop condition is constant,
  // but there is a "break" in the body.
  while (hasSpecifiers) {
    const first = specifiers[0];
    if (isImportDefaultSpecifier(first) || isImportNamespaceSpecifier(first)) {
      this.print(specifiers.shift(), node);
      if (specifiers.length) {
        this.token(",");
        this.space();
      }
    } else {
      break;
    }
  }

  if (specifiers.length) {
    this.token("{");
    this.space();
    this.printList(specifiers, node);
    this.space();
    this.token("}");
  } else if (isTypeKind && !hasSpecifiers) {
    this.token("{");
    this.token("}");
  }

  if (hasSpecifiers || isTypeKind) {
    this.space();
    this.word("from");
    this.space();
  }

  if (node.attributes?.length || node.assertions?.length) {
    this.print(node.source, node, true);
    this.space();
    this._printAttributes(node);
  } else {
    this.print(node.source, node);
  }

  this.semicolon();
}

export function ImportAttribute(this: Printer, node: t.ImportAttribute) {
  this.print(node.key);
  this.token(":");
  this.space();
  this.print(node.value);
}

export function ImportNamespaceSpecifier(
  this: Printer,
  node: t.ImportNamespaceSpecifier,
) {
  this.token("*");
  this.space();
  this.word("as");
  this.space();
  this.print(node.local, node);
}

export function ImportExpression(this: Printer, node: t.ImportExpression) {
  this.word("import");
  this.token("(");
  this.print(node.source, node);
  if (node.options != null) {
    this.token(",");
    this.space();
    this.print(node.options, node);
  }
  this.token(")");
}
