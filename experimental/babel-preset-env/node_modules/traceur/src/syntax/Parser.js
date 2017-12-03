// Copyright 2012 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {FindVisitor} from '../codegeneration/FindVisitor.js';
import {IdentifierToken} from './IdentifierToken.js';
import {
  ARRAY_LITERAL,
  BINDING_IDENTIFIER,
  CALL_EXPRESSION,
  COMPUTED_PROPERTY_NAME,
  COVER_FORMALS,
  FORMAL_PARAMETER_LIST,
  IDENTIFIER_EXPRESSION,
  LITERAL_PROPERTY_NAME,
  OBJECT_LITERAL,
  REST_PARAMETER,
  SYNTAX_ERROR_TREE
} from './trees/ParseTreeType.js';
import {Options} from '../Options.js';
import {
  AS,
  ASYNC,
  ASYNC_STAR,
  AWAIT,
  CONSTRUCTOR,
  FROM,
  GET,
  OF,
  ON,
  SET,
  TYPE,
} from './PredefinedName.js';
import {SyntaxErrorReporter} from '../util/SyntaxErrorReporter.js';
import {
  getLastToken,
  getPosition,
  init as initScanner,
  isAtEnd,
  nextCloseAngle,
  nextJsxTextToken,
  nextJsxToken,
  nextRegularExpressionLiteralToken,
  nextTemplateLiteralToken,
  nextToken,
  peek,
  peekJsxToken,
  peekLocation,
  peekLookahead,
  peekToken,
  peekTokenLookahead,
  peekTokenNoLineTerminator,
  peekType,
  setIndex as resetScanner,
} from './Scanner.js';
import {SourceRange} from '../util/SourceRange.js';
import {
  Token,
  isAssignmentOperator
} from './Token.js';
import {getKeywordType} from './Keywords.js';
import {validateConstructor} from '../semantics/ConstructorValidator.js';
import validateParameters from '../staticsemantics/validateParameters.js';
import isValidSimpleAssignmentTarget from '../staticsemantics/isValidSimpleAssignmentTarget.js';

import {
  AMPERSAND,
  AND,
  ARROW,
  AT,
  BANG,
  BAR,
  BREAK,
  CARET,
  CASE,
  CATCH,
  CLASS,
  CLOSE_ANGLE,
  CLOSE_CURLY,
  CLOSE_PAREN,
  CLOSE_SQUARE,
  COLON,
  COMMA,
  CONST,
  CONTINUE,
  DEBUGGER,
  DEFAULT,
  DELETE,
  DO,
  DOT_DOT_DOT,
  ELSE,
  END_OF_FILE,
  EQUAL,
  EQUAL_EQUAL,
  EQUAL_EQUAL_EQUAL,
  ERROR,
  EXPORT,
  EXTENDS,
  FALSE,
  FINALLY,
  FOR,
  FUNCTION,
  GREATER_EQUAL,
  IDENTIFIER,
  IF,
  IMPLEMENTS,
  IMPORT,
  IN,
  INSTANCEOF,
  INTERFACE,
  JSX_IDENTIFIER,
  LEFT_SHIFT,
  LESS_EQUAL,
  LET,
  MINUS,
  MINUS_MINUS,
  NEW,
  NO_SUBSTITUTION_TEMPLATE,
  NOT_EQUAL,
  NOT_EQUAL_EQUAL,
  NULL,
  NUMBER,
  OPEN_ANGLE,
  OPEN_CURLY,
  OPEN_PAREN,
  OPEN_SQUARE,
  OR,
  PACKAGE,
  PERCENT,
  PERIOD,
  PLUS,
  PLUS_PLUS,
  PRIVATE,
  PROTECTED,
  PUBLIC,
  QUESTION,
  RETURN,
  RIGHT_SHIFT,
  SEMI_COLON,
  SLASH,
  SLASH_EQUAL,
  STAR,
  STAR_STAR,
  STATIC,
  STRING,
  SUPER,
  SWITCH,
  TEMPLATE_HEAD,
  TEMPLATE_TAIL,
  THIS,
  THROW,
  TILDE,
  TRUE,
  TRY,
  TYPEOF,
  UNSIGNED_RIGHT_SHIFT,
  VAR,
  VOID,
  WHILE,
  WITH,
  YIELD
} from './TokenType.js';

import {
  ArgumentList,
  ArrayComprehension,
  ArrayLiteral,
  ArrayPattern,
  ArrayType,
  ArrowFunction,
  AssignmentElement,
  AwaitExpression,
  BinaryExpression,
  BindingElement,
  BindingIdentifier,
  Block,
  BreakStatement,
  CallExpression,
  CallSignature,
  CaseClause,
  Catch,
  ClassDeclaration,
  ClassExpression,
  CommaExpression,
  ComprehensionFor,
  ComprehensionIf,
  ComputedPropertyName,
  ConditionalExpression,
  ConstructSignature,
  ConstructorType,
  ContinueStatement,
  CoverFormals,
  CoverInitializedName,
  DebuggerStatement,
  Annotation,
  DefaultClause,
  DoWhileStatement,
  EmptyStatement,
  ExportDeclaration,
  ExportDefault,
  ExportSpecifier,
  ExportSpecifierSet,
  ExportStar,
  ExpressionStatement,
  Finally,
  ForInStatement,
  ForOfStatement,
  ForOnStatement,
  ForStatement,
  FormalParameter,
  FormalParameterList,
  ForwardDefaultExport,
  FunctionBody,
  FunctionDeclaration,
  FunctionExpression,
  FunctionType,
  GeneratorComprehension,
  GetAccessor,
  IdentifierExpression,
  IfStatement,
  ImportClausePair,
  ImportDeclaration,
  ImportSpecifier,
  ImportSpecifierSet,
  ImportedBinding,
  ImportTypeClause,
  IndexSignature,
  InterfaceDeclaration,
  JsxAttribute,
  JsxElement,
  JsxElementName,
  JsxPlaceholder,
  JsxSpreadAttribute,
  JsxText,
  LabelledStatement,
  LiteralExpression,
  LiteralPropertyName,
  MemberExpression,
  MemberLookupExpression,
  Method,
  MethodSignature,
  Module,
  ModuleSpecifier,
  NameSpaceExport,
  NameSpaceImport,
  NamedExport,
  NewExpression,
  ObjectLiteral,
  ObjectPattern,
  ObjectPatternField,
  ObjectType,
  ParenExpression,
  PostfixExpression,
  PredefinedType,
  PropertyNameAssignment,
  PropertyNameShorthand,
  PropertySignature,
  PropertyVariableDeclaration,
  RestParameter,
  ReturnStatement,
  Script,
  SetAccessor,
  SpreadExpression,
  SpreadPatternElement,
  SuperExpression,
  SwitchStatement,
  SyntaxErrorTree,
  TemplateLiteralExpression,
  TemplateLiteralPortion,
  TemplateSubstitution,
  ThisExpression,
  ThrowStatement,
  TryStatement,
  TypeAliasDeclaration,
  TypeArguments,
  TypeName,
  TypeParameter,
  TypeParameters,
  TypeReference,
  UnaryExpression,
  UnionType,
  VariableDeclaration,
  VariableDeclarationList,
  VariableStatement,
  WhileStatement,
  WithStatement,
  YieldExpression
}  from './trees/ParseTrees.js';

/**
 * Differentiates between parsing for 'In' vs. 'NoIn'
 * Variants of expression grammars.
 */
const ALLOW_IN = true;
const NO_IN = false;

/**
 * Enum for determining if the initializer is needed in a variable declaration
 * with a destructuring pattern.
 */
const INITIALIZER_REQUIRED = true;
const INITIALIZER_OPTIONAL = false;

/**
 * Used to find invalid CoverInitializedName trees. This is used when we know
 * the tree is not going to be used as a pattern.
 */
class ValidateObjectLiteral extends FindVisitor {
  constructor() {
    super();
    this.errorToken = null;
  }

  visitCoverInitializedName(tree) {
    this.errorToken = tree.equalToken;
    this.found = true;
  }
}

/**
 * @param {Array.<VariableDeclaration>} declarations
 * @return {boolean}
 */
function containsInitializer(declarations) {
  return declarations.some((v) => v.initializer);
}

const FUNCTION_STATE_SCRIPT = 1;
const FUNCTION_STATE_MODULE = 1 << 1;
const FUNCTION_STATE_FUNCTION = 1 << 2;
const FUNCTION_STATE_ARROW = 1 << 3;
const FUNCTION_STATE_METHOD = 1 << 4;
const FUNCTION_STATE_DERIVED_CONSTRUCTOR = 1 << 5;
const FUNCTION_STATE_GENERATOR = 1 << 6;
const FUNCTION_STATE_ASYNC = 1 << 7;

const FUNCTION_STATE_LENIENT =
    FUNCTION_STATE_METHOD | FUNCTION_STATE_GENERATOR |
    FUNCTION_STATE_ASYNC | FUNCTION_STATE_DERIVED_CONSTRUCTOR;

/**
 * This is used to track the functions as the parser descends. It allows
 * us to determine if we are in a function and what kind of function it is.
 * This is used to determine if `return` and `super` are allowed.
 */
class FunctionState {
  constructor(outer, kind) {
    this.outer = outer;
    this.kind = kind;
  }

  isTopMost() {
    return this.kind & (FUNCTION_STATE_SCRIPT | FUNCTION_STATE_MODULE);
  }

  isMethod() {
    return this.kind & FUNCTION_STATE_METHOD;
  }

  isDerivedConstructor() {
    return this.kind & FUNCTION_STATE_DERIVED_CONSTRUCTOR;
  }

  isArrowFunction() {
    return this.kind & FUNCTION_STATE_ARROW;
  }

  isGenerator() {
    return this.kind & FUNCTION_STATE_GENERATOR;
  }

  isAsyncFunction() {
    return this.kind & FUNCTION_STATE_ASYNC;
  }

  isAsyncGenerator() {
    return this.isGenerator() && this.isAsyncFunction();
  }
}

/**
 * Parses a javascript file.
 *
 * The various this.parseX_() methods never return null - even when parse errors
 * are encountered.Typically this.parseX_() will return a XTree ParseTree. Each
 * ParseTree that is created includes its source location. The typical pattern
 * for a this.parseX_() method is:
 *
 * XTree this.parseX_() {
 *   let start = this.getTreeStartLocation_();
 *   parse X grammar element and its children
 *   return new XTree(this.getTreeLocation_(start), children);
 * }
 *
 * this.parseX_() methods must consume at least 1 token - even in error cases.
 * This prevents infinite loops in the parser.
 *
 * Many this.parseX_() methods are matched by a 'boolean this.peekX_()' method
 * which will return true if the beginning of an X appears at the current
 * location. There are also peek() methods which examine the next token.
 * peek() methods must not consume any tokens.
 *
 * The this.eat_() method consumes a token and reports an error if the consumed
 * token is not of the expected type. The this.eatOpt_() methods consume the
 * next token iff the next token is of the expected type and return the consumed
 * token or null if no token was consumed.
 *
 * When parse errors are encountered, an error should be reported and the parse
 * should return a best guess at the current parse tree.
 *
 * When parsing lists, the preferred pattern is:
 *   this.eat_(LIST_START);
 *   let elements = [];
 *   while (this.peekListElement_()) {
 *     elements.push(this.parseListElement_());
 *   }
 *   this.eat_(LIST_END);
 */
export class Parser {
  /**
   * @param {SourceFile} file
   * @param {ErrorReporter} errorReporter
   * @param {Options} options
   */
  constructor(file, errorReporter = new SyntaxErrorReporter(),
      options = new Options()) {
    this.errorReporter_ = errorReporter;
    initScanner(errorReporter, file, this, options);
    this.options_ = options;

    // This is used in conjunction with ensureNoCoverInitializedNames_ to
    // determine  if there has been any added CoverInitializedName since last
    // time this was read.
    this.coverInitializedNameCount_ = 0;

    /**
     * Keeps track of whether we are currently in strict mode parsing or not.
     */
    this.strictMode_ = false;

    this.annotations_ = [];

    // TODO(arv): Use function state to track strict mode.
    this.functionState_ = null;
  }

  get allowYield_() {
    return this.functionState_.isGenerator();
  }

  get allowAwait_() {
    return this.functionState_.isAsyncFunction();
  }

  get allowForOn_() {
    return this.functionState_.isAsyncFunction();
  }

  // 14 Script
  /**
   * @return {Script}
   */
  parseScript() {
    this.strictMode_ = false;
    let start = this.getTreeStartLocation_();
    let fs = this.pushFunctionState_(FUNCTION_STATE_SCRIPT);
    let scriptItemList = this.parseStatementList_(true);
    this.eat_(END_OF_FILE);
    this.popFunctionState_(fs);
    return new Script(this.getTreeLocation_(start), scriptItemList, null);
  }

  pushFunctionState_(kind) {
    return this.functionState_ = new FunctionState(this.functionState_, kind);
  }

  popFunctionState_(fs) {
    if (fs != this.functionState_) {
      throw new Error('Internal error');
    }
    this.functionState_ = this.functionState_.outer;
  }

  // StatementList :
  //   StatementListItem
  //   StatementList StatementListItem

  /**
   * @return {Array.<ParseTree>}
   * @private
   */
  parseStatementList_(checkUseStrictDirective) {
    let result = [];
    let type;

    // We do a lot of type assignment in loops like these for performance
    // reasons.
    while ((type = peekType()) !== CLOSE_CURLY && type !== END_OF_FILE) {
      let statement = this.parseStatementListItem_(type);
      if (checkUseStrictDirective) {
        if (!statement.isDirectivePrologue()) {
          checkUseStrictDirective = false;
        } else if (statement.isUseStrictDirective()) {
          this.strictMode_ = true;
          checkUseStrictDirective = false;
        }
      }

      result.push(statement);
    }
    return result;
  }

  // ScriptItem :
  //   ImportDeclaration
  //   StatementListItem

  /**
   * @return {ParseTree}
   * @private
   */
  parseStatementListItem_(type) {
    // Declaration
    switch (type) {
      case LET:
      case CONST:
        if (this.options_.blockBinding) {
          return this.parseVariableStatement_();
        }
        break;

      case CLASS:
        if (this.options_.classes) {
          return this.parseClassDeclaration_();
        }
        break;

      case FUNCTION:
        return this.parseFunctionDeclaration_();

      case IDENTIFIER:
        if (this.options_.types && this.peekPredefinedString_(TYPE) &&
            peekLookahead(IDENTIFIER)) {
          return this.parseTypeAliasDeclaration_();
        }
        break;
    }

    // Statement
    return this.parseStatementWithType_(type);
  }

  parseModule() {
    let start = this.getTreeStartLocation_();
    let fs = this.pushFunctionState_(FUNCTION_STATE_MODULE);
    let scriptItemList = this.parseModuleItemList_();
    this.eat_(END_OF_FILE);
    this.popFunctionState_(fs);
    return new Module(this.getTreeLocation_(start), scriptItemList, null);
  }

  parseModuleItemList_() {
    this.strictMode_ = true;
    let result = [];
    let type;

    while ((type = peekType()) !== END_OF_FILE) {
      let statement = this.parseModuleItem_(type);
      result.push(statement);
    }
    return result;
  }

  parseModuleItem_(type) {
    switch (type) {
      case IMPORT:
        return this.parseImportDeclaration_();
      case EXPORT:
        return this.parseExportDeclaration_();
      case AT:
        if (this.options_.annotations)
          return this.parseAnnotatedDeclarations_(true);
        break;
    }
    return this.parseStatementListItem_(type);
  }

  parseModuleSpecifier_() {
    // ModuleSpecifier :
    //   StringLiteral
    let start = this.getTreeStartLocation_();
    let token = this.eat_(STRING);
    return new ModuleSpecifier(this.getTreeLocation_(start), token);
  }

  // ClassDeclaration
  // ImportDeclaration
  // ExportDeclaration
  // Statement (other than BlockStatement)
  // FunctionDeclaration

  // ImportDeclaration ::= "import" ImportDeclaration

  /**
   * @return {NameSpaceImport}
   */
  parseNameSpaceImport_() {
    let start = this.getTreeStartLocation_();
    this.eat_(STAR);
    this.eatId_(AS);
    let binding = this.parseImportedBinding_();
    return new NameSpaceImport(this.getTreeLocation_(start), binding);
  }

  /**
   * @return {ParseTree}
   * @private
   */
  parseImportDeclaration_() {
    let start = this.getTreeStartLocation_();
    this.eat_(IMPORT);

    let importClause = null;
    if (!peek(STRING)) {
      importClause = this.parseImportClause_(true, this.options_.types);
      this.eatId_(FROM);
    }

    let moduleSpecifier = this.parseModuleSpecifier_();
    this.eatPossibleImplicitSemiColon_();
    return new ImportDeclaration(this.getTreeLocation_(start),
                                 importClause, moduleSpecifier);
  }

  parseImportClause_(allowImportedDefaultBinding, allowType) {
    switch (peekType()) {
      case STAR:
        return this.parseNameSpaceImport_();
      case OPEN_CURLY:
        return this.parseImportSpecifierSet_();
      case IDENTIFIER:
        if (allowType &&  this.peekPredefinedString_(TYPE)) {
          let start = this.getTreeStartLocation_();
          let t = peekTokenLookahead();
          if (t.type === OPEN_CURLY ||
              t.type === IDENTIFIER && t.value !== FROM) {
            this.eatId_(TYPE);
            let clause =
                this.parseImportClause_(allowImportedDefaultBinding, false);
            return new ImportTypeClause(this.getTreeLocation_(start), clause);
          }
        }
        if (allowImportedDefaultBinding) {
          let start = this.getTreeStartLocation_();
          let importedBinding = this.parseImportedBinding_();
          if (this.eatIf_(COMMA)) {
            let second = this.parseImportClause_(false, false);
            return new ImportClausePair(this.getTreeLocation_(start),
                                        importedBinding, second);
          }
          return importedBinding;
        }
        break;
    }
    return this.parseUnexpectedToken_();
  }

  // https://bugs.ecmascript.org/show_bug.cgi?id=2287
  // ImportClause :
  //   ImportedBinding
  //   NamedImports

  parseImportSpecifierSet_() {
    let start = this.getTreeStartLocation_();
    let specifiers = [];
    this.eat_(OPEN_CURLY);
    while (!peek(CLOSE_CURLY) && !isAtEnd()) {
      specifiers.push(this.parseImportSpecifier_());
      if (!this.eatIf_(COMMA))
        break;
    }
    this.eat_(CLOSE_CURLY);

    return new ImportSpecifierSet(this.getTreeLocation_(start), specifiers);
  }

  parseImportedBinding_() {
    let start = this.getTreeStartLocation_();
    let binding = this.parseBindingIdentifier_();
    return new ImportedBinding(this.getTreeLocation_(start), binding);
  }

  // ImportSpecifier ::= IdentifierName ("as" Identifier)?
  //                     Identifier "as" Identifier
  /**
   * @return {ParseTree}
   * @private
   */
  parseImportSpecifier_() {
    let start = this.getTreeStartLocation_();
    let token = peekToken();
    let isKeyword = token.isKeyword();
    let binding;
    let name = this.eatIdName_();
    if (isKeyword || this.peekPredefinedString_(AS)) {
      this.eatId_(AS);
      binding = this.parseImportedBinding_();
    } else {
      binding = new ImportedBinding(name.location,
          new BindingIdentifier(name.location, name));
      name = null;
    }
    return new ImportSpecifier(this.getTreeLocation_(start), binding, name);
  }

  // export VariableStatement
  // export FunctionDeclaration
  // export ConstStatement
  // export ClassDeclaration

  /**
   * @return {ParseTree}
   * @private
   */
  parseExportDeclaration_() {
    let start = this.getTreeStartLocation_();
    this.eat_(EXPORT);
    let exportTree;
    let annotations = this.popAnnotations_();
    let type = peekType();
    switch (type) {
      case CONST:
      case LET:
        if (this.options_.blockBinding) {
          exportTree = this.parseVariableStatement_();
          break;
        }
        return this.parseUnexpectedToken_();
      case VAR:
        exportTree = this.parseVariableStatement_();
        break;
      case FUNCTION:
        exportTree = this.parseFunctionDeclaration_();
        break;
      case CLASS:
        exportTree = this.parseClassDeclaration_();
        break;
      case DEFAULT:
        exportTree = this.parseExportDefault_();
        break;
      case OPEN_CURLY:
      case STAR:
        exportTree = this.parseNamedExport_();
        break;
      case IDENTIFIER:
        if (this.options_.asyncFunctions && this.peekPredefinedString_(ASYNC)) {
          let asyncToken = this.eatId_();
          exportTree = this.parseAsyncFunctionDeclaration_(asyncToken);
        } else if (this.options_.types &&  this.peekPredefinedString_(TYPE) &&
            peekLookahead(IDENTIFIER)) {
          exportTree = this.parseTypeAliasDeclaration_();
        } else if (this.options_.exportFromExtended) {
          exportTree = this.parseNamedExport_();
        } else {
          return this.parseUnexpectedToken_();
        }
        break;
      default: {
        let token = peekToken();
        if (!token.isKeyword()) {
          return this.parseUnexpectedToken_();
        }
        exportTree = this.parseNamedExport_();
      }
    }
    return new ExportDeclaration(this.getTreeLocation_(start), exportTree,
                                 annotations);
  }

  parseExportDefault_() {
    // export default [lookahead ∉ {function, class, from}] AssignmentExpression[In] ;
    // export default AssignmentExpression ;
    let start = this.getTreeStartLocation_();
    let defaultToken = this.eat_(DEFAULT);
    if (this.options_.exportFromExtended && this.peekPredefinedString_(FROM)) {
      let idName = new IdentifierToken(defaultToken.location, DEFAULT);
      let namedExport = new ForwardDefaultExport(this.getTreeLocation_(start), idName);
      this.eatId_(FROM);
      let moduleSpecifier = this.parseModuleSpecifier_();

      return new NamedExport(this.getTreeLocation_(start), namedExport, moduleSpecifier);
    }

    let exportValue;
    switch (peekType()) {
      case FUNCTION: {
        // Use FunctionExpression as a cover grammar. If it has a name it is
        // treated as a declaration.
        let tree = this.parseFunctionExpression_();
        if (tree.name) {
          tree = new FunctionDeclaration(tree.location, tree.name,
                                         tree.functionKind, tree.parameterList,
                                         tree.typeAnnotation, tree.annotations,
                                         tree.body);
        }
        exportValue = tree;
        break;
      }
      case CLASS: {
        if (!this.options_.classes) {
          return this.parseSyntaxError_('Unexpected reserved word');
        }

        // Use ClassExpression as a cover grammar. If it has a name it is
        // treated as a declaration.
        let tree = this.parseClassExpression_();
        if (tree.name) {
          tree = new ClassDeclaration(tree.location, tree.name,
                                      tree.superClass, tree.elements,
                                      tree.annotations, tree.typeParameters);
        }
        exportValue = tree;
        break;
      }
      default:
        exportValue = this.parseAssignmentExpression_(ALLOW_IN);
        this.eatPossibleImplicitSemiColon_();
    }

    return new ExportDefault(this.getTreeLocation_(start), exportValue);
  }

  parseNamedExport_() {
    // NamedExport ::=
    //   "*" "from" ModuleSpecifier
    //   ExportSpecifierSet
    //   "*" "from" ModuleSpecifier
    //   "*" "as" Identifier "from" ModuleSpecifier
    //   Identifier "from" ModuleSpecifier
    let start = this.getTreeStartLocation_();
    let exportClause, moduleSpecifier = null;

    switch (peekType()) {
      case OPEN_CURLY:
        exportClause = this.parseExportSpecifierSet_();
        if (this.peekPredefinedString_(FROM)) {
          this.eatId_(FROM);
          moduleSpecifier = this.parseModuleSpecifier_();
        } else {
          // When there is no `from` the left hand side may not be a keyword
          // since it references a local binding.
          //
          //   export {notAKeyword as keywordOK};
          //
          this.validateExportSpecifierSet_(exportClause);
        }
        break;

      case STAR:
        exportClause = this.parseExportStar_();
        this.eatId_(FROM);
        moduleSpecifier = this.parseModuleSpecifier_();
        break;

      default:  // IDENTIFIER or isKeyword
        exportClause = this.parseForwardDefaultExport_();
        this.eatId_(FROM);
        moduleSpecifier = this.parseModuleSpecifier_();
        break;
    }

    this.eatPossibleImplicitSemiColon_();

    return new NamedExport(this.getTreeLocation_(start), exportClause,
                           moduleSpecifier);
  }

  parseExportStar_() {
    // *
    // * as IdentiferName
    let start = this.getTreeStartLocation_();
    this.eat_(STAR);
    if (this.peekPredefinedString_(AS)) {
      this.eatId_(AS);
      let name = this.eatIdName_();
      return new NameSpaceExport(this.getTreeLocation_(start), name);
    }
    return new ExportStar(this.getTreeLocation_(start));
  }

  parseExportSpecifierSet_() {
    // ExportSpecifierSet ::=
    //     "{" ExportSpecifier ("," ExportSpecifier)* ","? "}"

    let start = this.getTreeStartLocation_();
    this.eat_(OPEN_CURLY);
    let specifiers = [this.parseExportSpecifier_()];
    while (this.eatIf_(COMMA)) {
      if (peek(CLOSE_CURLY))
        break;
      specifiers.push(this.parseExportSpecifier_());
    }
    this.eat_(CLOSE_CURLY);

    return new ExportSpecifierSet(this.getTreeLocation_(start), specifiers);
  }

  // ExportSpecifier :
  //   Identifier
  //   Identifier "as" IdentifierName
  parseExportSpecifier_() {
    // ExportSpecifier ::= IdentifierName
    //     | IdentifierName "as" IdentifierName

    let start = this.getTreeStartLocation_();
    let lhs = this.eatIdName_();
    let rhs = null;
    if (this.peekPredefinedString_(AS)) {
      this.eatId_();
      rhs = this.eatIdName_();
    }
    return new ExportSpecifier(this.getTreeLocation_(start), lhs, rhs);
  }

  parseForwardDefaultExport_() {
    // export IdentifierName from 'module'
    let start = this.getTreeStartLocation_();
    let idName = this.eatIdName_();
    return new ForwardDefaultExport(this.getTreeLocation_(start), idName);
  }

  validateExportSpecifierSet_(tree) {
    for (let i = 0; i < tree.specifiers.length; i++) {
      let specifier = tree.specifiers[i];
      // These are represented as IdentifierTokens because we used eatIdName.
      if (getKeywordType(specifier.lhs.value)) {
        this.reportError_(specifier.lhs.location,
            `Unexpected token ${specifier.lhs.value}`);
      }
    }
  }

  peekId_(type) {
    if (type === IDENTIFIER)
      return true;
    if (this.strictMode_)
      return false;
    return peekToken().isStrictKeyword();
  }

  peekIdName_(token) {
    return token.type === IDENTIFIER || token.isKeyword();
  }

  parseClassShared_(constr) {
    let start = this.getTreeStartLocation_();
    let strictMode = this.strictMode_;
    this.strictMode_ = true;
    this.eat_(CLASS);
    let name = null;
    let typeParameters = null;
    let annotations = [];
    // Name is optional for ClassExpression
    if (constr === ClassDeclaration ||
        !peek(EXTENDS) && !peek(OPEN_CURLY)) {
      name = this.parseBindingIdentifier_();
      if (this.options_.types) {
        typeParameters = this.parseTypeParametersOpt_();
      }
      annotations = this.popAnnotations_();
    }
    let superClass = null;
    if (this.eatIf_(EXTENDS)) {
      superClass = this.parseLeftHandSideExpression_();
      superClass = this.coverFormalsToParenExpression_(superClass);
    }
    this.eat_(OPEN_CURLY);
    let elements = this.parseClassElements_(superClass);
    this.eat_(CLOSE_CURLY);
    this.strictMode_ = strictMode;
    return new constr(this.getTreeLocation_(start), name, superClass,
                      elements, annotations, typeParameters);
  }

  /**
   * @return {ParseTree}
   * @private
   */
  parseClassDeclaration_() {
    return this.parseClassShared_(ClassDeclaration);
  }

  /**
   * @return {ParseTree}
   * @private
   */
  parseClassExpression_() {
    return this.parseClassShared_(ClassExpression);
  }

  /**
   * @return {Array.<ParseTree>}
   * @private
   */
  parseClassElements_(derivedClass) {
    let result = [];

    while (true) {
      let type = peekType();
      if (type === SEMI_COLON) {
        nextToken();
      } else if (this.peekClassElement_(peekType())) {
        result.push(this.parseClassElement_(derivedClass));
      } else {
        break;
      }
    }

    return result;
  }

  peekClassElement_(type) {
    // PropertyName covers get, set and static too.
    return this.peekPropertyName_(type) ||
        type === STAR && this.options_.generators ||
        type === AT && this.options_.annotations;
  }

  // PropertyName :
  //   LiteralPropertyName
  //   ComputedPropertyName
  parsePropertyName_() {
    if (peek(OPEN_SQUARE))
      return this.parseComputedPropertyName_()
    return this.parseLiteralPropertyName_();
  }

  parseLiteralPropertyName_() {
    let start = this.getTreeStartLocation_();
    let token = nextToken();
    return new LiteralPropertyName(this.getTreeLocation_(start), token);
  }

  // ComputedPropertyName :
  //   [ AssignmentExpression ]
  parseComputedPropertyName_() {
    let start = this.getTreeStartLocation_();
    this.eat_(OPEN_SQUARE);
    let expression = this.parseAssignmentExpression_(ALLOW_IN);
    this.eat_(CLOSE_SQUARE);

    return new ComputedPropertyName(this.getTreeLocation_(start), expression);
  }

  /**
   * Parses a single statement. This statement might be a top level statement
   * in a Script or a Module as well as any other statement allowed in a
   * FunctionBody.
   * @return {ParseTree}
   */
  parseStatement() {
    // Allow return, yield and await.
    let fs = this.pushFunctionState_(FUNCTION_STATE_LENIENT);
    let result = this.parseModuleItem_(peekType());
    this.popFunctionState_(fs);
    return result;
  }

  /**
   * Parses one or more statements. These might be top level statements in a
   * Script or a Module as well as any other statement allowed in a
   * FunctionBody.
   * @return {Array.<ParseTree>}
   */
  parseStatements() {
    // Allow return, yield and await.
    let fs = this.pushFunctionState_(FUNCTION_STATE_LENIENT);
    let result = this.parseModuleItemList_();
    this.popFunctionState_(fs);
    return result;
  }

  parseStatement_() {
    return this.parseStatementWithType_(peekType());
  }

  /**
   * @return {ParseTree}
   * @private
   */
  parseStatementWithType_(type) {
    switch (type) {
      // Most common first (based on building Traceur).
      case RETURN:
        return this.parseReturnStatement_();
      case VAR:
        return this.parseVariableStatement_();
      case IF:
        return this.parseIfStatement_();
      case FOR:
        return this.parseForStatement_();
      case BREAK:
        return this.parseBreakStatement_();
      case SWITCH:
        return this.parseSwitchStatement_();
      case THROW:
        return this.parseThrowStatement_();
      case WHILE:
        return this.parseWhileStatement_();

      // Rest are just alphabetical order.
      case AT:
        if (this.options_.annotations)
          return this.parseAnnotatedDeclarations_(false);
        break;
      case CONTINUE:
        return this.parseContinueStatement_();
      case DEBUGGER:
        return this.parseDebuggerStatement_();
      case DO:
        return this.parseDoWhileStatement_();
      case OPEN_CURLY:
        return this.parseBlock_();
      case SEMI_COLON:
        return this.parseEmptyStatement_();
      case TRY:
        return this.parseTryStatement_();
      case WITH:
        return this.parseWithStatement_();
      case INTERFACE:
        // TODO(arv): This should only be allowed at the top level.
        if (this.options_.types) {
          return this.parseInterfaceDeclaration_();
        }
    }
    return this.parseFallThroughStatement_();
  }

  // 13 Function Definition
  /**
   * @return {ParseTree}
   * @private
   */
  parseFunctionDeclaration_() {
    return this.parseFunction_(FunctionDeclaration);
  }

  /**
   * @return {ParseTree}
   * @private
   */
  parseFunctionExpression_() {
    return this.parseFunction_(FunctionExpression);
  }

  parseAsyncFunctionDeclaration_(asyncToken) {
    return this.parseAsyncFunction_(asyncToken, FunctionDeclaration);
  }

  parseAsyncFunctionExpression_(asyncToken) {
    return this.parseAsyncFunction_(asyncToken, FunctionExpression);
  }

  /**
   * @return {boolean}
   * @private
   */
  peekAsyncStar_() {
    return this.options_.asyncGenerators && peek(STAR);
  }

  parseAsyncFunction_(asyncToken, ctor) {
    let start = asyncToken.location.start;
    this.eat_(FUNCTION);
    let kind = FUNCTION_STATE_FUNCTION | FUNCTION_STATE_ASYNC;
    if (this.peekAsyncStar_()) {
      kind |= FUNCTION_STATE_GENERATOR;
      this.eat_(STAR);
      asyncToken = new IdentifierToken(asyncToken.location, ASYNC_STAR);
    }
    let fs = this.pushFunctionState_(kind);
    let f = this.parseFunction2_(start, asyncToken, ctor);
    this.popFunctionState_(fs);
    return f;
  }

  parseFunction_(ctor) {
    let start = this.getTreeStartLocation_();
    this.eat_(FUNCTION);
    let functionKind = null;
    let kind = FUNCTION_STATE_FUNCTION;
    if (this.options_.generators && peek(STAR)) {
      functionKind = this.eat_(STAR);
      kind |= FUNCTION_STATE_GENERATOR;
    }
    let fs = this.pushFunctionState_(kind);
    let f = this.parseFunction2_(start, functionKind, ctor);
    this.popFunctionState_(fs);
    return f;
  }

  parseFunction2_(start, functionKind, ctor) {
    let name = null;
    let annotations = [];
    if (ctor === FunctionDeclaration ||
        this.peekBindingIdentifier_(peekType())) {
      name = this.parseBindingIdentifier_();
      annotations = this.popAnnotations_();
    }

    this.eat_(OPEN_PAREN);
    let parameters = this.parseFormalParameters_();
    this.eat_(CLOSE_PAREN);

    let typeAnnotation = this.parseTypeAnnotationOpt_();
    let body = this.parseFunctionBody_(parameters);
    return new ctor(this.getTreeLocation_(start), name, functionKind,
                    parameters, typeAnnotation, annotations, body);
  }

  peekRest_(type) {
    return type === DOT_DOT_DOT && this.options_.restParameters;
  }

  /**
   * @return {FormalParameterList}
   * @private
   */
  parseFormalParameters_() {
    // FormalParameterList :
    //   [empty]
    //   FunctionRestParameter
    //   FormalsList
    //   FormalsList , FunctionRestParameter
    //
    // FunctionRestParameter :
    //   ... BindingIdentifier
    //
    // FormalsList :
    //   FormalParameter
    //   FormalsList , FormalParameter
    //
    // FormalParameter :
    //   BindingElement
    //
    // BindingElement :
    //   SingleNameBinding
    //   BindingPattern Initializeropt
    let start = this.getTreeStartLocation_();
    let formals = [];
    this.pushAnnotations_();
    let type = peekType();
    if (this.peekRest_(type)) {
      formals.push(this.parseFormalRestParameter_());
    } else {
      if (this.peekFormalParameter_(peekType()))
        formals.push(this.parseFormalParameter_(INITIALIZER_OPTIONAL));

      while (this.eatIf_(COMMA)) {
        this.pushAnnotations_();
        if (this.peekRest_(peekType())) {
          formals.push(this.parseFormalRestParameter_());
          break;
        }
        formals.push(this.parseFormalParameter_(INITIALIZER_OPTIONAL));
      }
    }

    return new FormalParameterList(this.getTreeLocation_(start), formals);
  }

  peekFormalParameter_(type) {
    return this.peekBindingElement_(type);
  }

  parseFormalParameter_(initializerAllowed) {
    let start = this.getTreeStartLocation_();
    let binding = this.parseBindingElementBinding_();
    let typeAnnotation = this.parseTypeAnnotationOpt_();
    let initializer = this.parseBindingElementInitializer_(initializerAllowed);

    return new FormalParameter(this.getTreeLocation_(start),
        new BindingElement(this.getTreeLocation_(start), binding, initializer),
        typeAnnotation, this.popAnnotations_());
  }

  parseFormalRestParameter_() {
    let start = this.getTreeStartLocation_();
    let restParameter = this.parseRestParameter_();
    let typeAnnotation = this.parseTypeAnnotationOpt_();
    return new FormalParameter(this.getTreeLocation_(start), restParameter,
        typeAnnotation, this.popAnnotations_());
  }

  parseRestParameter_() {
    let start = this.getTreeStartLocation_();
    this.eat_(DOT_DOT_DOT);
    let id = this.parseBindingIdentifier_();
    let typeAnnotation = this.parseTypeAnnotationOpt_();
    return new RestParameter(this.getTreeLocation_(start), id, typeAnnotation);
  }

  /**
   * @return {Block}
   * @private
   */
  parseFunctionBody_(params) {
    let start = this.getTreeStartLocation_();
    this.eat_(OPEN_CURLY);

    let strictMode = this.strictMode_;
    let result = this.parseStatementList_(!strictMode);
    validateParameters(params, this.strictMode_, this.errorReporter_);
    this.strictMode_ = strictMode;

    this.eat_(CLOSE_CURLY);
    return new FunctionBody(this.getTreeLocation_(start), result);
  }

  /**
   * @return {SpreadExpression}
   * @private
   */
  parseSpreadExpression_() {
    let start = this.getTreeStartLocation_();
    this.eat_(DOT_DOT_DOT);
    let operand = this.parseAssignmentExpression_(ALLOW_IN);
    return new SpreadExpression(this.getTreeLocation_(start), operand);
  }

  // 12.1 Block
  /**
   * @return {Block}
   * @private
   */
  parseBlock_() {
    let start = this.getTreeStartLocation_();
    this.eat_(OPEN_CURLY);
    let result = this.parseStatementList_(false);
    this.eat_(CLOSE_CURLY);
    return new Block(this.getTreeLocation_(start), result);
  }

  // 12.2 Variable Statement
  /**
   * @return {VariableStatement}
   * @private
   */
  parseVariableStatement_() {
    let start = this.getTreeStartLocation_();
    let declarations =
        this.parseVariableDeclarationList_(ALLOW_IN, INITIALIZER_REQUIRED);
    this.checkInitializers_(declarations);
    this.eatPossibleImplicitSemiColon_();
    return new VariableStatement(this.getTreeLocation_(start), declarations);
  }

  /**
   * @param {boolean} allowIn
   * @param {boolean} initializerRequired Whether destructuring requires an
   *     initializer
   * @return {VariableDeclarationList}
   * @private
   */
  parseVariableDeclarationList_(allowIn, initializerRequired) {
    let type = peekType();

    switch (type) {
      case CONST:
      case LET:
      case VAR:
        nextToken();
        break;
      default:
        throw Error('unreachable');
    }

    let start = this.getTreeStartLocation_();
    let declarations = [];

    declarations.push(this.parseVariableDeclaration_(type, allowIn,
                                                     initializerRequired));
    while (this.eatIf_(COMMA)) {
      declarations.push(this.parseVariableDeclaration_(type, allowIn,
                                                       initializerRequired));
    }
    return new VariableDeclarationList(
        this.getTreeLocation_(start), type, declarations);
  }

  /**
   * VariableDeclaration :
   *   BindingIdentifier Initializeropt
   *   BindingPattern Initializer
   *
   * VariableDeclarationNoIn :
   *   BindingIdentifier InitializerNoInopt
   *   BindingPattern InitializerNoIn
   *
   * @param {TokenType} binding
   * @param {boolean} noIn
   * @param {boolean} initializerRequired
   * @return {VariableDeclaration}
   * @private
   */
  parseVariableDeclaration_(binding, noIn, initializerRequired) {
    let initRequired = initializerRequired !== INITIALIZER_OPTIONAL;
    let start = this.getTreeStartLocation_();

    let lvalue;
    let typeAnnotation;
    if (this.peekPattern_(peekType())) {
      lvalue = this.parseBindingPattern_();
      typeAnnotation = null;
    } else {
      lvalue = this.parseBindingIdentifier_();
      typeAnnotation = this.parseTypeAnnotationOpt_();
    }

    let init = null;
    if (peek(EQUAL)) {
      init = this.parseInitializer_(noIn);
    } else if (lvalue.isPattern() && initRequired) {
      this.reportError_(lvalue.location,
                        'destructuring must have an initializer');
    }

    return new VariableDeclaration(this.getTreeLocation_(start), lvalue,
        typeAnnotation, init);
  }

  /**
   * @param {boolean} allowIn
   * @return {ParseTree}
   * @private
   */
  parseInitializer_(allowIn) {
    this.eat_(EQUAL);
    return this.parseAssignmentExpression_(allowIn);
  }

  parseInitializerOpt_(allowIn) {
    if (this.eatIf_(EQUAL))
      return this.parseAssignmentExpression_(allowIn);
    return null;
  }

  // 12.3 Empty Statement
  /**
   * @return {EmptyStatement}
   * @private
   */
  parseEmptyStatement_() {
    let start = this.getTreeStartLocation_();
    this.eat_(SEMI_COLON);
    return new EmptyStatement(this.getTreeLocation_(start));
  }

  /**
   * @return {ExpressionStatement|LabelledStatement}
   * @private
   */
  parseFallThroughStatement_() {
    // ExpressionStatement :
    //   [lookahead ∉ {{, function, class, let [}] Expression ;

    let start = this.getTreeStartLocation_();
    let expression;

    switch (peekType()) {
      case OPEN_CURLY:
        return this.parseUnexpectedToken_();
      case FUNCTION:
      case CLASS:
        return this.parseUnexpectedReservedWord_(peekToken());
      case LET: {
        let token = peekLookahead(OPEN_SQUARE);
        if (token) {
          return this.parseSyntaxError_(
              `A statement cannot start with 'let ['`);
        }
      }
    }

    // async [no line terminator] function ...
    if (this.options_.asyncFunctions && this.peekPredefinedString_(ASYNC) &&
        peekLookahead(FUNCTION)) {
      // TODO(arv): This look ahead should not be needed.
      let asyncToken = this.eatId_();
      let functionToken = peekTokenNoLineTerminator();
      if (functionToken !== null)
        return this.parseAsyncFunctionDeclaration_(asyncToken);

      expression = new IdentifierExpression(this.getTreeLocation_(start),
                                            asyncToken);
    } else {
      expression = this.parseExpression_(ALLOW_IN);
    }

    if (expression.type === IDENTIFIER_EXPRESSION) {
      // 12.12 Labelled Statement
      if (this.eatIf_(COLON)) {
        let nameToken = expression.identifierToken;
        let statement = this.parseStatement_();
        return new LabelledStatement(this.getTreeLocation_(start), nameToken,
                                     statement);
      }
    }

    this.eatPossibleImplicitSemiColon_();
    return new ExpressionStatement(this.getTreeLocation_(start), expression);
  }

  // 12.5 If Statement
  /**
   * @return {IfStatement}
   * @private
   */
  parseIfStatement_() {
    let start = this.getTreeStartLocation_();
    this.eat_(IF);
    this.eat_(OPEN_PAREN);
    let condition = this.parseExpression_(ALLOW_IN);
    this.eat_(CLOSE_PAREN);
    let ifClause = this.parseStatement_();
    let elseClause = null;
    if (this.eatIf_(ELSE)) {
      elseClause = this.parseStatement_();
    }
    return new IfStatement(this.getTreeLocation_(start), condition, ifClause, elseClause);
  }

  // 12.6 Iteration Statements

  // 12.6.1 The do-while Statement
  /**
   * @return {ParseTree}
   * @private
   */
  parseDoWhileStatement_() {
    let start = this.getTreeStartLocation_();
    this.eat_(DO);
    let body = this.parseStatement_();
    this.eat_(WHILE);
    this.eat_(OPEN_PAREN);
    let condition = this.parseExpression_(ALLOW_IN);
    this.eat_(CLOSE_PAREN);
    this.eatPossibleImplicitSemiColon_();
    return new DoWhileStatement(this.getTreeLocation_(start), body, condition);
  }

  // 12.6.2 The while Statement
  /**
   * @return {ParseTree}
   * @private
   */
  parseWhileStatement_() {
    let start = this.getTreeStartLocation_();
    this.eat_(WHILE);
    this.eat_(OPEN_PAREN);
    let condition = this.parseExpression_(ALLOW_IN);
    this.eat_(CLOSE_PAREN);
    let body = this.parseStatement_();
    return new WhileStatement(this.getTreeLocation_(start), condition, body);
  }

  // 12.6.3 The for Statement
  // 12.6.4 The for-in Statement
  // https://github.com/jhusain/asyncgenerator
  /**
   * @return {ParseTree}
   * @private
   */
  parseForStatement_() {
    let start = this.getTreeStartLocation_();
    this.eat_(FOR);
    this.eat_(OPEN_PAREN);

    let type = peekType();
    if (this.peekVariableDeclarationList_(type)) {
      let variables = this.parseVariableDeclarationList_(NO_IN,
                                                         INITIALIZER_OPTIONAL);

      let declarations = variables.declarations;
      if (declarations.length > 1 || containsInitializer(declarations)) {
        return this.parseForStatement2_(start, variables);
      }

      type = peekType();
      if (type === IN) {
        return this.parseForInStatement_(start, variables);
      } else if (this.peekOf_()) {
        return this.parseForOfStatement_(start, variables);
      } else if (this.allowForOn_ && this.peekOn_()) {
        return this.parseForOnStatement_(start, variables);
      } else {
        // for statement: const must have initializers
        this.checkInitializers_(variables);
        return this.parseForStatement2_(start, variables);
      }
    }

    if (type === SEMI_COLON) {
      return this.parseForStatement2_(start, null);
    }

    let coverInitializedNameCount = this.coverInitializedNameCount_;
    let initializer = this.parseExpressionAllowPattern_(NO_IN);
    type = peekType();
    if ((type === IN || this.peekOf_() ||
         this.allowForOn_ && this.peekOn_())) {
      initializer = this.transformLeftHandSideExpression_(initializer);
      this.validateAssignmentTarget_(initializer, 'assignment');
      if (this.peekOf_()) {
        return this.parseForOfStatement_(start, initializer);
      } else if (this.allowForOn_ && this.peekOn_()) {
        return this.parseForOnStatement_(start, initializer);
      }
      return this.parseForInStatement_(start, initializer);
    }

    this.ensureNoCoverInitializedNames_(initializer, coverInitializedNameCount);

    return this.parseForStatement2_(start, initializer);
  }

  peekOf_() {
    return this.options_.forOf && this.peekPredefinedString_(OF);
  }

  peekOn_() {
    return this.options_.forOn && this.peekPredefinedString_(ON);
  }

  // The for-each Statement
  // for  (  { let | let | const }  identifier  of  expression  )  statement
  /**
   * @param {SourcePosition} start
   * @param {ParseTree} initializer
   * @return {ParseTree}
   * @private
   */
  parseForOfStatement_(start, initializer) {
    this.eatId_(); // of
    let collection = this.parseExpression_(ALLOW_IN);
    this.eat_(CLOSE_PAREN);
    let body = this.parseStatement_();
    return new ForOfStatement(this.getTreeLocation_(start), initializer,
                              collection, body);
  }

  // The for-on Statement
  // for  (  { let | let | const }  identifier  on  expression  )  statement
  /**
   * @param {SourcePosition} start
   * @param {ParseTree} initializer
   * @return {ParseTree}
   * @private
   */
  parseForOnStatement_(start, initializer) {
    this.eatId_(); // on
    let observable = this.parseExpression_(ALLOW_IN);
    this.eat_(CLOSE_PAREN);
    let body = this.parseStatement_();
    return new ForOnStatement(this.getTreeLocation_(start), initializer,
                              observable, body);
  }

  /**
   * Checks variable declaration in variable and for statements.
   *
   * @param {VariableDeclarationList} variables
   * @return {void}
   * @private
   */
  checkInitializers_(variables) {
    if (this.options_.blockBinding &&
        variables.declarationType === CONST) {
      let type = variables.declarationType;
      for (let i = 0; i < variables.declarations.length; i++) {
        if (!this.checkInitializer_(type, variables.declarations[i])) {
          break;
        }
      }
    }
  }

  /**
   * Checks variable declaration
   *
   * @param {TokenType} type
   * @param {VariableDeclaration} declaration
   * @return {boolan} Whether the initializer is correct.
   * @private
   */
  checkInitializer_(type, declaration) {
    if (this.options_.blockBinding && type === CONST &&
        declaration.initializer === null) {
      this.reportError_(declaration.location,
                        'const variables must have an initializer');
      return false;
    }
    return true;
  }

  /**
   * @return {boolean}
   * @private
   */
  peekVariableDeclarationList_(type) {
    switch (type) {
      case VAR:
        return true;
      case CONST:
      case LET:
        return this.options_.blockBinding;
      default:
        return false;
    }
  }

  // 12.6.3 The for Statement
  /**
   * @param {SourcePosition} start
   * @param {ParseTree} initializer
   * @return {ParseTree}
   * @private
   */
  parseForStatement2_(start, initializer) {
    this.eat_(SEMI_COLON);

    let condition = null;
    if (!peek(SEMI_COLON)) {
      condition = this.parseExpression_(ALLOW_IN);
    }
    this.eat_(SEMI_COLON);

    let increment = null;
    if (!peek(CLOSE_PAREN)) {
      increment = this.parseExpression_(ALLOW_IN);
    }
    this.eat_(CLOSE_PAREN);
    let body = this.parseStatement_();
    return new ForStatement(this.getTreeLocation_(start), initializer,
                            condition, increment, body);
  }

  // 12.6.4 The for-in Statement
  /**
   * @param {SourcePosition} start
   * @param {ParseTree} initializer
   * @return {ParseTree}
   * @private
   */
  parseForInStatement_(start, initializer) {
    this.eat_(IN);
    let collection = this.parseExpression_(ALLOW_IN);
    this.eat_(CLOSE_PAREN);
    let body = this.parseStatement_();
    return new ForInStatement(this.getTreeLocation_(start), initializer,
                              collection, body);
  }

  // 12.7 The continue Statement
  /**
   * @return {ParseTree}
   * @private
   */
  parseContinueStatement_() {
    let start = this.getTreeStartLocation_();
    this.eat_(CONTINUE);
    let name = null;
    if (!this.peekImplicitSemiColon_()) {
      name = this.eatIdOpt_();
    }
    this.eatPossibleImplicitSemiColon_();
    return new ContinueStatement(this.getTreeLocation_(start), name);
  }

  // 12.8 The break Statement
  /**
   * @return {ParseTree}
   * @private
   */
  parseBreakStatement_() {
    let start = this.getTreeStartLocation_();
    this.eat_(BREAK);
    let name = null;
    if (!this.peekImplicitSemiColon_()) {
      name = this.eatIdOpt_();
    }
    this.eatPossibleImplicitSemiColon_();
    return new BreakStatement(this.getTreeLocation_(start), name);
  }

  //12.9 The return Statement
  /**
   * @return {ParseTree}
   * @private
   */
  parseReturnStatement_() {
    let start = this.getTreeStartLocation_();
    let returnToken = this.eat_(RETURN);
    if (this.functionState_.isTopMost()) {
      this.reportError_(returnToken.location, 'Illegal return statement');
    }
    let expression = null;
    if (!this.peekImplicitSemiColon_()) {
      expression = this.parseExpression_(ALLOW_IN);
    }
    this.eatPossibleImplicitSemiColon_();
    return new ReturnStatement(this.getTreeLocation_(start), expression);
  }

  /**
   * YieldExpression[In] :
   *   yield
   *   yield [no LineTerminator here] AssignmentExpression[?In, Yield]
   *   yield [no LineTerminator here] * AssignmentExpression[?In, Yield]
   *
   * @param {boolean} allowIn
   * @return {ParseTree}
   * @private
   */
  parseYieldExpression_(allowIn) {
    let start = this.getTreeStartLocation_();
    this.eat_(YIELD);
    let expression = null;
    let isYieldFor = false;

    let token = peekTokenNoLineTerminator();
    if (token !== null) {  // Not a new line.
      switch (token.type) {
        case CLOSE_CURLY:
        case CLOSE_PAREN:
        case CLOSE_SQUARE:
        case COLON:
        case COMMA:
        case END_OF_FILE:
        case SEMI_COLON:
          // The above set of tokens is the complete set of tokens that can
          // appear after an AssignmentExpression, and none of them can start an
          // AssignmentExpression.
          break;
        default:
          isYieldFor = this.eatIf_(STAR);
          expression = this.parseAssignmentExpression_(allowIn);
      }
    }

    return new YieldExpression(
        this.getTreeLocation_(start), expression, isYieldFor);
  }

  // 12.10 The with Statement
  /**
   * @return {ParseTree}
   * @private
   */
  parseWithStatement_() {
    let start = this.getTreeStartLocation_();
    let withToken = this.eat_(WITH);
    if (this.strictMode_) {
      this.reportError_(withToken.location,
                        'Strict mode code may not include a with statement');
    }
    this.eat_(OPEN_PAREN);
    let expression = this.parseExpression_(ALLOW_IN);
    this.eat_(CLOSE_PAREN);
    let body = this.parseStatement_();
    return new WithStatement(this.getTreeLocation_(start), expression, body);
  }

  // 12.11 The switch Statement
  /**
   * @return {ParseTree}
   * @private
   */
  parseSwitchStatement_() {
    let start = this.getTreeStartLocation_();
    this.eat_(SWITCH);
    this.eat_(OPEN_PAREN);
    let expression = this.parseExpression_(ALLOW_IN);
    this.eat_(CLOSE_PAREN);
    this.eat_(OPEN_CURLY);
    let caseClauses = this.parseCaseClauses_();
    this.eat_(CLOSE_CURLY);
    return new SwitchStatement(this.getTreeLocation_(start), expression, caseClauses);
  }

  /**
   * @return {Array.<ParseTree>}
   * @private
   */
  parseCaseClauses_() {
    let foundDefaultClause = false;
    let result = [];

    while (true) {
      let start = this.getTreeStartLocation_();
      switch (peekType()) {
        case CASE: {
          nextToken();
          let expression = this.parseExpression_(ALLOW_IN);
          this.eat_(COLON);
          let statements = this.parseCaseStatementsOpt_();
          result.push(new CaseClause(this.getTreeLocation_(start), expression, statements));
          break;
        }
        case DEFAULT: {
          let defaultToken = nextToken();
          if (foundDefaultClause) {
            this.reportError_(defaultToken.location,
                'Switch statements may have at most one \'default\' clause');
          } else {
            foundDefaultClause = true;
          }
          this.eat_(COLON);
          result.push(new DefaultClause(this.getTreeLocation_(start), this.parseCaseStatementsOpt_()));
          break;
        }
        default:
          return result;
      }
    }
  }

  /**
   * @return {Array.<ParseTree>}
   * @private
   */
  parseCaseStatementsOpt_() {
    // CaseClause :
    //   case Expression : StatementList
    let result = [];
    let type;
    while (true) {
      switch (type = peekType()) {
        case CASE:
        case DEFAULT:
        case CLOSE_CURLY:
        case END_OF_FILE:
          return result;
      }
      result.push(this.parseStatementListItem_(type));
    }
  }

  // 12.13 Throw Statement
  /**
   * @return {ParseTree}
   * @private
   */
  parseThrowStatement_() {
    let start = this.getTreeStartLocation_();
    this.eat_(THROW);
    let value = null;
    if (!this.peekImplicitSemiColon_()) {
      value = this.parseExpression_(ALLOW_IN);
    }
    this.eatPossibleImplicitSemiColon_();
    return new ThrowStatement(this.getTreeLocation_(start), value);
  }

  // 12.14 Try Statement
  /**
   * @return {ParseTree}
   * @private
   */
  parseTryStatement_() {
    let start = this.getTreeStartLocation_();
    this.eat_(TRY);
    let body = this.parseBlock_();
    let catchBlock = null;
    if (peek(CATCH)) {
      catchBlock = this.parseCatch_();
    }
    let finallyBlock = null;
    if (peek(FINALLY)) {
      finallyBlock = this.parseFinallyBlock_();
    }
    if (catchBlock === null && finallyBlock === null) {
      let token = peekToken();
      this.reportError_(token.location, "'catch' or 'finally' expected.");
    }
    return new TryStatement(this.getTreeLocation_(start), body, catchBlock, finallyBlock);
  }

  /**
   * Catch :
   *   catch ( CatchParameter ) Block
   *
   * CatchParameter :
   *   BindingIdentifier
   *   BindingPattern
   *
   * @return {ParseTree}
   * @private
   */
  parseCatch_() {
    let start = this.getTreeStartLocation_();
    let catchBlock;
    this.eat_(CATCH);
    this.eat_(OPEN_PAREN);
    let binding;
    if (this.peekPattern_(peekType()))
      binding = this.parseBindingPattern_();
    else
      binding = this.parseBindingIdentifier_();
    this.eat_(CLOSE_PAREN);
    let catchBody = this.parseBlock_();
    catchBlock = new Catch(this.getTreeLocation_(start), binding,
                           catchBody);
    return catchBlock;
  }

  /**
   * @return {ParseTree}
   * @private
   */
  parseFinallyBlock_() {
    let start = this.getTreeStartLocation_();
    this.eat_(FINALLY);
    let finallyBlock = this.parseBlock_();
    return new Finally(this.getTreeLocation_(start), finallyBlock);
  }

  // 12.15 The Debugger Statement
  /**
   * @return {ParseTree}
   * @private
   */
  parseDebuggerStatement_() {
    let start = this.getTreeStartLocation_();
    this.eat_(DEBUGGER);
    this.eatPossibleImplicitSemiColon_();

    return new DebuggerStatement(this.getTreeLocation_(start));
  }

  // 11.1 Primary Expressions
  /**
   * @return {ParseTree}
   * @private
   */
  parsePrimaryExpression_() {
    switch (peekType()) {
      case CLASS:
        return this.options_.classes ?
            this.parseClassExpression_() :
            this.parseUnexpectedReservedWord_(peekToken());
      case THIS:
        return this.parseThisExpression_();
      case IDENTIFIER: {
        let identifier = this.parseIdentifierExpression_();
        if (this.options_.asyncFunctions &&
            identifier.identifierToken.value === ASYNC) {
          let token = peekTokenNoLineTerminator();
          if (token && token.type === FUNCTION) {
            let asyncToken = identifier.identifierToken;
            return this.parseAsyncFunctionExpression_(asyncToken);
          }
        }
        return identifier;
      }
      case NUMBER:
      case STRING:
      case TRUE:
      case FALSE:
      case NULL:
        return this.parseLiteralExpression_();
      case OPEN_SQUARE:
        return this.parseArrayLiteral_();
      case OPEN_CURLY:
        return this.parseObjectLiteral_();
      case OPEN_PAREN:
        return this.parsePrimaryExpressionStartingWithParen_();
      case SLASH:
      case SLASH_EQUAL:
        return this.parseRegularExpressionLiteral_();
      case NO_SUBSTITUTION_TEMPLATE:
      case TEMPLATE_HEAD:
        if (this.options_.templateLiterals) {
          return this.parseTemplateLiteral_(null);
        }
        break;

      case IMPLEMENTS:
      case INTERFACE:
      case PACKAGE:
      case PRIVATE:
      case PROTECTED:
      case PUBLIC:
      case STATIC:
      case YIELD:
        if (this.strictMode_) {
          this.reportReservedIdentifier_(nextToken());
        }
        return this.parseIdentifierExpression_();

      case OPEN_ANGLE:
        if (this.options_.jsx) {
          return this.parseJsxElement_();
        }
        break;

      case END_OF_FILE:
        return this.parseSyntaxError_('Unexpected end of input');
    }

    let token = peekToken();
    if (token.isKeyword()) {
      return this.parseUnexpectedReservedWord_(token);
    }
    return this.parseUnexpectedToken_(token);
  }

  /**
   * @return {SuperExpression}
   * @private
   */
  parseSuperExpression_(isNew) {
    let start = this.getTreeStartLocation_();

    let fs = this.functionState_;
    while (fs && fs.isArrowFunction()) {
      fs = fs.outer;
    }

    let superToken = this.eat_(SUPER);

    if (!fs || !fs.isMethod()) {
      this.reportError_(superToken.location,
                        'super is only allowed in methods');
    }

    let operand = new SuperExpression(this.getTreeLocation_(start));
    let type = peekType();
    if (isNew) {
      // new super() is not allowed so we require a PERIOD or an OPEN_SQUARE.
      if (type === OPEN_SQUARE) {
        return this.parseMemberLookupExpression_(start, operand);
      }
      return this.parseMemberExpression_(start, operand);
    }

    switch (type) {
      case OPEN_SQUARE:
        return this.parseMemberLookupExpression_(start, operand);
      case PERIOD:
        return this.parseMemberExpression_(start, operand);
      case OPEN_PAREN: {
        let superCall = this.parseCallExpression_(start, operand);
        if (!fs.isDerivedConstructor()) {
          this.reportError_(superToken.location,
            'super call is only allowed in derived constructor');
        }
        return superCall;
      }
    }

    return this.parseUnexpectedToken_();
  }

  /**
   * @return {ThisExpression}
   * @private
   */
  parseThisExpression_() {
    let start = this.getTreeStartLocation_();
    this.eat_(THIS);
    return new ThisExpression(this.getTreeLocation_(start));
  }

  peekBindingIdentifier_(type) {
    return this.peekId_(type);
  }

  parseBindingIdentifier_() {
    let start = this.getTreeStartLocation_();
    let identifier = this.eatId_();
    return new BindingIdentifier(this.getTreeLocation_(start), identifier);
  }

  /**
   * @return {IdentifierExpression}
   * @private
   */
  parseIdentifierExpression_() {
    let start = this.getTreeStartLocation_();
    let identifier = this.eatId_();
    return new IdentifierExpression(this.getTreeLocation_(start), identifier);
  }

  /**
   * Special case of parseIdentifierExpression_ which allows keywords.
   * @return {IdentifierExpression}
   * @private
   */
  parseIdentifierNameExpression_() {
    let start = this.getTreeStartLocation_();
    let identifier = this.eatIdName_();
    return new IdentifierExpression(this.getTreeLocation_(start), identifier);
  }

  /**
   * @return {LiteralExpression}
   * @private
   */
  parseLiteralExpression_() {
    let start = this.getTreeStartLocation_();
    let literal = this.nextLiteralToken_();
    return new LiteralExpression(this.getTreeLocation_(start), literal);
  }

  /**
   * @return {Token}
   * @private
   */
  nextLiteralToken_() {
    return nextToken();
  }

  /**
   * @return {ParseTree}
   * @private
   */
  parseRegularExpressionLiteral_() {
    let start = this.getTreeStartLocation_();
    let literal = nextRegularExpressionLiteralToken();
    return new LiteralExpression(this.getTreeLocation_(start), literal);
  }

  peekSpread_(type) {
    return type === DOT_DOT_DOT && this.options_.spread;
  }

  // 11.1.4 Array Literal Expression
  /**
   * Parse array literal and delegates to {@code parseArrayComprehension_} as
   * needed.
   *
   * ArrayLiteral :
   *   [ Elisionopt ]
   *   [ ElementList ]
   *   [ ElementList , Elisionopt ]
   *
   * ElementList :
   *   Elisionopt AssignmentExpression
   *   Elisionopt ... AssignmentExpression
   *   ElementList , Elisionopt AssignmentExpression
   *   ElementList , Elisionopt SpreadElement
   *
   * Elision :
   *   ,
   *   Elision ,
   *
   * SpreadElement :
   *   ... AssignmentExpression
   *
   * @return {ParseTree}
   * @private
   */
  parseArrayLiteral_() {
    let start = this.getTreeStartLocation_();
    let expression;
    let elements = [];

    this.eat_(OPEN_SQUARE);

    let type = peekType();
    if (type === FOR && this.options_.arrayComprehension)
      return this.parseArrayComprehension_(start);

    while (true) {
      type = peekType();
      if (type === COMMA) {
        expression = null;
      } else if (this.peekSpread_(type)) {
        expression = this.parseSpreadExpression_();
      } else if (type === CLOSE_SQUARE || type === END_OF_FILE) {
        break;
      } else {
        expression = this.parseAssignmentExpression_(ALLOW_IN);
      }

      elements.push(expression);

      type = peekType();
      if (type !== CLOSE_SQUARE)
        this.eat_(COMMA);
    }
    this.eat_(CLOSE_SQUARE);
    return new ArrayLiteral(this.getTreeLocation_(start), elements);
  }

  /**
   * Continues parsing array comprehension.
   *
   * ArrayComprehension :
   *   [ Comprehension ]
   *
   * Comprehension :
   *   ForComprehensionClause ComprehensionClause* Expression
   *
   * ComprehensionClause :
   *   ForComprehensionClause
   *   IfComprehensionClause
   *
   * ForComprehensionClause :
   *   for ( ForBinding of Expression )
   *
   * IfComprehensionClause  :
   *   if ( Expression )
   *
   * ForBinding :
   *   BindingIdentifier
   *   BindingPattern
   *
   * @param {Location} start
   * @return {ParseTree}
   */
  parseArrayComprehension_(start) {
    let list = this.parseComprehensionList_();
    let expression = this.parseAssignmentExpression_(ALLOW_IN);
    this.eat_(CLOSE_SQUARE);
    return new ArrayComprehension(this.getTreeLocation_(start),
                                  list, expression);
  }

  parseComprehensionList_() {
    // Must start with for (...)
    let list = [this.parseComprehensionFor_()];
    while (true) {
      let type = peekType();
      switch (type) {
        case FOR:
          list.push(this.parseComprehensionFor_());
          break;
        case IF:
          list.push(this.parseComprehensionIf_());
          break;
        default:
          return list;
      }
    }
  }

  parseComprehensionFor_() {
    let start = this.getTreeStartLocation_();
    this.eat_(FOR);
    this.eat_(OPEN_PAREN);
    let left = this.parseForBinding_();
    this.eatId_(OF);
    let iterator = this.parseExpression_(ALLOW_IN);
    this.eat_(CLOSE_PAREN);
    return new ComprehensionFor(this.getTreeLocation_(start), left, iterator);
  }

  parseComprehensionIf_() {
    let start = this.getTreeStartLocation_();
    this.eat_(IF);
    this.eat_(OPEN_PAREN);
    let expression = this.parseExpression_(ALLOW_IN);
    this.eat_(CLOSE_PAREN);
    return new ComprehensionIf(this.getTreeLocation_(start), expression);
  }

  // 11.1.4 Object Literal Expression
  /**
   * @return {ParseTree}
   * @private
   */
  parseObjectLiteral_() {
    let start = this.getTreeStartLocation_();
    let result = [];

    this.eat_(OPEN_CURLY);
    while (this.peekPropertyDefinition_(peekType())) {
      let propertyDefinition = this.parsePropertyDefinition_();
      result.push(propertyDefinition);
      if (!this.eatIf_(COMMA))
        break;
    }
    this.eat_(CLOSE_CURLY);
    return new ObjectLiteral(this.getTreeLocation_(start), result);
  }

  /**
   * PropertyDefinition :
   *   IdentifierName
   *   CoverInitializedName
   *   PropertyName : AssignmentExpression
   *   MethodDefinition
   */
  parsePropertyDefinition() {
    let fs = this.pushFunctionState_(FUNCTION_STATE_SCRIPT);
    let result = this.parsePropertyDefinition_();
    this.popFunctionState_(fs);
    return result;
  }

  parsePropertyDefinition_() {
    let start = this.getTreeStartLocation_();

    let functionKind = null;
    let isStatic = false;

    if (this.options_.generators && this.options_.propertyMethods &&
        peek(STAR)) {
      let fs = this.pushFunctionState_(
          FUNCTION_STATE_METHOD | FUNCTION_STATE_GENERATOR);
      let m = this.parseGeneratorMethod_(start, isStatic, []);
      this.popFunctionState_(fs);
      return m;
    }

    if (this.options_.spreadProperties && peek(DOT_DOT_DOT)) {
      return this.parseSpreadExpression_();
    }

    let token = peekToken();
    let name = this.parsePropertyName_();

    if (this.options_.propertyMethods && peek(OPEN_PAREN)) {
      let fs = this.pushFunctionState_(FUNCTION_STATE_METHOD);
      let m = this.parseMethod_(start, isStatic, functionKind, name, []);
      this.popFunctionState_(fs);
      return m;
    }

    if (this.eatIf_(COLON)) {
      let value = this.parseAssignmentExpression_(ALLOW_IN);
      return new PropertyNameAssignment(this.getTreeLocation_(start), name,
                                        value);
    }

    let type = peekType();
    if (name.type === LITERAL_PROPERTY_NAME) {
      let nameLiteral = name.literalToken;
      if (nameLiteral.value === GET &&
          this.peekPropertyName_(type)) {
        return this.parseGetAccessor_(start, isStatic, []);
      }

      if (nameLiteral.value === SET &&
          this.peekPropertyName_(type)) {
        return this.parseSetAccessor_(start, isStatic, []);
      }

      if (this.options_.asyncFunctions && nameLiteral.value === ASYNC &&
          (this.peekPropertyName_(type) || this.peekAsyncStar_())) {
        let async = nameLiteral;
        let kind = FUNCTION_STATE_METHOD | FUNCTION_STATE_ASYNC;
        if (this.peekAsyncStar_()) {
          kind |= FUNCTION_STATE_GENERATOR;
          this.eat_(STAR);
          async = new IdentifierToken(async.location, ASYNC_STAR);
        }
        let name = this.parsePropertyName_();
        let fs = this.pushFunctionState_(kind);
        let m = this.parseMethod_(start, isStatic, async, name, []);
        this.popFunctionState_(fs);
        return m;
      }

      if (this.options_.propertyNameShorthand &&
          (nameLiteral.type === IDENTIFIER ||
           nameLiteral.isStrictKeyword() && !this.strictMode_ ||
           nameLiteral.type === YIELD && this.allowYield_)) {

        if (peek(EQUAL)) {
          token = nextToken();
          let coverInitializedNameCount = this.coverInitializedNameCount_;
          let expr = this.parseAssignmentExpression_(ALLOW_IN);
          this.ensureNoCoverInitializedNames_(expr, coverInitializedNameCount);

          this.coverInitializedNameCount_++;
          return new CoverInitializedName(this.getTreeLocation_(start),
                                          nameLiteral, token, expr);
        }

        return new PropertyNameShorthand(this.getTreeLocation_(start),
                                         nameLiteral);
      }

      if (this.strictMode_ && nameLiteral.isStrictKeyword())
        this.reportReservedIdentifier_(nameLiteral);
    }

    if (name.type === COMPUTED_PROPERTY_NAME)
      token = peekToken();

    return this.parseUnexpectedToken_(token);
  }

  /**
   * ClassElement :
   *   static MethodDefinition
   *   MethodDefinition
   *
   * MethodDefinition :
   *   PropertyName ( FormalParameterList ) { FunctionBody }
   *   * PropertyName ( FormalParameterList ) { FunctionBody }
   *   get PropertyName ( ) { FunctionBody }
   *   set PropertyName ( PropertySetParameterList ) { FunctionBody }
   */
  parseClassElement_(derivedClass) {
    let start = this.getTreeStartLocation_();

    let annotations = this.parseAnnotations_();
    let type = peekType();
    let isStatic = false, functionKind = null;
    switch (type) {
      case STATIC: {
        let staticToken = nextToken();
        type = peekType();
        switch (type) {
          case OPEN_PAREN: {
            let location = this.getTreeLocation_(start);
            let name = new LiteralPropertyName(location, staticToken);
            let fs = this.pushFunctionState_(FUNCTION_STATE_METHOD);
            let m = this.parseMethod_(start, isStatic, functionKind, name,
                                      annotations);
            this.popFunctionState_(fs);
            return m;
          }
          default:
            isStatic = true;
            if (type === STAR && this.options_.generators)
              return this.parseGeneratorMethod_(start, true, annotations);

            return this.parseClassElement2_(start, isStatic, annotations,
                                            derivedClass);
        }
        break;
      }

      case STAR:
        return this.parseGeneratorMethod_(start, isStatic, annotations);

      default:
        return this.parseClassElement2_(start, isStatic, annotations,
                                        derivedClass);
    }
  }

  parseGeneratorMethod_(start, isStatic, annotations) {
    let functionKind = this.eat_(STAR);
    let name = this.parsePropertyName_();
    let fs = this.pushFunctionState_(
        FUNCTION_STATE_METHOD | FUNCTION_STATE_GENERATOR);
    let m = this.parseMethod_(start, isStatic, functionKind, name, annotations);
    this.popFunctionState_(fs);
    return m;
  }

  parseMethod_(start, isStatic, functionKind, name, annotations) {
    this.eat_(OPEN_PAREN);
    let parameterList = this.parseFormalParameters_();
    this.eat_(CLOSE_PAREN);
    let typeAnnotation = this.parseTypeAnnotationOpt_();
    let body = this.parseFunctionBody_(parameterList);
    return new Method(this.getTreeLocation_(start),
        isStatic, functionKind, name, parameterList, typeAnnotation,
        annotations, body, null);
  }

  parsePropertyVariableDeclaration_(start, isStatic, name, annotations) {
    let typeAnnotation = this.parseTypeAnnotationOpt_();
    let initializer = this.parseInitializerOpt_(ALLOW_IN);
    this.eat_(SEMI_COLON);
    return new PropertyVariableDeclaration(this.getTreeLocation_(start),
        isStatic, name, typeAnnotation, annotations, initializer);
  }

  parseClassElement2_(start, isStatic, annotations, derivedClass) {
    let functionKind = null;
    let name = this.parsePropertyName_();
    let type = peekType();

    // TODO(arv): Can we unify this with parsePropertyDefinition_?

    if (name.type === LITERAL_PROPERTY_NAME &&
        name.literalToken.value === GET &&
        this.peekPropertyName_(type)) {
      return this.parseGetAccessor_(start, isStatic, annotations);
    }

    if (name.type === LITERAL_PROPERTY_NAME &&
        name.literalToken.value === SET &&
        this.peekPropertyName_(type)) {
      return this.parseSetAccessor_(start, isStatic, annotations);
    }

    if (this.options_.asyncFunctions &&
        name.type === LITERAL_PROPERTY_NAME &&
        name.literalToken.value === ASYNC &&
        (this.peekPropertyName_(type) || this.peekAsyncStar_())) {
      let async = name.literalToken;
      let kind = FUNCTION_STATE_METHOD | FUNCTION_STATE_ASYNC;
      if (this.peekAsyncStar_()) {
        kind |= FUNCTION_STATE_GENERATOR;
        this.eat_(STAR);
        async = new IdentifierToken(async.location, ASYNC_STAR);
      }
      name = this.parsePropertyName_();
      let fs = this.pushFunctionState_(kind);
      let m = this.parseMethod_(start, isStatic, async, name, annotations);
      this.popFunctionState_(fs);
      return m;
    }

    if (!this.options_.memberVariables || type === OPEN_PAREN) {
      let kind = FUNCTION_STATE_METHOD;
      let isDerivedConstructor = derivedClass && !isStatic &&
          functionKind === null && name.type === LITERAL_PROPERTY_NAME &&
          name.literalToken.value === CONSTRUCTOR;
      if (isDerivedConstructor) {
        kind |= FUNCTION_STATE_DERIVED_CONSTRUCTOR;
      }
      let fs = this.pushFunctionState_(kind);
      let m =
          this.parseMethod_(start, isStatic, functionKind, name, annotations);
      this.popFunctionState_(fs);
      if (isDerivedConstructor) {
        validateConstructor(m, this.errorReporter_);
      }
      return m;
    }

    return this.parsePropertyVariableDeclaration_(start, isStatic, name, annotations);
  }

  parseGetAccessor_(start, isStatic, annotations) {
    let name = this.parsePropertyName_();
    let fs = this.pushFunctionState_(FUNCTION_STATE_METHOD);
    this.eat_(OPEN_PAREN);
    this.eat_(CLOSE_PAREN);
    let typeAnnotation = this.parseTypeAnnotationOpt_();
    let body = this.parseFunctionBody_(null);
    this.popFunctionState_(fs);
    return new GetAccessor(this.getTreeLocation_(start), isStatic, name,
                           typeAnnotation, annotations, body);
  }

  parseSetAccessor_(start, isStatic, annotations) {
    let name = this.parsePropertyName_();
    let fs = this.pushFunctionState_(FUNCTION_STATE_METHOD);
    this.eat_(OPEN_PAREN);
    let parameterList = this.parsePropertySetParameterList_();
    this.eat_(CLOSE_PAREN);
    let body = this.parseFunctionBody_(parameterList);
    this.popFunctionState_(fs);
    return new SetAccessor(this.getTreeLocation_(start), isStatic, name,
                           parameterList, annotations, body);
  }

  /**
   * @return {boolean}
   * @private
   */
  peekPropertyDefinition_(type) {
    return this.peekPropertyName_(type) ||
        type === STAR && this.options_.propertyMethods && this.options_.generators ||
        type === DOT_DOT_DOT && this.options_.spreadProperties;
  }

  /**
   * @return {boolean}
   * @private
   */
  peekPropertyName_(type) {
    switch (type) {
      case IDENTIFIER:
      case STRING:
      case NUMBER:
        return true;
      case OPEN_SQUARE:
        return this.options_.computedPropertyNames;
      default:
        return peekToken().isKeyword();
    }
  }

  /**
   * @return {boolean}
   * @private
   */
  peekPredefinedString_(string) {
    let token = peekToken();
    return token.type === IDENTIFIER && token.value === string;
  }

  /**
   * PropertySetParameterList :
   *   BindingIdentifier
   *   BindingPattern
   */
  parsePropertySetParameterList_() {
    let start = this.getTreeStartLocation_();

    let binding;
    this.pushAnnotations_();
    if (this.peekPattern_(peekType()))
      binding = this.parseBindingPattern_();
    else
      binding = this.parseBindingIdentifier_();

    let typeAnnotation = this.parseTypeAnnotationOpt_();
    let parameter = new FormalParameter(this.getTreeLocation_(start),
        new BindingElement(this.getTreeLocation_(start), binding, null),
        typeAnnotation, this.popAnnotations_());

    return new FormalParameterList(parameter.location, [parameter]);
  }

  /**
   * @return {ParseTree}
   * @private
   */
  parsePrimaryExpressionStartingWithParen_() {
    let start = this.getTreeStartLocation_();

    this.eat_(OPEN_PAREN);

    if (peek(FOR) && this.options_.generatorComprehension)
      return this.parseGeneratorComprehension_(start);

    return this.parseCoverFormals_(start);
  }

  parseSyntaxError_(message) {
    let token = nextToken();
    this.reportError_(token.location, message);
    return new SyntaxErrorTree(token.location, token, message);
  }

  /**
   * @param {Token} token
   * @return {SyntaxErrorTree}
   */
  parseUnexpectedToken_(token = peekToken()) {
    if (token.type === NO_SUBSTITUTION_TEMPLATE) {
      return this.parseSyntaxError_('Unexpected token `');
    }
    return this.parseSyntaxError_(`Unexpected token ${token}`);
  }

  /**
   * @param {Token} token
   * @return {SyntaxErrorTree}
   */
  parseUnexpectedReservedWord_(token) {
    return this.parseSyntaxError_(`Unexpected reserved word ${token}`);
  }

  // 11.14 Expressions

  /**
   * Expression :
   *   AssignmentExpression
   *   Expression , AssignmentExpression
   *
   * ExpressionNoIn :
   *   AssignmentExpressionNoIn
   *   ExpressionNoIn , AssignmentExpressionNoIn
   *
   * @return {ParseTree}
   */
  parseExpression_(allowIn) {
    let coverInitializedNameCount = this.coverInitializedNameCount_;
    let expression = this.parseExpressionAllowPattern_(allowIn);
    this.ensureNoCoverInitializedNames_(expression, coverInitializedNameCount);
    return expression;
  }

  parseExpression() {
    let fs = this.pushFunctionState_(FUNCTION_STATE_LENIENT);
    let expression = this.parseExpression_(ALLOW_IN);
    this.popFunctionState_(fs);
    return expression;
  }

  parseExpressionAllowPattern_(allowIn) {
    let start = this.getTreeStartLocation_();
    let expression = this.parseAssignmentExpression_(allowIn);
    if (peek(COMMA)) {
      let expressions = [expression];
      while (this.eatIf_(COMMA)) {
        expressions.push(this.parseAssignmentExpression_(allowIn));
      }
      return new CommaExpression(this.getTreeLocation_(start), expressions);
    }

    return expression;
  }

  // 11.13 Assignment expressions

  /**
   * AssignmentExpression :
   *   ConditionalExpression
   *   YieldExpression
   *   ArrowFunction
   *   AsyncArrowFunction
   *   LeftHandSideExpression = AssignmentExpression
   *   LeftHandSideExpression AssignmentOperator AssignmentExpression
   *
   * AssignmentExpressionNoIn :
   *   ConditionalExpressionNoIn
   *   YieldExpression
   *   ArrowFunction
   *   AsyncArrowFunction
   *   LeftHandSideExpression = AssignmentExpressionNoIn
   *   LeftHandSideExpression AssignmentOperator AssignmentExpressionNoIn
   *
   * @param {boolean} allowIn
   * @return {ParseTree}
   */
  parseAssignmentExpression_(allowIn) {
    if (this.allowYield_ && peek(YIELD))
      return this.parseYieldExpression_(allowIn);

    let start = this.getTreeStartLocation_();

    let validAsyncParen = false;

    if (this.options_.asyncFunctions && this.peekPredefinedString_(ASYNC)) {
      let asyncToken = peekToken();
      let maybeOpenParenToken = peekTokenLookahead();
      validAsyncParen = maybeOpenParenToken.type === OPEN_PAREN &&
          asyncToken.location.end.line ===
              maybeOpenParenToken.location.start.line;
    }

    let left = this.parseConditional_(allowIn);
    let type = peekType();

    if (this.options_.asyncFunctions && left.type === IDENTIFIER_EXPRESSION &&
        left.identifierToken.value === ASYNC && type === IDENTIFIER) {
      if (peekTokenNoLineTerminator() !== null) {
        let bindingIdentifier = this.parseBindingIdentifier_();
        let asyncToken = left.identifierToken;
        return this.parseArrowFunction_(start, bindingIdentifier,
            asyncToken);
      }
    }

    if (type === ARROW && peekTokenNoLineTerminator() !== null) {
      if (left.type === COVER_FORMALS || left.type === IDENTIFIER_EXPRESSION)
        return this.parseArrowFunction_(start, left, null);

      if (validAsyncParen && left.type === CALL_EXPRESSION) {
        let asyncToken = left.operand.identifierToken;
        return this.parseArrowFunction_(start, left.args, asyncToken);
      }
    }

    left = this.coverFormalsToParenExpression_(left);

    if (this.peekAssignmentOperator_(type)) {
      if (type === EQUAL)
        left = this.transformLeftHandSideExpression_(left);

      this.validateAssignmentTarget_(left, 'assignment');

      let operator = nextToken();
      let right = this.parseAssignmentExpression_(allowIn);

      return new BinaryExpression(this.getTreeLocation_(start), left, operator, right);
    }

    return left;
  }

  /**
   * Transforms a LeftHandSideExpression into a AssignmentPattern if possible.
   * This returns the transformed tree if it parses as an AssignmentPattern,
   * otherwise it returns the original tree.
   * @param {ParseTree} tree
   * @return {ParseTree}
   */
  transformLeftHandSideExpression_(tree) {
    switch (tree.type) {
      case ARRAY_LITERAL:
      case OBJECT_LITERAL:
        resetScanner(tree.location.start.offset);
        // If we fail to parse as an AssignmentPattern then
        // parseAssignmentPattern_ will take care reporting errors.
        return this.parseAssignmentPattern_();
    }
    return tree;
  }

  /**
   * @return {boolean}
   * @private
   */
  peekAssignmentOperator_(type) {
    return isAssignmentOperator(type);
  }

  // 11.12 Conditional Expression
  /**
   * @param {boolean} allowIn
   * @return {ParseTree}
   * @private
   */
  parseConditional_(allowIn) {
    let start = this.getTreeStartLocation_();
    let condition = this.parseBinaryExpression_(allowIn);
    if (this.eatIf_(QUESTION)) {
      condition = this.toPrimaryExpression_(condition);
      let left = this.parseAssignmentExpression_(ALLOW_IN);
      this.eat_(COLON);
      let right = this.parseAssignmentExpression_(allowIn);
      return new ConditionalExpression(this.getTreeLocation_(start),
          condition, left, right);
    }
    return condition;
  }

  getPrecedence_(type, allowIn) {
    switch (type) {
      case OR:
        return 1;
      case AND:
        return 2;
      case BAR:
        return 3;
      case CARET:
        return 4;
      case AMPERSAND:
        return 5;
      case EQUAL_EQUAL:
      case EQUAL_EQUAL_EQUAL:
      case NOT_EQUAL:
      case NOT_EQUAL_EQUAL:
        return 6;
      case CLOSE_ANGLE:
      case GREATER_EQUAL:
      case INSTANCEOF:
      case LESS_EQUAL:
      case OPEN_ANGLE:
        return 7;
      case IN:
        return allowIn ? 7 : 0;
      case LEFT_SHIFT:
      case RIGHT_SHIFT:
      case UNSIGNED_RIGHT_SHIFT:
        return 8;
      case MINUS:
      case PLUS:
        return 9;
      case SLASH:
      case STAR:
      case PERCENT:
        return 10;
      case STAR_STAR:
        return this.options_.exponentiation ? 11 : 0;
      default:
        return 0;
    }
  }

  parseBinaryExpression_(allowIn) {
    let start = this.getTreeStartLocation_();
    let left = this.parseUnaryExpression_();
    return this.parseBinaryExpressionHelper_(start, left, -1, allowIn);
  }

  parseBinaryExpressionHelper_(start, left, minPrec, allowIn) {
    let type = peekType();
    let prec = this.getPrecedence_(type, allowIn);
    if (prec === 0) {
      return left;
    }

    // Only ** is right to left.
    let leftToRight = type !== STAR_STAR;

    if (leftToRight ? prec > minPrec : prec >= minPrec) {
      let token = nextToken();  // Consumes the token.
      let rightStart = this.getTreeStartLocation_();
      let rightUnary = this.parseUnaryExpression_();
      let right = this.parseBinaryExpressionHelper_(rightStart, rightUnary,
                                                    prec, allowIn);

      left = this.toPrimaryExpression_(left);
      right = this.toPrimaryExpression_(right);
      let node = new BinaryExpression(this.getTreeLocation_(start), left, token,
                                      right);

      return this.parseBinaryExpressionHelper_(start, node, minPrec,
                                               allowIn);
    }
    return left;
  }

  // 11.4 Unary Operator
  /**
   * @return {ParseTree}
   * @private
   */
  parseUnaryExpression_() {
    let start = this.getTreeStartLocation_();

    if (this.allowAwait_ && this.peekPredefinedString_(AWAIT)) {
      this.eatId_();
      // no newline?

      let operand;
      if (this.allowYield_ && peek(YIELD)) {
        operand = this.parseYieldExpression_(ALLOW_IN);
      } else {
        operand = this.parseUnaryExpression_();
        operand = this.toPrimaryExpression_(operand);
      }
      return new AwaitExpression(this.getTreeLocation_(start), operand);
    }

    if (this.peekUnaryOperator_(peekType())) {
      let operator = nextToken();
      let operand = this.parseUnaryExpression_();
      operand = this.toPrimaryExpression_(operand);
      if (operand.type !== SYNTAX_ERROR_TREE) {
        switch (operator.type) {
          case PLUS_PLUS:
          case MINUS_MINUS:
            this.validateAssignmentTarget_(operand, 'prefix operation');
        }
      }
      return new UnaryExpression(this.getTreeLocation_(start), operator, operand);
    }
    return this.parsePostfixExpression_();
  }

  /**
   * @return {boolean}
   * @private
   */
  peekUnaryOperator_(type) {
    switch (type) {
      case DELETE:
      case VOID:
      case TYPEOF:
      case PLUS_PLUS:
      case MINUS_MINUS:
      case PLUS:
      case MINUS:
      case TILDE:
      case BANG:
        return true;
      default:
        return false;
    }
  }

  // 11.3 Postfix Expression
  /**
   * @return {ParseTree}
   * @private
   */
  parsePostfixExpression_() {
    let start = this.getTreeStartLocation_();
    let operand = this.parseLeftHandSideExpression_();
    while (this.peekPostfixOperator_(peekType())) {
      operand = this.toPrimaryExpression_(operand);
      let operator = nextToken();
      this.validateAssignmentTarget_(operand, 'postfix operation');
      operand = new PostfixExpression(this.getTreeLocation_(start), operand, operator);
    }
    return operand;
  }

  /**
   * @return {boolean}
   * @private
   */
  peekPostfixOperator_(type) {
    switch (type) {
      case PLUS_PLUS:
      case MINUS_MINUS: {
        let token = peekTokenNoLineTerminator();
        return token !== null;
      }
    }
    return false;
  }

  // 11.2 Left hand side expression
  //
  // Also inlines the call expression productions

  /**
   * LeftHandSideExpression :
   *   NewExpression
   *   CallExpression
   *
   * @return {ParseTree}
   * @private
   */
  parseLeftHandSideExpression_() {
    let start = this.getTreeStartLocation_();
    let operand = this.parseNewExpression_();

    // this test is equivalent to is member expression
    if (!(operand instanceof NewExpression) || operand.args !== null) {

      // The Call expression productions
      loop: while (true) {
        switch (peekType()) {
          case OPEN_PAREN:
            operand = this.toPrimaryExpression_(operand);
            operand = this.parseCallExpression_(start, operand);
            break;

          case OPEN_SQUARE:
            operand = this.toPrimaryExpression_(operand);
            operand = this.parseMemberLookupExpression_(start, operand);
            break;

          case PERIOD:
            operand = this.toPrimaryExpression_(operand);
            operand = this.parseMemberExpression_(start, operand);
            break;

          case NO_SUBSTITUTION_TEMPLATE:
          case TEMPLATE_HEAD:
            if (!this.options_.templateLiterals)
              break loop;
            operand = this.toPrimaryExpression_(operand);
            if (this.options_.templateLiterals) {
              operand = this.parseTemplateLiteral_(operand);
            }
            break;

          default:
            break loop;
        }
      }
    }
    return operand;
  }

  // 11.2 Member Expression without the new production
  /**
   * @return {ParseTree}
   * @private
   */
  parseMemberExpressionNoNew_() {
    let start = this.getTreeStartLocation_();
    let operand;
    if (peekType() === FUNCTION) {
      operand = this.parseFunctionExpression_();
    } else {
      operand = this.parsePrimaryExpression_();
    }

    loop: while (true) {
      switch (peekType()) {
        case OPEN_SQUARE:
          operand = this.toPrimaryExpression_(operand);
          operand = this.parseMemberLookupExpression_(start, operand);
          break;

        case PERIOD:
          operand = this.toPrimaryExpression_(operand);
          operand = this.parseMemberExpression_(start, operand);
          break;

        case NO_SUBSTITUTION_TEMPLATE:
        case TEMPLATE_HEAD:
          if (!this.options_.templateLiterals)
            break loop;
          operand = this.toPrimaryExpression_(operand);
          operand = this.parseTemplateLiteral_(operand);
          break;

        default:
          break loop;  // break out of loop.
      }
    }
    return operand;
  }

  parseMemberExpression_(start, operand) {
    this.eat_(PERIOD);
    let name = this.eatIdName_();
    return new MemberExpression(this.getTreeLocation_(start), operand, name);
  }

  parseMemberLookupExpression_(start, operand) {
    this.eat_(OPEN_SQUARE);
    let member = this.parseExpression_(ALLOW_IN);
    this.eat_(CLOSE_SQUARE);
    return new MemberLookupExpression(this.getTreeLocation_(start), operand,
                                      member);
  }

  parseCallExpression_(start, operand) {
    let args = this.parseArguments_();
    return new CallExpression(this.getTreeLocation_(start), operand, args);
  }

  // 11.2 New Expression
  /**
   * @return {ParseTree}
   * @private
   */
  parseNewExpression_() {
    let operand, start;
    switch (peekType()) {
      case NEW: {
        start = this.getTreeStartLocation_();
        this.eat_(NEW);
        if (peek(SUPER)) {
          operand = this.parseSuperExpression_(true);
        } else {
          operand = this.toPrimaryExpression_(this.parseNewExpression_());
        }
        let args = null;
        if (peek(OPEN_PAREN)) {
          args = this.parseArguments_();
        }
        return new NewExpression(this.getTreeLocation_(start), operand, args);
      }
      case SUPER:
        return this.parseSuperExpression_(false);

      default:
        return this.parseMemberExpressionNoNew_();
    }
  }

  /**
   * @return {ArgumentList}
   * @private
   */
  parseArguments_() {
    // ArgumentList :
    //   AssignmentOrSpreadExpression
    //   ArgumentList , AssignmentOrSpreadExpression
    //
    // AssignmentOrSpreadExpression :
    //   ... AssignmentExpression
    //   AssignmentExpression

    let start = this.getTreeStartLocation_();
    let args = [];

    this.eat_(OPEN_PAREN);

    if (!peek(CLOSE_PAREN)) {
      args.push(this.parseArgument_());

      while (this.eatIf_(COMMA)) {
        args.push(this.parseArgument_());
      }
    }

    this.eat_(CLOSE_PAREN);
    return new ArgumentList(this.getTreeLocation_(start), args);
  }

  parseArgument_() {
    if (this.peekSpread_(peekType()))
      return this.parseSpreadExpression_();
    return this.parseAssignmentExpression_(ALLOW_IN);
  }

  /**
   * Parses arrow functions and paren expressions as well as delegates to
   * {@code parseGeneratorComprehension_} if this begins a generator
   * comprehension.
   *
   * Arrow function support, see:
   * http://wiki.ecmascript.org/doku.php?id=strawman:arrow_function_syntax
   *
   * Generator comprehensions syntax is in the ES6 draft,
   * 11.1.7 Generator Comprehensions
   *
   * ArrowFunction :
   *   ArrowParameters => ConciseBody
   *
   * ArrowParameters :
   *   BindingIdentifer
   *   CoverParenthesizedExpressionAndArrowParameterList
   *
   * CoverParenthesizedExpressionAndArrowParameterList :
   *   ( Expression )
   *   ( )
   *   ( ... BindingIdentifier )
   *   ( Expression , ... BindingIdentifier )
   *
   * ConciseBody :
   *   [lookahead not {] AssignmentExpression
   *   { FunctionBody }
   *
   *
   * @param {number} start
   * @param {ParseTree} tree
   * @param {Token}
   * @return {ParseTree}
   * @private
   */
  parseArrowFunction_(start, tree, asyncToken) {
    let formals;
    let kind = FUNCTION_STATE_ARROW;
    if (asyncToken && asyncToken.value === ASYNC) {
      kind |= FUNCTION_STATE_ASYNC;
    }
    let fs = this.pushFunctionState_(kind);
    let makeFormals = (tree) => {
      return new FormalParameterList(this.getTreeLocation_(start),
          [new FormalParameter(tree.location,
              new BindingElement(tree.location, tree, null), null, [])]);
    };
    switch (tree.type) {
      case IDENTIFIER_EXPRESSION:
        formals = makeFormals(
              new BindingIdentifier(tree.location, tree.identifierToken));
        break;
      case BINDING_IDENTIFIER:
        formals = makeFormals(tree);
        break;
      case FORMAL_PARAMETER_LIST:
        formals = tree;
        break;
      default:
        formals = this.toFormalParameters_(start, tree, asyncToken);
    }

    this.eat_(ARROW);
    let body = this.parseConciseBody_(formals);
    this.popFunctionState_(fs);
    return new ArrowFunction(this.getTreeLocation_(start),
        asyncToken, formals, body);
  }

  parseCoverFormals_(start) {
    // CoverParenthesizedExpressionAndArrowParameterList :
    //   ( Expression )
    //   ()
    //   ( ... BindingIdentifier)
    //   (Expression, ... BindingIdentifier)
    //
    //   The leading OPEN_PAREN has already been consumed.

    let expressions = [];
    if (!peek(CLOSE_PAREN)) {
      do {
        let type = peekType();
        if (this.peekRest_(type)) {
          expressions.push(this.parseRestParameter_());
          break;
        } else {
          expressions.push(this.parseAssignmentExpression_(ALLOW_IN));
        }

        if (this.eatIf_(COMMA))
          continue;

      } while (!peek(CLOSE_PAREN) && !isAtEnd())
    }

    this.eat_(CLOSE_PAREN);
    return new CoverFormals(this.getTreeLocation_(start), expressions);
  }

  ensureNoCoverInitializedNames_(tree, coverInitializedNameCount) {
    if (coverInitializedNameCount === this.coverInitializedNameCount_)
      return;

    let finder = new ValidateObjectLiteral();
    finder.visitAny(tree);
    if (finder.found) {
      let token = finder.errorToken;
      this.reportError_(token.location, `Unexpected token ${token}`);
    }
  }

  /**
   * When we have exhausted the cover grammar possibilities, this method
   * verifies the remaining grammar to produce a primary expression.
   */
  toPrimaryExpression_(tree) {
    if (tree.type === COVER_FORMALS)
      return this.coverFormalsToParenExpression_(tree);
    return tree;
  }

  validateCoverFormalsAsParenExpression_(tree) {
    for (let i = 0; i < tree.expressions.length; i++) {
      if (tree.expressions[i].type === REST_PARAMETER) {
        let token = new Token(DOT_DOT_DOT, tree.expressions[i].location);
        this.reportError_(token.location, `Unexpected token ${token}`);
        return;
      }
    }
  }

  coverFormalsToParenExpression_(tree) {
    if (tree.type === COVER_FORMALS) {
      let expressions = tree.expressions;
      if (expressions.length === 0) {
        let message = 'Unexpected token )';
        this.reportError_(tree.location, message);
      } else {
        this.validateCoverFormalsAsParenExpression_(tree);

        let expression;
        if (expressions.length > 1)
          expression = new CommaExpression(expressions[0].location, expressions);
        else
          expression = expressions[0];

        return new ParenExpression(tree.location, expression);
      }
    }

    return tree;
  }

  toFormalParameters_(start, tree, asyncToken) {
    resetScanner(start.offset);
    return this.parseArrowFormalParameters_(asyncToken);
  }

  /**
   * ArrowFormalParameters[Yield, GeneratorParameter] :
   *   ( StrictFormalParameters[?Yield, ?GeneratorParameter] )
   */
  parseArrowFormalParameters_(asyncToken) {
    if (asyncToken)
      this.eat_(IDENTIFIER);
    this.eat_(OPEN_PAREN);
    let parameters = this.parseFormalParameters_();
    this.eat_(CLOSE_PAREN);
    return parameters;
  }

  /** @returns {TokenType} */
  peekArrow_(type) {
    return type === ARROW && this.options_.arrowFunctions;
  }

  /**
   * ConciseBody :
   *   [lookahead not {] AssignmentExpression
   *   { FunctionBody }
   *
   * @param {ParseTree} params
   * @return {ParseTree}
   */
  parseConciseBody_(params) {
    // The body can be a block or an expression. A '{' is always treated as
    // the beginning of a block.
    if (peek(OPEN_CURLY))
      return this.parseFunctionBody_(params);

    validateParameters(params, this.strictMode_, this.errorReporter_);
    return this.parseAssignmentExpression_(ALLOW_IN);
  }

  /**
   * Continues parsing generator expressions. The opening paren and the
   * expression is parsed by parseArrowFunction_.
   *
   * https://bugs.ecmascript.org/show_bug.cgi?id=381
   *
   * GeneratorComprehension :
   *   ( Comprehension )
   */
  parseGeneratorComprehension_(start) {
    let comprehensionList = this.parseComprehensionList_();
    let expression = this.parseAssignmentExpression_(ALLOW_IN);
    this.eat_(CLOSE_PAREN);
    return new GeneratorComprehension(this.getTreeLocation_(start),
                                      comprehensionList,
                                      expression);
  }

  /**
   * ForBinding :
   *   BindingIdentifier
   *   BindingPattern
   */
  parseForBinding_() {
    if (this.peekPattern_(peekType()))
      return this.parseBindingPattern_();
    return this.parseBindingIdentifier_();
  }

  // Destructuring; see
  // http://wiki.ecmascript.org/doku.php?id=harmony:destructuring
  //
  // SpiderMonkey is much more liberal in where it allows
  // parenthesized patterns, for example, it allows [x, ([y, z])] but
  // those inner parentheses aren't allowed in the grammar on the ES
  // wiki. This implementation conservatively only allows parentheses
  // at the top-level of assignment statements.

  peekPattern_(type) {
    return this.options_.destructuring && (this.peekObjectPattern_(type) ||
        this.peekArrayPattern_(type));
  }

  peekArrayPattern_(type) {
    return type === OPEN_SQUARE;
  }

  peekObjectPattern_(type) {
    return type === OPEN_CURLY;
  }

  /**
   * BindingPattern :
   *   ObjectBindingPattern
   *   ArrayBindingPattern
   */
  parseBindingPattern_() {
    return this.parsePattern_(true);
  }

  parsePattern_(useBinding) {
    if (this.peekArrayPattern_(peekType()))
      return this.parseArrayPattern_(useBinding);
    return this.parseObjectPattern_(useBinding);
  }

  /**
   * ArrayBindingPattern :
   *   []
   *   [ BindingElementList ]
   *   [ BindingElementList , Elisionopt BindingRestElementopt ]
   *
   * BindingElementList :
   *   Elisionopt BindingElement
   *   BindingElementList , Elisionopt BindingElement
   *
   * Elision :
   *   ,
   *   Elision ,
   */
  parseArrayBindingPattern_() {
    return this.parseArrayPattern_(true);
  }

  parsePatternElement_(useBinding) {
    return useBinding ?
        this.parseBindingElement_() : this.parseAssignmentElement_();
  }

  parsePatternRestElement_(useBinding) {
    return useBinding ?
        this.parseBindingRestElement_() : this.parseAssignmentRestElement_();
  }

  parseArrayPattern_(useBinding) {
    let start = this.getTreeStartLocation_();
    let elements = [];
    this.eat_(OPEN_SQUARE);
    while (true) {
      let type = peekType();
      if (type === COMMA) {
        elements.push(null);
      } else if (this.peekSpread_(type)) {
        elements.push(this.parsePatternRestElement_(useBinding));
        break;
      } else if (type === CLOSE_SQUARE || type === END_OF_FILE) {
        break;
      } else {
        elements.push(this.parsePatternElement_(useBinding));
      }

      type = peekType();
      if (type !== CLOSE_SQUARE) {
        this.eat_(COMMA);
      }
    }
    this.eat_(CLOSE_SQUARE);
    return new ArrayPattern(this.getTreeLocation_(start), elements);
  }

  /**
   * BindingElementList :
   *   Elisionopt BindingElement
   *   BindingElementList , Elisionopt BindingElement
   */
  parseBindingElementList_(elements) {
    this.parseElisionOpt_(elements);
    elements.push(this.parseBindingElement_());
    while (this.eatIf_(COMMA)) {
      this.parseElisionOpt_(elements);
      elements.push(this.parseBindingElement_());
    }
  }

  /**
   * Parses the elision opt production and appends null to the
   * {@code elements} array for every empty elision.
   *
   * @param {Array} elements The array to append to.
   */
  parseElisionOpt_(elements) {
    while (this.eatIf_(COMMA)) {
      elements.push(null);
    }
  }

  /**
   * BindingElement :
   *   SingleNameBinding
   *   BindingPattern Initializeropt
   *
   * SingleNameBinding :
   *   BindingIdentifier Initializeropt
   */
  peekBindingElement_(type) {
    return this.peekBindingIdentifier_(type) || this.peekPattern_(type);
  }

  /**
   * @return {ParseTree}
   */
  parseBindingElement_() {
    let start = this.getTreeStartLocation_();

    let binding = this.parseBindingElementBinding_();
    let initializer =
        this.parseBindingElementInitializer_(INITIALIZER_OPTIONAL);
    return new BindingElement(this.getTreeLocation_(start), binding,
        initializer);
  }

  parseBindingElementBinding_() {
    if (this.peekPattern_(peekType()))
      return this.parseBindingPattern_();
    return this.parseBindingIdentifier_();
  }

  parseBindingElementInitializer_(initializerRequired) {
    if (peek(EQUAL) || initializerRequired) {
      return this.parseInitializer_(ALLOW_IN);
    }

    return null;
  }

  /**
   * BindingRestElement :
   *   ... BindingIdentifier
   */
  parseBindingRestElement_() {
    let start = this.getTreeStartLocation_();
    this.eat_(DOT_DOT_DOT);
    let identifier = this.parseBindingIdentifier_();
    return new SpreadPatternElement(this.getTreeLocation_(start), identifier);
  }

  /**
   * ObjectBindingPattern :
   *   {}
   *   { BindingPropertyList }
   *   { BindingPropertyList , }
   *
   * BindingPropertyList :
   *   BindingProperty
   *   BindingPropertyList , BindingProperty
   */
  parseObjectPattern_(useBinding) {
    let start = this.getTreeStartLocation_();
    let elements = [];
    this.eat_(OPEN_CURLY);
    let type;
    while ((type = peekType()) !== CLOSE_CURLY && type !== END_OF_FILE) {
      elements.push(this.parsePatternProperty_(useBinding));
      if (!this.eatIf_(COMMA))
        break;
    }
    this.eat_(CLOSE_CURLY);
    return new ObjectPattern(this.getTreeLocation_(start), elements);
  }

  /**
   * BindingProperty :
   *   SingleNameBinding
   *   PropertyName : BindingElement
   *
   * SingleNameBinding :
   *   BindingIdentifier Initializeropt
   */
  parsePatternProperty_(useBinding) {
    let start = this.getTreeStartLocation_();

    let name = this.parsePropertyName_();

    let requireColon = name.type !== LITERAL_PROPERTY_NAME ||
        !name.literalToken.isStrictKeyword() &&
        name.literalToken.type !== IDENTIFIER;
    if (requireColon || peek(COLON)) {
      this.eat_(COLON);
      let element = this.parsePatternElement_(useBinding);
      // TODO(arv): Rename ObjectPatternField to BindingProperty
      return new ObjectPatternField(this.getTreeLocation_(start),
                                    name, element);
    }

    let token = name.literalToken;
    if (this.strictMode_ && token.isStrictKeyword())
      this.reportReservedIdentifier_(token);

    if (useBinding) {
      let binding = new BindingIdentifier(name.location, token);
      let initializer = this.parseInitializerOpt_(ALLOW_IN);
      return new BindingElement(this.getTreeLocation_(start), binding,
                                initializer);
    }

    let assignment = new IdentifierExpression(name.location, token);
    let initializer = this.parseInitializerOpt_(ALLOW_IN);
    return new AssignmentElement(this.getTreeLocation_(start), assignment,
                                 initializer);
  }

  parseAssignmentPattern_() {
    return this.parsePattern_(false);
  }

  /**
   * ArrayAssignmentPattern[Yield] :
   *   [ Elisionopt AssignmentRestElement[?Yield]opt ]
   *   [ AssignmentElementList[?Yield] ]
   *   [ AssignmentElementList[?Yield] , Elisionopt AssignmentRestElement[?Yield]opt ]
   *
   * AssignmentRestElement[Yield] :
   *   ... DestructuringAssignmentTarget[?Yield]
   *
   * AssignmentElementList[Yield] :
   *   AssignmentElisionElement[?Yield]
   *   AssignmentElementList[?Yield] , AssignmentElisionElement[?Yield]
   *
   * AssignmentElisionElement[Yield] :
   *   Elisionopt AssignmentElement[?Yield]
   *
   * AssignmentElement[Yield] :
   *   DestructuringAssignmentTarget[?Yield] Initializer[In,?Yield]opt
   *
   * DestructuringAssignmentTarget[Yield] :
   *   LeftHandSideExpression[?Yield]
   */
  parseArrayAssignmentPattern_() {
    return this.parseArrayPattern_(false);
  }

  parseAssignmentElement_() {
    let start = this.getTreeStartLocation_();

    let assignment = this.parseDestructuringAssignmentTarget_();
    let initializer = this.parseInitializerOpt_(ALLOW_IN);
    return new AssignmentElement(this.getTreeLocation_(start), assignment,
        initializer);
  }

  parseDestructuringAssignmentTarget_() {
    switch (peekType()) {
      case OPEN_SQUARE:
        return this.parseArrayAssignmentPattern_();
      case OPEN_CURLY:
        return this.parseObjectAssignmentPattern_();
    }
    let expression = this.parseLeftHandSideExpression_();
    expression = this.coverFormalsToParenExpression_(expression)
    this.validateAssignmentTarget_(expression, 'assignment');
    return expression;
  }

  parseAssignmentRestElement_() {
    let start = this.getTreeStartLocation_();
    this.eat_(DOT_DOT_DOT);
    let id = this.parseDestructuringAssignmentTarget_();
    return new SpreadPatternElement(this.getTreeLocation_(start), id);
  }

  /**
   * ObjectAssignmentPattern[Yield] :
   *   { }
   *   { AssignmentPropertyList[?Yield] }
   *   { AssignmentPropertyList[?Yield] , }
   *
   * AssignmentPropertyList[Yield] :
   *   AssignmentProperty[?Yield]
   *   AssignmentPropertyList[?Yield] , AssignmentProperty[?Yield]
   *
   * AssignmentProperty[Yield] :
   *   IdentifierReference[?Yield] Initializer[In,?Yield]opt
   *   PropertyName : AssignmentElement[?Yield]
   */
  parseObjectAssignmentPattern_() {
    return this.parseObjectPattern_(false);
  }

  parseAssignmentProperty_() {
    return this.parsePatternProperty_(false);
  }

  /**
   * Template Literals
   *
   * Template ::
   *   FullTemplate
   *   TemplateHead
   *
   * FullTemplate ::
   *   ` TemplateCharactersopt `
   *
   * TemplateHead ::
   *   ` TemplateCharactersopt ${
   *
   * TemplateSubstitutionTail ::
   *   TemplateMiddle
   *   TemplateTail
   *
   * TemplateMiddle ::
   *   } TemplateCharactersopt ${
   *
   * TemplateTail ::
   *   } TemplateCharactersopt `
   *
   * TemplateCharacters ::
   *   TemplateCharacter TemplateCharactersopt
   *
   * TemplateCharacter ::
   *   SourceCharacter but not one of ` or \ or $
   *   $ [lookahead not { ]
   *   \ EscapeSequence
   *   LineContinuation
   *
   * @param {ParseTree} operand
   * @return {ParseTree}
   * @private
   */
  parseTemplateLiteral_(operand) {
    let start = operand ?
        operand.location.start : this.getTreeStartLocation_();

    let token = nextToken();
    let elements = [new TemplateLiteralPortion(token.location, token)];

    if (token.type === NO_SUBSTITUTION_TEMPLATE) {
      return new TemplateLiteralExpression(this.getTreeLocation_(start),
                                        operand, elements);
    }

    // `abc${
    let expression = this.parseExpression_(ALLOW_IN);
    elements.push(new TemplateSubstitution(expression.location, expression));

    while (expression.type !== SYNTAX_ERROR_TREE) {
      token = nextTemplateLiteralToken();
      if (token.type === ERROR || token.type === END_OF_FILE)
        break;

      elements.push(new TemplateLiteralPortion(token.location, token));
      if (token.type === TEMPLATE_TAIL)
        break;

      expression = this.parseExpression_(ALLOW_IN);
      elements.push(new TemplateSubstitution(expression.location, expression));
    }

    return new TemplateLiteralExpression(this.getTreeLocation_(start),
                                      operand, elements);
  }

  parseTypeAnnotationOpt_() {
    if (this.options_.types && this.eatOpt_(COLON)) {
      return this.parseType_();
    }
    return null;
  }

  /**
   * Types
   *
   * Type:
   *   PrimaryOrUnionType
   *   FunctionType
   *   ConstructorType
   *
   * PrimaryOrUnionType:
   *   PrimaryType
   *   UnionType
   *
   * PrimaryType:
   *   ParenthesizedType
   *   PredefinedType
   *   TypeReference
   *   ObjectType
   *   ArrayType
   *   TupleType
   *   TypeQuery
   *
   * ParenthesizedType:
   *   ( Type )
   *
   * @return {ParseTree}
   * @private
   */
  parseType_() {
    switch (peekType()) {
      case NEW:
        return this.parseConstructorType_();

      case OPEN_PAREN:
      case OPEN_ANGLE:
        return this.parseFunctionType_();
    }

    let start = this.getTreeStartLocation_();
    let elementType = this.parsePrimaryType_();
    return this.parseUnionTypeSuffix_(start, elementType);
  }

  parsePrimaryType_() {
    let start = this.getTreeStartLocation_();
    let elementType, token;
    switch (peekType()) {
      case VOID:
        token = nextToken();
        elementType = new PredefinedType(this.getTreeLocation_(start), token);
        break;

      case IDENTIFIER:
        switch (peekToken().value) {
          case 'any':
          case 'boolean':
          case 'number':
          case 'string':
          case 'symbol':
            token = nextToken();
            elementType =
                new PredefinedType(this.getTreeLocation_(start), token);
            break;
          default:
            elementType = this.parseTypeReference_();
        }
        break;

      case TYPEOF:
        elementType = this.parseTypeQuery_(start);
        break;

      case OPEN_CURLY:
        elementType = this.parseObjectType_();
        break;

      // TODO(arv): ParenthesizedType
      // case OPEN_PAREN:


      default:
        return this.parseUnexpectedToken_();
    }

    return this.parseArrayTypeSuffix_(start, elementType);
  }

  parseTypeReference_() {
    let start = this.getTreeStartLocation_();
    let typeName = this.parseTypeName_();
    let args = null;
    if (peek(OPEN_ANGLE)) {
      let args = this.parseTypeArguments_();
      return new TypeReference(this.getTreeLocation_(start), typeName, args);
    }
    return typeName;
  }

  parseUnionTypeSuffix_(start, elementType) {
    if (peek(BAR)) {
      let types = [elementType];
      this.eat_(BAR);
      while (true) {
        types.push(this.parsePrimaryType_());
        if (!this.eatIf_(BAR)) {
          break;
        }
      }
      return new UnionType(this.getTreeLocation_(start), types);
    }
    return elementType;
  }

  parseArrayTypeSuffix_(start, elementType) {
    let token = peekTokenNoLineTerminator();
    if (token && token.type === OPEN_SQUARE) {
      this.eat_(OPEN_SQUARE);
      this.eat_(CLOSE_SQUARE);
      elementType = new ArrayType(this.getTreeLocation_(start), elementType);
      return this.parseArrayTypeSuffix_(start, elementType);
    }

    return elementType;
  }

  parseTypeArguments_() {
    let start = this.getTreeStartLocation_();
    this.eat_(OPEN_ANGLE);
    let args = [this.parseType_()];
    while (peek(COMMA)) {
      this.eat_(COMMA);
      args.push(this.parseType_());
    }

    let token = nextCloseAngle();
    if (token.type !== CLOSE_ANGLE) {
      return this.parseUnexpectedToken_(token);
    }

    return new TypeArguments(this.getTreeLocation_(start), args);
  }

  parseConstructorType_() {
    let start = this.getTreeStartLocation_();
    this.eat_(NEW);
    let typeParameters = this.parseTypeParametersOpt_();
    this.eat_(OPEN_PAREN);
    let parameterList = this.parseFormalParameters_();
    this.eat_(CLOSE_PAREN);
    this.eat_(ARROW);
    let returnType = this.parseType_();
    return new ConstructorType(this.getTreeLocation_(start), typeParameters,
                               parameterList, returnType);
  }

  // ObjectType:
  //   { TypeBodyopt }
  //
  // TypeBody:
  //   TypeMemberList ;opt
  //
  // TypeMemberList:
  //   TypeMember
  //   TypeMemberList ; TypeMember
  parseObjectType_() {
    let start = this.getTreeStartLocation_();
    let typeMembers = [];
    this.eat_(OPEN_CURLY);
    let type;
    while (this.peekTypeMember_(type = peekType())) {
      typeMembers.push(this.parseTypeMember_(type));
      if (!this.eatIf_(SEMI_COLON)) {
        break;
      }
    }
    this.eat_(CLOSE_CURLY);

    return new ObjectType(this.getTreeLocation_(start), typeMembers);
  }

  peekTypeMember_(type) {
    switch (type) {
      case NEW:
      case OPEN_PAREN:
      case OPEN_ANGLE:
      case OPEN_SQUARE:
      case IDENTIFIER:
      case STRING:
      case NUMBER:
        return true;
      default:
        return peekToken().isKeyword();
    }
  }

  // TypeMember:
  //   PropertySignature
  //   CallSignature
  //   ConstructSignature
  //   IndexSignature
  //   MethodSignature
  parseTypeMember_(type) {
    switch (type) {
      case NEW:
        return this.parseConstructSignature_();
      case OPEN_PAREN:
      case OPEN_ANGLE:
        return this.parseCallSignature_();
      case OPEN_SQUARE:
        return this.parseIndexSignature_();
    }

    let start = this.getTreeStartLocation_();
    let propertyName = this.parseLiteralPropertyName_();
    let isOpt = this.eatIf_(QUESTION);
    type = peekType();
    if (type === OPEN_ANGLE || type === OPEN_PAREN) {
      let callSignature = this.parseCallSignature_();
      return new MethodSignature(this.getTreeLocation_(start), propertyName,
                                 isOpt, callSignature);
    }

    let typeAnnotation = this.parseTypeAnnotationOpt_();
    return new PropertySignature(this.getTreeLocation_(start), propertyName,
                                 isOpt, typeAnnotation);
  }

  parseCallSignature_() {
    let start = this.getTreeStartLocation_();
    let typeParameters = this.parseTypeParametersOpt_();
    this.eat_(OPEN_PAREN)
    let parameterList = this.parseFormalParameters_();
    this.eat_(CLOSE_PAREN);
    let returnType = this.parseTypeAnnotationOpt_();
    return new CallSignature(this.getTreeLocation_(start), typeParameters,
                             parameterList, returnType);
  }

  parseConstructSignature_() {
    let start = this.getTreeStartLocation_();
    this.eat_(NEW);
    let typeParameters = this.parseTypeParametersOpt_();
    this.eat_(OPEN_PAREN)
    let parameterList = this.parseFormalParameters_();
    this.eat_(CLOSE_PAREN);
    let returnType = this.parseTypeAnnotationOpt_();
    return new ConstructSignature(this.getTreeLocation_(start), typeParameters,
                                  parameterList, returnType);
  }

  parseIndexSignature_() {
    let start = this.getTreeStartLocation_();
    this.eat_(OPEN_SQUARE);
    let id = this.eatId_();
    this.eat_(COLON);
    let typeName;
    let typeStart = this.getTreeStartLocation_();
    if (this.peekPredefinedString_('string')) {
      typeName = this.eatId_('string');
    } else {
      typeName = this.eatId_('number');
    }
    let indexType =
        new PredefinedType(this.getTreeLocation_(typeStart), typeName);
    this.eat_(CLOSE_SQUARE);
    this.eat_(COLON);
    let typeAnnotation = this.parseType_();
    return new IndexSignature(this.getTreeLocation_(start), id, indexType,
                              typeAnnotation);
  }

  parseFunctionType_() {
    let start = this.getTreeStartLocation_();
    let typeParameters = this.parseTypeParametersOpt_();
    this.eat_(OPEN_PAREN)
    let parameterList = this.parseFormalParameters_();
    this.eat_(CLOSE_PAREN);
    this.eat_(ARROW);
    let returnType = this.parseType_();
    return new FunctionType(this.getTreeLocation_(start), typeParameters,
                            parameterList, returnType);
  }

  parseTypeQuery_(start) {
    throw 'NYI';
  }

  // TypeParameters:
  //   < TypeParameterList >
  //
  // TypeParameterList:
  //   TypeParameter
  //   TypeParameterList , TypeParameter
  //
  // TypeParameter:
  //   Identifier Constraintopt
  //
  // Constraint:
  //   extends Type

  peekTypeParameters_() {
    return peek(OPEN_ANGLE);
  }

  parseTypeParametersOpt_() {
    if (peek(OPEN_ANGLE)) {
      return this.parseTypeParameters_();
    }
    return null;
  }

  parseTypeParameters_() {
    let start = this.getTreeStartLocation_();
    this.eat_(OPEN_ANGLE);
    let parameters = [this.parseTypeParameter_()];
    while (peek(COMMA)) {
      this.eat_(COMMA);
      parameters.push(this.parseTypeParameter_());
    }
    this.eat_(CLOSE_ANGLE);
    return new TypeParameters(this.getTreeLocation_(start), parameters);
  }

  parseTypeParameter_() {
    let start = this.getTreeStartLocation_();
    let id = this.eatId_();
    let extendsType = null;
    if (this.eatIf_(EXTENDS) ) {
      extendsType = this.parseType_();
    }
    return new TypeParameter(this.getTreeLocation_(start), id, extendsType);
  }

  /**
   * PredefinedType ::
   *   any
   *   number
   *   bool
   *   string
   * @return {ParseTree}
   * @private
   */
  parseNamedOrPredefinedType_() {
    let start = this.getTreeStartLocation_();

    switch (peekToken().value) {
      case 'any':
      case 'number':
      case 'boolean':
      case 'string': {
      // void is handled in parseTye
        let token = nextToken();
        return new PredefinedType(this.getTreeLocation_(start), token);
      }
      default:
        return this.parseTypeName_();
    }
  }

  /**
   * Type Name ::
   *   ModuleOrTypeName
   *
   * ModuleOrTypeName ::
   *   Identifier
   *   ModuleName . Identifier
   *
   * ModuleName ::
   *   ModuleOrTypeName
   *
   * @return {ParseTree}
   * @private
   */
  parseTypeName_() {
    let start = this.getTreeStartLocation_();
    let id = this.eatId_();
    let typeName = new TypeName(this.getTreeLocation_(start), null, id);
    while (this.eatIf_(PERIOD)) {
      let memberName = this.eatIdName_();
      typeName = new TypeName(this.getTreeLocation_(start), typeName,
      memberName);
    }
    return typeName;
  }

  /**
   * interface Identifier TypeParameters_opt InterfaceExtendsClause_opt
   *     ObjectType
   *
   * InterfaceExtendsClause:
   *   extends ClassOrInterfaceTypeList
   *
   * ClassOrInterfaceTypeList:
   *   ClassOrInterfaceType
   *   ClassOrInterfaceTypeList , ClassOrInterfaceType
   *
   * ClassOrInterfaceType:
   *   TypeReference
   */
  parseInterfaceDeclaration_() {
    let start = this.getTreeStartLocation_();
    this.eat_(INTERFACE);
    let name = this.eatId_();
    let typeParameters = this.parseTypeParametersOpt_();
    let extendsClause;
    if (this.eatIf_(EXTENDS)) {
      extendsClause = this.parseInterfaceExtendsClause_();
    } else {
      extendsClause = [];
    }
    let objectType = this.parseObjectType_();
    return new InterfaceDeclaration(this.getTreeLocation_(start),
        name, typeParameters, extendsClause, objectType);
  }

  parseInterfaceExtendsClause_() {
    let result = [this.parseTypeReference_()];
    while (this.eatIf_(COMMA)) {
      result.push(this.parseTypeReference_());
    }
     return result;
  }

  /**
   * Annotations extension
   *
   * @return {ParseTree}
   * @private
   */
  parseAnnotatedDeclarations_(parsingModuleItem) {
    this.pushAnnotations_();

    let declaration;
    let type = peekType();
    if (parsingModuleItem) {
      declaration = this.parseModuleItem_(type);
    } else {
      declaration = this.parseStatementListItem_(type);
    }
    if (this.annotations_.length > 0) {
      this.reportError_(this.annotations_[0].location,
                        'Unsupported annotated expression');
    }
    return declaration;
  }

  parseAnnotations_() {
    let annotations = [];
    while (this.eatIf_(AT)) {
      annotations.push(this.parseAnnotation_());
    }
    return annotations;
  }

  pushAnnotations_() {
    this.annotations_ = this.parseAnnotations_();
  }

  popAnnotations_() {
    let annotations = this.annotations_;
    this.annotations_ = [];
    return annotations;
  }

  parseAnnotation_() {
    let start = this.getTreeStartLocation_();
    let expression = this.parseMemberExpressionNoNew_();
    let args = null;

    if (peek(OPEN_PAREN))
      args = this.parseArguments_();

    return new Annotation(this.getTreeLocation_(start), expression, args);
  }

  parseTypeAliasDeclaration_() {
    // TypeAliasDeclaration:
    //   type Identifier = Type ;
    let start = this.getTreeStartLocation_();
    this.eatId_(TYPE);
    let name = this.eatId_();
    this.eat_(EQUAL);
    let type = this.parseType_();
    this.eatPossibleImplicitSemiColon_();
    return new TypeAliasDeclaration(this.getTreeLocation_(start), name, type);
  }

  parseJsxElement_() {
    let token = this.eatJsx_(OPEN_ANGLE);
    return this.parseJsxElementContinuation_(token.location.start);
  }

  parseJsxElementContinuation_(start) {
    let name = this.parseJsxElementName_();
    let attrs = this.parseJsxAttributes_();
    let children = [];

    switch (peekJsxToken().type) {
      case SLASH:
        nextJsxToken();
        this.eat_(CLOSE_ANGLE);
        break;

      case CLOSE_ANGLE: {
        nextJsxTextToken();

        loop: while (true) {
          let token = nextJsxTextToken();

          switch (token.type) {
            case STRING: {
              children.push(new JsxText(token.location, token))
              continue;
            }

            case OPEN_CURLY: {
              let start = token.location.start;
              let expression = null;
              if (!peek(CLOSE_CURLY)) {
                expression = this.parseAssignmentExpression_(ALLOW_IN);
              }
              this.eatJsx_(CLOSE_CURLY);
              let placeHolder =
                  new JsxPlaceholder(this.getTreeLocation_(start), expression);
              children.push(placeHolder);
              continue;
            }

            case OPEN_ANGLE: {
              let start = token.location.start;
              if (peekJsxToken().type === SLASH) {
                nextJsxToken();
                break loop;
              }

              let subElement = this.parseJsxElementContinuation_(start)
              children.push(subElement);
              // Make sure we get possible whitespace after the element.
              resetScanner(subElement.location.end.offset);
              continue;
            }

            default:
              return this.parseSyntaxError_('Unexpected token');
          }
        }

        let closeName = this.parseJsxElementName_();
        if (!jsxNamesEqual(name, closeName)) {
          this.reportError_(closeName.location,
              `Non matching JSX closing tag. Expected ${jsxNameToString(name)
              }, found ${jsxNameToString(closeName)}`);
        }
        this.eat_(CLOSE_ANGLE);
        break;
      }

      default:
        return this.parseSyntaxError_('Unexpected token');
    }
    let element =
        new JsxElement(this.getTreeLocation_(start), name, attrs, children);
    // resetScanner(element.location.end.offset);
    return element;

  }

  parseJsxElementName_() {
    let tokens = [];
    let id = this.eatJsx_(JSX_IDENTIFIER);
    let start = id.location.start;
    tokens.push(id);
    while (peekJsxToken().type === PERIOD) {
      nextJsxToken();
      let id = this.eatJsx_(JSX_IDENTIFIER);
      tokens.push(id);
    }
    return new JsxElementName(this.getTreeLocation_(start), tokens);
  }

  parseJsxAttributes_() {
    let attributes = [];
    loop: while (true) {
      switch (peekJsxToken().type) {
        case JSX_IDENTIFIER:
          attributes.push(this.parseJsxAttribute_());
          break;
        case OPEN_CURLY:
          attributes.push(this.parseJsxSpreadAttribute_());
          break;
        default:
          break loop;
      }
    }
    return attributes;
  }

  parseJsxAttribute_() {
    let name = this.eatJsx_(JSX_IDENTIFIER);
    let start = name.location.start;
    let value = null;
    if (peekJsxToken().type === EQUAL) {
      this.eatJsx_(EQUAL);
      value = this.parseJsxAttributeValue_();
    }
    return new JsxAttribute(this.getTreeLocation_(start), name, value);
  }

  parseJsxAttributeValue_() {
    let token = peekJsxToken();
    let start = token.location.start;
    switch (token.type) {
      case STRING:
        nextJsxToken();
        return new LiteralExpression(this.getTreeLocation_(start), token);
      case OPEN_CURLY: {
        nextJsxToken();
        let expr = this.parseAssignmentExpression_(ALLOW_IN);
        this.eatJsx_(CLOSE_CURLY);
        return new JsxPlaceholder(this.getTreeLocation_(start), expr);
      }
      case OPEN_ANGLE:
        return this.parseJsxElement_();
    }
    return this.parseSyntaxError_('Unexpected token');
  }

  parseJsxSpreadAttribute_() {
    let token = peekJsxToken();
    let start = token.location.start;
    nextJsxToken();
    this.eatJsx_(DOT_DOT_DOT);
    let expr = this.parseAssignmentExpression_(ALLOW_IN);
    this.eatJsx_(CLOSE_CURLY);
    return new JsxSpreadAttribute(this.getTreeLocation_(start), expr);
  }

  /**
   * Consume a (possibly implicit) semi-colon. Reports an error if a semi-colon
   * is not present.
   *
   * @return {void}
   * @private
   */
  eatPossibleImplicitSemiColon_() {
    let token = peekTokenNoLineTerminator();
    if (!token)
      return;

    switch (token.type) {
      case SEMI_COLON:
        nextToken();
        return;
      case END_OF_FILE:
      case CLOSE_CURLY:
        return;
    }

    this.reportError_(token.location, 'Semi-colon expected');
  }

  /**
   * Returns true if an implicit or explicit semi colon is at the current location.
   *
   * @return {boolean}
   * @private
   */
  peekImplicitSemiColon_() {
    switch (peekType()) {
      case SEMI_COLON:
      case CLOSE_CURLY:
      case END_OF_FILE:
        return true;
    }
    let token = peekTokenNoLineTerminator();
    return token === null;
  }

  /**
   * Consumes the next token if it is of the expected type. Otherwise returns null.
   * Never reports errors.
   *
   * @param {TokenType} expectedTokenType
   * @return {Token} The consumed token, or null if the next token is not of the expected type.
   * @private
   */
  eatOpt_(expectedTokenType) {
    if (peek(expectedTokenType))
      return nextToken();
    return null;
  }

  /**
   * Shorthand for this.eatOpt_(IDENTIFIER)
   *
   * @return {IdentifierToken}
   * @private
   */
  eatIdOpt_() {
    return peek(IDENTIFIER) ? this.eatId_() : null;
  }

  /**
   * Shorthand for this.eat_(IDENTIFIER)
   * @param {string=} expected
   * @return {IdentifierToken}
   * @private
   */
  eatId_(expected = undefined) {
    let token = nextToken();

    if (token.type === IDENTIFIER) {
      if (expected && token.value !== expected)
        this.reportExpectedError_(token, expected);

      return token;
    }

    if (token.isStrictKeyword()) {
      if (this.strictMode_) {
        this.reportReservedIdentifier_(token);
      } else {
        // Use an identifier token instead because it is treated as such and
        // this simplifies the transformers.
        return new IdentifierToken(token.location, token.type);
      }
    } else {
      this.reportExpectedError_(token, expected || 'identifier');
    }

    return token;
  }

  /**
   * Eats an identifier or keyword. Equivalent to IdentifierName in the spec.
   *
   * @return {Token}
   * @private
   */
  eatIdName_() {
    let t = nextToken();
    if (t.type !== IDENTIFIER) {
      if (!t.isKeyword()) {
        this.reportExpectedError_(t, 'identifier');
        return null;
      }
      return new IdentifierToken(t.location, t.type);
    }
    return t;
  }

  /**
   * Consumes the next token. If the consumed token is not of the expected type
   * then report an error and return null. Otherwise return the consumed token.
   *
   * @param {TokenType} expectedTokenType
   * @return {Token} The consumed token, or null if the next token is not of
   *     the expected type.
   * @private
   */
  eat_(expectedTokenType) {
    return this.isExpectedToken_(nextToken(), expectedTokenType);
  }

  /**
   * If the next token matches the given TokenType, this consumes the token
   * and returns true.
   */
  eatIf_(expectedTokenType) {
    if (peek(expectedTokenType)) {
      nextToken();
      return true;
    }
    return false;
  }

  eatJsx_(expectedTokenType) {
    return this.isExpectedToken_(nextJsxToken(), expectedTokenType);
  }

  isExpectedToken_(token, expectedTokenType) {
    if (token.type !== expectedTokenType) {
      this.reportExpectedError_(token, expectedTokenType);
    }
    return token;
  }

  /**
   * Report a 'X' expected error message.
   * @param {Token} token The location to report the message at.
   * @param {Object} expected The thing that was expected.
   *
   * @return {void}
   * @private
   */
  reportExpectedError_(token, expected) {
    this.reportError_(token.location, `Unexpected token ${token}`);
  }

  /**
   * Returns a SourcePosition for the start of a parse tree that starts at the current location.
   *
   * @return {SourcePosition}
   * @private
   */
  getTreeStartLocation_() {
    return peekLocation().start;
  }

  /**
   * Returns a SourcePosition for the end of a parse tree that ends at the current location.
   *
   * @return {SourcePosition}
   * @private
   */
  getTreeEndLocation_() {
    return getLastToken().location.end;
  }

  /**
   * Returns a SourceRange for a parse tree that starts at {start} and ends at the current location.
   *
   * @return {SourceRange}
   * @private
   */
  getTreeLocation_(start) {
    return new SourceRange(start, this.getTreeEndLocation_());
  }

  handleComment(range) {
    // TODO(arv): Attach to tree nodes.
  }

  isAtEnd() {
    return isAtEnd();
  }

  /**
   * Reports an error message.
   * @param {SourceRange} location
   * @param {string} message The message to report in String.format style.
   * @private
   */
  reportError_(location, message) {
    this.errorReporter_.reportError(location, message);
  }

  reportReservedIdentifier_(token) {
    this.reportError_(token.location, `${token.type} is a reserved identifier`);
  }

  validateAssignmentTarget_(tree, operation) {
    if (!tree.isPattern() &&
        !isValidSimpleAssignmentTarget(tree, this.strictMode_)) {
      this.reportError_(tree.location,
                        `Invalid left-hand side expression in ${operation}`);
    }
  }
}

function jsxNamesEqual(name, other) {
  if (name.names.length !== other.names.length) {
    return false;
  }
  for (let i = 0; i < name.names.length; i++) {
    if (name.names[i].value !== other.names[i].value) {
      return false;
    }
  }
  return true;
}

function jsxNameToString(name) {
  return name.names.join('.');
}
