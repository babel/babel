var _Parser_this, _Parser_constructor_dynamic, _Parser_getScopeHandler_dynamic, _Parser_parse_dynamic, _Parser_parseTopLevel_dynamic, _Parser_chStartsBindingIdentifier_dynamic, _Parser_parseStatementLike_dynamic, _Parser_parseStatementContent_dynamic, _Parser_assertModuleNodeAllowed_dynamic, _Parser_canHaveLeadingDecorator_dynamic, _Parser_parseMaybeDecoratorArguments_dynamic, _Parser_verifyBreakContinue_dynamic, _Parser_parseCatchClauseParam_dynamic, _Parser_parseVarStatement_dynamic, _Parser_parseExpressionStatement_dynamic, _Parser_parseBlock_dynamic, _Parser_isValidDirective_dynamic, _Parser_parseBlockBody_dynamic, _Parser_parseVarId_dynamic, _Parser_parseFunctionId_dynamic, _Parser_parseFunctionParams_dynamic, _Parser_registerFunctionStatementId_dynamic, _Parser_parseClass_dynamic, _Parser_isClassProperty_dynamic, _Parser_isClassMethod_dynamic, _Parser_nameIsConstructor_dynamic, _Parser_isNonstaticConstructor_dynamic, _Parser_parseClassMember_dynamic, _Parser_parseClassMemberWithIsStatic_dynamic, _Parser_pushClassMethod_dynamic, _Parser_pushClassPrivateMethod_dynamic, _Parser_declareClassPrivateMethodInScope_dynamic, _Parser_parsePostMemberNameModifiers_dynamic, _Parser_parseClassPrivateProperty_dynamic, _Parser_parseClassProperty_dynamic, _Parser_parseClassAccessorProperty_dynamic, _Parser_parseClassId_dynamic, _Parser_parseClassSuper_dynamic, _Parser_parseExport_dynamic, _Parser_eatExportStar_dynamic, _Parser_maybeParseExportDefaultSpecifier_dynamic, _Parser_maybeParseExportNamespaceSpecifier_dynamic, _Parser_parseExportDefaultExpression_dynamic, _Parser_parseExportDeclaration_dynamic, _Parser_isExportDefaultSpecifier_dynamic, _Parser_shouldParseExportDeclaration_dynamic, _Parser_checkExport_dynamic, _Parser_checkDeclaration_dynamic, _Parser_checkDuplicateExports_dynamic, _Parser_parseExportSpecifier_dynamic, _Parser_checkImportReflection_dynamic, _Parser_isPotentialImportPhase_dynamic, _Parser_applyImportPhase_dynamic, _Parser_parseImport_dynamic, _Parser_parseImportSource_dynamic, _Parser_parseImportSpecifierLocal_dynamic, _Parser_parseImportSpecifier_dynamic, _Parser_getExpression_dynamic, _Parser_parseMaybeAssign_dynamic, _Parser_parseConditional_dynamic, _Parser_parseExprOp_dynamic, _Parser_parseMaybeUnary_dynamic, _Parser_parseSubscripts_dynamic, _Parser_parseSubscript_dynamic, _Parser_stopParseSubscript_dynamic, _Parser_parseMember_dynamic, _Parser_toReferencedArguments_dynamic, _Parser_finishCallExpression_dynamic, _Parser_shouldParseAsyncArrow_dynamic, _Parser_parseAsyncArrowFromCallExpression_dynamic, _Parser_parseExprAtom_dynamic, _Parser_parsePrivateName_dynamic, _Parser_parseLiteral_dynamic, _Parser_parseStringLiteral_dynamic, _Parser_parseNumericLiteral_dynamic, _Parser_parseBigIntLiteral_dynamic, _Parser_parseDecimalLiteral_dynamic, _Parser_parseRegExpLiteral_dynamic, _Parser_parseBooleanLiteral_dynamic, _Parser_parseNullLiteral_dynamic, _Parser_parseParenAndDistinguishExpression_dynamic, _Parser_shouldParseArrow_dynamic, _Parser_parseArrow_dynamic, _Parser_parseParenItem_dynamic, _Parser_parseNewCallee_dynamic, _Parser_parseTemplateSubstitution_dynamic, _Parser_getGetterSetterExpectedParamCount_dynamic, _Parser_getObjectOrClassMethodParams_dynamic, _Parser_checkGetterSetterParams_dynamic, _Parser_parseObjectProperty_dynamic, _Parser_finishObjectProperty_dynamic, _Parser_parseObjPropValue_dynamic, _Parser_initFunction_dynamic, _Parser_parseMethod_dynamic, _Parser_parseArrayLike_dynamic, _Parser_setArrowFunctionParameters_dynamic, _Parser_parseFunctionBodyAndFinish_dynamic, _Parser_parseFunctionBody_dynamic, _Parser_isSimpleParameter_dynamic, _Parser_checkParams_dynamic, _Parser_parseIdentifier_dynamic, _Parser_checkReservedWord_dynamic, _Parser_parsePropertyNamePrefixOperator_dynamic, _Parser_toAssignable_dynamic, _Parser_toAssignableObjectExpressionProp_dynamic, _Parser_toAssignableList_dynamic, _Parser_toAssignableListItem_dynamic, _Parser_isAssignable_dynamic, _Parser_toReferencedList_dynamic, _Parser_parseBindingAtom_dynamic, _Parser_parseBindingElement_dynamic, _Parser_parseFunctionParamType_dynamic, _Parser_parseMaybeDefault_dynamic, _Parser_isValidLVal_dynamic, _Parser_isOptionalMemberExpression_dynamic, _Parser_checkToRestConversion_dynamic, _Parser_checkCommaAfterRest_dynamic, _Parser_finishNode_dynamic, _Parser_finishNodeAt_dynamic, _Parser_resetStartLocation_dynamic, _Parser_resetEndLocation_dynamic, _Parser_castNodeTo_dynamic, _Parser_cloneIdentifier_dynamic, _Parser_cloneStringLiteral_dynamic, _Parser_isPrivateName_dynamic, _Parser_getPrivateNameSV_dynamic, _Parser_hasPropertyAsPrivateName_dynamic, _Parser_isObjectProperty_dynamic, _Parser_isObjectMethod_dynamic, _Parser_skipBlockComment_dynamic, _Parser_skipSpace_dynamic, _Parser_finishToken_dynamic, _Parser_readToken_mult_modulo_dynamic, _Parser_readToken_pipe_amp_dynamic, _Parser_getTokenFromCode_dynamic, _Parser_updateContext_dynamic, _Parser_addComment_dynamic, _Parser_fillOptionalPropertiesForTSESLint_dynamic, _Parser_jsxParseOpeningElementAfterName_dynamic, _Parser_typeCastToParameter_dynamic, _Parser_reScan_lt_gt_dynamic, _Parser_reScan_lt_dynamic;
function _placeholders_parsePlaceholder(expectedNode) {
  if (_Tokenizer_match(133)) {
    const node = _NodeUtils_startNode();
    _Tokenizer_next();
    _placeholders_assertNoSpace();
    node.name = _ExpressionParser_parseIdentifier(true);
    _placeholders_assertNoSpace();
    _UtilParser_expect(133);
    return _placeholders_finishPlaceholder(node, expectedNode);
  }
}
function _placeholders_finishPlaceholder(node, expectedNode) {
  let placeholder = node;
  if (!placeholder.expectedNode || !placeholder.type) {
    placeholder = _Parser_finishNode_dynamic(placeholder, "Placeholder");
  }
  placeholder.expectedNode = expectedNode;
  return placeholder;
}
function _placeholders_getTokenFromCode(__super, code) {
  if (code === 37 && _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1) === 37) {
    _Tokenizer_finishOp(133, 2);
  } else {
    __super(code);
  }
}
function _placeholders_parseExprAtom(__super, refExpressionErrors) {
  return _placeholders_parsePlaceholder("Expression") || __super(refExpressionErrors);
}
function _placeholders_parseIdentifier(__super, liberal) {
  return _placeholders_parsePlaceholder("Identifier") || __super(liberal);
}
function _placeholders_checkReservedWord(__super, word, startLoc, checkKeywords, isBinding) {
  if (word !== undefined) {
    __super(word, startLoc, checkKeywords, isBinding);
  }
}
function _placeholders_cloneIdentifier(__super, node) {
  const cloned = __super(node);
  if (cloned.type === "Placeholder") {
    cloned.expectedNode = node.expectedNode;
  }
  return cloned;
}
function _placeholders_cloneStringLiteral(__super, node) {
  if (node.type === "Placeholder") {
    return _Parser_cloneIdentifier_dynamic(node);
  }
  return __super(node);
}
function _placeholders_parseBindingAtom(__super) {
  return _placeholders_parsePlaceholder("Pattern") || __super();
}
function _placeholders_isValidLVal(__super, type, isParenthesized, binding) {
  return type === "Placeholder" || __super(type, isParenthesized, binding);
}
function _placeholders_toAssignable(__super, node, isLHS) {
  if (node && node.type === "Placeholder" && node.expectedNode === "Expression") {
    node.expectedNode = "Pattern";
  } else {
    __super(node, isLHS);
  }
}
function _placeholders_chStartsBindingIdentifier(__super, ch, pos) {
  if (__super(ch, pos)) {
    return true;
  }
  const nextToken = _Tokenizer_lookahead();
  if (nextToken.type === 133) {
    return true;
  }
  return false;
}
function _placeholders_verifyBreakContinue(__super, node, isBreak) {
  if (node.label && node.label.type === "Placeholder") return;
  __super(node, isBreak);
}
function _placeholders_parseExpressionStatement(__super, node, expr) {
  var _expr$extra;
  if (expr.type !== "Placeholder" || (_expr$extra = expr.extra) != null && _expr$extra.parenthesized) {
    return __super(node, expr);
  }
  if (_Tokenizer_match(14)) {
    const stmt = node;
    stmt.label = _placeholders_finishPlaceholder(expr, "Identifier");
    _Tokenizer_next();
    stmt.body = _StatementParser_parseStatementOrSloppyAnnexBFunctionDeclaration();
    return _Parser_finishNode_dynamic(stmt, "LabeledStatement");
  }
  _UtilParser_semicolon();
  const stmtPlaceholder = node;
  stmtPlaceholder.name = expr.name;
  return _placeholders_finishPlaceholder(stmtPlaceholder, "Statement");
}
function _placeholders_parseBlock(__super, allowDirectives, createNewLexicalScope, afterBlockParse) {
  return _placeholders_parsePlaceholder("BlockStatement") || __super(allowDirectives, createNewLexicalScope, afterBlockParse);
}
function _placeholders_parseFunctionId(__super, requireId) {
  return _placeholders_parsePlaceholder("Identifier") || __super(requireId);
}
function _placeholders_parseClass(__super, node, isStatement, optionalId) {
  const type = isStatement ? "ClassDeclaration" : "ClassExpression";
  _Tokenizer_next();
  const oldStrict = _Parser_this.state.strict;
  const placeholder = _placeholders_parsePlaceholder("Identifier");
  if (placeholder) {
    if (_Tokenizer_match(81) || _Tokenizer_match(133) || _Tokenizer_match(5)) {
      node.id = placeholder;
    } else if (optionalId || !isStatement) {
      node.id = null;
      node.body = _placeholders_finishPlaceholder(placeholder, "ClassBody");
      return _Parser_finishNode_dynamic(node, type);
    } else {
      throw _Tokenizer_raise(PlaceholderErrors.ClassNameIsRequired, _Parser_this.state.startLoc);
    }
  } else {
    _Parser_parseClassId_dynamic(node, isStatement, optionalId);
  }
  _StatementParser_parseClassSuper(node);
  node.body = _placeholders_parsePlaceholder("ClassBody") || _StatementParser_parseClassBody(!!node.superClass, oldStrict);
  return _Parser_finishNode_dynamic(node, type);
}
function _placeholders_parseExport(__super, node, decorators) {
  const placeholder = _placeholders_parsePlaceholder("Identifier");
  if (!placeholder) return __super(node, decorators);
  const node2 = node;
  if (!_UtilParser_isContextual(98) && !_Tokenizer_match(12)) {
    node2.specifiers = [];
    node2.source = null;
    node2.declaration = _placeholders_finishPlaceholder(placeholder, "Declaration");
    return _Parser_finishNode_dynamic(node2, "ExportNamedDeclaration");
  }
  _Tokenizer_expectPlugin("exportDefaultFrom");
  const specifier = _NodeUtils_startNode();
  specifier.exported = placeholder;
  node2.specifiers = [_Parser_finishNode_dynamic(specifier, "ExportDefaultSpecifier")];
  return __super(node2, decorators);
}
function _placeholders_isExportDefaultSpecifier(__super) {
  if (_Tokenizer_match(65)) {
    const next = _Tokenizer_nextTokenStart();
    if (_UtilParser_isUnparsedContextual(next, "from")) {
      if (_Parser_this.input.startsWith(tokenLabelName(133), _Tokenizer_nextTokenStartSince(next + 4))) {
        return true;
      }
    }
  }
  return __super();
}
function _placeholders_maybeParseExportDefaultSpecifier(__super, node, maybeDefaultIdentifier) {
  var _specifiers;
  if ((_specifiers = node.specifiers) != null && _specifiers.length) {
    return true;
  }
  return __super(node, maybeDefaultIdentifier);
}
function _placeholders_checkExport(__super, node) {
  const {
    specifiers
  } = node;
  if (specifiers != null && specifiers.length) {
    node.specifiers = specifiers.filter(node => node.exported.type === "Placeholder");
  }
  __super(node);
  node.specifiers = specifiers;
}
function _placeholders_parseImport(__super, node) {
  const placeholder = _placeholders_parsePlaceholder("Identifier");
  if (!placeholder) return __super(node);
  node.specifiers = [];
  if (!_UtilParser_isContextual(98) && !_Tokenizer_match(12)) {
    node.source = _placeholders_finishPlaceholder(placeholder, "StringLiteral");
    _UtilParser_semicolon();
    return _Parser_finishNode_dynamic(node, "ImportDeclaration");
  }
  const specifier = _NodeUtils_startNodeAtNode(placeholder);
  specifier.local = placeholder;
  node.specifiers.push(_Parser_finishNode_dynamic(specifier, "ImportDefaultSpecifier"));
  if (_Tokenizer_eat(12)) {
    const hasStarImport = _StatementParser_maybeParseStarImportSpecifier(node);
    if (!hasStarImport) _StatementParser_parseNamedImportSpecifiers(node);
  }
  _UtilParser_expectContextual(98);
  node.source = _Parser_parseImportSource_dynamic();
  _UtilParser_semicolon();
  return _Parser_finishNode_dynamic(node, "ImportDeclaration");
}
function _placeholders_parseImportSource(__super) {
  return _placeholders_parsePlaceholder("StringLiteral") || __super();
}
function _placeholders_assertNoSpace() {
  if (_Parser_this.state.start > _BaseParser_offsetToSourcePos(_Parser_this.state.lastTokEndLoc.index)) {
    _Tokenizer_raise(PlaceholderErrors.UnexpectedSpace, _Parser_this.state.lastTokEndLoc);
  }
}
function _v8intrinsic_parseV8Intrinsic() {
  if (_Tokenizer_match(54)) {
    const v8IntrinsicStartLoc = _Parser_this.state.startLoc;
    const node = _NodeUtils_startNode();
    _Tokenizer_next();
    if (tokenIsIdentifier(_Parser_this.state.type)) {
      const name = _ExpressionParser_parseIdentifierName();
      const identifier = _ExpressionParser_createIdentifier(node, name);
      _Parser_castNodeTo_dynamic(identifier, "V8IntrinsicIdentifier");
      if (_Tokenizer_match(10)) {
        return identifier;
      }
    }
    _Tokenizer_unexpected(v8IntrinsicStartLoc);
  }
}
function _v8intrinsic_parseExprAtom(__super, refExpressionErrors) {
  return _v8intrinsic_parseV8Intrinsic() || __super(refExpressionErrors);
}
function _typescript_constructor(...args) {
  _Parser_this.tsParseInOutModifiers = _typescript_tsParseModifiers.bind(_Parser_this, {
    allowedModifiers: ["in", "out"],
    disallowedModifiers: ["const", "public", "private", "protected", "readonly", "declare", "abstract", "override"],
    errorTemplate: TSErrors.InvalidModifierOnTypeParameter
  });
  _Parser_this.tsParseConstModifier = _typescript_tsParseModifiers.bind(_Parser_this, {
    allowedModifiers: ["const"],
    disallowedModifiers: ["in", "out"],
    errorTemplate: TSErrors.InvalidModifierOnTypeParameterPositions
  });
  _Parser_this.tsParseInOutConstModifiers = _typescript_tsParseModifiers.bind(_Parser_this, {
    allowedModifiers: ["in", "out", "const"],
    disallowedModifiers: ["public", "private", "protected", "readonly", "declare", "abstract", "override"],
    errorTemplate: TSErrors.InvalidModifierOnTypeParameter
  });
}
function _typescript_getScopeHandler(__super) {
  return TypeScriptScopeHandler;
}
function _typescript_tsIsIdentifier() {
  return tokenIsIdentifier(_Parser_this.state.type);
}
function _typescript_tsTokenCanFollowModifier() {
  return _Tokenizer_match(0) || _Tokenizer_match(5) || _Tokenizer_match(55) || _Tokenizer_match(21) || _Tokenizer_match(139) || _UtilParser_isLiteralPropertyName();
}
function _typescript_tsNextTokenOnSameLineAndCanFollowModifier() {
  _Tokenizer_next();
  if (_UtilParser_hasPrecedingLineBreak()) {
    return false;
  }
  return _typescript_tsTokenCanFollowModifier();
}
function _typescript_tsNextTokenCanFollowModifier() {
  if (_Tokenizer_match(106)) {
    _Tokenizer_next();
    return _typescript_tsTokenCanFollowModifier();
  }
  return _typescript_tsNextTokenOnSameLineAndCanFollowModifier();
}
function _typescript_tsParseModifier(allowedModifiers, stopOnStartOfClassStaticBlock, hasSeenStaticModifier) {
  if (!tokenIsIdentifier(_Parser_this.state.type) && _Parser_this.state.type !== 58 && _Parser_this.state.type !== 75) {
    return undefined;
  }
  const modifier = _Parser_this.state.value;
  if (allowedModifiers.includes(modifier)) {
    if (hasSeenStaticModifier && _Tokenizer_match(106)) {
      return undefined;
    }
    if (stopOnStartOfClassStaticBlock && _typescript_tsIsStartOfStaticBlocks()) {
      return undefined;
    }
    if (_typescript_tsTryParse(_typescript_tsNextTokenCanFollowModifier.bind(_Parser_this))) {
      return modifier;
    }
  }
  return undefined;
}
function _typescript_tsParseModifiers({
  allowedModifiers,
  disallowedModifiers,
  stopOnStartOfClassStaticBlock,
  errorTemplate = TSErrors.InvalidModifierOnTypeMember
}, modified) {
  const enforceOrder = (loc, modifier, before, after) => {
    if (modifier === before && modified[after]) {
      _Tokenizer_raise(TSErrors.InvalidModifiersOrder, loc, {
        orderedModifiers: [before, after]
      });
    }
  };
  const incompatible = (loc, modifier, mod1, mod2) => {
    if (modified[mod1] && modifier === mod2 || modified[mod2] && modifier === mod1) {
      _Tokenizer_raise(TSErrors.IncompatibleModifiers, loc, {
        modifiers: [mod1, mod2]
      });
    }
  };
  for (;;) {
    const {
      startLoc
    } = _Parser_this.state;
    const modifier = _typescript_tsParseModifier(allowedModifiers.concat(disallowedModifiers != null ? disallowedModifiers : []), stopOnStartOfClassStaticBlock, modified.static);
    if (!modifier) break;
    if (tsIsAccessModifier(modifier)) {
      if (modified.accessibility) {
        _Tokenizer_raise(TSErrors.DuplicateAccessibilityModifier, startLoc, {
          modifier
        });
      } else {
        enforceOrder(startLoc, modifier, modifier, "override");
        enforceOrder(startLoc, modifier, modifier, "static");
        enforceOrder(startLoc, modifier, modifier, "readonly");
        modified.accessibility = modifier;
      }
    } else if (tsIsVarianceAnnotations(modifier)) {
      if (modified[modifier]) {
        _Tokenizer_raise(TSErrors.DuplicateModifier, startLoc, {
          modifier
        });
      }
      modified[modifier] = true;
      enforceOrder(startLoc, modifier, "in", "out");
    } else {
      if (hasOwnProperty.call(modified, modifier)) {
        _Tokenizer_raise(TSErrors.DuplicateModifier, startLoc, {
          modifier
        });
      } else {
        enforceOrder(startLoc, modifier, "static", "readonly");
        enforceOrder(startLoc, modifier, "static", "override");
        enforceOrder(startLoc, modifier, "override", "readonly");
        enforceOrder(startLoc, modifier, "abstract", "override");
        incompatible(startLoc, modifier, "declare", "override");
        incompatible(startLoc, modifier, "static", "abstract");
      }
      modified[modifier] = true;
    }
    if (disallowedModifiers != null && disallowedModifiers.includes(modifier)) {
      _Tokenizer_raise(errorTemplate, startLoc, {
        modifier
      });
    }
  }
}
function _typescript_tsIsListTerminator(kind) {
  switch (kind) {
    case "EnumMembers":
    case "TypeMembers":
      return _Tokenizer_match(8);
    case "HeritageClauseElement":
      return _Tokenizer_match(5);
    case "TupleElementTypes":
      return _Tokenizer_match(3);
    case "TypeParametersOrArguments":
      return _Tokenizer_match(48);
  }
}
function _typescript_tsParseList(kind, parseElement) {
  const result = [];
  while (!_typescript_tsIsListTerminator(kind)) {
    result.push(parseElement());
  }
  return result;
}
function _typescript_tsParseDelimitedList(kind, parseElement, refTrailingCommaPos) {
  return nonNull(_typescript_tsParseDelimitedListWorker(kind, parseElement, true, refTrailingCommaPos));
}
function _typescript_tsParseDelimitedListWorker(kind, parseElement, expectSuccess, refTrailingCommaPos) {
  const result = [];
  let trailingCommaPos = -1;
  for (;;) {
    if (_typescript_tsIsListTerminator(kind)) {
      break;
    }
    trailingCommaPos = -1;
    const element = parseElement();
    if (element == null) {
      return undefined;
    }
    result.push(element);
    if (_Tokenizer_eat(12)) {
      trailingCommaPos = _Parser_this.state.lastTokStartLoc.index;
      continue;
    }
    if (_typescript_tsIsListTerminator(kind)) {
      break;
    }
    if (expectSuccess) {
      _UtilParser_expect(12);
    }
    return undefined;
  }
  if (refTrailingCommaPos) {
    refTrailingCommaPos.value = trailingCommaPos;
  }
  return result;
}
function _typescript_tsParseBracketedList(kind, parseElement, bracket, skipFirstToken, refTrailingCommaPos) {
  if (!skipFirstToken) {
    if (bracket) {
      _UtilParser_expect(0);
    } else {
      _UtilParser_expect(47);
    }
  }
  const result = _typescript_tsParseDelimitedList(kind, parseElement, refTrailingCommaPos);
  if (bracket) {
    _UtilParser_expect(3);
  } else {
    _UtilParser_expect(48);
  }
  return result;
}
function _typescript_tsParseImportType() {
  const node = _NodeUtils_startNode();
  _UtilParser_expect(83);
  _UtilParser_expect(10);
  if (!_Tokenizer_match(134)) {
    _Tokenizer_raise(TSErrors.UnsupportedImportTypeArgument, _Parser_this.state.startLoc);
    {
      node.argument = _ExpressionParser_parseExprAtom();
    }
  } else {
    {
      node.argument = _Parser_parseStringLiteral_dynamic(_Parser_this.state.value);
    }
  }
  if (_Tokenizer_eat(12)) {
    node.options = _typescript_tsParseImportTypeOptions();
  } else {
    node.options = null;
  }
  _UtilParser_expect(11);
  if (_Tokenizer_eat(16)) {
    node.qualifier = _typescript_tsParseEntityName(1 | 2);
  }
  if (_Tokenizer_match(47)) {
    {
      node.typeParameters = _typescript_tsParseTypeArguments();
    }
  }
  return _Parser_finishNode_dynamic(node, "TSImportType");
}
function _typescript_tsParseImportTypeOptions() {
  const node = _NodeUtils_startNode();
  _UtilParser_expect(5);
  const withProperty = _NodeUtils_startNode();
  if (_UtilParser_isContextual(76)) {
    withProperty.method = false;
    withProperty.key = _Parser_parseIdentifier_dynamic(true);
    withProperty.computed = false;
    withProperty.shorthand = false;
  } else {
    _Tokenizer_unexpected(null, 76);
  }
  _UtilParser_expect(14);
  withProperty.value = _typescript_tsParseImportTypeWithPropertyValue();
  node.properties = [_Parser_finishObjectProperty_dynamic(withProperty)];
  _UtilParser_expect(8);
  return _Parser_finishNode_dynamic(node, "ObjectExpression");
}
function _typescript_tsParseImportTypeWithPropertyValue() {
  const node = _NodeUtils_startNode();
  const properties = [];
  _UtilParser_expect(5);
  while (!_Tokenizer_match(8)) {
    const type = _Parser_this.state.type;
    if (tokenIsIdentifier(type) || type === 134) {
      properties.push(_ExpressionParser_parsePropertyDefinition(null));
    } else {
      _Tokenizer_unexpected();
    }
    _Tokenizer_eat(12);
  }
  node.properties = properties;
  _Tokenizer_next();
  return _Parser_finishNode_dynamic(node, "ObjectExpression");
}
function _typescript_tsParseEntityName(flags) {
  let entity;
  if (flags & 1 && _Tokenizer_match(78)) {
    if (flags & 2) {
      entity = _Parser_parseIdentifier_dynamic(true);
    } else {
      const node = _NodeUtils_startNode();
      _Tokenizer_next();
      entity = _Parser_finishNode_dynamic(node, "ThisExpression");
    }
  } else {
    entity = _Parser_parseIdentifier_dynamic(!!(flags & 1));
  }
  while (_Tokenizer_eat(16)) {
    const node = _NodeUtils_startNodeAtNode(entity);
    node.left = entity;
    node.right = _Parser_parseIdentifier_dynamic(!!(flags & 1));
    entity = _Parser_finishNode_dynamic(node, "TSQualifiedName");
  }
  return entity;
}
function _typescript_tsParseTypeReference() {
  const node = _NodeUtils_startNode();
  node.typeName = _typescript_tsParseEntityName(1);
  if (!_UtilParser_hasPrecedingLineBreak() && _Tokenizer_match(47)) {
    {
      node.typeParameters = _typescript_tsParseTypeArguments();
    }
  }
  return _Parser_finishNode_dynamic(node, "TSTypeReference");
}
function _typescript_tsParseThisTypePredicate(lhs) {
  _Tokenizer_next();
  const node = _NodeUtils_startNodeAtNode(lhs);
  node.parameterName = lhs;
  node.typeAnnotation = _typescript_tsParseTypeAnnotation(false);
  node.asserts = false;
  return _Parser_finishNode_dynamic(node, "TSTypePredicate");
}
function _typescript_tsParseThisTypeNode() {
  const node = _NodeUtils_startNode();
  _Tokenizer_next();
  return _Parser_finishNode_dynamic(node, "TSThisType");
}
function _typescript_tsParseTypeQuery() {
  const node = _NodeUtils_startNode();
  _UtilParser_expect(87);
  if (_Tokenizer_match(83)) {
    node.exprName = _typescript_tsParseImportType();
  } else {
    {
      node.exprName = _typescript_tsParseEntityName(1 | 2);
    }
  }
  if (!_UtilParser_hasPrecedingLineBreak() && _Tokenizer_match(47)) {
    {
      node.typeParameters = _typescript_tsParseTypeArguments();
    }
  }
  return _Parser_finishNode_dynamic(node, "TSTypeQuery");
}
function _typescript_tsParseTypeParameter(parseModifiers) {
  const node = _NodeUtils_startNode();
  parseModifiers(node);
  node.name = _typescript_tsParseTypeParameterName();
  node.constraint = _typescript_tsEatThenParseType(81);
  node.default = _typescript_tsEatThenParseType(29);
  return _Parser_finishNode_dynamic(node, "TSTypeParameter");
}
function _typescript_tsTryParseTypeParameters(parseModifiers) {
  if (_Tokenizer_match(47)) {
    return _typescript_tsParseTypeParameters(parseModifiers);
  }
}
function _typescript_tsParseTypeParameters(parseModifiers) {
  const node = _NodeUtils_startNode();
  if (_Tokenizer_match(47) || _Tokenizer_match(143)) {
    _Tokenizer_next();
  } else {
    _Tokenizer_unexpected();
  }
  const refTrailingCommaPos = {
    value: -1
  };
  node.params = _typescript_tsParseBracketedList("TypeParametersOrArguments", _typescript_tsParseTypeParameter.bind(_Parser_this, parseModifiers), false, true, refTrailingCommaPos);
  if (node.params.length === 0) {
    _Tokenizer_raise(TSErrors.EmptyTypeParameters, node);
  }
  if (refTrailingCommaPos.value !== -1) {
    _UtilParser_addExtra(node, "trailingComma", refTrailingCommaPos.value);
  }
  return _Parser_finishNode_dynamic(node, "TSTypeParameterDeclaration");
}
function _typescript_tsFillSignature(returnToken, signature) {
  const returnTokenRequired = returnToken === 19;
  const paramsKey = "parameters";
  const returnTypeKey = "typeAnnotation";
  signature.typeParameters = _typescript_tsTryParseTypeParameters(_Parser_this.tsParseConstModifier);
  _UtilParser_expect(10);
  signature[paramsKey] = _typescript_tsParseBindingListForSignature();
  if (returnTokenRequired) {
    signature[returnTypeKey] = _typescript_tsParseTypeOrTypePredicateAnnotation(returnToken);
  } else if (_Tokenizer_match(returnToken)) {
    signature[returnTypeKey] = _typescript_tsParseTypeOrTypePredicateAnnotation(returnToken);
  }
}
function _typescript_tsParseBindingListForSignature() {
  const list = _LValParser_parseBindingList(11, 41, 2);
  for (const pattern of list) {
    const {
      type
    } = pattern;
    if (type === "AssignmentPattern" || type === "TSParameterProperty") {
      _Tokenizer_raise(TSErrors.UnsupportedSignatureParameterKind, pattern, {
        type
      });
    }
  }
  return list;
}
function _typescript_tsParseTypeMemberSemicolon() {
  if (!_Tokenizer_eat(12) && !_UtilParser_isLineTerminator()) {
    _UtilParser_expect(13);
  }
}
function _typescript_tsParseSignatureMember(kind, node) {
  _typescript_tsFillSignature(14, node);
  _typescript_tsParseTypeMemberSemicolon();
  return _Parser_finishNode_dynamic(node, kind);
}
function _typescript_tsIsUnambiguouslyIndexSignature() {
  _Tokenizer_next();
  if (tokenIsIdentifier(_Parser_this.state.type)) {
    _Tokenizer_next();
    return _Tokenizer_match(14);
  }
  return false;
}
function _typescript_tsTryParseIndexSignature(node) {
  if (!(_Tokenizer_match(0) && _typescript_tsLookAhead(_typescript_tsIsUnambiguouslyIndexSignature.bind(_Parser_this)))) {
    return;
  }
  _UtilParser_expect(0);
  const id = _Parser_parseIdentifier_dynamic();
  id.typeAnnotation = _typescript_tsParseTypeAnnotation();
  _Parser_resetEndLocation_dynamic(id);
  _UtilParser_expect(3);
  node.parameters = [id];
  const type = _typescript_tsTryParseTypeAnnotation();
  if (type) node.typeAnnotation = type;
  _typescript_tsParseTypeMemberSemicolon();
  return _Parser_finishNode_dynamic(node, "TSIndexSignature");
}
function _typescript_tsParsePropertyOrMethodSignature(node, readonly) {
  if (_Tokenizer_eat(17)) node.optional = true;
  if (_Tokenizer_match(10) || _Tokenizer_match(47)) {
    if (readonly) {
      _Tokenizer_raise(TSErrors.ReadonlyForMethodSignature, node);
    }
    const method = node;
    if (method.kind && _Tokenizer_match(47)) {
      _Tokenizer_raise(TSErrors.AccessorCannotHaveTypeParameters, _Parser_this.state.curPosition());
    }
    _typescript_tsFillSignature(14, method);
    _typescript_tsParseTypeMemberSemicolon();
    const paramsKey = "parameters";
    const returnTypeKey = "typeAnnotation";
    if (method.kind === "get") {
      if (method[paramsKey].length > 0) {
        _Tokenizer_raise(Errors.BadGetterArity, _Parser_this.state.curPosition());
        if (_StatementParser_isThisParam(method[paramsKey][0])) {
          _Tokenizer_raise(TSErrors.AccessorCannotDeclareThisParameter, _Parser_this.state.curPosition());
        }
      }
    } else if (method.kind === "set") {
      if (method[paramsKey].length !== 1) {
        _Tokenizer_raise(Errors.BadSetterArity, _Parser_this.state.curPosition());
      } else {
        const firstParameter = method[paramsKey][0];
        if (_StatementParser_isThisParam(firstParameter)) {
          _Tokenizer_raise(TSErrors.AccessorCannotDeclareThisParameter, _Parser_this.state.curPosition());
        }
        if (firstParameter.type === "Identifier" && firstParameter.optional) {
          _Tokenizer_raise(TSErrors.SetAccessorCannotHaveOptionalParameter, _Parser_this.state.curPosition());
        }
        if (firstParameter.type === "RestElement") {
          _Tokenizer_raise(TSErrors.SetAccessorCannotHaveRestParameter, _Parser_this.state.curPosition());
        }
      }
      if (method[returnTypeKey]) {
        _Tokenizer_raise(TSErrors.SetAccessorCannotHaveReturnType, method[returnTypeKey]);
      }
    } else {
      method.kind = "method";
    }
    return _Parser_finishNode_dynamic(method, "TSMethodSignature");
  } else {
    const property = node;
    if (readonly) property.readonly = true;
    const type = _typescript_tsTryParseTypeAnnotation();
    if (type) property.typeAnnotation = type;
    _typescript_tsParseTypeMemberSemicolon();
    return _Parser_finishNode_dynamic(property, "TSPropertySignature");
  }
}
function _typescript_tsParseTypeMember() {
  const node = _NodeUtils_startNode();
  if (_Tokenizer_match(10) || _Tokenizer_match(47)) {
    return _typescript_tsParseSignatureMember("TSCallSignatureDeclaration", node);
  }
  if (_Tokenizer_match(77)) {
    const id = _NodeUtils_startNode();
    _Tokenizer_next();
    if (_Tokenizer_match(10) || _Tokenizer_match(47)) {
      return _typescript_tsParseSignatureMember("TSConstructSignatureDeclaration", node);
    } else {
      node.key = _ExpressionParser_createIdentifier(id, "new");
      return _typescript_tsParsePropertyOrMethodSignature(node, false);
    }
  }
  _typescript_tsParseModifiers({
    allowedModifiers: ["readonly"],
    disallowedModifiers: ["declare", "abstract", "private", "protected", "public", "static", "override"]
  }, node);
  const idx = _typescript_tsTryParseIndexSignature(node);
  if (idx) {
    return idx;
  }
  _ExpressionParser_parsePropertyName(node);
  if (!node.computed && node.key.type === "Identifier" && (node.key.name === "get" || node.key.name === "set") && _typescript_tsTokenCanFollowModifier()) {
    node.kind = node.key.name;
    _ExpressionParser_parsePropertyName(node);
    if (!_Tokenizer_match(10) && !_Tokenizer_match(47)) {
      _Tokenizer_unexpected(null, 10);
    }
  }
  return _typescript_tsParsePropertyOrMethodSignature(node, !!node.readonly);
}
function _typescript_tsParseTypeLiteral() {
  const node = _NodeUtils_startNode();
  node.members = _typescript_tsParseObjectTypeMembers();
  return _Parser_finishNode_dynamic(node, "TSTypeLiteral");
}
function _typescript_tsParseObjectTypeMembers() {
  _UtilParser_expect(5);
  const members = _typescript_tsParseList("TypeMembers", _typescript_tsParseTypeMember.bind(_Parser_this));
  _UtilParser_expect(8);
  return members;
}
function _typescript_tsIsStartOfMappedType() {
  _Tokenizer_next();
  if (_Tokenizer_eat(53)) {
    return _UtilParser_isContextual(122);
  }
  if (_UtilParser_isContextual(122)) {
    _Tokenizer_next();
  }
  if (!_Tokenizer_match(0)) {
    return false;
  }
  _Tokenizer_next();
  if (!_typescript_tsIsIdentifier()) {
    return false;
  }
  _Tokenizer_next();
  return _Tokenizer_match(58);
}
function _typescript_tsParseMappedType() {
  const node = _NodeUtils_startNode();
  _UtilParser_expect(5);
  if (_Tokenizer_match(53)) {
    node.readonly = _Parser_this.state.value;
    _Tokenizer_next();
    _UtilParser_expectContextual(122);
  } else if (_UtilParser_eatContextual(122)) {
    node.readonly = true;
  }
  _UtilParser_expect(0);
  {
    const typeParameter = _NodeUtils_startNode();
    typeParameter.name = _typescript_tsParseTypeParameterName();
    typeParameter.constraint = _typescript_tsExpectThenParseType(58);
    node.typeParameter = _Parser_finishNode_dynamic(typeParameter, "TSTypeParameter");
  }
  node.nameType = _UtilParser_eatContextual(93) ? _typescript_tsParseType() : null;
  _UtilParser_expect(3);
  if (_Tokenizer_match(53)) {
    node.optional = _Parser_this.state.value;
    _Tokenizer_next();
    _UtilParser_expect(17);
  } else if (_Tokenizer_eat(17)) {
    node.optional = true;
  }
  node.typeAnnotation = _typescript_tsTryParseType();
  _UtilParser_semicolon();
  _UtilParser_expect(8);
  return _Parser_finishNode_dynamic(node, "TSMappedType");
}
function _typescript_tsParseTupleType() {
  const node = _NodeUtils_startNode();
  node.elementTypes = _typescript_tsParseBracketedList("TupleElementTypes", _typescript_tsParseTupleElementType.bind(_Parser_this), true, false);
  let seenOptionalElement = false;
  node.elementTypes.forEach(elementNode => {
    const {
      type
    } = elementNode;
    if (seenOptionalElement && type !== "TSRestType" && type !== "TSOptionalType" && !(type === "TSNamedTupleMember" && elementNode.optional)) {
      _Tokenizer_raise(TSErrors.OptionalTypeBeforeRequired, elementNode);
    }
    seenOptionalElement || (seenOptionalElement = type === "TSNamedTupleMember" && elementNode.optional || type === "TSOptionalType");
  });
  return _Parser_finishNode_dynamic(node, "TSTupleType");
}
function _typescript_tsParseTupleElementType() {
  const restStartLoc = _Parser_this.state.startLoc;
  const rest = _Tokenizer_eat(21);
  const {
    startLoc
  } = _Parser_this.state;
  let labeled;
  let label;
  let optional;
  let type;
  const isWord = tokenIsKeywordOrIdentifier(_Parser_this.state.type);
  const chAfterWord = isWord ? _Tokenizer_lookaheadCharCode() : null;
  if (chAfterWord === 58) {
    labeled = true;
    optional = false;
    label = _Parser_parseIdentifier_dynamic(true);
    _UtilParser_expect(14);
    type = _typescript_tsParseType();
  } else if (chAfterWord === 63) {
    optional = true;
    const wordName = _Parser_this.state.value;
    const typeOrLabel = _typescript_tsParseNonArrayType();
    if (_Tokenizer_lookaheadCharCode() === 58) {
      labeled = true;
      label = _ExpressionParser_createIdentifier(_NodeUtils_startNodeAt(startLoc), wordName);
      _UtilParser_expect(17);
      _UtilParser_expect(14);
      type = _typescript_tsParseType();
    } else {
      labeled = false;
      type = typeOrLabel;
      _UtilParser_expect(17);
    }
  } else {
    type = _typescript_tsParseType();
    optional = _Tokenizer_eat(17);
    labeled = _Tokenizer_eat(14);
  }
  if (labeled) {
    let labeledNode;
    if (label) {
      labeledNode = _NodeUtils_startNodeAt(startLoc);
      labeledNode.optional = optional;
      labeledNode.label = label;
      labeledNode.elementType = type;
      if (_Tokenizer_eat(17)) {
        labeledNode.optional = true;
        _Tokenizer_raise(TSErrors.TupleOptionalAfterType, _Parser_this.state.lastTokStartLoc);
      }
    } else {
      labeledNode = _NodeUtils_startNodeAt(startLoc);
      labeledNode.optional = optional;
      _Tokenizer_raise(TSErrors.InvalidTupleMemberLabel, type);
      labeledNode.label = type;
      labeledNode.elementType = _typescript_tsParseType();
    }
    type = _Parser_finishNode_dynamic(labeledNode, "TSNamedTupleMember");
  } else if (optional) {
    const optionalTypeNode = _NodeUtils_startNodeAt(startLoc);
    optionalTypeNode.typeAnnotation = type;
    type = _Parser_finishNode_dynamic(optionalTypeNode, "TSOptionalType");
  }
  if (rest) {
    const restNode = _NodeUtils_startNodeAt(restStartLoc);
    restNode.typeAnnotation = type;
    type = _Parser_finishNode_dynamic(restNode, "TSRestType");
  }
  return type;
}
function _typescript_tsParseParenthesizedType() {
  const node = _NodeUtils_startNode();
  _UtilParser_expect(10);
  node.typeAnnotation = _typescript_tsParseType();
  _UtilParser_expect(11);
  return _Parser_finishNode_dynamic(node, "TSParenthesizedType");
}
function _typescript_tsParseFunctionOrConstructorType(type, abstract) {
  const node = _NodeUtils_startNode();
  if (type === "TSConstructorType") {
    node.abstract = !!abstract;
    if (abstract) _Tokenizer_next();
    _Tokenizer_next();
  }
  _typescript_tsInAllowConditionalTypesContext(() => _typescript_tsFillSignature(19, node));
  return _Parser_finishNode_dynamic(node, type);
}
function _typescript_tsParseLiteralTypeNode() {
  const node = _NodeUtils_startNode();
  switch (_Parser_this.state.type) {
    case 135:
    case 136:
    case 134:
    case 85:
    case 86:
      node.literal = _ExpressionParser_parseExprAtom();
      break;
    default:
      _Tokenizer_unexpected();
  }
  return _Parser_finishNode_dynamic(node, "TSLiteralType");
}
function _typescript_tsParseTemplateLiteralType() {
  {
    const node = _NodeUtils_startNode();
    node.literal = _ExpressionParser_parseTemplate(false);
    return _Parser_finishNode_dynamic(node, "TSLiteralType");
  }
}
function _typescript_parseTemplateSubstitution(__super) {
  if (_Parser_this.state.inType) return _typescript_tsParseType();
  return __super();
}
function _typescript_tsParseThisTypeOrThisTypePredicate() {
  const thisKeyword = _typescript_tsParseThisTypeNode();
  if (_UtilParser_isContextual(116) && !_UtilParser_hasPrecedingLineBreak()) {
    return _typescript_tsParseThisTypePredicate(thisKeyword);
  } else {
    return thisKeyword;
  }
}
function _typescript_tsParseNonArrayType() {
  switch (_Parser_this.state.type) {
    case 134:
    case 135:
    case 136:
    case 85:
    case 86:
      return _typescript_tsParseLiteralTypeNode();
    case 53:
      if (_Parser_this.state.value === "-") {
        const node = _NodeUtils_startNode();
        const nextToken = _Tokenizer_lookahead();
        if (nextToken.type !== 135 && nextToken.type !== 136) {
          _Tokenizer_unexpected();
        }
        node.literal = _Parser_parseMaybeUnary_dynamic();
        return _Parser_finishNode_dynamic(node, "TSLiteralType");
      }
      break;
    case 78:
      return _typescript_tsParseThisTypeOrThisTypePredicate();
    case 87:
      return _typescript_tsParseTypeQuery();
    case 83:
      return _typescript_tsParseImportType();
    case 5:
      return _typescript_tsLookAhead(_typescript_tsIsStartOfMappedType.bind(_Parser_this)) ? _typescript_tsParseMappedType() : _typescript_tsParseTypeLiteral();
    case 0:
      return _typescript_tsParseTupleType();
    case 10:
      return _typescript_tsParseParenthesizedType();
    case 25:
    case 24:
      return _typescript_tsParseTemplateLiteralType();
    default:
      {
        const {
          type
        } = _Parser_this.state;
        if (tokenIsIdentifier(type) || type === 88 || type === 84) {
          const nodeType = type === 88 ? "TSVoidKeyword" : type === 84 ? "TSNullKeyword" : keywordTypeFromName(_Parser_this.state.value);
          if (nodeType !== undefined && _Tokenizer_lookaheadCharCode() !== 46) {
            const node = _NodeUtils_startNode();
            _Tokenizer_next();
            return _Parser_finishNode_dynamic(node, nodeType);
          }
          return _typescript_tsParseTypeReference();
        }
      }
  }
  _Tokenizer_unexpected();
}
function _typescript_tsParseArrayTypeOrHigher() {
  const {
    startLoc
  } = _Parser_this.state;
  let type = _typescript_tsParseNonArrayType();
  while (!_UtilParser_hasPrecedingLineBreak() && _Tokenizer_eat(0)) {
    if (_Tokenizer_match(3)) {
      const node = _NodeUtils_startNodeAt(startLoc);
      node.elementType = type;
      _UtilParser_expect(3);
      type = _Parser_finishNode_dynamic(node, "TSArrayType");
    } else {
      const node = _NodeUtils_startNodeAt(startLoc);
      node.objectType = type;
      node.indexType = _typescript_tsParseType();
      _UtilParser_expect(3);
      type = _Parser_finishNode_dynamic(node, "TSIndexedAccessType");
    }
  }
  return type;
}
function _typescript_tsParseTypeOperator() {
  const node = _NodeUtils_startNode();
  const operator = _Parser_this.state.value;
  _Tokenizer_next();
  node.operator = operator;
  node.typeAnnotation = _typescript_tsParseTypeOperatorOrHigher();
  if (operator === "readonly") {
    _typescript_tsCheckTypeAnnotationForReadOnly(node);
  }
  return _Parser_finishNode_dynamic(node, "TSTypeOperator");
}
function _typescript_tsCheckTypeAnnotationForReadOnly(node) {
  switch (node.typeAnnotation.type) {
    case "TSTupleType":
    case "TSArrayType":
      return;
    default:
      _Tokenizer_raise(TSErrors.UnexpectedReadonly, node);
  }
}
function _typescript_tsParseInferType() {
  const node = _NodeUtils_startNode();
  _UtilParser_expectContextual(115);
  const typeParameter = _NodeUtils_startNode();
  typeParameter.name = _typescript_tsParseTypeParameterName();
  typeParameter.constraint = _typescript_tsTryParse(() => _typescript_tsParseConstraintForInferType());
  node.typeParameter = _Parser_finishNode_dynamic(typeParameter, "TSTypeParameter");
  return _Parser_finishNode_dynamic(node, "TSInferType");
}
function _typescript_tsParseConstraintForInferType() {
  if (_Tokenizer_eat(81)) {
    const constraint = _typescript_tsInDisallowConditionalTypesContext(() => _typescript_tsParseType());
    if (_Parser_this.state.inDisallowConditionalTypesContext || !_Tokenizer_match(17)) {
      return constraint;
    }
  }
}
function _typescript_tsParseTypeOperatorOrHigher() {
  const isTypeOperator = tokenIsTSTypeOperator(_Parser_this.state.type) && !_Parser_this.state.containsEsc;
  return isTypeOperator ? _typescript_tsParseTypeOperator() : _UtilParser_isContextual(115) ? _typescript_tsParseInferType() : _typescript_tsInAllowConditionalTypesContext(() => _typescript_tsParseArrayTypeOrHigher());
}
function _typescript_tsParseUnionOrIntersectionType(kind, parseConstituentType, operator) {
  const node = _NodeUtils_startNode();
  const hasLeadingOperator = _Tokenizer_eat(operator);
  const types = [];
  do {
    types.push(parseConstituentType());
  } while (_Tokenizer_eat(operator));
  if (types.length === 1 && !hasLeadingOperator) {
    return types[0];
  }
  node.types = types;
  return _Parser_finishNode_dynamic(node, kind);
}
function _typescript_tsParseIntersectionTypeOrHigher() {
  return _typescript_tsParseUnionOrIntersectionType("TSIntersectionType", _typescript_tsParseTypeOperatorOrHigher.bind(_Parser_this), 45);
}
function _typescript_tsParseUnionTypeOrHigher() {
  return _typescript_tsParseUnionOrIntersectionType("TSUnionType", _typescript_tsParseIntersectionTypeOrHigher.bind(_Parser_this), 43);
}
function _typescript_tsIsStartOfFunctionType() {
  if (_Tokenizer_match(47)) {
    return true;
  }
  return _Tokenizer_match(10) && _typescript_tsLookAhead(_typescript_tsIsUnambiguouslyStartOfFunctionType.bind(_Parser_this));
}
function _typescript_tsSkipParameterStart() {
  if (tokenIsIdentifier(_Parser_this.state.type) || _Tokenizer_match(78)) {
    _Tokenizer_next();
    return true;
  }
  if (_Tokenizer_match(5)) {
    const {
      errors
    } = _Parser_this.state;
    const previousErrorCount = errors.length;
    try {
      _ExpressionParser_parseObjectLike(8, true);
      return errors.length === previousErrorCount;
    } catch (_unused) {
      return false;
    }
  }
  if (_Tokenizer_match(0)) {
    _Tokenizer_next();
    const {
      errors
    } = _Parser_this.state;
    const previousErrorCount = errors.length;
    try {
      _LValParser_parseBindingList(3, 93, 1);
      return errors.length === previousErrorCount;
    } catch (_unused2) {
      return false;
    }
  }
  return false;
}
function _typescript_tsIsUnambiguouslyStartOfFunctionType() {
  _Tokenizer_next();
  if (_Tokenizer_match(11) || _Tokenizer_match(21)) {
    return true;
  }
  if (_typescript_tsSkipParameterStart()) {
    if (_Tokenizer_match(14) || _Tokenizer_match(12) || _Tokenizer_match(17) || _Tokenizer_match(29)) {
      return true;
    }
    if (_Tokenizer_match(11)) {
      _Tokenizer_next();
      if (_Tokenizer_match(19)) {
        return true;
      }
    }
  }
  return false;
}
function _typescript_tsParseTypeOrTypePredicateAnnotation(returnToken) {
  return _typescript_tsInType(() => {
    const t = _NodeUtils_startNode();
    _UtilParser_expect(returnToken);
    const node = _NodeUtils_startNode();
    const asserts = !!_typescript_tsTryParse(_typescript_tsParseTypePredicateAsserts.bind(_Parser_this));
    if (asserts && _Tokenizer_match(78)) {
      let thisTypePredicate = _typescript_tsParseThisTypeOrThisTypePredicate();
      if (thisTypePredicate.type === "TSThisType") {
        node.parameterName = thisTypePredicate;
        node.asserts = true;
        node.typeAnnotation = null;
        thisTypePredicate = _Parser_finishNode_dynamic(node, "TSTypePredicate");
      } else {
        _NodeUtils_resetStartLocationFromNode(thisTypePredicate, node);
        thisTypePredicate.asserts = true;
      }
      t.typeAnnotation = thisTypePredicate;
      return _Parser_finishNode_dynamic(t, "TSTypeAnnotation");
    }
    const typePredicateVariable = _typescript_tsIsIdentifier() && _typescript_tsTryParse(_typescript_tsParseTypePredicatePrefix.bind(_Parser_this));
    if (!typePredicateVariable) {
      if (!asserts) {
        return _typescript_tsParseTypeAnnotation(false, t);
      }
      node.parameterName = _Parser_parseIdentifier_dynamic();
      node.asserts = asserts;
      node.typeAnnotation = null;
      t.typeAnnotation = _Parser_finishNode_dynamic(node, "TSTypePredicate");
      return _Parser_finishNode_dynamic(t, "TSTypeAnnotation");
    }
    const type = _typescript_tsParseTypeAnnotation(false);
    node.parameterName = typePredicateVariable;
    node.typeAnnotation = type;
    node.asserts = asserts;
    t.typeAnnotation = _Parser_finishNode_dynamic(node, "TSTypePredicate");
    return _Parser_finishNode_dynamic(t, "TSTypeAnnotation");
  });
}
function _typescript_tsTryParseTypeOrTypePredicateAnnotation() {
  if (_Tokenizer_match(14)) {
    return _typescript_tsParseTypeOrTypePredicateAnnotation(14);
  }
}
function _typescript_tsTryParseTypeAnnotation() {
  if (_Tokenizer_match(14)) {
    return _typescript_tsParseTypeAnnotation();
  }
}
function _typescript_tsTryParseType() {
  return _typescript_tsEatThenParseType(14);
}
function _typescript_tsParseTypePredicatePrefix() {
  const id = _Parser_parseIdentifier_dynamic();
  if (_UtilParser_isContextual(116) && !_UtilParser_hasPrecedingLineBreak()) {
    _Tokenizer_next();
    return id;
  }
}
function _typescript_tsParseTypePredicateAsserts() {
  if (_Parser_this.state.type !== 109) {
    return false;
  }
  const containsEsc = _Parser_this.state.containsEsc;
  _Tokenizer_next();
  if (!tokenIsIdentifier(_Parser_this.state.type) && !_Tokenizer_match(78)) {
    return false;
  }
  if (containsEsc) {
    _Tokenizer_raise(Errors.InvalidEscapedReservedWord, _Parser_this.state.lastTokStartLoc, {
      reservedWord: "asserts"
    });
  }
  return true;
}
function _typescript_tsParseTypeAnnotation(eatColon = true, t = _NodeUtils_startNode()) {
  _typescript_tsInType(() => {
    if (eatColon) _UtilParser_expect(14);
    t.typeAnnotation = _typescript_tsParseType();
  });
  return _Parser_finishNode_dynamic(t, "TSTypeAnnotation");
}
function _typescript_tsParseType() {
  assert(_Parser_this.state.inType);
  const type = _typescript_tsParseNonConditionalType();
  if (_Parser_this.state.inDisallowConditionalTypesContext || _UtilParser_hasPrecedingLineBreak() || !_Tokenizer_eat(81)) {
    return type;
  }
  const node = _NodeUtils_startNodeAtNode(type);
  node.checkType = type;
  node.extendsType = _typescript_tsInDisallowConditionalTypesContext(() => _typescript_tsParseNonConditionalType());
  _UtilParser_expect(17);
  node.trueType = _typescript_tsInAllowConditionalTypesContext(() => _typescript_tsParseType());
  _UtilParser_expect(14);
  node.falseType = _typescript_tsInAllowConditionalTypesContext(() => _typescript_tsParseType());
  return _Parser_finishNode_dynamic(node, "TSConditionalType");
}
function _typescript_isAbstractConstructorSignature() {
  return _UtilParser_isContextual(124) && _Tokenizer_lookahead().type === 77;
}
function _typescript_tsParseNonConditionalType() {
  if (_typescript_tsIsStartOfFunctionType()) {
    return _typescript_tsParseFunctionOrConstructorType("TSFunctionType");
  }
  if (_Tokenizer_match(77)) {
    return _typescript_tsParseFunctionOrConstructorType("TSConstructorType");
  } else if (_typescript_isAbstractConstructorSignature()) {
    return _typescript_tsParseFunctionOrConstructorType("TSConstructorType", true);
  }
  return _typescript_tsParseUnionTypeOrHigher();
}
function _typescript_tsParseTypeAssertion() {
  if (_BaseParser_getPluginOption("typescript", "disallowAmbiguousJSXLike")) {
    _Tokenizer_raise(TSErrors.ReservedTypeAssertion, _Parser_this.state.startLoc);
  }
  const node = _NodeUtils_startNode();
  node.typeAnnotation = _typescript_tsInType(() => {
    _Tokenizer_next();
    return _Tokenizer_match(75) ? _typescript_tsParseTypeReference() : _typescript_tsParseType();
  });
  _UtilParser_expect(48);
  node.expression = _Parser_parseMaybeUnary_dynamic();
  return _Parser_finishNode_dynamic(node, "TSTypeAssertion");
}
function _typescript_tsParseHeritageClause(token) {
  const originalStartLoc = _Parser_this.state.startLoc;
  const delimitedList = _typescript_tsParseDelimitedList("HeritageClauseElement", () => {
    {
      const node = _NodeUtils_startNode();
      node.expression = _typescript_tsParseEntityName(1 | 2);
      if (_Tokenizer_match(47)) {
        node.typeParameters = _typescript_tsParseTypeArguments();
      }
      return _Parser_finishNode_dynamic(node, "TSExpressionWithTypeArguments");
    }
  });
  if (!delimitedList.length) {
    _Tokenizer_raise(TSErrors.EmptyHeritageClauseType, originalStartLoc, {
      token
    });
  }
  return delimitedList;
}
function _typescript_tsParseInterfaceDeclaration(node, properties = {}) {
  if (_UtilParser_hasFollowingLineBreak()) return null;
  _UtilParser_expectContextual(129);
  if (properties.declare) node.declare = true;
  if (tokenIsIdentifier(_Parser_this.state.type)) {
    node.id = _Parser_parseIdentifier_dynamic();
    _LValParser_checkIdentifier(node.id, 130);
  } else {
    node.id = null;
    _Tokenizer_raise(TSErrors.MissingInterfaceName, _Parser_this.state.startLoc);
  }
  node.typeParameters = _typescript_tsTryParseTypeParameters(_Parser_this.tsParseInOutConstModifiers);
  if (_Tokenizer_eat(81)) {
    node.extends = _typescript_tsParseHeritageClause("extends");
  }
  const body = _NodeUtils_startNode();
  body.body = _typescript_tsInType(_typescript_tsParseObjectTypeMembers.bind(_Parser_this));
  node.body = _Parser_finishNode_dynamic(body, "TSInterfaceBody");
  return _Parser_finishNode_dynamic(node, "TSInterfaceDeclaration");
}
function _typescript_tsParseTypeAliasDeclaration(node) {
  node.id = _Parser_parseIdentifier_dynamic();
  _LValParser_checkIdentifier(node.id, 2);
  node.typeAnnotation = _typescript_tsInType(() => {
    node.typeParameters = _typescript_tsTryParseTypeParameters(_Parser_this.tsParseInOutModifiers);
    _UtilParser_expect(29);
    if (_UtilParser_isContextual(114) && _Tokenizer_lookahead().type !== 16) {
      const node = _NodeUtils_startNode();
      _Tokenizer_next();
      return _Parser_finishNode_dynamic(node, "TSIntrinsicKeyword");
    }
    return _typescript_tsParseType();
  });
  _UtilParser_semicolon();
  return _Parser_finishNode_dynamic(node, "TSTypeAliasDeclaration");
}
function _typescript_tsInTopLevelContext(cb) {
  if (_Tokenizer_curContext() !== types.brace) {
    const oldContext = _Parser_this.state.context;
    _Parser_this.state.context = [oldContext[0]];
    try {
      return cb();
    } finally {
      _Parser_this.state.context = oldContext;
    }
  } else {
    return cb();
  }
}
function _typescript_tsInType(cb) {
  const oldInType = _Parser_this.state.inType;
  _Parser_this.state.inType = true;
  try {
    return cb();
  } finally {
    _Parser_this.state.inType = oldInType;
  }
}
function _typescript_tsInDisallowConditionalTypesContext(cb) {
  const oldInDisallowConditionalTypesContext = _Parser_this.state.inDisallowConditionalTypesContext;
  _Parser_this.state.inDisallowConditionalTypesContext = true;
  try {
    return cb();
  } finally {
    _Parser_this.state.inDisallowConditionalTypesContext = oldInDisallowConditionalTypesContext;
  }
}
function _typescript_tsInAllowConditionalTypesContext(cb) {
  const oldInDisallowConditionalTypesContext = _Parser_this.state.inDisallowConditionalTypesContext;
  _Parser_this.state.inDisallowConditionalTypesContext = false;
  try {
    return cb();
  } finally {
    _Parser_this.state.inDisallowConditionalTypesContext = oldInDisallowConditionalTypesContext;
  }
}
function _typescript_tsEatThenParseType(token) {
  if (_Tokenizer_match(token)) {
    return _typescript_tsNextThenParseType();
  }
}
function _typescript_tsExpectThenParseType(token) {
  return _typescript_tsInType(() => {
    _UtilParser_expect(token);
    return _typescript_tsParseType();
  });
}
function _typescript_tsNextThenParseType() {
  return _typescript_tsInType(() => {
    _Tokenizer_next();
    return _typescript_tsParseType();
  });
}
function _typescript_tsParseEnumMember() {
  const node = _NodeUtils_startNode();
  node.id = _Tokenizer_match(134) ? _ExpressionParser_parseStringLiteral(_Parser_this.state.value) : _Parser_parseIdentifier_dynamic(true);
  if (_Tokenizer_eat(29)) {
    node.initializer = _ExpressionParser_parseMaybeAssignAllowIn();
  }
  return _Parser_finishNode_dynamic(node, "TSEnumMember");
}
function _typescript_tsParseEnumDeclaration(node, properties = {}) {
  if (properties.const) node.const = true;
  if (properties.declare) node.declare = true;
  _UtilParser_expectContextual(126);
  node.id = _Parser_parseIdentifier_dynamic();
  _LValParser_checkIdentifier(node.id, node.const ? 8971 : 8459);
  {
    _UtilParser_expect(5);
    node.members = _typescript_tsParseDelimitedList("EnumMembers", _typescript_tsParseEnumMember.bind(_Parser_this));
    _UtilParser_expect(8);
  }
  return _Parser_finishNode_dynamic(node, "TSEnumDeclaration");
}
function _typescript_tsParseEnumBody() {
  const node = _NodeUtils_startNode();
  _UtilParser_expect(5);
  node.members = _typescript_tsParseDelimitedList("EnumMembers", _typescript_tsParseEnumMember.bind(_Parser_this));
  _UtilParser_expect(8);
  return _Parser_finishNode_dynamic(node, "TSEnumBody");
}
function _typescript_tsParseModuleBlock() {
  const node = _NodeUtils_startNode();
  _Parser_this.scope.enter(0);
  _UtilParser_expect(5);
  _StatementParser_parseBlockOrModuleBlockBody(node.body = [], undefined, true, 8);
  _Parser_this.scope.exit();
  return _Parser_finishNode_dynamic(node, "TSModuleBlock");
}
function _typescript_tsParseModuleOrNamespaceDeclaration(node, nested = false) {
  node.id = _Parser_parseIdentifier_dynamic();
  if (!nested) {
    _LValParser_checkIdentifier(node.id, 1024);
  }
  if (_Tokenizer_eat(16)) {
    const inner = _NodeUtils_startNode();
    _typescript_tsParseModuleOrNamespaceDeclaration(inner, true);
    node.body = inner;
  } else {
    _Parser_this.scope.enter(256);
    _Parser_this.prodParam.enter(0);
    node.body = _typescript_tsParseModuleBlock();
    _Parser_this.prodParam.exit();
    _Parser_this.scope.exit();
  }
  return _Parser_finishNode_dynamic(node, "TSModuleDeclaration");
}
function _typescript_tsParseAmbientExternalModuleDeclaration(node) {
  if (_UtilParser_isContextual(112)) {
    node.kind = "global";
    {
      node.global = true;
    }
    node.id = _Parser_parseIdentifier_dynamic();
  } else if (_Tokenizer_match(134)) {
    node.kind = "module";
    node.id = _ExpressionParser_parseStringLiteral(_Parser_this.state.value);
  } else {
    _Tokenizer_unexpected();
  }
  if (_Tokenizer_match(5)) {
    _Parser_this.scope.enter(256);
    _Parser_this.prodParam.enter(0);
    node.body = _typescript_tsParseModuleBlock();
    _Parser_this.prodParam.exit();
    _Parser_this.scope.exit();
  } else {
    _UtilParser_semicolon();
  }
  return _Parser_finishNode_dynamic(node, "TSModuleDeclaration");
}
function _typescript_tsParseImportEqualsDeclaration(node, maybeDefaultIdentifier, isExport) {
  {
    node.isExport = isExport || false;
  }
  node.id = maybeDefaultIdentifier || _Parser_parseIdentifier_dynamic();
  _LValParser_checkIdentifier(node.id, 4096);
  _UtilParser_expect(29);
  const moduleReference = _typescript_tsParseModuleReference();
  if (node.importKind === "type" && moduleReference.type !== "TSExternalModuleReference") {
    _Tokenizer_raise(TSErrors.ImportAliasHasImportType, moduleReference);
  }
  node.moduleReference = moduleReference;
  _UtilParser_semicolon();
  return _Parser_finishNode_dynamic(node, "TSImportEqualsDeclaration");
}
function _typescript_tsIsExternalModuleReference() {
  return _UtilParser_isContextual(119) && _Tokenizer_lookaheadCharCode() === 40;
}
function _typescript_tsParseModuleReference() {
  return _typescript_tsIsExternalModuleReference() ? _typescript_tsParseExternalModuleReference() : _typescript_tsParseEntityName(0);
}
function _typescript_tsParseExternalModuleReference() {
  const node = _NodeUtils_startNode();
  _UtilParser_expectContextual(119);
  _UtilParser_expect(10);
  if (!_Tokenizer_match(134)) {
    _Tokenizer_unexpected();
  }
  node.expression = _ExpressionParser_parseExprAtom();
  _UtilParser_expect(11);
  _Parser_this.sawUnambiguousESM = true;
  return _Parser_finishNode_dynamic(node, "TSExternalModuleReference");
}
function _typescript_tsLookAhead(f) {
  const state = _Parser_this.state.clone();
  const res = f();
  _Parser_this.state = state;
  return res;
}
function _typescript_tsTryParseAndCatch(f) {
  const result = _UtilParser_tryParse(abort => f() || abort());
  if (result.aborted || !result.node) return;
  if (result.error) _Parser_this.state = result.failState;
  return result.node;
}
function _typescript_tsTryParse(f) {
  const state = _Parser_this.state.clone();
  const result = f();
  if (result !== undefined && result !== false) {
    return result;
  }
  _Parser_this.state = state;
}
function _typescript_tsTryParseDeclare(nany) {
  if (_UtilParser_isLineTerminator()) {
    return;
  }
  let startType = _Parser_this.state.type;
  let kind;
  if (_UtilParser_isContextual(100)) {
    startType = 74;
    kind = "let";
  }
  return _typescript_tsInAmbientContext(() => {
    switch (startType) {
      case 68:
        nany.declare = true;
        return _StatementParser_parseFunctionStatement(nany, false, false);
      case 80:
        nany.declare = true;
        return _Parser_parseClass_dynamic(nany, true, false);
      case 126:
        return _typescript_tsParseEnumDeclaration(nany, {
          declare: true
        });
      case 112:
        return _typescript_tsParseAmbientExternalModuleDeclaration(nany);
      case 75:
      case 74:
        if (!_Tokenizer_match(75) || !_UtilParser_isLookaheadContextual("enum")) {
          nany.declare = true;
          return _Parser_parseVarStatement_dynamic(nany, kind || _Parser_this.state.value, true);
        }
        _UtilParser_expect(75);
        return _typescript_tsParseEnumDeclaration(nany, {
          const: true,
          declare: true
        });
      case 129:
        {
          const result = _typescript_tsParseInterfaceDeclaration(nany, {
            declare: true
          });
          if (result) return result;
        }
      default:
        if (tokenIsIdentifier(startType)) {
          return _typescript_tsParseDeclaration(nany, _Parser_this.state.value, true, null);
        }
    }
  });
}
function _typescript_tsTryParseExportDeclaration() {
  return _typescript_tsParseDeclaration(_NodeUtils_startNode(), _Parser_this.state.value, true, null);
}
function _typescript_tsParseExpressionStatement(node, expr, decorators) {
  switch (expr.name) {
    case "declare":
      {
        const declaration = _typescript_tsTryParseDeclare(node);
        if (declaration) {
          declaration.declare = true;
        }
        return declaration;
      }
    case "global":
      if (_Tokenizer_match(5)) {
        _Parser_this.scope.enter(256);
        _Parser_this.prodParam.enter(0);
        const mod = node;
        mod.kind = "global";
        {
          node.global = true;
        }
        mod.id = expr;
        mod.body = _typescript_tsParseModuleBlock();
        _Parser_this.scope.exit();
        _Parser_this.prodParam.exit();
        return _Parser_finishNode_dynamic(mod, "TSModuleDeclaration");
      }
      break;
    default:
      return _typescript_tsParseDeclaration(node, expr.name, false, decorators);
  }
}
function _typescript_tsParseDeclaration(node, value, next, decorators) {
  switch (value) {
    case "abstract":
      if (_typescript_tsCheckLineTerminator(next) && (_Tokenizer_match(80) || tokenIsIdentifier(_Parser_this.state.type))) {
        return _typescript_tsParseAbstractDeclaration(node, decorators);
      }
      break;
    case "module":
      if (_typescript_tsCheckLineTerminator(next)) {
        if (_Tokenizer_match(134)) {
          return _typescript_tsParseAmbientExternalModuleDeclaration(node);
        } else if (tokenIsIdentifier(_Parser_this.state.type)) {
          node.kind = "module";
          return _typescript_tsParseModuleOrNamespaceDeclaration(node);
        }
      }
      break;
    case "namespace":
      if (_typescript_tsCheckLineTerminator(next) && tokenIsIdentifier(_Parser_this.state.type)) {
        node.kind = "namespace";
        return _typescript_tsParseModuleOrNamespaceDeclaration(node);
      }
      break;
    case "type":
      if (_typescript_tsCheckLineTerminator(next) && tokenIsIdentifier(_Parser_this.state.type)) {
        return _typescript_tsParseTypeAliasDeclaration(node);
      }
      break;
  }
}
function _typescript_tsCheckLineTerminator(next) {
  if (next) {
    if (_UtilParser_hasFollowingLineBreak()) return false;
    _Tokenizer_next();
    return true;
  }
  return !_UtilParser_isLineTerminator();
}
function _typescript_tsTryParseGenericAsyncArrowFunction(startLoc) {
  if (!_Tokenizer_match(47)) return;
  const oldMaybeInArrowParameters = _Parser_this.state.maybeInArrowParameters;
  _Parser_this.state.maybeInArrowParameters = true;
  const res = _typescript_tsTryParseAndCatch(() => {
    const node = _NodeUtils_startNodeAt(startLoc);
    node.typeParameters = _typescript_tsParseTypeParameters(_Parser_this.tsParseConstModifier);
    _StatementParser_parseFunctionParams(node);
    node.returnType = _typescript_tsTryParseTypeOrTypePredicateAnnotation();
    _UtilParser_expect(19);
    return node;
  });
  _Parser_this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
  if (!res) return;
  return _ExpressionParser_parseArrowExpression(res, null, true);
}
function _typescript_tsParseTypeArgumentsInExpression() {
  if (_Parser_reScan_lt_dynamic() !== 47) return;
  return _typescript_tsParseTypeArguments();
}
function _typescript_tsParseTypeArguments() {
  const node = _NodeUtils_startNode();
  node.params = _typescript_tsInType(() => _typescript_tsInTopLevelContext(() => {
    _UtilParser_expect(47);
    return _typescript_tsParseDelimitedList("TypeParametersOrArguments", _typescript_tsParseType.bind(_Parser_this));
  }));
  if (node.params.length === 0) {
    _Tokenizer_raise(TSErrors.EmptyTypeArguments, node);
  } else if (!_Parser_this.state.inType && _Tokenizer_curContext() === types.brace) {
    _Parser_reScan_lt_gt_dynamic();
  }
  _UtilParser_expect(48);
  return _Parser_finishNode_dynamic(node, "TSTypeParameterInstantiation");
}
function _typescript_tsIsDeclarationStart() {
  return tokenIsTSDeclarationStart(_Parser_this.state.type);
}
function _typescript_isExportDefaultSpecifier(__super) {
  if (_typescript_tsIsDeclarationStart()) return false;
  return __super();
}
function _typescript_parseBindingElement(__super, flags, decorators) {
  const startLoc = decorators.length ? decorators[0].loc.start : _Parser_this.state.startLoc;
  const modified = {};
  _typescript_tsParseModifiers({
    allowedModifiers: ["public", "private", "protected", "override", "readonly"]
  }, modified);
  const accessibility = modified.accessibility;
  const override = modified.override;
  const readonly = modified.readonly;
  if (!(flags & 4) && (accessibility || readonly || override)) {
    _Tokenizer_raise(TSErrors.UnexpectedParameterModifier, startLoc);
  }
  const left = _Parser_parseMaybeDefault_dynamic();
  if (flags & 2) {
    _Parser_parseFunctionParamType_dynamic(left);
  }
  const elt = _Parser_parseMaybeDefault_dynamic(left.loc.start, left);
  if (accessibility || readonly || override) {
    const pp = _NodeUtils_startNodeAt(startLoc);
    if (decorators.length) {
      pp.decorators = decorators;
    }
    if (accessibility) pp.accessibility = accessibility;
    if (readonly) pp.readonly = readonly;
    if (override) pp.override = override;
    if (elt.type !== "Identifier" && elt.type !== "AssignmentPattern") {
      _Tokenizer_raise(TSErrors.UnsupportedParameterPropertyKind, pp);
    }
    pp.parameter = elt;
    return _Parser_finishNode_dynamic(pp, "TSParameterProperty");
  }
  if (decorators.length) {
    left.decorators = decorators;
  }
  return elt;
}
function _typescript_isSimpleParameter(__super, node) {
  return node.type === "TSParameterProperty" && __super(node.parameter) || __super(node);
}
function _typescript_tsDisallowOptionalPattern(node) {
  for (const param of node.params) {
    if (param.type !== "Identifier" && param.optional && !_Parser_this.state.isAmbientContext) {
      _Tokenizer_raise(TSErrors.PatternIsOptional, param);
    }
  }
}
function _typescript_setArrowFunctionParameters(__super, node, params, trailingCommaLoc) {
  __super(node, params, trailingCommaLoc);
  _typescript_tsDisallowOptionalPattern(node);
}
function _typescript_parseFunctionBodyAndFinish(__super, node, type, isMethod = false) {
  if (_Tokenizer_match(14)) {
    node.returnType = _typescript_tsParseTypeOrTypePredicateAnnotation(14);
  }
  const bodilessType = type === "FunctionDeclaration" ? "TSDeclareFunction" : type === "ClassMethod" || type === "ClassPrivateMethod" ? "TSDeclareMethod" : undefined;
  if (bodilessType && !_Tokenizer_match(5) && _UtilParser_isLineTerminator()) {
    return _Parser_finishNode_dynamic(node, bodilessType);
  }
  if (bodilessType === "TSDeclareFunction" && _Parser_this.state.isAmbientContext) {
    _Tokenizer_raise(TSErrors.DeclareFunctionHasImplementation, node);
    if (node.declare) {
      return __super(node, bodilessType, isMethod);
    }
  }
  _typescript_tsDisallowOptionalPattern(node);
  return __super(node, type, isMethod);
}
function _typescript_registerFunctionStatementId(__super, node) {
  if (!node.body && node.id) {
    _LValParser_checkIdentifier(node.id, 1024);
  } else {
    __super(node);
  }
}
function _typescript_tsCheckForInvalidTypeCasts(items) {
  items.forEach(node => {
    if ((node == null ? void 0 : node.type) === "TSTypeCastExpression") {
      _Tokenizer_raise(TSErrors.UnexpectedTypeAnnotation, node.typeAnnotation);
    }
  });
}
function _typescript_toReferencedList(__super, exprList, isInParens) {
  _typescript_tsCheckForInvalidTypeCasts(exprList);
  return exprList;
}
function _typescript_parseArrayLike(__super, close, canBePattern, isTuple, refExpressionErrors) {
  const node = __super(close, canBePattern, isTuple, refExpressionErrors);
  if (node.type === "ArrayExpression") {
    _typescript_tsCheckForInvalidTypeCasts(node.elements);
  }
  return node;
}
function _typescript_parseSubscript(__super, base, startLoc, noCalls, state) {
  if (!_UtilParser_hasPrecedingLineBreak() && _Tokenizer_match(35)) {
    _Parser_this.state.canStartJSXElement = false;
    _Tokenizer_next();
    const nonNullExpression = _NodeUtils_startNodeAt(startLoc);
    nonNullExpression.expression = base;
    return _Parser_finishNode_dynamic(nonNullExpression, "TSNonNullExpression");
  }
  let isOptionalCall = false;
  if (_Tokenizer_match(18) && _Tokenizer_lookaheadCharCode() === 60) {
    if (noCalls) {
      state.stop = true;
      return base;
    }
    state.optionalChainMember = isOptionalCall = true;
    _Tokenizer_next();
  }
  if (_Tokenizer_match(47) || _Tokenizer_match(51)) {
    let missingParenErrorLoc;
    const result = _typescript_tsTryParseAndCatch(() => {
      if (!noCalls && _ExpressionParser_atPossibleAsyncArrow(base)) {
        const asyncArrowFn = _typescript_tsTryParseGenericAsyncArrowFunction(startLoc);
        if (asyncArrowFn) {
          return asyncArrowFn;
        }
      }
      const typeArguments = _typescript_tsParseTypeArgumentsInExpression();
      if (!typeArguments) return;
      if (isOptionalCall && !_Tokenizer_match(10)) {
        missingParenErrorLoc = _Parser_this.state.curPosition();
        return;
      }
      if (tokenIsTemplate(_Parser_this.state.type)) {
        const result = _ExpressionParser_parseTaggedTemplateExpression(base, startLoc, state);
        {
          result.typeParameters = typeArguments;
        }
        return result;
      }
      if (!noCalls && _Tokenizer_eat(10)) {
        const node = _NodeUtils_startNodeAt(startLoc);
        node.callee = base;
        node.arguments = _ExpressionParser_parseCallExpressionArguments(11);
        _typescript_tsCheckForInvalidTypeCasts(node.arguments);
        {
          node.typeParameters = typeArguments;
        }
        if (state.optionalChainMember) {
          node.optional = isOptionalCall;
        }
        return _Parser_finishCallExpression_dynamic(node, state.optionalChainMember);
      }
      const tokenType = _Parser_this.state.type;
      if (tokenType === 48 || tokenType === 52 || tokenType !== 10 && tokenCanStartExpression(tokenType) && !_UtilParser_hasPrecedingLineBreak()) {
        return;
      }
      const node = _NodeUtils_startNodeAt(startLoc);
      node.expression = base;
      {
        node.typeParameters = typeArguments;
      }
      return _Parser_finishNode_dynamic(node, "TSInstantiationExpression");
    });
    if (missingParenErrorLoc) {
      _Tokenizer_unexpected(missingParenErrorLoc, 10);
    }
    if (result) {
      if (result.type === "TSInstantiationExpression") {
        if (_Tokenizer_match(16) || _Tokenizer_match(18) && _Tokenizer_lookaheadCharCode() !== 40) {
          _Tokenizer_raise(TSErrors.InvalidPropertyAccessAfterInstantiationExpression, _Parser_this.state.startLoc);
        }
        if (!_Tokenizer_match(16) && !_Tokenizer_match(18)) {
          result.expression = _ExpressionParser_stopParseSubscript(base, state);
        }
      }
      return result;
    }
  }
  return __super(base, startLoc, noCalls, state);
}
function _typescript_parseNewCallee(__super, node) {
  var _callee$extra;
  __super(node);
  const {
    callee
  } = node;
  if (callee.type === "TSInstantiationExpression" && !((_callee$extra = callee.extra) != null && _callee$extra.parenthesized)) {
    {
      node.typeParameters = callee.typeParameters;
    }
    node.callee = callee.expression;
  }
}
function _typescript_parseExprOp(__super, left, leftStartLoc, minPrec) {
  let isSatisfies;
  if (tokenOperatorPrecedence(58) > minPrec && !_UtilParser_hasPrecedingLineBreak() && (_UtilParser_isContextual(93) || (isSatisfies = _UtilParser_isContextual(120)))) {
    const node = _NodeUtils_startNodeAt(leftStartLoc);
    node.expression = left;
    node.typeAnnotation = _typescript_tsInType(() => {
      _Tokenizer_next();
      if (_Tokenizer_match(75)) {
        if (isSatisfies) {
          _Tokenizer_raise(Errors.UnexpectedKeyword, _Parser_this.state.startLoc, {
            keyword: "const"
          });
        }
        return _typescript_tsParseTypeReference();
      }
      return _typescript_tsParseType();
    });
    _Parser_finishNode_dynamic(node, isSatisfies ? "TSSatisfiesExpression" : "TSAsExpression");
    _Parser_reScan_lt_gt_dynamic();
    return _Parser_parseExprOp_dynamic(node, leftStartLoc, minPrec);
  }
  return __super(left, leftStartLoc, minPrec);
}
function _typescript_checkReservedWord(__super, word, startLoc, checkKeywords, isBinding) {
  if (!_Parser_this.state.isAmbientContext) {
    __super(word, startLoc, checkKeywords, isBinding);
  }
}
function _typescript_checkImportReflection(__super, node) {
  __super(node);
  if (node.module && node.importKind !== "value") {
    _Tokenizer_raise(TSErrors.ImportReflectionHasImportType, node.specifiers[0].loc.start);
  }
}
function _typescript_checkDuplicateExports(__super) {}
function _typescript_isPotentialImportPhase(__super, isExport) {
  if (__super(isExport)) return true;
  if (_UtilParser_isContextual(130)) {
    const ch = _Tokenizer_lookaheadCharCode();
    return isExport ? ch === 123 || ch === 42 : ch !== 61;
  }
  return !isExport && _UtilParser_isContextual(87);
}
function _typescript_applyImportPhase(__super, node, isExport, phase, loc) {
  __super(node, isExport, phase, loc);
  if (isExport) {
    node.exportKind = phase === "type" ? "type" : "value";
  } else {
    node.importKind = phase === "type" || phase === "typeof" ? phase : "value";
  }
}
function _typescript_parseImport(__super, node) {
  if (_Tokenizer_match(134)) {
    node.importKind = "value";
    return __super(node);
  }
  let importNode;
  if (tokenIsIdentifier(_Parser_this.state.type) && _Tokenizer_lookaheadCharCode() === 61) {
    node.importKind = "value";
    return _typescript_tsParseImportEqualsDeclaration(node);
  } else if (_UtilParser_isContextual(130)) {
    const maybeDefaultIdentifier = _StatementParser_parseMaybeImportPhase(node, false);
    if (_Tokenizer_lookaheadCharCode() === 61) {
      return _typescript_tsParseImportEqualsDeclaration(node, maybeDefaultIdentifier);
    } else {
      importNode = _StatementParser_parseImportSpecifiersAndAfter(node, maybeDefaultIdentifier);
    }
  } else {
    importNode = __super(node);
  }
  if (importNode.importKind === "type" && importNode.specifiers.length > 1 && importNode.specifiers[0].type === "ImportDefaultSpecifier") {
    _Tokenizer_raise(TSErrors.TypeImportCannotSpecifyDefaultAndNamed, importNode);
  }
  return importNode;
}
function _typescript_parseExport(__super, node, decorators) {
  if (_Tokenizer_match(83)) {
    const nodeImportEquals = node;
    _Tokenizer_next();
    let maybeDefaultIdentifier = null;
    if (_UtilParser_isContextual(130) && _Parser_isPotentialImportPhase_dynamic(false)) {
      maybeDefaultIdentifier = _StatementParser_parseMaybeImportPhase(nodeImportEquals, false);
    } else {
      nodeImportEquals.importKind = "value";
    }
    const declaration = _typescript_tsParseImportEqualsDeclaration(nodeImportEquals, maybeDefaultIdentifier, true);
    {
      return declaration;
    }
  } else if (_Tokenizer_eat(29)) {
    const assign = node;
    assign.expression = _ExpressionParser_parseExpression();
    _UtilParser_semicolon();
    _Parser_this.sawUnambiguousESM = true;
    return _Parser_finishNode_dynamic(assign, "TSExportAssignment");
  } else if (_UtilParser_eatContextual(93)) {
    const decl = node;
    _UtilParser_expectContextual(128);
    decl.id = _Parser_parseIdentifier_dynamic();
    _UtilParser_semicolon();
    return _Parser_finishNode_dynamic(decl, "TSNamespaceExportDeclaration");
  } else {
    return __super(node, decorators);
  }
}
function _typescript_isAbstractClass() {
  return _UtilParser_isContextual(124) && _Tokenizer_lookahead().type === 80;
}
function _typescript_parseExportDefaultExpression(__super) {
  if (_typescript_isAbstractClass()) {
    const cls = _NodeUtils_startNode();
    _Tokenizer_next();
    cls.abstract = true;
    return _Parser_parseClass_dynamic(cls, true, true);
  }
  if (_Tokenizer_match(129)) {
    const result = _typescript_tsParseInterfaceDeclaration(_NodeUtils_startNode());
    if (result) return result;
  }
  return __super();
}
function _typescript_parseVarStatement(__super, node, kind, allowMissingInitializer = false) {
  const {
    isAmbientContext
  } = _Parser_this.state;
  const declaration = __super(node, kind, allowMissingInitializer || isAmbientContext);
  if (!isAmbientContext) return declaration;
  for (const {
    id,
    init
  } of declaration.declarations) {
    if (!init) continue;
    if (kind !== "const" || !!id.typeAnnotation) {
      _Tokenizer_raise(TSErrors.InitializerNotAllowedInAmbientContext, init);
    } else if (!isValidAmbientConstInitializer(init, _BaseParser_hasPlugin("estree"))) {
      _Tokenizer_raise(TSErrors.ConstInitializerMustBeStringOrNumericLiteralOrLiteralEnumReference, init);
    }
  }
  return declaration;
}
function _typescript_parseStatementContent(__super, flags, decorators) {
  if (_Tokenizer_match(75) && _UtilParser_isLookaheadContextual("enum")) {
    const node = _NodeUtils_startNode();
    _UtilParser_expect(75);
    return _typescript_tsParseEnumDeclaration(node, {
      const: true
    });
  }
  if (_UtilParser_isContextual(126)) {
    return _typescript_tsParseEnumDeclaration(_NodeUtils_startNode());
  }
  if (_UtilParser_isContextual(129)) {
    const result = _typescript_tsParseInterfaceDeclaration(_NodeUtils_startNode());
    if (result) return result;
  }
  return __super(flags, decorators);
}
function _typescript_parseAccessModifier() {
  return _typescript_tsParseModifier(["public", "protected", "private"]);
}
function _typescript_tsHasSomeModifiers(member, modifiers) {
  return modifiers.some(modifier => {
    if (tsIsAccessModifier(modifier)) {
      return member.accessibility === modifier;
    }
    return !!member[modifier];
  });
}
function _typescript_tsIsStartOfStaticBlocks() {
  return _UtilParser_isContextual(106) && _Tokenizer_lookaheadCharCode() === 123;
}
function _typescript_parseClassMember(__super, classBody, member, state) {
  const modifiers = ["declare", "private", "public", "protected", "override", "abstract", "readonly", "static"];
  _typescript_tsParseModifiers({
    allowedModifiers: modifiers,
    disallowedModifiers: ["in", "out"],
    stopOnStartOfClassStaticBlock: true,
    errorTemplate: TSErrors.InvalidModifierOnTypeParameterPositions
  }, member);
  const callParseClassMemberWithIsStatic = () => {
    if (_typescript_tsIsStartOfStaticBlocks()) {
      _Tokenizer_next();
      _Tokenizer_next();
      if (_typescript_tsHasSomeModifiers(member, modifiers)) {
        _Tokenizer_raise(TSErrors.StaticBlockCannotHaveModifier, _Parser_this.state.curPosition());
      }
      _StatementParser_parseClassStaticBlock(classBody, member);
    } else {
      _Parser_parseClassMemberWithIsStatic_dynamic(classBody, member, state, !!member.static);
    }
  };
  if (member.declare) {
    _typescript_tsInAmbientContext(callParseClassMemberWithIsStatic);
  } else {
    callParseClassMemberWithIsStatic();
  }
}
function _typescript_parseClassMemberWithIsStatic(__super, classBody, member, state, isStatic) {
  const idx = _typescript_tsTryParseIndexSignature(member);
  if (idx) {
    classBody.body.push(idx);
    if (member.abstract) {
      _Tokenizer_raise(TSErrors.IndexSignatureHasAbstract, member);
    }
    if (member.accessibility) {
      _Tokenizer_raise(TSErrors.IndexSignatureHasAccessibility, member, {
        modifier: member.accessibility
      });
    }
    if (member.declare) {
      _Tokenizer_raise(TSErrors.IndexSignatureHasDeclare, member);
    }
    if (member.override) {
      _Tokenizer_raise(TSErrors.IndexSignatureHasOverride, member);
    }
    return;
  }
  if (!_Parser_this.state.inAbstractClass && member.abstract) {
    _Tokenizer_raise(TSErrors.NonAbstractClassHasAbstractMethod, member);
  }
  if (member.override) {
    if (!state.hadSuperClass) {
      _Tokenizer_raise(TSErrors.OverrideNotInSubClass, member);
    }
  }
  __super(classBody, member, state, isStatic);
}
function _typescript_parsePostMemberNameModifiers(__super, methodOrProp) {
  const optional = _Tokenizer_eat(17);
  if (optional) methodOrProp.optional = true;
  if (methodOrProp.readonly && _Tokenizer_match(10)) {
    _Tokenizer_raise(TSErrors.ClassMethodHasReadonly, methodOrProp);
  }
  if (methodOrProp.declare && _Tokenizer_match(10)) {
    _Tokenizer_raise(TSErrors.ClassMethodHasDeclare, methodOrProp);
  }
}
function _typescript_parseExpressionStatement(__super, node, expr, decorators) {
  const decl = expr.type === "Identifier" ? _typescript_tsParseExpressionStatement(node, expr, decorators) : undefined;
  return decl || __super(node, expr, decorators);
}
function _typescript_shouldParseExportDeclaration(__super) {
  if (_typescript_tsIsDeclarationStart()) return true;
  return __super();
}
function _typescript_parseConditional(__super, expr, startLoc, refExpressionErrors) {
  if (!_Tokenizer_match(17)) return expr;
  if (_Parser_this.state.maybeInArrowParameters) {
    const nextCh = _Tokenizer_lookaheadCharCode();
    if (nextCh === 44 || nextCh === 61 || nextCh === 58 || nextCh === 41) {
      _ExpressionParser_setOptionalParametersError(refExpressionErrors);
      return expr;
    }
  }
  return __super(expr, startLoc, refExpressionErrors);
}
function _typescript_parseParenItem(__super, node, startLoc) {
  const newNode = __super(node, startLoc);
  if (_Tokenizer_eat(17)) {
    newNode.optional = true;
    _Parser_resetEndLocation_dynamic(node);
  }
  if (_Tokenizer_match(14)) {
    const typeCastNode = _NodeUtils_startNodeAt(startLoc);
    typeCastNode.expression = node;
    typeCastNode.typeAnnotation = _typescript_tsParseTypeAnnotation();
    return _Parser_finishNode_dynamic(typeCastNode, "TSTypeCastExpression");
  }
  return node;
}
function _typescript_parseExportDeclaration(__super, node) {
  if (!_Parser_this.state.isAmbientContext && _UtilParser_isContextual(125)) {
    return _typescript_tsInAmbientContext(() => _Parser_parseExportDeclaration_dynamic(node));
  }
  const startLoc = _Parser_this.state.startLoc;
  const isDeclare = _UtilParser_eatContextual(125);
  if (isDeclare && (_UtilParser_isContextual(125) || !_Parser_shouldParseExportDeclaration_dynamic())) {
    throw _Tokenizer_raise(TSErrors.ExpectedAmbientAfterExportDeclare, _Parser_this.state.startLoc);
  }
  const isIdentifier = tokenIsIdentifier(_Parser_this.state.type);
  const declaration = isIdentifier && _typescript_tsTryParseExportDeclaration() || __super(node);
  if (!declaration) return null;
  if (declaration.type === "TSInterfaceDeclaration" || declaration.type === "TSTypeAliasDeclaration" || isDeclare) {
    node.exportKind = "type";
  }
  if (isDeclare && declaration.type !== "TSImportEqualsDeclaration") {
    _Parser_resetStartLocation_dynamic(declaration, startLoc);
    declaration.declare = true;
  }
  return declaration;
}
function _typescript_parseClassId(__super, node, isStatement, optionalId, bindingType) {
  if ((!isStatement || optionalId) && _UtilParser_isContextual(113)) {
    return;
  }
  __super(node, isStatement, optionalId, node.declare ? 1024 : 8331);
  const typeParameters = _typescript_tsTryParseTypeParameters(_Parser_this.tsParseInOutConstModifiers);
  if (typeParameters) node.typeParameters = typeParameters;
}
function _typescript_parseClassPropertyAnnotation(node) {
  if (!node.optional) {
    if (_Tokenizer_eat(35)) {
      node.definite = true;
    } else if (_Tokenizer_eat(17)) {
      node.optional = true;
    }
  }
  const type = _typescript_tsTryParseTypeAnnotation();
  if (type) node.typeAnnotation = type;
}
function _typescript_parseClassProperty(__super, node) {
  _typescript_parseClassPropertyAnnotation(node);
  if (_Parser_this.state.isAmbientContext && !(node.readonly && !node.typeAnnotation) && _Tokenizer_match(29)) {
    _Tokenizer_raise(TSErrors.DeclareClassFieldHasInitializer, _Parser_this.state.startLoc);
  }
  if (node.abstract && _Tokenizer_match(29)) {
    const {
      key
    } = node;
    _Tokenizer_raise(TSErrors.AbstractPropertyHasInitializer, _Parser_this.state.startLoc, {
      propertyName: key.type === "Identifier" && !node.computed ? key.name : `[${_Parser_this.input.slice(_BaseParser_offsetToSourcePos(key.start), _BaseParser_offsetToSourcePos(key.end))}]`
    });
  }
  return __super(node);
}
function _typescript_parseClassPrivateProperty(__super, node) {
  if (node.abstract) {
    _Tokenizer_raise(TSErrors.PrivateElementHasAbstract, node);
  }
  if (node.accessibility) {
    _Tokenizer_raise(TSErrors.PrivateElementHasAccessibility, node, {
      modifier: node.accessibility
    });
  }
  _typescript_parseClassPropertyAnnotation(node);
  return __super(node);
}
function _typescript_parseClassAccessorProperty(__super, node) {
  _typescript_parseClassPropertyAnnotation(node);
  if (node.optional) {
    _Tokenizer_raise(TSErrors.AccessorCannotBeOptional, node);
  }
  return __super(node);
}
function _typescript_pushClassMethod(__super, classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
  const typeParameters = _typescript_tsTryParseTypeParameters(_Parser_this.tsParseConstModifier);
  if (typeParameters && isConstructor) {
    _Tokenizer_raise(TSErrors.ConstructorHasTypeParameters, typeParameters);
  }
  const {
    declare = false,
    kind
  } = method;
  if (declare && (kind === "get" || kind === "set")) {
    _Tokenizer_raise(TSErrors.DeclareAccessor, method, {
      kind
    });
  }
  if (typeParameters) method.typeParameters = typeParameters;
  __super(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper);
}
function _typescript_pushClassPrivateMethod(__super, classBody, method, isGenerator, isAsync) {
  const typeParameters = _typescript_tsTryParseTypeParameters(_Parser_this.tsParseConstModifier);
  if (typeParameters) method.typeParameters = typeParameters;
  __super(classBody, method, isGenerator, isAsync);
}
function _typescript_declareClassPrivateMethodInScope(__super, node, kind) {
  if (node.type === "TSDeclareMethod") return;
  if (node.type === "MethodDefinition" && node.value.body == null) {
    return;
  }
  __super(node, kind);
}
function _typescript_parseClassSuper(__super, node) {
  __super(node);
  if (node.superClass && (_Tokenizer_match(47) || _Tokenizer_match(51))) {
    {
      node.superTypeParameters = _typescript_tsParseTypeArgumentsInExpression();
    }
  }
  if (_UtilParser_eatContextual(113)) {
    node.implements = _typescript_tsParseHeritageClause("implements");
  }
}
function _typescript_parseObjPropValue(__super, prop, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors) {
  const typeParameters = _typescript_tsTryParseTypeParameters(_Parser_this.tsParseConstModifier);
  if (typeParameters) prop.typeParameters = typeParameters;
  return __super(prop, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors);
}
function _typescript_parseFunctionParams(__super, node, isConstructor) {
  const typeParameters = _typescript_tsTryParseTypeParameters(_Parser_this.tsParseConstModifier);
  if (typeParameters) node.typeParameters = typeParameters;
  __super(node, isConstructor);
}
function _typescript_parseVarId(__super, decl, kind) {
  __super(decl, kind);
  if (decl.id.type === "Identifier" && !_UtilParser_hasPrecedingLineBreak() && _Tokenizer_eat(35)) {
    decl.definite = true;
  }
  const type = _typescript_tsTryParseTypeAnnotation();
  if (type) {
    decl.id.typeAnnotation = type;
    _Parser_resetEndLocation_dynamic(decl.id);
  }
}
function _typescript_parseAsyncArrowFromCallExpression(__super, node, call) {
  if (_Tokenizer_match(14)) {
    node.returnType = _typescript_tsParseTypeAnnotation();
  }
  return __super(node, call);
}
function _typescript_parseMaybeAssign(__super, refExpressionErrors, afterLeftParse) {
  var _jsx, _jsx2, _typeCast, _jsx3, _typeCast2;
  let state;
  let jsx;
  let typeCast;
  if (_BaseParser_hasPlugin("jsx") && (_Tokenizer_match(143) || _Tokenizer_match(47))) {
    state = _Parser_this.state.clone();
    jsx = _UtilParser_tryParse(() => __super(refExpressionErrors, afterLeftParse), state);
    if (!jsx.error) return jsx.node;
    const {
      context
    } = _Parser_this.state;
    const currentContext = context[context.length - 1];
    if (currentContext === types.j_oTag || currentContext === types.j_expr) {
      context.pop();
    }
  }
  if (!((_jsx = jsx) != null && _jsx.error) && !_Tokenizer_match(47)) {
    return __super(refExpressionErrors, afterLeftParse);
  }
  if (!state || state === _Parser_this.state) state = _Parser_this.state.clone();
  let typeParameters;
  const arrow = _UtilParser_tryParse(abort => {
    var _expr$extra, _typeParameters;
    typeParameters = _typescript_tsParseTypeParameters(_Parser_this.tsParseConstModifier);
    const expr = __super(refExpressionErrors, afterLeftParse);
    if (expr.type !== "ArrowFunctionExpression" || (_expr$extra = expr.extra) != null && _expr$extra.parenthesized) {
      abort();
    }
    if (((_typeParameters = typeParameters) == null ? void 0 : _typeParameters.params.length) !== 0) {
      _NodeUtils_resetStartLocationFromNode(expr, typeParameters);
    }
    expr.typeParameters = typeParameters;
    return expr;
  }, state);
  if (!arrow.error && !arrow.aborted) {
    if (typeParameters) _typescript_reportReservedArrowTypeParam(typeParameters);
    return arrow.node;
  }
  if (!jsx) {
    assert(!_BaseParser_hasPlugin("jsx"));
    typeCast = _UtilParser_tryParse(() => __super(refExpressionErrors, afterLeftParse), state);
    if (!typeCast.error) return typeCast.node;
  }
  if ((_jsx2 = jsx) != null && _jsx2.node) {
    _Parser_this.state = jsx.failState;
    return jsx.node;
  }
  if (arrow.node) {
    _Parser_this.state = arrow.failState;
    if (typeParameters) _typescript_reportReservedArrowTypeParam(typeParameters);
    return arrow.node;
  }
  if ((_typeCast = typeCast) != null && _typeCast.node) {
    _Parser_this.state = typeCast.failState;
    return typeCast.node;
  }
  throw ((_jsx3 = jsx) == null ? void 0 : _jsx3.error) || arrow.error || ((_typeCast2 = typeCast) == null ? void 0 : _typeCast2.error);
}
function _typescript_reportReservedArrowTypeParam(node) {
  var _node$extra2;
  if (node.params.length === 1 && !node.params[0].constraint && !((_node$extra2 = node.extra) != null && _node$extra2.trailingComma) && _BaseParser_getPluginOption("typescript", "disallowAmbiguousJSXLike")) {
    _Tokenizer_raise(TSErrors.ReservedArrowTypeParam, node);
  }
}
function _typescript_parseMaybeUnary(__super, refExpressionErrors, sawUnary) {
  if (!_BaseParser_hasPlugin("jsx") && _Tokenizer_match(47)) {
    return _typescript_tsParseTypeAssertion();
  }
  return __super(refExpressionErrors, sawUnary);
}
function _typescript_parseArrow(__super, node) {
  if (_Tokenizer_match(14)) {
    const result = _UtilParser_tryParse(abort => {
      const returnType = _typescript_tsParseTypeOrTypePredicateAnnotation(14);
      if (_UtilParser_canInsertSemicolon() || !_Tokenizer_match(19)) abort();
      return returnType;
    });
    if (result.aborted) return;
    if (!result.thrown) {
      if (result.error) _Parser_this.state = result.failState;
      node.returnType = result.node;
    }
  }
  return __super(node);
}
function _typescript_parseFunctionParamType(__super, param) {
  if (_Tokenizer_eat(17)) {
    param.optional = true;
  }
  const type = _typescript_tsTryParseTypeAnnotation();
  if (type) param.typeAnnotation = type;
  _Parser_resetEndLocation_dynamic(param);
  return param;
}
function _typescript_isAssignable(__super, node, isBinding) {
  switch (node.type) {
    case "TSTypeCastExpression":
      return _Parser_isAssignable_dynamic(node.expression, isBinding);
    case "TSParameterProperty":
      return true;
    default:
      return __super(node, isBinding);
  }
}
function _typescript_toAssignable(__super, node, isLHS = false) {
  switch (node.type) {
    case "ParenthesizedExpression":
      _typescript_toAssignableParenthesizedExpression(node, isLHS);
      break;
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSNonNullExpression":
    case "TSTypeAssertion":
      if (isLHS) {
        _Parser_this.expressionScope.recordArrowParameterBindingError(TSErrors.UnexpectedTypeCastInParameter, node);
      } else {
        _Tokenizer_raise(TSErrors.UnexpectedTypeCastInParameter, node);
      }
      _Parser_toAssignable_dynamic(node.expression, isLHS);
      break;
    case "AssignmentExpression":
      if (!isLHS && node.left.type === "TSTypeCastExpression") {
        node.left = _Parser_typeCastToParameter_dynamic(node.left);
      }
    default:
      __super(node, isLHS);
  }
}
function _typescript_toAssignableParenthesizedExpression(node, isLHS) {
  switch (node.expression.type) {
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSNonNullExpression":
    case "TSTypeAssertion":
    case "ParenthesizedExpression":
      _Parser_toAssignable_dynamic(node.expression, isLHS);
      break;
    default:
      _LValParser_toAssignable(node, isLHS);
  }
}
function _typescript_checkToRestConversion(__super, node, allowPattern) {
  switch (node.type) {
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSTypeAssertion":
    case "TSNonNullExpression":
      _Parser_checkToRestConversion_dynamic(node.expression, false);
      break;
    default:
      __super(node, allowPattern);
  }
}
function _typescript_isValidLVal(__super, type, isUnparenthesizedInAssign, binding) {
  switch (type) {
    case "TSTypeCastExpression":
      return true;
    case "TSParameterProperty":
      return "parameter";
    case "TSNonNullExpression":
      return "expression";
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSTypeAssertion":
      return (binding !== 64 || !isUnparenthesizedInAssign) && ["expression", true];
    default:
      return __super(type, isUnparenthesizedInAssign, binding);
  }
}
function _typescript_parseBindingAtom(__super) {
  if (_Parser_this.state.type === 78) {
    return _Parser_parseIdentifier_dynamic(true);
  }
  return __super();
}
function _typescript_parseMaybeDecoratorArguments(__super, expr, startLoc) {
  if (_Tokenizer_match(47) || _Tokenizer_match(51)) {
    const typeArguments = _typescript_tsParseTypeArgumentsInExpression();
    if (_Tokenizer_match(10)) {
      const call = __super(expr, startLoc);
      {
        call.typeParameters = typeArguments;
      }
      return call;
    }
    _Tokenizer_unexpected(null, 10);
  }
  return __super(expr, startLoc);
}
function _typescript_checkCommaAfterRest(__super, close) {
  if (_Parser_this.state.isAmbientContext && _Tokenizer_match(12) && _Tokenizer_lookaheadCharCode() === close) {
    _Tokenizer_next();
    return false;
  }
  return __super(close);
}
function _typescript_isClassMethod(__super) {
  return _Tokenizer_match(47) || __super();
}
function _typescript_isClassProperty(__super) {
  return _Tokenizer_match(35) || _Tokenizer_match(14) || __super();
}
function _typescript_parseMaybeDefault(__super, startLoc, left) {
  const node = __super(startLoc, left);
  if (node.type === "AssignmentPattern" && node.typeAnnotation && node.right.start < node.typeAnnotation.start) {
    _Tokenizer_raise(TSErrors.TypeAnnotationAfterAssign, node.typeAnnotation);
  }
  return node;
}
function _typescript_getTokenFromCode(__super, code) {
  if (_Parser_this.state.inType) {
    if (code === 62) {
      _Tokenizer_finishOp(48, 1);
      return;
    }
    if (code === 60) {
      _Tokenizer_finishOp(47, 1);
      return;
    }
  }
  __super(code);
}
function _typescript_reScan_lt_gt(__super) {
  const {
    type
  } = _Parser_this.state;
  if (type === 47) {
    _Parser_this.state.pos -= 1;
    _Tokenizer_readToken_lt();
  } else if (type === 48) {
    _Parser_this.state.pos -= 1;
    _Tokenizer_readToken_gt();
  }
}
function _typescript_reScan_lt(__super) {
  const {
    type
  } = _Parser_this.state;
  if (type === 51) {
    _Parser_this.state.pos -= 2;
    _Tokenizer_finishOp(47, 1);
    return 47;
  }
  return type;
}
function _typescript_toAssignableListItem(__super, exprList, index, isLHS) {
  const node = exprList[index];
  if (node.type === "TSTypeCastExpression") {
    exprList[index] = _Parser_typeCastToParameter_dynamic(node);
  }
  __super(exprList, index, isLHS);
}
function _typescript_typeCastToParameter(__super, node) {
  node.expression.typeAnnotation = node.typeAnnotation;
  _Parser_resetEndLocation_dynamic(node.expression, node.typeAnnotation.loc.end);
  return node.expression;
}
function _typescript_shouldParseArrow(__super, params) {
  if (_Tokenizer_match(14)) {
    return params.every(expr => _Parser_isAssignable_dynamic(expr, true));
  }
  return __super(params);
}
function _typescript_shouldParseAsyncArrow(__super) {
  return _Tokenizer_match(14) || __super();
}
function _typescript_canHaveLeadingDecorator(__super) {
  return __super() || _typescript_isAbstractClass();
}
function _typescript_jsxParseOpeningElementAfterName(__super, node) {
  if (_Tokenizer_match(47) || _Tokenizer_match(51)) {
    const typeArguments = _typescript_tsTryParseAndCatch(() => _typescript_tsParseTypeArgumentsInExpression());
    if (typeArguments) {
      {
        node.typeParameters = typeArguments;
      }
    }
  }
  return __super(node);
}
function _typescript_getGetterSetterExpectedParamCount(__super, method) {
  const baseCount = __super(method);
  const params = _Parser_getObjectOrClassMethodParams_dynamic(method);
  const firstParam = params[0];
  const hasContextParam = firstParam && _StatementParser_isThisParam(firstParam);
  return hasContextParam ? baseCount + 1 : baseCount;
}
function _typescript_parseCatchClauseParam(__super) {
  const param = __super();
  const type = _typescript_tsTryParseTypeAnnotation();
  if (type) {
    param.typeAnnotation = type;
    _Parser_resetEndLocation_dynamic(param);
  }
  return param;
}
function _typescript_tsInAmbientContext(cb) {
  const {
    isAmbientContext: oldIsAmbientContext,
    strict: oldStrict
  } = _Parser_this.state;
  _Parser_this.state.isAmbientContext = true;
  _Parser_this.state.strict = false;
  try {
    return cb();
  } finally {
    _Parser_this.state.isAmbientContext = oldIsAmbientContext;
    _Parser_this.state.strict = oldStrict;
  }
}
function _typescript_parseClass(__super, node, isStatement, optionalId) {
  const oldInAbstractClass = _Parser_this.state.inAbstractClass;
  _Parser_this.state.inAbstractClass = !!node.abstract;
  try {
    return __super(node, isStatement, optionalId);
  } finally {
    _Parser_this.state.inAbstractClass = oldInAbstractClass;
  }
}
function _typescript_tsParseAbstractDeclaration(node, decorators) {
  if (_Tokenizer_match(80)) {
    node.abstract = true;
    return _StatementParser_maybeTakeDecorators(decorators, _Parser_parseClass_dynamic(node, true, false));
  } else if (_UtilParser_isContextual(129)) {
    if (!_UtilParser_hasFollowingLineBreak()) {
      node.abstract = true;
      _Tokenizer_raise(TSErrors.NonClassMethodPropertyHasAbstractModifer, node);
      return _typescript_tsParseInterfaceDeclaration(node);
    }
  } else {
    _Tokenizer_unexpected(null, 80);
  }
}
function _typescript_parseMethod(__super, node, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope) {
  const method = __super(node, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope);
  if (method.abstract || method.type === "TSAbstractMethodDefinition") {
    const hasEstreePlugin = _BaseParser_hasPlugin("estree");
    const methodFn = hasEstreePlugin ? method.value : method;
    if (methodFn.body) {
      const {
        key
      } = method;
      _Tokenizer_raise(TSErrors.AbstractMethodHasImplementation, method, {
        methodName: key.type === "Identifier" && !method.computed ? key.name : `[${_Parser_this.input.slice(_BaseParser_offsetToSourcePos(key.start), _BaseParser_offsetToSourcePos(key.end))}]`
      });
    }
  }
  return method;
}
function _typescript_tsParseTypeParameterName() {
  const typeName = _Parser_parseIdentifier_dynamic();
  return typeName.name;
}
function _typescript_shouldParseAsAmbientContext() {
  return !!_BaseParser_getPluginOption("typescript", "dts");
}
function _typescript_parse(__super) {
  if (_typescript_shouldParseAsAmbientContext()) {
    _Parser_this.state.isAmbientContext = true;
  }
  return __super();
}
function _typescript_getExpression(__super) {
  if (_typescript_shouldParseAsAmbientContext()) {
    _Parser_this.state.isAmbientContext = true;
  }
  return __super();
}
function _typescript_parseExportSpecifier(__super, node, isString, isInTypeExport, isMaybeTypeOnly) {
  if (!isString && isMaybeTypeOnly) {
    _typescript_parseTypeOnlyImportExportSpecifier(node, false, isInTypeExport);
    return _Parser_finishNode_dynamic(node, "ExportSpecifier");
  }
  node.exportKind = "value";
  return __super(node, isString, isInTypeExport, isMaybeTypeOnly);
}
function _typescript_parseImportSpecifier(__super, specifier, importedIsString, isInTypeOnlyImport, isMaybeTypeOnly, bindingType) {
  if (!importedIsString && isMaybeTypeOnly) {
    _typescript_parseTypeOnlyImportExportSpecifier(specifier, true, isInTypeOnlyImport);
    return _Parser_finishNode_dynamic(specifier, "ImportSpecifier");
  }
  specifier.importKind = "value";
  return __super(specifier, importedIsString, isInTypeOnlyImport, isMaybeTypeOnly, isInTypeOnlyImport ? 4098 : 4096);
}
function _typescript_parseTypeOnlyImportExportSpecifier(node, isImport, isInTypeOnlyImportExport) {
  const leftOfAsKey = isImport ? "imported" : "local";
  const rightOfAsKey = isImport ? "local" : "exported";
  let leftOfAs = node[leftOfAsKey];
  let rightOfAs;
  let hasTypeSpecifier = false;
  let canParseAsKeyword = true;
  const loc = leftOfAs.loc.start;
  if (_UtilParser_isContextual(93)) {
    const firstAs = _Parser_parseIdentifier_dynamic();
    if (_UtilParser_isContextual(93)) {
      const secondAs = _Parser_parseIdentifier_dynamic();
      if (tokenIsKeywordOrIdentifier(_Parser_this.state.type)) {
        hasTypeSpecifier = true;
        leftOfAs = firstAs;
        rightOfAs = isImport ? _Parser_parseIdentifier_dynamic() : _StatementParser_parseModuleExportName();
        canParseAsKeyword = false;
      } else {
        rightOfAs = secondAs;
        canParseAsKeyword = false;
      }
    } else if (tokenIsKeywordOrIdentifier(_Parser_this.state.type)) {
      canParseAsKeyword = false;
      rightOfAs = isImport ? _Parser_parseIdentifier_dynamic() : _StatementParser_parseModuleExportName();
    } else {
      hasTypeSpecifier = true;
      leftOfAs = firstAs;
    }
  } else if (tokenIsKeywordOrIdentifier(_Parser_this.state.type)) {
    hasTypeSpecifier = true;
    if (isImport) {
      leftOfAs = _Parser_parseIdentifier_dynamic(true);
      if (!_UtilParser_isContextual(93)) {
        _Parser_checkReservedWord_dynamic(leftOfAs.name, leftOfAs.loc.start, true, true);
      }
    } else {
      leftOfAs = _StatementParser_parseModuleExportName();
    }
  }
  if (hasTypeSpecifier && isInTypeOnlyImportExport) {
    _Tokenizer_raise(isImport ? TSErrors.TypeModifierIsUsedInTypeImports : TSErrors.TypeModifierIsUsedInTypeExports, loc);
  }
  node[leftOfAsKey] = leftOfAs;
  node[rightOfAsKey] = rightOfAs;
  const kindKey = isImport ? "importKind" : "exportKind";
  node[kindKey] = hasTypeSpecifier ? "type" : "value";
  if (canParseAsKeyword && _UtilParser_eatContextual(93)) {
    node[rightOfAsKey] = isImport ? _Parser_parseIdentifier_dynamic() : _StatementParser_parseModuleExportName();
  }
  if (!node[rightOfAsKey]) {
    node[rightOfAsKey] = _Parser_cloneIdentifier_dynamic(node[leftOfAsKey]);
  }
  if (isImport) {
    _LValParser_checkIdentifier(node[rightOfAsKey], hasTypeSpecifier ? 4098 : 4096);
  }
}
function _typescript_fillOptionalPropertiesForTSESLint(__super, node) {
  var _node$directive, _node$decorators, _node$optional, _node$typeAnnotation, _node$accessibility, _node$decorators2, _node$override, _node$readonly, _node$static, _node$declare, _node$returnType, _node$typeParameters, _node$optional2, _node$optional3, _node$accessibility2, _node$readonly2, _node$static2, _node$declare2, _node$definite, _node$readonly3, _node$typeAnnotation2, _node$accessibility3, _node$decorators3, _node$override2, _node$optional4, _node$id, _node$abstract, _node$declare3, _node$decorators4, _node$implements, _node$superTypeArgume, _node$typeParameters2, _node$declare4, _node$definite2, _node$const, _node$declare5, _node$computed, _node$qualifier, _node$options, _node$declare6, _node$extends, _node$declare7, _node$global, _node$const2, _node$in, _node$out;
  switch (node.type) {
    case "ExpressionStatement":
      (_node$directive = node.directive) != null ? _node$directive : node.directive = undefined;
      return;
    case "RestElement":
      node.value = undefined;
    case "Identifier":
    case "ArrayPattern":
    case "AssignmentPattern":
    case "ObjectPattern":
      (_node$decorators = node.decorators) != null ? _node$decorators : node.decorators = [];
      (_node$optional = node.optional) != null ? _node$optional : node.optional = false;
      (_node$typeAnnotation = node.typeAnnotation) != null ? _node$typeAnnotation : node.typeAnnotation = undefined;
      return;
    case "TSParameterProperty":
      (_node$accessibility = node.accessibility) != null ? _node$accessibility : node.accessibility = undefined;
      (_node$decorators2 = node.decorators) != null ? _node$decorators2 : node.decorators = [];
      (_node$override = node.override) != null ? _node$override : node.override = false;
      (_node$readonly = node.readonly) != null ? _node$readonly : node.readonly = false;
      (_node$static = node.static) != null ? _node$static : node.static = false;
      return;
    case "TSEmptyBodyFunctionExpression":
      node.body = null;
    case "TSDeclareFunction":
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "ClassMethod":
    case "ClassPrivateMethod":
      (_node$declare = node.declare) != null ? _node$declare : node.declare = false;
      (_node$returnType = node.returnType) != null ? _node$returnType : node.returnType = undefined;
      (_node$typeParameters = node.typeParameters) != null ? _node$typeParameters : node.typeParameters = undefined;
      return;
    case "Property":
      (_node$optional2 = node.optional) != null ? _node$optional2 : node.optional = false;
      return;
    case "TSMethodSignature":
    case "TSPropertySignature":
      (_node$optional3 = node.optional) != null ? _node$optional3 : node.optional = false;
    case "TSIndexSignature":
      (_node$accessibility2 = node.accessibility) != null ? _node$accessibility2 : node.accessibility = undefined;
      (_node$readonly2 = node.readonly) != null ? _node$readonly2 : node.readonly = false;
      (_node$static2 = node.static) != null ? _node$static2 : node.static = false;
      return;
    case "TSAbstractPropertyDefinition":
    case "PropertyDefinition":
    case "TSAbstractAccessorProperty":
    case "AccessorProperty":
      (_node$declare2 = node.declare) != null ? _node$declare2 : node.declare = false;
      (_node$definite = node.definite) != null ? _node$definite : node.definite = false;
      (_node$readonly3 = node.readonly) != null ? _node$readonly3 : node.readonly = false;
      (_node$typeAnnotation2 = node.typeAnnotation) != null ? _node$typeAnnotation2 : node.typeAnnotation = undefined;
    case "TSAbstractMethodDefinition":
    case "MethodDefinition":
      (_node$accessibility3 = node.accessibility) != null ? _node$accessibility3 : node.accessibility = undefined;
      (_node$decorators3 = node.decorators) != null ? _node$decorators3 : node.decorators = [];
      (_node$override2 = node.override) != null ? _node$override2 : node.override = false;
      (_node$optional4 = node.optional) != null ? _node$optional4 : node.optional = false;
      return;
    case "ClassExpression":
      (_node$id = node.id) != null ? _node$id : node.id = null;
    case "ClassDeclaration":
      (_node$abstract = node.abstract) != null ? _node$abstract : node.abstract = false;
      (_node$declare3 = node.declare) != null ? _node$declare3 : node.declare = false;
      (_node$decorators4 = node.decorators) != null ? _node$decorators4 : node.decorators = [];
      (_node$implements = node.implements) != null ? _node$implements : node.implements = [];
      (_node$superTypeArgume = node.superTypeArguments) != null ? _node$superTypeArgume : node.superTypeArguments = undefined;
      (_node$typeParameters2 = node.typeParameters) != null ? _node$typeParameters2 : node.typeParameters = undefined;
      return;
    case "TSTypeAliasDeclaration":
    case "VariableDeclaration":
      (_node$declare4 = node.declare) != null ? _node$declare4 : node.declare = false;
      return;
    case "VariableDeclarator":
      (_node$definite2 = node.definite) != null ? _node$definite2 : node.definite = false;
      return;
    case "TSEnumDeclaration":
      (_node$const = node.const) != null ? _node$const : node.const = false;
      (_node$declare5 = node.declare) != null ? _node$declare5 : node.declare = false;
      return;
    case "TSEnumMember":
      (_node$computed = node.computed) != null ? _node$computed : node.computed = false;
      return;
    case "TSImportType":
      (_node$qualifier = node.qualifier) != null ? _node$qualifier : node.qualifier = null;
      (_node$options = node.options) != null ? _node$options : node.options = null;
      return;
    case "TSInterfaceDeclaration":
      (_node$declare6 = node.declare) != null ? _node$declare6 : node.declare = false;
      (_node$extends = node.extends) != null ? _node$extends : node.extends = [];
      return;
    case "TSModuleDeclaration":
      (_node$declare7 = node.declare) != null ? _node$declare7 : node.declare = false;
      (_node$global = node.global) != null ? _node$global : node.global = node.kind === "global";
      return;
    case "TSTypeParameter":
      (_node$const2 = node.const) != null ? _node$const2 : node.const = false;
      (_node$in = node.in) != null ? _node$in : node.in = false;
      (_node$out = node.out) != null ? _node$out : node.out = false;
      return;
  }
}
function _flow_constructor(...args) {
  _Parser_this.flowPragma = undefined;
}
function _flow_getScopeHandler(__super) {
  return FlowScopeHandler;
}
function _flow_shouldParseTypes() {
  return _BaseParser_getPluginOption("flow", "all") || _Parser_this.flowPragma === "flow";
}
function _flow_finishToken(__super, type, val) {
  if (type !== 134 && type !== 13 && type !== 28) {
    if (_Parser_this.flowPragma === undefined) {
      _Parser_this.flowPragma = null;
    }
  }
  __super(type, val);
}
function _flow_addComment(__super, comment) {
  if (_Parser_this.flowPragma === undefined) {
    const matches = FLOW_PRAGMA_REGEX.exec(comment.value);
    if (!matches) ;else if (matches[1] === "flow") {
      _Parser_this.flowPragma = "flow";
    } else if (matches[1] === "noflow") {
      _Parser_this.flowPragma = "noflow";
    } else {
      throw new Error("Unexpected flow pragma");
    }
  }
  __super(comment);
}
function _flow_flowParseTypeInitialiser(tok) {
  const oldInType = _Parser_this.state.inType;
  _Parser_this.state.inType = true;
  _UtilParser_expect(tok || 14);
  const type = _flow_flowParseType();
  _Parser_this.state.inType = oldInType;
  return type;
}
function _flow_flowParsePredicate() {
  const node = _NodeUtils_startNode();
  const moduloLoc = _Parser_this.state.startLoc;
  _Tokenizer_next();
  _UtilParser_expectContextual(110);
  if (_Parser_this.state.lastTokStartLoc.index > moduloLoc.index + 1) {
    _Tokenizer_raise(FlowErrors.UnexpectedSpaceBetweenModuloChecks, moduloLoc);
  }
  if (_Tokenizer_eat(10)) {
    node.value = _ExpressionParser_parseExpression();
    _UtilParser_expect(11);
    return _Parser_finishNode_dynamic(node, "DeclaredPredicate");
  } else {
    return _Parser_finishNode_dynamic(node, "InferredPredicate");
  }
}
function _flow_flowParseTypeAndPredicateInitialiser() {
  const oldInType = _Parser_this.state.inType;
  _Parser_this.state.inType = true;
  _UtilParser_expect(14);
  let type = null;
  let predicate = null;
  if (_Tokenizer_match(54)) {
    _Parser_this.state.inType = oldInType;
    predicate = _flow_flowParsePredicate();
  } else {
    type = _flow_flowParseType();
    _Parser_this.state.inType = oldInType;
    if (_Tokenizer_match(54)) {
      predicate = _flow_flowParsePredicate();
    }
  }
  return [type, predicate];
}
function _flow_flowParseDeclareClass(node) {
  _Tokenizer_next();
  _flow_flowParseInterfaceish(node, true);
  return _Parser_finishNode_dynamic(node, "DeclareClass");
}
function _flow_flowParseDeclareFunction(node) {
  _Tokenizer_next();
  const id = node.id = _Parser_parseIdentifier_dynamic();
  const typeNode = _NodeUtils_startNode();
  const typeContainer = _NodeUtils_startNode();
  if (_Tokenizer_match(47)) {
    typeNode.typeParameters = _flow_flowParseTypeParameterDeclaration();
  } else {
    typeNode.typeParameters = null;
  }
  _UtilParser_expect(10);
  const tmp = _flow_flowParseFunctionTypeParams();
  typeNode.params = tmp.params;
  typeNode.rest = tmp.rest;
  typeNode.this = tmp._this;
  _UtilParser_expect(11);
  [typeNode.returnType, node.predicate] = _flow_flowParseTypeAndPredicateInitialiser();
  typeContainer.typeAnnotation = _Parser_finishNode_dynamic(typeNode, "FunctionTypeAnnotation");
  id.typeAnnotation = _Parser_finishNode_dynamic(typeContainer, "TypeAnnotation");
  _Parser_resetEndLocation_dynamic(id);
  _UtilParser_semicolon();
  _Parser_this.scope.declareName(node.id.name, 2048, node.id.loc.start);
  return _Parser_finishNode_dynamic(node, "DeclareFunction");
}
function _flow_flowParseDeclare(node, insideModule) {
  if (_Tokenizer_match(80)) {
    return _flow_flowParseDeclareClass(node);
  } else if (_Tokenizer_match(68)) {
    return _flow_flowParseDeclareFunction(node);
  } else if (_Tokenizer_match(74)) {
    return _flow_flowParseDeclareVariable(node);
  } else if (_UtilParser_eatContextual(127)) {
    if (_Tokenizer_match(16)) {
      return _flow_flowParseDeclareModuleExports(node);
    } else {
      if (insideModule) {
        _Tokenizer_raise(FlowErrors.NestedDeclareModule, _Parser_this.state.lastTokStartLoc);
      }
      return _flow_flowParseDeclareModule(node);
    }
  } else if (_UtilParser_isContextual(130)) {
    return _flow_flowParseDeclareTypeAlias(node);
  } else if (_UtilParser_isContextual(131)) {
    return _flow_flowParseDeclareOpaqueType(node);
  } else if (_UtilParser_isContextual(129)) {
    return _flow_flowParseDeclareInterface(node);
  } else if (_Tokenizer_match(82)) {
    return _flow_flowParseDeclareExportDeclaration(node, insideModule);
  } else {
    _Tokenizer_unexpected();
  }
}
function _flow_flowParseDeclareVariable(node) {
  _Tokenizer_next();
  node.id = _flow_flowParseTypeAnnotatableIdentifier(true);
  _Parser_this.scope.declareName(node.id.name, 5, node.id.loc.start);
  _UtilParser_semicolon();
  return _Parser_finishNode_dynamic(node, "DeclareVariable");
}
function _flow_flowParseDeclareModule(node) {
  _Parser_this.scope.enter(0);
  if (_Tokenizer_match(134)) {
    node.id = _ExpressionParser_parseExprAtom();
  } else {
    node.id = _Parser_parseIdentifier_dynamic();
  }
  const bodyNode = node.body = _NodeUtils_startNode();
  const body = bodyNode.body = [];
  _UtilParser_expect(5);
  while (!_Tokenizer_match(8)) {
    let bodyNode = _NodeUtils_startNode();
    if (_Tokenizer_match(83)) {
      _Tokenizer_next();
      if (!_UtilParser_isContextual(130) && !_Tokenizer_match(87)) {
        _Tokenizer_raise(FlowErrors.InvalidNonTypeImportInDeclareModule, _Parser_this.state.lastTokStartLoc);
      }
      _StatementParser_parseImport(bodyNode);
    } else {
      _UtilParser_expectContextual(125, FlowErrors.UnsupportedStatementInDeclareModule);
      bodyNode = _flow_flowParseDeclare(bodyNode, true);
    }
    body.push(bodyNode);
  }
  _Parser_this.scope.exit();
  _UtilParser_expect(8);
  _Parser_finishNode_dynamic(bodyNode, "BlockStatement");
  let kind = null;
  let hasModuleExport = false;
  body.forEach(bodyElement => {
    if (isEsModuleType(bodyElement)) {
      if (kind === "CommonJS") {
        _Tokenizer_raise(FlowErrors.AmbiguousDeclareModuleKind, bodyElement);
      }
      kind = "ES";
    } else if (bodyElement.type === "DeclareModuleExports") {
      if (hasModuleExport) {
        _Tokenizer_raise(FlowErrors.DuplicateDeclareModuleExports, bodyElement);
      }
      if (kind === "ES") {
        _Tokenizer_raise(FlowErrors.AmbiguousDeclareModuleKind, bodyElement);
      }
      kind = "CommonJS";
      hasModuleExport = true;
    }
  });
  node.kind = kind || "CommonJS";
  return _Parser_finishNode_dynamic(node, "DeclareModule");
}
function _flow_flowParseDeclareExportDeclaration(node, insideModule) {
  _UtilParser_expect(82);
  if (_Tokenizer_eat(65)) {
    if (_Tokenizer_match(68) || _Tokenizer_match(80)) {
      node.declaration = _flow_flowParseDeclare(_NodeUtils_startNode());
    } else {
      node.declaration = _flow_flowParseType();
      _UtilParser_semicolon();
    }
    node.default = true;
    return _Parser_finishNode_dynamic(node, "DeclareExportDeclaration");
  } else {
    if (_Tokenizer_match(75) || _StatementParser_isLet() || (_UtilParser_isContextual(130) || _UtilParser_isContextual(129)) && !insideModule) {
      const label = _Parser_this.state.value;
      throw _Tokenizer_raise(FlowErrors.UnsupportedDeclareExportKind, _Parser_this.state.startLoc, {
        unsupportedExportKind: label,
        suggestion: exportSuggestions[label]
      });
    }
    if (_Tokenizer_match(74) || _Tokenizer_match(68) || _Tokenizer_match(80) || _UtilParser_isContextual(131)) {
      node.declaration = _flow_flowParseDeclare(_NodeUtils_startNode());
      node.default = false;
      return _Parser_finishNode_dynamic(node, "DeclareExportDeclaration");
    } else if (_Tokenizer_match(55) || _Tokenizer_match(5) || _UtilParser_isContextual(129) || _UtilParser_isContextual(130) || _UtilParser_isContextual(131)) {
      node = _Parser_parseExport_dynamic(node, null);
      if (node.type === "ExportNamedDeclaration") {
        node.default = false;
        delete node.exportKind;
        return _Parser_castNodeTo_dynamic(node, "DeclareExportDeclaration");
      } else {
        return _Parser_castNodeTo_dynamic(node, "DeclareExportAllDeclaration");
      }
    }
  }
  _Tokenizer_unexpected();
}
function _flow_flowParseDeclareModuleExports(node) {
  _Tokenizer_next();
  _UtilParser_expectContextual(111);
  node.typeAnnotation = _flow_flowParseTypeAnnotation();
  _UtilParser_semicolon();
  return _Parser_finishNode_dynamic(node, "DeclareModuleExports");
}
function _flow_flowParseDeclareTypeAlias(node) {
  _Tokenizer_next();
  const finished = _flow_flowParseTypeAlias(node);
  _Parser_castNodeTo_dynamic(finished, "DeclareTypeAlias");
  return finished;
}
function _flow_flowParseDeclareOpaqueType(node) {
  _Tokenizer_next();
  const finished = _flow_flowParseOpaqueType(node, true);
  _Parser_castNodeTo_dynamic(finished, "DeclareOpaqueType");
  return finished;
}
function _flow_flowParseDeclareInterface(node) {
  _Tokenizer_next();
  _flow_flowParseInterfaceish(node, false);
  return _Parser_finishNode_dynamic(node, "DeclareInterface");
}
function _flow_flowParseInterfaceish(node, isClass) {
  node.id = _flow_flowParseRestrictedIdentifier(!isClass, true);
  _Parser_this.scope.declareName(node.id.name, isClass ? 17 : 8201, node.id.loc.start);
  if (_Tokenizer_match(47)) {
    node.typeParameters = _flow_flowParseTypeParameterDeclaration();
  } else {
    node.typeParameters = null;
  }
  node.extends = [];
  if (_Tokenizer_eat(81)) {
    do {
      node.extends.push(_flow_flowParseInterfaceExtends());
    } while (!isClass && _Tokenizer_eat(12));
  }
  if (isClass) {
    node.implements = [];
    node.mixins = [];
    if (_UtilParser_eatContextual(117)) {
      do {
        node.mixins.push(_flow_flowParseInterfaceExtends());
      } while (_Tokenizer_eat(12));
    }
    if (_UtilParser_eatContextual(113)) {
      do {
        node.implements.push(_flow_flowParseInterfaceExtends());
      } while (_Tokenizer_eat(12));
    }
  }
  node.body = _flow_flowParseObjectType({
    allowStatic: isClass,
    allowExact: false,
    allowSpread: false,
    allowProto: isClass,
    allowInexact: false
  });
}
function _flow_flowParseInterfaceExtends() {
  const node = _NodeUtils_startNode();
  node.id = _flow_flowParseQualifiedTypeIdentifier();
  if (_Tokenizer_match(47)) {
    node.typeParameters = _flow_flowParseTypeParameterInstantiation();
  } else {
    node.typeParameters = null;
  }
  return _Parser_finishNode_dynamic(node, "InterfaceExtends");
}
function _flow_flowParseInterface(node) {
  _flow_flowParseInterfaceish(node, false);
  return _Parser_finishNode_dynamic(node, "InterfaceDeclaration");
}
function _flow_checkNotUnderscore(word) {
  if (word === "_") {
    _Tokenizer_raise(FlowErrors.UnexpectedReservedUnderscore, _Parser_this.state.startLoc);
  }
}
function _flow_checkReservedType(word, startLoc, declaration) {
  if (!reservedTypes.has(word)) return;
  _Tokenizer_raise(declaration ? FlowErrors.AssignReservedType : FlowErrors.UnexpectedReservedType, startLoc, {
    reservedType: word
  });
}
function _flow_flowParseRestrictedIdentifier(liberal, declaration) {
  _flow_checkReservedType(_Parser_this.state.value, _Parser_this.state.startLoc, declaration);
  return _Parser_parseIdentifier_dynamic(liberal);
}
function _flow_flowParseTypeAlias(node) {
  node.id = _flow_flowParseRestrictedIdentifier(false, true);
  _Parser_this.scope.declareName(node.id.name, 8201, node.id.loc.start);
  if (_Tokenizer_match(47)) {
    node.typeParameters = _flow_flowParseTypeParameterDeclaration();
  } else {
    node.typeParameters = null;
  }
  node.right = _flow_flowParseTypeInitialiser(29);
  _UtilParser_semicolon();
  return _Parser_finishNode_dynamic(node, "TypeAlias");
}
function _flow_flowParseOpaqueType(node, declare) {
  _UtilParser_expectContextual(130);
  node.id = _flow_flowParseRestrictedIdentifier(true, true);
  _Parser_this.scope.declareName(node.id.name, 8201, node.id.loc.start);
  if (_Tokenizer_match(47)) {
    node.typeParameters = _flow_flowParseTypeParameterDeclaration();
  } else {
    node.typeParameters = null;
  }
  node.supertype = null;
  if (_Tokenizer_match(14)) {
    node.supertype = _flow_flowParseTypeInitialiser(14);
  }
  node.impltype = null;
  if (!declare) {
    node.impltype = _flow_flowParseTypeInitialiser(29);
  }
  _UtilParser_semicolon();
  return _Parser_finishNode_dynamic(node, "OpaqueType");
}
function _flow_flowParseTypeParameter(requireDefault = false) {
  const nodeStartLoc = _Parser_this.state.startLoc;
  const node = _NodeUtils_startNode();
  const variance = _flow_flowParseVariance();
  const ident = _flow_flowParseTypeAnnotatableIdentifier();
  node.name = ident.name;
  node.variance = variance;
  node.bound = ident.typeAnnotation;
  if (_Tokenizer_match(29)) {
    _Tokenizer_eat(29);
    node.default = _flow_flowParseType();
  } else {
    if (requireDefault) {
      _Tokenizer_raise(FlowErrors.MissingTypeParamDefault, nodeStartLoc);
    }
  }
  return _Parser_finishNode_dynamic(node, "TypeParameter");
}
function _flow_flowParseTypeParameterDeclaration() {
  const oldInType = _Parser_this.state.inType;
  const node = _NodeUtils_startNode();
  node.params = [];
  _Parser_this.state.inType = true;
  if (_Tokenizer_match(47) || _Tokenizer_match(143)) {
    _Tokenizer_next();
  } else {
    _Tokenizer_unexpected();
  }
  let defaultRequired = false;
  do {
    const typeParameter = _flow_flowParseTypeParameter(defaultRequired);
    node.params.push(typeParameter);
    if (typeParameter.default) {
      defaultRequired = true;
    }
    if (!_Tokenizer_match(48)) {
      _UtilParser_expect(12);
    }
  } while (!_Tokenizer_match(48));
  _UtilParser_expect(48);
  _Parser_this.state.inType = oldInType;
  return _Parser_finishNode_dynamic(node, "TypeParameterDeclaration");
}
function _flow_flowInTopLevelContext(cb) {
  if (_Tokenizer_curContext() !== types.brace) {
    const oldContext = _Parser_this.state.context;
    _Parser_this.state.context = [oldContext[0]];
    try {
      return cb();
    } finally {
      _Parser_this.state.context = oldContext;
    }
  } else {
    return cb();
  }
}
function _flow_flowParseTypeParameterInstantiationInExpression() {
  if (_Parser_reScan_lt_dynamic() !== 47) return;
  return _flow_flowParseTypeParameterInstantiation();
}
function _flow_flowParseTypeParameterInstantiation() {
  const node = _NodeUtils_startNode();
  const oldInType = _Parser_this.state.inType;
  _Parser_this.state.inType = true;
  node.params = [];
  _flow_flowInTopLevelContext(() => {
    _UtilParser_expect(47);
    const oldNoAnonFunctionType = _Parser_this.state.noAnonFunctionType;
    _Parser_this.state.noAnonFunctionType = false;
    while (!_Tokenizer_match(48)) {
      node.params.push(_flow_flowParseType());
      if (!_Tokenizer_match(48)) {
        _UtilParser_expect(12);
      }
    }
    _Parser_this.state.noAnonFunctionType = oldNoAnonFunctionType;
  });
  _Parser_this.state.inType = oldInType;
  if (!_Parser_this.state.inType && _Tokenizer_curContext() === types.brace) {
    _Parser_reScan_lt_gt_dynamic();
  }
  _UtilParser_expect(48);
  return _Parser_finishNode_dynamic(node, "TypeParameterInstantiation");
}
function _flow_flowParseTypeParameterInstantiationCallOrNew() {
  if (_Parser_reScan_lt_dynamic() !== 47) return;
  const node = _NodeUtils_startNode();
  const oldInType = _Parser_this.state.inType;
  node.params = [];
  _Parser_this.state.inType = true;
  _UtilParser_expect(47);
  while (!_Tokenizer_match(48)) {
    node.params.push(_flow_flowParseTypeOrImplicitInstantiation());
    if (!_Tokenizer_match(48)) {
      _UtilParser_expect(12);
    }
  }
  _UtilParser_expect(48);
  _Parser_this.state.inType = oldInType;
  return _Parser_finishNode_dynamic(node, "TypeParameterInstantiation");
}
function _flow_flowParseInterfaceType() {
  const node = _NodeUtils_startNode();
  _UtilParser_expectContextual(129);
  node.extends = [];
  if (_Tokenizer_eat(81)) {
    do {
      node.extends.push(_flow_flowParseInterfaceExtends());
    } while (_Tokenizer_eat(12));
  }
  node.body = _flow_flowParseObjectType({
    allowStatic: false,
    allowExact: false,
    allowSpread: false,
    allowProto: false,
    allowInexact: false
  });
  return _Parser_finishNode_dynamic(node, "InterfaceTypeAnnotation");
}
function _flow_flowParseObjectPropertyKey() {
  return _Tokenizer_match(135) || _Tokenizer_match(134) ? _ExpressionParser_parseExprAtom() : _Parser_parseIdentifier_dynamic(true);
}
function _flow_flowParseObjectTypeIndexer(node, isStatic, variance) {
  node.static = isStatic;
  if (_Tokenizer_lookahead().type === 14) {
    node.id = _flow_flowParseObjectPropertyKey();
    node.key = _flow_flowParseTypeInitialiser();
  } else {
    node.id = null;
    node.key = _flow_flowParseType();
  }
  _UtilParser_expect(3);
  node.value = _flow_flowParseTypeInitialiser();
  node.variance = variance;
  return _Parser_finishNode_dynamic(node, "ObjectTypeIndexer");
}
function _flow_flowParseObjectTypeInternalSlot(node, isStatic) {
  node.static = isStatic;
  node.id = _flow_flowParseObjectPropertyKey();
  _UtilParser_expect(3);
  _UtilParser_expect(3);
  if (_Tokenizer_match(47) || _Tokenizer_match(10)) {
    node.method = true;
    node.optional = false;
    node.value = _flow_flowParseObjectTypeMethodish(_NodeUtils_startNodeAt(node.loc.start));
  } else {
    node.method = false;
    if (_Tokenizer_eat(17)) {
      node.optional = true;
    }
    node.value = _flow_flowParseTypeInitialiser();
  }
  return _Parser_finishNode_dynamic(node, "ObjectTypeInternalSlot");
}
function _flow_flowParseObjectTypeMethodish(node) {
  node.params = [];
  node.rest = null;
  node.typeParameters = null;
  node.this = null;
  if (_Tokenizer_match(47)) {
    node.typeParameters = _flow_flowParseTypeParameterDeclaration();
  }
  _UtilParser_expect(10);
  if (_Tokenizer_match(78)) {
    node.this = _flow_flowParseFunctionTypeParam(true);
    node.this.name = null;
    if (!_Tokenizer_match(11)) {
      _UtilParser_expect(12);
    }
  }
  while (!_Tokenizer_match(11) && !_Tokenizer_match(21)) {
    node.params.push(_flow_flowParseFunctionTypeParam(false));
    if (!_Tokenizer_match(11)) {
      _UtilParser_expect(12);
    }
  }
  if (_Tokenizer_eat(21)) {
    node.rest = _flow_flowParseFunctionTypeParam(false);
  }
  _UtilParser_expect(11);
  node.returnType = _flow_flowParseTypeInitialiser();
  return _Parser_finishNode_dynamic(node, "FunctionTypeAnnotation");
}
function _flow_flowParseObjectTypeCallProperty(node, isStatic) {
  const valueNode = _NodeUtils_startNode();
  node.static = isStatic;
  node.value = _flow_flowParseObjectTypeMethodish(valueNode);
  return _Parser_finishNode_dynamic(node, "ObjectTypeCallProperty");
}
function _flow_flowParseObjectType({
  allowStatic,
  allowExact,
  allowSpread,
  allowProto,
  allowInexact
}) {
  const oldInType = _Parser_this.state.inType;
  _Parser_this.state.inType = true;
  const nodeStart = _NodeUtils_startNode();
  nodeStart.callProperties = [];
  nodeStart.properties = [];
  nodeStart.indexers = [];
  nodeStart.internalSlots = [];
  let endDelim;
  let exact;
  let inexact = false;
  if (allowExact && _Tokenizer_match(6)) {
    _UtilParser_expect(6);
    endDelim = 9;
    exact = true;
  } else {
    _UtilParser_expect(5);
    endDelim = 8;
    exact = false;
  }
  nodeStart.exact = exact;
  while (!_Tokenizer_match(endDelim)) {
    let isStatic = false;
    let protoStartLoc = null;
    let inexactStartLoc = null;
    const node = _NodeUtils_startNode();
    if (allowProto && _UtilParser_isContextual(118)) {
      const lookahead = _Tokenizer_lookahead();
      if (lookahead.type !== 14 && lookahead.type !== 17) {
        _Tokenizer_next();
        protoStartLoc = _Parser_this.state.startLoc;
        allowStatic = false;
      }
    }
    if (allowStatic && _UtilParser_isContextual(106)) {
      const lookahead = _Tokenizer_lookahead();
      if (lookahead.type !== 14 && lookahead.type !== 17) {
        _Tokenizer_next();
        isStatic = true;
      }
    }
    const variance = _flow_flowParseVariance();
    if (_Tokenizer_eat(0)) {
      if (protoStartLoc != null) {
        _Tokenizer_unexpected(protoStartLoc);
      }
      if (_Tokenizer_eat(0)) {
        if (variance) {
          _Tokenizer_unexpected(variance.loc.start);
        }
        nodeStart.internalSlots.push(_flow_flowParseObjectTypeInternalSlot(node, isStatic));
      } else {
        nodeStart.indexers.push(_flow_flowParseObjectTypeIndexer(node, isStatic, variance));
      }
    } else if (_Tokenizer_match(10) || _Tokenizer_match(47)) {
      if (protoStartLoc != null) {
        _Tokenizer_unexpected(protoStartLoc);
      }
      if (variance) {
        _Tokenizer_unexpected(variance.loc.start);
      }
      nodeStart.callProperties.push(_flow_flowParseObjectTypeCallProperty(node, isStatic));
    } else {
      let kind = "init";
      if (_UtilParser_isContextual(99) || _UtilParser_isContextual(104)) {
        const lookahead = _Tokenizer_lookahead();
        if (tokenIsLiteralPropertyName(lookahead.type)) {
          kind = _Parser_this.state.value;
          _Tokenizer_next();
        }
      }
      const propOrInexact = _flow_flowParseObjectTypeProperty(node, isStatic, protoStartLoc, variance, kind, allowSpread, allowInexact != null ? allowInexact : !exact);
      if (propOrInexact === null) {
        inexact = true;
        inexactStartLoc = _Parser_this.state.lastTokStartLoc;
      } else {
        nodeStart.properties.push(propOrInexact);
      }
    }
    _flow_flowObjectTypeSemicolon();
    if (inexactStartLoc && !_Tokenizer_match(8) && !_Tokenizer_match(9)) {
      _Tokenizer_raise(FlowErrors.UnexpectedExplicitInexactInObject, inexactStartLoc);
    }
  }
  _UtilParser_expect(endDelim);
  if (allowSpread) {
    nodeStart.inexact = inexact;
  }
  const out = _Parser_finishNode_dynamic(nodeStart, "ObjectTypeAnnotation");
  _Parser_this.state.inType = oldInType;
  return out;
}
function _flow_flowParseObjectTypeProperty(node, isStatic, protoStartLoc, variance, kind, allowSpread, allowInexact) {
  if (_Tokenizer_eat(21)) {
    const isInexactToken = _Tokenizer_match(12) || _Tokenizer_match(13) || _Tokenizer_match(8) || _Tokenizer_match(9);
    if (isInexactToken) {
      if (!allowSpread) {
        _Tokenizer_raise(FlowErrors.InexactInsideNonObject, _Parser_this.state.lastTokStartLoc);
      } else if (!allowInexact) {
        _Tokenizer_raise(FlowErrors.InexactInsideExact, _Parser_this.state.lastTokStartLoc);
      }
      if (variance) {
        _Tokenizer_raise(FlowErrors.InexactVariance, variance);
      }
      return null;
    }
    if (!allowSpread) {
      _Tokenizer_raise(FlowErrors.UnexpectedSpreadType, _Parser_this.state.lastTokStartLoc);
    }
    if (protoStartLoc != null) {
      _Tokenizer_unexpected(protoStartLoc);
    }
    if (variance) {
      _Tokenizer_raise(FlowErrors.SpreadVariance, variance);
    }
    node.argument = _flow_flowParseType();
    return _Parser_finishNode_dynamic(node, "ObjectTypeSpreadProperty");
  } else {
    node.key = _flow_flowParseObjectPropertyKey();
    node.static = isStatic;
    node.proto = protoStartLoc != null;
    node.kind = kind;
    let optional = false;
    if (_Tokenizer_match(47) || _Tokenizer_match(10)) {
      node.method = true;
      if (protoStartLoc != null) {
        _Tokenizer_unexpected(protoStartLoc);
      }
      if (variance) {
        _Tokenizer_unexpected(variance.loc.start);
      }
      node.value = _flow_flowParseObjectTypeMethodish(_NodeUtils_startNodeAt(node.loc.start));
      if (kind === "get" || kind === "set") {
        _flow_flowCheckGetterSetterParams(node);
      }
      if (!allowSpread && node.key.name === "constructor" && node.value.this) {
        _Tokenizer_raise(FlowErrors.ThisParamBannedInConstructor, node.value.this);
      }
    } else {
      if (kind !== "init") _Tokenizer_unexpected();
      node.method = false;
      if (_Tokenizer_eat(17)) {
        optional = true;
      }
      node.value = _flow_flowParseTypeInitialiser();
      node.variance = variance;
    }
    node.optional = optional;
    return _Parser_finishNode_dynamic(node, "ObjectTypeProperty");
  }
}
function _flow_flowCheckGetterSetterParams(property) {
  const paramCount = property.kind === "get" ? 0 : 1;
  const length = property.value.params.length + (property.value.rest ? 1 : 0);
  if (property.value.this) {
    _Tokenizer_raise(property.kind === "get" ? FlowErrors.GetterMayNotHaveThisParam : FlowErrors.SetterMayNotHaveThisParam, property.value.this);
  }
  if (length !== paramCount) {
    _Tokenizer_raise(property.kind === "get" ? Errors.BadGetterArity : Errors.BadSetterArity, property);
  }
  if (property.kind === "set" && property.value.rest) {
    _Tokenizer_raise(Errors.BadSetterRestParameter, property);
  }
}
function _flow_flowObjectTypeSemicolon() {
  if (!_Tokenizer_eat(13) && !_Tokenizer_eat(12) && !_Tokenizer_match(8) && !_Tokenizer_match(9)) {
    _Tokenizer_unexpected();
  }
}
function _flow_flowParseQualifiedTypeIdentifier(startLoc, id) {
  startLoc != null ? startLoc : startLoc = _Parser_this.state.startLoc;
  let node = id || _flow_flowParseRestrictedIdentifier(true);
  while (_Tokenizer_eat(16)) {
    const node2 = _NodeUtils_startNodeAt(startLoc);
    node2.qualification = node;
    node2.id = _flow_flowParseRestrictedIdentifier(true);
    node = _Parser_finishNode_dynamic(node2, "QualifiedTypeIdentifier");
  }
  return node;
}
function _flow_flowParseGenericType(startLoc, id) {
  const node = _NodeUtils_startNodeAt(startLoc);
  node.typeParameters = null;
  node.id = _flow_flowParseQualifiedTypeIdentifier(startLoc, id);
  if (_Tokenizer_match(47)) {
    node.typeParameters = _flow_flowParseTypeParameterInstantiation();
  }
  return _Parser_finishNode_dynamic(node, "GenericTypeAnnotation");
}
function _flow_flowParseTypeofType() {
  const node = _NodeUtils_startNode();
  _UtilParser_expect(87);
  node.argument = _flow_flowParsePrimaryType();
  return _Parser_finishNode_dynamic(node, "TypeofTypeAnnotation");
}
function _flow_flowParseTupleType() {
  const node = _NodeUtils_startNode();
  node.types = [];
  _UtilParser_expect(0);
  while (_Parser_this.state.pos < _Parser_this.length && !_Tokenizer_match(3)) {
    node.types.push(_flow_flowParseType());
    if (_Tokenizer_match(3)) break;
    _UtilParser_expect(12);
  }
  _UtilParser_expect(3);
  return _Parser_finishNode_dynamic(node, "TupleTypeAnnotation");
}
function _flow_flowParseFunctionTypeParam(first) {
  let name = null;
  let optional = false;
  let typeAnnotation = null;
  const node = _NodeUtils_startNode();
  const lh = _Tokenizer_lookahead();
  const isThis = _Parser_this.state.type === 78;
  if (lh.type === 14 || lh.type === 17) {
    if (isThis && !first) {
      _Tokenizer_raise(FlowErrors.ThisParamMustBeFirst, node);
    }
    name = _Parser_parseIdentifier_dynamic(isThis);
    if (_Tokenizer_eat(17)) {
      optional = true;
      if (isThis) {
        _Tokenizer_raise(FlowErrors.ThisParamMayNotBeOptional, node);
      }
    }
    typeAnnotation = _flow_flowParseTypeInitialiser();
  } else {
    typeAnnotation = _flow_flowParseType();
  }
  node.name = name;
  node.optional = optional;
  node.typeAnnotation = typeAnnotation;
  return _Parser_finishNode_dynamic(node, "FunctionTypeParam");
}
function _flow_reinterpretTypeAsFunctionTypeParam(type) {
  const node = _NodeUtils_startNodeAt(type.loc.start);
  node.name = null;
  node.optional = false;
  node.typeAnnotation = type;
  return _Parser_finishNode_dynamic(node, "FunctionTypeParam");
}
function _flow_flowParseFunctionTypeParams(params = []) {
  let rest = null;
  let _this = null;
  if (_Tokenizer_match(78)) {
    _this = _flow_flowParseFunctionTypeParam(true);
    _this.name = null;
    if (!_Tokenizer_match(11)) {
      _UtilParser_expect(12);
    }
  }
  while (!_Tokenizer_match(11) && !_Tokenizer_match(21)) {
    params.push(_flow_flowParseFunctionTypeParam(false));
    if (!_Tokenizer_match(11)) {
      _UtilParser_expect(12);
    }
  }
  if (_Tokenizer_eat(21)) {
    rest = _flow_flowParseFunctionTypeParam(false);
  }
  return {
    params,
    rest,
    _this
  };
}
function _flow_flowIdentToTypeAnnotation(startLoc, node, id) {
  switch (id.name) {
    case "any":
      return _Parser_finishNode_dynamic(node, "AnyTypeAnnotation");
    case "bool":
    case "boolean":
      return _Parser_finishNode_dynamic(node, "BooleanTypeAnnotation");
    case "mixed":
      return _Parser_finishNode_dynamic(node, "MixedTypeAnnotation");
    case "empty":
      return _Parser_finishNode_dynamic(node, "EmptyTypeAnnotation");
    case "number":
      return _Parser_finishNode_dynamic(node, "NumberTypeAnnotation");
    case "string":
      return _Parser_finishNode_dynamic(node, "StringTypeAnnotation");
    case "symbol":
      return _Parser_finishNode_dynamic(node, "SymbolTypeAnnotation");
    default:
      _flow_checkNotUnderscore(id.name);
      return _flow_flowParseGenericType(startLoc, id);
  }
}
function _flow_flowParsePrimaryType() {
  const startLoc = _Parser_this.state.startLoc;
  const node = _NodeUtils_startNode();
  let tmp;
  let type;
  let isGroupedType = false;
  const oldNoAnonFunctionType = _Parser_this.state.noAnonFunctionType;
  switch (_Parser_this.state.type) {
    case 5:
      return _flow_flowParseObjectType({
        allowStatic: false,
        allowExact: false,
        allowSpread: true,
        allowProto: false,
        allowInexact: true
      });
    case 6:
      return _flow_flowParseObjectType({
        allowStatic: false,
        allowExact: true,
        allowSpread: true,
        allowProto: false,
        allowInexact: false
      });
    case 0:
      _Parser_this.state.noAnonFunctionType = false;
      type = _flow_flowParseTupleType();
      _Parser_this.state.noAnonFunctionType = oldNoAnonFunctionType;
      return type;
    case 47:
      {
        const node = _NodeUtils_startNode();
        node.typeParameters = _flow_flowParseTypeParameterDeclaration();
        _UtilParser_expect(10);
        tmp = _flow_flowParseFunctionTypeParams();
        node.params = tmp.params;
        node.rest = tmp.rest;
        node.this = tmp._this;
        _UtilParser_expect(11);
        _UtilParser_expect(19);
        node.returnType = _flow_flowParseType();
        return _Parser_finishNode_dynamic(node, "FunctionTypeAnnotation");
      }
    case 10:
      {
        const node = _NodeUtils_startNode();
        _Tokenizer_next();
        if (!_Tokenizer_match(11) && !_Tokenizer_match(21)) {
          if (tokenIsIdentifier(_Parser_this.state.type) || _Tokenizer_match(78)) {
            const token = _Tokenizer_lookahead().type;
            isGroupedType = token !== 17 && token !== 14;
          } else {
            isGroupedType = true;
          }
        }
        if (isGroupedType) {
          _Parser_this.state.noAnonFunctionType = false;
          type = _flow_flowParseType();
          _Parser_this.state.noAnonFunctionType = oldNoAnonFunctionType;
          if (_Parser_this.state.noAnonFunctionType || !(_Tokenizer_match(12) || _Tokenizer_match(11) && _Tokenizer_lookahead().type === 19)) {
            _UtilParser_expect(11);
            return type;
          } else {
            _Tokenizer_eat(12);
          }
        }
        if (type) {
          tmp = _flow_flowParseFunctionTypeParams([_flow_reinterpretTypeAsFunctionTypeParam(type)]);
        } else {
          tmp = _flow_flowParseFunctionTypeParams();
        }
        node.params = tmp.params;
        node.rest = tmp.rest;
        node.this = tmp._this;
        _UtilParser_expect(11);
        _UtilParser_expect(19);
        node.returnType = _flow_flowParseType();
        node.typeParameters = null;
        return _Parser_finishNode_dynamic(node, "FunctionTypeAnnotation");
      }
    case 134:
      return _Parser_parseLiteral_dynamic(_Parser_this.state.value, "StringLiteralTypeAnnotation");
    case 85:
    case 86:
      node.value = _Tokenizer_match(85);
      _Tokenizer_next();
      return _Parser_finishNode_dynamic(node, "BooleanLiteralTypeAnnotation");
    case 53:
      if (_Parser_this.state.value === "-") {
        _Tokenizer_next();
        if (_Tokenizer_match(135)) {
          return _ExpressionParser_parseLiteralAtNode(-_Parser_this.state.value, "NumberLiteralTypeAnnotation", node);
        }
        if (_Tokenizer_match(136)) {
          return _ExpressionParser_parseLiteralAtNode(-_Parser_this.state.value, "BigIntLiteralTypeAnnotation", node);
        }
        throw _Tokenizer_raise(FlowErrors.UnexpectedSubtractionOperand, _Parser_this.state.startLoc);
      }
      _Tokenizer_unexpected();
      return;
    case 135:
      return _Parser_parseLiteral_dynamic(_Parser_this.state.value, "NumberLiteralTypeAnnotation");
    case 136:
      return _Parser_parseLiteral_dynamic(_Parser_this.state.value, "BigIntLiteralTypeAnnotation");
    case 88:
      _Tokenizer_next();
      return _Parser_finishNode_dynamic(node, "VoidTypeAnnotation");
    case 84:
      _Tokenizer_next();
      return _Parser_finishNode_dynamic(node, "NullLiteralTypeAnnotation");
    case 78:
      _Tokenizer_next();
      return _Parser_finishNode_dynamic(node, "ThisTypeAnnotation");
    case 55:
      _Tokenizer_next();
      return _Parser_finishNode_dynamic(node, "ExistsTypeAnnotation");
    case 87:
      return _flow_flowParseTypeofType();
    default:
      if (tokenIsKeyword(_Parser_this.state.type)) {
        const label = tokenLabelName(_Parser_this.state.type);
        _Tokenizer_next();
        return _ExpressionParser_createIdentifier(node, label);
      } else if (tokenIsIdentifier(_Parser_this.state.type)) {
        if (_UtilParser_isContextual(129)) {
          return _flow_flowParseInterfaceType();
        }
        return _flow_flowIdentToTypeAnnotation(startLoc, node, _Parser_parseIdentifier_dynamic());
      }
  }
  _Tokenizer_unexpected();
}
function _flow_flowParsePostfixType() {
  const startLoc = _Parser_this.state.startLoc;
  let type = _flow_flowParsePrimaryType();
  let seenOptionalIndexedAccess = false;
  while ((_Tokenizer_match(0) || _Tokenizer_match(18)) && !_UtilParser_canInsertSemicolon()) {
    const node = _NodeUtils_startNodeAt(startLoc);
    const optional = _Tokenizer_eat(18);
    seenOptionalIndexedAccess = seenOptionalIndexedAccess || optional;
    _UtilParser_expect(0);
    if (!optional && _Tokenizer_match(3)) {
      node.elementType = type;
      _Tokenizer_next();
      type = _Parser_finishNode_dynamic(node, "ArrayTypeAnnotation");
    } else {
      node.objectType = type;
      node.indexType = _flow_flowParseType();
      _UtilParser_expect(3);
      if (seenOptionalIndexedAccess) {
        node.optional = optional;
        type = _Parser_finishNode_dynamic(node, "OptionalIndexedAccessType");
      } else {
        type = _Parser_finishNode_dynamic(node, "IndexedAccessType");
      }
    }
  }
  return type;
}
function _flow_flowParsePrefixType() {
  const node = _NodeUtils_startNode();
  if (_Tokenizer_eat(17)) {
    node.typeAnnotation = _flow_flowParsePrefixType();
    return _Parser_finishNode_dynamic(node, "NullableTypeAnnotation");
  } else {
    return _flow_flowParsePostfixType();
  }
}
function _flow_flowParseAnonFunctionWithoutParens() {
  const param = _flow_flowParsePrefixType();
  if (!_Parser_this.state.noAnonFunctionType && _Tokenizer_eat(19)) {
    const node = _NodeUtils_startNodeAt(param.loc.start);
    node.params = [_flow_reinterpretTypeAsFunctionTypeParam(param)];
    node.rest = null;
    node.this = null;
    node.returnType = _flow_flowParseType();
    node.typeParameters = null;
    return _Parser_finishNode_dynamic(node, "FunctionTypeAnnotation");
  }
  return param;
}
function _flow_flowParseIntersectionType() {
  const node = _NodeUtils_startNode();
  _Tokenizer_eat(45);
  const type = _flow_flowParseAnonFunctionWithoutParens();
  node.types = [type];
  while (_Tokenizer_eat(45)) {
    node.types.push(_flow_flowParseAnonFunctionWithoutParens());
  }
  return node.types.length === 1 ? type : _Parser_finishNode_dynamic(node, "IntersectionTypeAnnotation");
}
function _flow_flowParseUnionType() {
  const node = _NodeUtils_startNode();
  _Tokenizer_eat(43);
  const type = _flow_flowParseIntersectionType();
  node.types = [type];
  while (_Tokenizer_eat(43)) {
    node.types.push(_flow_flowParseIntersectionType());
  }
  return node.types.length === 1 ? type : _Parser_finishNode_dynamic(node, "UnionTypeAnnotation");
}
function _flow_flowParseType() {
  const oldInType = _Parser_this.state.inType;
  _Parser_this.state.inType = true;
  const type = _flow_flowParseUnionType();
  _Parser_this.state.inType = oldInType;
  return type;
}
function _flow_flowParseTypeOrImplicitInstantiation() {
  if (_Parser_this.state.type === 132 && _Parser_this.state.value === "_") {
    const startLoc = _Parser_this.state.startLoc;
    const node = _Parser_parseIdentifier_dynamic();
    return _flow_flowParseGenericType(startLoc, node);
  } else {
    return _flow_flowParseType();
  }
}
function _flow_flowParseTypeAnnotation() {
  const node = _NodeUtils_startNode();
  node.typeAnnotation = _flow_flowParseTypeInitialiser();
  return _Parser_finishNode_dynamic(node, "TypeAnnotation");
}
function _flow_flowParseTypeAnnotatableIdentifier(allowPrimitiveOverride) {
  const ident = allowPrimitiveOverride ? _Parser_parseIdentifier_dynamic() : _flow_flowParseRestrictedIdentifier();
  if (_Tokenizer_match(14)) {
    ident.typeAnnotation = _flow_flowParseTypeAnnotation();
    _Parser_resetEndLocation_dynamic(ident);
  }
  return ident;
}
function _flow_typeCastToParameter(__super, node) {
  node.expression.typeAnnotation = node.typeAnnotation;
  _Parser_resetEndLocation_dynamic(node.expression, node.typeAnnotation.loc.end);
  return node.expression;
}
function _flow_flowParseVariance() {
  let variance = null;
  if (_Tokenizer_match(53)) {
    variance = _NodeUtils_startNode();
    if (_Parser_this.state.value === "+") {
      variance.kind = "plus";
    } else {
      variance.kind = "minus";
    }
    _Tokenizer_next();
    return _Parser_finishNode_dynamic(variance, "Variance");
  }
  return variance;
}
function _flow_parseFunctionBody(__super, node, allowExpressionBody, isMethod = false) {
  if (allowExpressionBody) {
    _flow_forwardNoArrowParamsConversionAt(node, () => __super(node, true, isMethod));
    return;
  }
  __super(node, false, isMethod);
}
function _flow_parseFunctionBodyAndFinish(__super, node, type, isMethod = false) {
  if (_Tokenizer_match(14)) {
    const typeNode = _NodeUtils_startNode();
    [typeNode.typeAnnotation, node.predicate] = _flow_flowParseTypeAndPredicateInitialiser();
    node.returnType = typeNode.typeAnnotation ? _Parser_finishNode_dynamic(typeNode, "TypeAnnotation") : null;
  }
  return __super(node, type, isMethod);
}
function _flow_parseStatementLike(__super, flags) {
  if (_Parser_this.state.strict && _UtilParser_isContextual(129)) {
    const lookahead = _Tokenizer_lookahead();
    if (tokenIsKeywordOrIdentifier(lookahead.type)) {
      const node = _NodeUtils_startNode();
      _Tokenizer_next();
      return _flow_flowParseInterface(node);
    }
  } else if (_UtilParser_isContextual(126)) {
    const node = _NodeUtils_startNode();
    _Tokenizer_next();
    return _flow_flowParseEnumDeclaration(node);
  }
  const stmt = __super(flags);
  if (_Parser_this.flowPragma === undefined && !_Parser_isValidDirective_dynamic(stmt)) {
    _Parser_this.flowPragma = null;
  }
  return stmt;
}
function _flow_parseExpressionStatement(__super, node, expr, decorators) {
  if (expr.type === "Identifier") {
    if (expr.name === "declare") {
      if (_Tokenizer_match(80) || tokenIsIdentifier(_Parser_this.state.type) || _Tokenizer_match(68) || _Tokenizer_match(74) || _Tokenizer_match(82)) {
        return _flow_flowParseDeclare(node);
      }
    } else if (tokenIsIdentifier(_Parser_this.state.type)) {
      if (expr.name === "interface") {
        return _flow_flowParseInterface(node);
      } else if (expr.name === "type") {
        return _flow_flowParseTypeAlias(node);
      } else if (expr.name === "opaque") {
        return _flow_flowParseOpaqueType(node, false);
      }
    }
  }
  return __super(node, expr, decorators);
}
function _flow_shouldParseExportDeclaration(__super) {
  const {
    type
  } = _Parser_this.state;
  if (type === 126 || tokenIsFlowInterfaceOrTypeOrOpaque(type)) {
    return !_Parser_this.state.containsEsc;
  }
  return __super();
}
function _flow_isExportDefaultSpecifier(__super) {
  const {
    type
  } = _Parser_this.state;
  if (type === 126 || tokenIsFlowInterfaceOrTypeOrOpaque(type)) {
    return _Parser_this.state.containsEsc;
  }
  return __super();
}
function _flow_parseExportDefaultExpression(__super) {
  if (_UtilParser_isContextual(126)) {
    const node = _NodeUtils_startNode();
    _Tokenizer_next();
    return _flow_flowParseEnumDeclaration(node);
  }
  return __super();
}
function _flow_parseConditional(__super, expr, startLoc, refExpressionErrors) {
  if (!_Tokenizer_match(17)) return expr;
  if (_Parser_this.state.maybeInArrowParameters) {
    const nextCh = _Tokenizer_lookaheadCharCode();
    if (nextCh === 44 || nextCh === 61 || nextCh === 58 || nextCh === 41) {
      _ExpressionParser_setOptionalParametersError(refExpressionErrors);
      return expr;
    }
  }
  _UtilParser_expect(17);
  const state = _Parser_this.state.clone();
  const originalNoArrowAt = _Parser_this.state.noArrowAt;
  const node = _NodeUtils_startNodeAt(startLoc);
  let {
    consequent,
    failed
  } = _flow_tryParseConditionalConsequent();
  let [valid, invalid] = _flow_getArrowLikeExpressions(consequent);
  if (failed || invalid.length > 0) {
    const noArrowAt = [...originalNoArrowAt];
    if (invalid.length > 0) {
      _Parser_this.state = state;
      _Parser_this.state.noArrowAt = noArrowAt;
      for (let i = 0; i < invalid.length; i++) {
        noArrowAt.push(invalid[i].start);
      }
      ({
        consequent,
        failed
      } = _flow_tryParseConditionalConsequent());
      [valid, invalid] = _flow_getArrowLikeExpressions(consequent);
    }
    if (failed && valid.length > 1) {
      _Tokenizer_raise(FlowErrors.AmbiguousConditionalArrow, state.startLoc);
    }
    if (failed && valid.length === 1) {
      _Parser_this.state = state;
      noArrowAt.push(valid[0].start);
      _Parser_this.state.noArrowAt = noArrowAt;
      ({
        consequent,
        failed
      } = _flow_tryParseConditionalConsequent());
    }
  }
  _flow_getArrowLikeExpressions(consequent, true);
  _Parser_this.state.noArrowAt = originalNoArrowAt;
  _UtilParser_expect(14);
  node.test = expr;
  node.consequent = consequent;
  node.alternate = _flow_forwardNoArrowParamsConversionAt(node, () => _Parser_parseMaybeAssign_dynamic(undefined, undefined));
  return _Parser_finishNode_dynamic(node, "ConditionalExpression");
}
function _flow_tryParseConditionalConsequent() {
  _Parser_this.state.noArrowParamsConversionAt.push(_Parser_this.state.start);
  const consequent = _ExpressionParser_parseMaybeAssignAllowIn();
  const failed = !_Tokenizer_match(14);
  _Parser_this.state.noArrowParamsConversionAt.pop();
  return {
    consequent,
    failed
  };
}
function _flow_getArrowLikeExpressions(node, disallowInvalid) {
  const stack = [node];
  const arrows = [];
  while (stack.length !== 0) {
    const node = stack.pop();
    if (node.type === "ArrowFunctionExpression" && node.body.type !== "BlockStatement") {
      if (node.typeParameters || !node.returnType) {
        _flow_finishArrowValidation(node);
      } else {
        arrows.push(node);
      }
      stack.push(node.body);
    } else if (node.type === "ConditionalExpression") {
      stack.push(node.consequent);
      stack.push(node.alternate);
    }
  }
  if (disallowInvalid) {
    arrows.forEach(node => _flow_finishArrowValidation(node));
    return [arrows, []];
  }
  return partition(arrows, node => node.params.every(param => _Parser_isAssignable_dynamic(param, true)));
}
function _flow_finishArrowValidation(node) {
  var _node$extra;
  _Parser_toAssignableList_dynamic(node.params, (_node$extra = node.extra) == null ? void 0 : _node$extra.trailingCommaLoc, false);
  _Parser_this.scope.enter(2 | 4);
  _ExpressionParser_checkParams(node, false, true);
  _Parser_this.scope.exit();
}
function _flow_forwardNoArrowParamsConversionAt(node, parse) {
  let result;
  if (_Parser_this.state.noArrowParamsConversionAt.includes(_BaseParser_offsetToSourcePos(node.start))) {
    _Parser_this.state.noArrowParamsConversionAt.push(_Parser_this.state.start);
    result = parse();
    _Parser_this.state.noArrowParamsConversionAt.pop();
  } else {
    result = parse();
  }
  return result;
}
function _flow_parseParenItem(__super, node, startLoc) {
  const newNode = __super(node, startLoc);
  if (_Tokenizer_eat(17)) {
    newNode.optional = true;
    _Parser_resetEndLocation_dynamic(node);
  }
  if (_Tokenizer_match(14)) {
    const typeCastNode = _NodeUtils_startNodeAt(startLoc);
    typeCastNode.expression = newNode;
    typeCastNode.typeAnnotation = _flow_flowParseTypeAnnotation();
    return _Parser_finishNode_dynamic(typeCastNode, "TypeCastExpression");
  }
  return newNode;
}
function _flow_assertModuleNodeAllowed(__super, node) {
  if (node.type === "ImportDeclaration" && (node.importKind === "type" || node.importKind === "typeof") || node.type === "ExportNamedDeclaration" && node.exportKind === "type" || node.type === "ExportAllDeclaration" && node.exportKind === "type") {
    return;
  }
  __super(node);
}
function _flow_parseExportDeclaration(__super, node) {
  if (_UtilParser_isContextual(130)) {
    node.exportKind = "type";
    const declarationNode = _NodeUtils_startNode();
    _Tokenizer_next();
    if (_Tokenizer_match(5)) {
      node.specifiers = _StatementParser_parseExportSpecifiers(true);
      _StatementParser_parseExportFrom(node);
      return null;
    } else {
      return _flow_flowParseTypeAlias(declarationNode);
    }
  } else if (_UtilParser_isContextual(131)) {
    node.exportKind = "type";
    const declarationNode = _NodeUtils_startNode();
    _Tokenizer_next();
    return _flow_flowParseOpaqueType(declarationNode, false);
  } else if (_UtilParser_isContextual(129)) {
    node.exportKind = "type";
    const declarationNode = _NodeUtils_startNode();
    _Tokenizer_next();
    return _flow_flowParseInterface(declarationNode);
  } else if (_UtilParser_isContextual(126)) {
    node.exportKind = "value";
    const declarationNode = _NodeUtils_startNode();
    _Tokenizer_next();
    return _flow_flowParseEnumDeclaration(declarationNode);
  } else {
    return __super(node);
  }
}
function _flow_eatExportStar(__super, node) {
  if (__super(node)) return true;
  if (_UtilParser_isContextual(130) && _Tokenizer_lookahead().type === 55) {
    node.exportKind = "type";
    _Tokenizer_next();
    _Tokenizer_next();
    return true;
  }
  return false;
}
function _flow_maybeParseExportNamespaceSpecifier(__super, node) {
  const {
    startLoc
  } = _Parser_this.state;
  const hasNamespace = __super(node);
  if (hasNamespace && node.exportKind === "type") {
    _Tokenizer_unexpected(startLoc);
  }
  return hasNamespace;
}
function _flow_parseClassId(__super, node, isStatement, optionalId) {
  __super(node, isStatement, optionalId);
  if (_Tokenizer_match(47)) {
    node.typeParameters = _flow_flowParseTypeParameterDeclaration();
  }
}
function _flow_parseClassMember(__super, classBody, member, state) {
  const {
    startLoc
  } = _Parser_this.state;
  if (_UtilParser_isContextual(125)) {
    if (_StatementParser_parseClassMemberFromModifier(classBody, member)) {
      return;
    }
    member.declare = true;
  }
  __super(classBody, member, state);
  if (member.declare) {
    if (member.type !== "ClassProperty" && member.type !== "ClassPrivateProperty" && member.type !== "PropertyDefinition") {
      _Tokenizer_raise(FlowErrors.DeclareClassElement, startLoc);
    } else if (member.value) {
      _Tokenizer_raise(FlowErrors.DeclareClassFieldInitializer, member.value);
    }
  }
}
function _flow_isIterator(word) {
  return word === "iterator" || word === "asyncIterator";
}
function _flow_readIterator() {
  const word = _Tokenizer_readWord();
  const fullWord = "@@" + word;
  if (!_flow_isIterator(word) || !_Parser_this.state.inType) {
    _Tokenizer_raise(Errors.InvalidIdentifier, _Parser_this.state.curPosition(), {
      identifierName: fullWord
    });
  }
  _Parser_finishToken_dynamic(132, fullWord);
}
function _flow_getTokenFromCode(__super, code) {
  const next = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1);
  if (code === 123 && next === 124) {
    _Tokenizer_finishOp(6, 2);
  } else if (_Parser_this.state.inType && (code === 62 || code === 60)) {
    _Tokenizer_finishOp(code === 62 ? 48 : 47, 1);
  } else if (_Parser_this.state.inType && code === 63) {
    if (next === 46) {
      _Tokenizer_finishOp(18, 2);
    } else {
      _Tokenizer_finishOp(17, 1);
    }
  } else if (isIteratorStart(code, next, _Parser_this.input.charCodeAt(_Parser_this.state.pos + 2))) {
    _Parser_this.state.pos += 2;
    _flow_readIterator();
  } else {
    __super(code);
  }
}
function _flow_isAssignable(__super, node, isBinding) {
  if (node.type === "TypeCastExpression") {
    return _Parser_isAssignable_dynamic(node.expression, isBinding);
  } else {
    return __super(node, isBinding);
  }
}
function _flow_toAssignable(__super, node, isLHS = false) {
  if (!isLHS && node.type === "AssignmentExpression" && node.left.type === "TypeCastExpression") {
    node.left = _Parser_typeCastToParameter_dynamic(node.left);
  }
  __super(node, isLHS);
}
function _flow_toAssignableList(__super, exprList, trailingCommaLoc, isLHS) {
  for (let i = 0; i < exprList.length; i++) {
    const expr = exprList[i];
    if ((expr == null ? void 0 : expr.type) === "TypeCastExpression") {
      exprList[i] = _Parser_typeCastToParameter_dynamic(expr);
    }
  }
  __super(exprList, trailingCommaLoc, isLHS);
}
function _flow_toReferencedList(__super, exprList, isParenthesizedExpr) {
  for (let i = 0; i < exprList.length; i++) {
    var _expr$extra;
    const expr = exprList[i];
    if (expr && expr.type === "TypeCastExpression" && !((_expr$extra = expr.extra) != null && _expr$extra.parenthesized) && (exprList.length > 1 || !isParenthesizedExpr)) {
      _Tokenizer_raise(FlowErrors.TypeCastInPattern, expr.typeAnnotation);
    }
  }
  return exprList;
}
function _flow_parseArrayLike(__super, close, canBePattern, isTuple, refExpressionErrors) {
  const node = __super(close, canBePattern, isTuple, refExpressionErrors);
  if (canBePattern && !_Parser_this.state.maybeInArrowParameters) {
    _Parser_toReferencedList_dynamic(node.elements);
  }
  return node;
}
function _flow_isValidLVal(__super, type, isParenthesized, binding) {
  return type === "TypeCastExpression" || __super(type, isParenthesized, binding);
}
function _flow_parseClassProperty(__super, node) {
  if (_Tokenizer_match(14)) {
    node.typeAnnotation = _flow_flowParseTypeAnnotation();
  }
  return __super(node);
}
function _flow_parseClassPrivateProperty(__super, node) {
  if (_Tokenizer_match(14)) {
    node.typeAnnotation = _flow_flowParseTypeAnnotation();
  }
  return __super(node);
}
function _flow_isClassMethod(__super) {
  return _Tokenizer_match(47) || __super();
}
function _flow_isClassProperty(__super) {
  return _Tokenizer_match(14) || __super();
}
function _flow_isNonstaticConstructor(__super, method) {
  return !_Tokenizer_match(14) && __super(method);
}
function _flow_pushClassMethod(__super, classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
  if (method.variance) {
    _Tokenizer_unexpected(method.variance.loc.start);
  }
  delete method.variance;
  if (_Tokenizer_match(47)) {
    method.typeParameters = _flow_flowParseTypeParameterDeclaration();
  }
  __super(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper);
  if (method.params && isConstructor) {
    const params = method.params;
    if (params.length > 0 && _StatementParser_isThisParam(params[0])) {
      _Tokenizer_raise(FlowErrors.ThisParamBannedInConstructor, method);
    }
  } else if (method.type === "MethodDefinition" && isConstructor && method.value.params) {
    const params = method.value.params;
    if (params.length > 0 && _StatementParser_isThisParam(params[0])) {
      _Tokenizer_raise(FlowErrors.ThisParamBannedInConstructor, method);
    }
  }
}
function _flow_pushClassPrivateMethod(__super, classBody, method, isGenerator, isAsync) {
  if (method.variance) {
    _Tokenizer_unexpected(method.variance.loc.start);
  }
  delete method.variance;
  if (_Tokenizer_match(47)) {
    method.typeParameters = _flow_flowParseTypeParameterDeclaration();
  }
  __super(classBody, method, isGenerator, isAsync);
}
function _flow_parseClassSuper(__super, node) {
  __super(node);
  if (node.superClass && (_Tokenizer_match(47) || _Tokenizer_match(51))) {
    {
      node.superTypeParameters = _flow_flowParseTypeParameterInstantiationInExpression();
    }
  }
  if (_UtilParser_isContextual(113)) {
    _Tokenizer_next();
    const implemented = node.implements = [];
    do {
      const node = _NodeUtils_startNode();
      node.id = _flow_flowParseRestrictedIdentifier(true);
      if (_Tokenizer_match(47)) {
        node.typeParameters = _flow_flowParseTypeParameterInstantiation();
      } else {
        node.typeParameters = null;
      }
      implemented.push(_Parser_finishNode_dynamic(node, "ClassImplements"));
    } while (_Tokenizer_eat(12));
  }
}
function _flow_checkGetterSetterParams(__super, method) {
  __super(method);
  const params = _Parser_getObjectOrClassMethodParams_dynamic(method);
  if (params.length > 0) {
    const param = params[0];
    if (_StatementParser_isThisParam(param) && method.kind === "get") {
      _Tokenizer_raise(FlowErrors.GetterMayNotHaveThisParam, param);
    } else if (_StatementParser_isThisParam(param)) {
      _Tokenizer_raise(FlowErrors.SetterMayNotHaveThisParam, param);
    }
  }
}
function _flow_parsePropertyNamePrefixOperator(__super, node) {
  node.variance = _flow_flowParseVariance();
}
function _flow_parseObjPropValue(__super, prop, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors) {
  if (prop.variance) {
    _Tokenizer_unexpected(prop.variance.loc.start);
  }
  delete prop.variance;
  let typeParameters;
  if (_Tokenizer_match(47) && !isAccessor) {
    typeParameters = _flow_flowParseTypeParameterDeclaration();
    if (!_Tokenizer_match(10)) _Tokenizer_unexpected();
  }
  const result = __super(prop, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors);
  if (typeParameters) {
    (result.value || result).typeParameters = typeParameters;
  }
  return result;
}
function _flow_parseFunctionParamType(__super, param) {
  if (_Tokenizer_eat(17)) {
    if (param.type !== "Identifier") {
      _Tokenizer_raise(FlowErrors.PatternIsOptional, param);
    }
    if (_StatementParser_isThisParam(param)) {
      _Tokenizer_raise(FlowErrors.ThisParamMayNotBeOptional, param);
    }
    param.optional = true;
  }
  if (_Tokenizer_match(14)) {
    param.typeAnnotation = _flow_flowParseTypeAnnotation();
  } else if (_StatementParser_isThisParam(param)) {
    _Tokenizer_raise(FlowErrors.ThisParamAnnotationRequired, param);
  }
  if (_Tokenizer_match(29) && _StatementParser_isThisParam(param)) {
    _Tokenizer_raise(FlowErrors.ThisParamNoDefault, param);
  }
  _Parser_resetEndLocation_dynamic(param);
  return param;
}
function _flow_parseMaybeDefault(__super, startLoc, left) {
  const node = __super(startLoc, left);
  if (node.type === "AssignmentPattern" && node.typeAnnotation && node.right.start < node.typeAnnotation.start) {
    _Tokenizer_raise(FlowErrors.TypeBeforeInitializer, node.typeAnnotation);
  }
  return node;
}
function _flow_checkImportReflection(__super, node) {
  __super(node);
  if (node.module && node.importKind !== "value") {
    _Tokenizer_raise(FlowErrors.ImportReflectionHasImportType, node.specifiers[0].loc.start);
  }
}
function _flow_parseImportSpecifierLocal(__super, node, specifier, type) {
  specifier.local = hasTypeImportKind(node) ? _flow_flowParseRestrictedIdentifier(true, true) : _Parser_parseIdentifier_dynamic();
  node.specifiers.push(_StatementParser_finishImportSpecifier(specifier, type));
}
function _flow_isPotentialImportPhase(__super, isExport) {
  if (__super(isExport)) return true;
  if (_UtilParser_isContextual(130)) {
    if (!isExport) return true;
    const ch = _Tokenizer_lookaheadCharCode();
    return ch === 123 || ch === 42;
  }
  return !isExport && _UtilParser_isContextual(87);
}
function _flow_applyImportPhase(__super, node, isExport, phase, loc) {
  __super(node, isExport, phase, loc);
  if (isExport) {
    if (!phase && _Tokenizer_match(65)) {
      return;
    }
    node.exportKind = phase === "type" ? phase : "value";
  } else {
    if (phase === "type" && _Tokenizer_match(55)) _Tokenizer_unexpected();
    node.importKind = phase === "type" || phase === "typeof" ? phase : "value";
  }
}
function _flow_parseImportSpecifier(__super, specifier, importedIsString, isInTypeOnlyImport, isMaybeTypeOnly, bindingType) {
  const firstIdent = specifier.imported;
  let specifierTypeKind = null;
  if (firstIdent.type === "Identifier") {
    if (firstIdent.name === "type") {
      specifierTypeKind = "type";
    } else if (firstIdent.name === "typeof") {
      specifierTypeKind = "typeof";
    }
  }
  let isBinding = false;
  if (_UtilParser_isContextual(93) && !_UtilParser_isLookaheadContextual("as")) {
    const as_ident = _Parser_parseIdentifier_dynamic(true);
    if (specifierTypeKind !== null && !tokenIsKeywordOrIdentifier(_Parser_this.state.type)) {
      specifier.imported = as_ident;
      specifier.importKind = specifierTypeKind;
      specifier.local = _Parser_cloneIdentifier_dynamic(as_ident);
    } else {
      specifier.imported = firstIdent;
      specifier.importKind = null;
      specifier.local = _Parser_parseIdentifier_dynamic();
    }
  } else {
    if (specifierTypeKind !== null && tokenIsKeywordOrIdentifier(_Parser_this.state.type)) {
      specifier.imported = _Parser_parseIdentifier_dynamic(true);
      specifier.importKind = specifierTypeKind;
    } else {
      if (importedIsString) {
        throw _Tokenizer_raise(Errors.ImportBindingIsString, specifier, {
          importName: firstIdent.value
        });
      }
      specifier.imported = firstIdent;
      specifier.importKind = null;
    }
    if (_UtilParser_eatContextual(93)) {
      specifier.local = _Parser_parseIdentifier_dynamic();
    } else {
      isBinding = true;
      specifier.local = _Parser_cloneIdentifier_dynamic(specifier.imported);
    }
  }
  const specifierIsTypeImport = hasTypeImportKind(specifier);
  if (isInTypeOnlyImport && specifierIsTypeImport) {
    _Tokenizer_raise(FlowErrors.ImportTypeShorthandOnlyInPureImport, specifier);
  }
  if (isInTypeOnlyImport || specifierIsTypeImport) {
    _flow_checkReservedType(specifier.local.name, specifier.local.loc.start, true);
  }
  if (isBinding && !isInTypeOnlyImport && !specifierIsTypeImport) {
    _Parser_checkReservedWord_dynamic(specifier.local.name, specifier.loc.start, true, true);
  }
  return _StatementParser_finishImportSpecifier(specifier, "ImportSpecifier");
}
function _flow_parseBindingAtom(__super) {
  switch (_Parser_this.state.type) {
    case 78:
      return _Parser_parseIdentifier_dynamic(true);
    default:
      return __super();
  }
}
function _flow_parseFunctionParams(__super, node, isConstructor) {
  const kind = node.kind;
  if (kind !== "get" && kind !== "set" && _Tokenizer_match(47)) {
    node.typeParameters = _flow_flowParseTypeParameterDeclaration();
  }
  __super(node, isConstructor);
}
function _flow_parseVarId(__super, decl, kind) {
  __super(decl, kind);
  if (_Tokenizer_match(14)) {
    decl.id.typeAnnotation = _flow_flowParseTypeAnnotation();
    _Parser_resetEndLocation_dynamic(decl.id);
  }
}
function _flow_parseAsyncArrowFromCallExpression(__super, node, call) {
  if (_Tokenizer_match(14)) {
    const oldNoAnonFunctionType = _Parser_this.state.noAnonFunctionType;
    _Parser_this.state.noAnonFunctionType = true;
    node.returnType = _flow_flowParseTypeAnnotation();
    _Parser_this.state.noAnonFunctionType = oldNoAnonFunctionType;
  }
  return __super(node, call);
}
function _flow_shouldParseAsyncArrow(__super) {
  return _Tokenizer_match(14) || __super();
}
function _flow_parseMaybeAssign(__super, refExpressionErrors, afterLeftParse) {
  var _jsx;
  let state = null;
  let jsx;
  if (_BaseParser_hasPlugin("jsx") && (_Tokenizer_match(143) || _Tokenizer_match(47))) {
    state = _Parser_this.state.clone();
    jsx = _UtilParser_tryParse(() => __super(refExpressionErrors, afterLeftParse), state);
    if (!jsx.error) return jsx.node;
    const {
      context
    } = _Parser_this.state;
    const currentContext = context[context.length - 1];
    if (currentContext === types.j_oTag || currentContext === types.j_expr) {
      context.pop();
    }
  }
  if ((_jsx = jsx) != null && _jsx.error || _Tokenizer_match(47)) {
    var _jsx2, _jsx3;
    state = state || _Parser_this.state.clone();
    let typeParameters;
    const arrow = _UtilParser_tryParse(abort => {
      var _arrowExpression$extr;
      typeParameters = _flow_flowParseTypeParameterDeclaration();
      const arrowExpression = _flow_forwardNoArrowParamsConversionAt(typeParameters, () => {
        const result = __super(refExpressionErrors, afterLeftParse);
        _NodeUtils_resetStartLocationFromNode(result, typeParameters);
        return result;
      });
      if ((_arrowExpression$extr = arrowExpression.extra) != null && _arrowExpression$extr.parenthesized) abort();
      const expr = _flow_maybeUnwrapTypeCastExpression(arrowExpression);
      if (expr.type !== "ArrowFunctionExpression") abort();
      expr.typeParameters = typeParameters;
      _NodeUtils_resetStartLocationFromNode(expr, typeParameters);
      return arrowExpression;
    }, state);
    let arrowExpression = null;
    if (arrow.node && _flow_maybeUnwrapTypeCastExpression(arrow.node).type === "ArrowFunctionExpression") {
      if (!arrow.error && !arrow.aborted) {
        if (arrow.node.async) {
          _Tokenizer_raise(FlowErrors.UnexpectedTypeParameterBeforeAsyncArrowFunction, typeParameters);
        }
        return arrow.node;
      }
      arrowExpression = arrow.node;
    }
    if ((_jsx2 = jsx) != null && _jsx2.node) {
      _Parser_this.state = jsx.failState;
      return jsx.node;
    }
    if (arrowExpression) {
      _Parser_this.state = arrow.failState;
      return arrowExpression;
    }
    if ((_jsx3 = jsx) != null && _jsx3.thrown) throw jsx.error;
    if (arrow.thrown) throw arrow.error;
    throw _Tokenizer_raise(FlowErrors.UnexpectedTokenAfterTypeParameter, typeParameters);
  }
  return __super(refExpressionErrors, afterLeftParse);
}
function _flow_parseArrow(__super, node) {
  if (_Tokenizer_match(14)) {
    const result = _UtilParser_tryParse(() => {
      const oldNoAnonFunctionType = _Parser_this.state.noAnonFunctionType;
      _Parser_this.state.noAnonFunctionType = true;
      const typeNode = _NodeUtils_startNode();
      [typeNode.typeAnnotation, node.predicate] = _flow_flowParseTypeAndPredicateInitialiser();
      _Parser_this.state.noAnonFunctionType = oldNoAnonFunctionType;
      if (_UtilParser_canInsertSemicolon()) _Tokenizer_unexpected();
      if (!_Tokenizer_match(19)) _Tokenizer_unexpected();
      return typeNode;
    });
    if (result.thrown) return null;
    if (result.error) _Parser_this.state = result.failState;
    node.returnType = result.node.typeAnnotation ? _Parser_finishNode_dynamic(result.node, "TypeAnnotation") : null;
  }
  return __super(node);
}
function _flow_shouldParseArrow(__super, params) {
  return _Tokenizer_match(14) || __super(params);
}
function _flow_setArrowFunctionParameters(__super, node, params) {
  if (_Parser_this.state.noArrowParamsConversionAt.includes(_BaseParser_offsetToSourcePos(node.start))) {
    node.params = params;
  } else {
    __super(node, params);
  }
}
function _flow_checkParams(__super, node, allowDuplicates, isArrowFunction, strictModeChanged = true) {
  if (isArrowFunction && _Parser_this.state.noArrowParamsConversionAt.includes(_BaseParser_offsetToSourcePos(node.start))) {
    return;
  }
  for (let i = 0; i < node.params.length; i++) {
    if (_StatementParser_isThisParam(node.params[i]) && i > 0) {
      _Tokenizer_raise(FlowErrors.ThisParamMustBeFirst, node.params[i]);
    }
  }
  __super(node, allowDuplicates, isArrowFunction, strictModeChanged);
}
function _flow_parseParenAndDistinguishExpression(__super, canBeArrow) {
  return __super(canBeArrow && !_Parser_this.state.noArrowAt.includes(_BaseParser_sourceToOffsetPos(_Parser_this.state.start)));
}
function _flow_parseSubscripts(__super, base, startLoc, noCalls) {
  if (base.type === "Identifier" && base.name === "async" && _Parser_this.state.noArrowAt.includes(startLoc.index)) {
    _Tokenizer_next();
    const node = _NodeUtils_startNodeAt(startLoc);
    node.callee = base;
    node.arguments = _ExpressionParser_parseCallExpressionArguments(11);
    base = _Parser_finishNode_dynamic(node, "CallExpression");
  } else if (base.type === "Identifier" && base.name === "async" && _Tokenizer_match(47)) {
    const state = _Parser_this.state.clone();
    const arrow = _UtilParser_tryParse(abort => _flow_parseAsyncArrowWithTypeParameters(startLoc) || abort(), state);
    if (!arrow.error && !arrow.aborted) return arrow.node;
    const result = _UtilParser_tryParse(() => __super(base, startLoc, noCalls), state);
    if (result.node && !result.error) return result.node;
    if (arrow.node) {
      _Parser_this.state = arrow.failState;
      return arrow.node;
    }
    if (result.node) {
      _Parser_this.state = result.failState;
      return result.node;
    }
    throw arrow.error || result.error;
  }
  return __super(base, startLoc, noCalls);
}
function _flow_parseSubscript(__super, base, startLoc, noCalls, subscriptState) {
  if (_Tokenizer_match(18) && _flow_isLookaheadToken_lt()) {
    subscriptState.optionalChainMember = true;
    if (noCalls) {
      subscriptState.stop = true;
      return base;
    }
    _Tokenizer_next();
    const node = _NodeUtils_startNodeAt(startLoc);
    node.callee = base;
    node.typeArguments = _flow_flowParseTypeParameterInstantiationInExpression();
    _UtilParser_expect(10);
    node.arguments = _ExpressionParser_parseCallExpressionArguments(11);
    node.optional = true;
    return _Parser_finishCallExpression_dynamic(node, true);
  } else if (!noCalls && _flow_shouldParseTypes() && (_Tokenizer_match(47) || _Tokenizer_match(51))) {
    const node = _NodeUtils_startNodeAt(startLoc);
    node.callee = base;
    const result = _UtilParser_tryParse(() => {
      node.typeArguments = _flow_flowParseTypeParameterInstantiationCallOrNew();
      _UtilParser_expect(10);
      node.arguments = _ExpressionParser_parseCallExpressionArguments(11);
      if (subscriptState.optionalChainMember) {
        node.optional = false;
      }
      return _Parser_finishCallExpression_dynamic(node, subscriptState.optionalChainMember);
    });
    if (result.node) {
      if (result.error) _Parser_this.state = result.failState;
      return result.node;
    }
  }
  return __super(base, startLoc, noCalls, subscriptState);
}
function _flow_parseNewCallee(__super, node) {
  __super(node);
  let targs = null;
  if (_flow_shouldParseTypes() && _Tokenizer_match(47)) {
    targs = _UtilParser_tryParse(() => _flow_flowParseTypeParameterInstantiationCallOrNew()).node;
  }
  node.typeArguments = targs;
}
function _flow_parseAsyncArrowWithTypeParameters(startLoc) {
  const node = _NodeUtils_startNodeAt(startLoc);
  _Parser_parseFunctionParams_dynamic(node, false);
  if (!_Parser_parseArrow_dynamic(node)) return;
  return _ExpressionParser_parseArrowExpression(node, undefined, true);
}
function _flow_readToken_mult_modulo(__super, code) {
  const next = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1);
  if (code === 42 && next === 47 && _Parser_this.state.hasFlowComment) {
    _Parser_this.state.hasFlowComment = false;
    _Parser_this.state.pos += 2;
    _Tokenizer_nextToken();
    return;
  }
  __super(code);
}
function _flow_readToken_pipe_amp(__super, code) {
  const next = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1);
  if (code === 124 && next === 125) {
    _Tokenizer_finishOp(9, 2);
    return;
  }
  __super(code);
}
function _flow_parseTopLevel(__super, file, program) {
  const fileNode = __super(file, program);
  if (_Parser_this.state.hasFlowComment) {
    _Tokenizer_raise(FlowErrors.UnterminatedFlowComment, _Parser_this.state.curPosition());
  }
  return fileNode;
}
function _flow_skipBlockComment(__super) {
  if (_BaseParser_hasPlugin("flowComments") && _flow_skipFlowComment()) {
    if (_Parser_this.state.hasFlowComment) {
      throw _Tokenizer_raise(FlowErrors.NestedFlowComment, _Parser_this.state.startLoc);
    }
    _flow_hasFlowCommentCompletion();
    const commentSkip = _flow_skipFlowComment();
    if (commentSkip) {
      _Parser_this.state.pos += commentSkip;
      _Parser_this.state.hasFlowComment = true;
    }
    return;
  }
  return __super(_Parser_this.state.hasFlowComment ? "*-/" : "*/");
}
function _flow_skipFlowComment() {
  const {
    pos
  } = _Parser_this.state;
  let shiftToFirstNonWhiteSpace = 2;
  while ([32, 9].includes(_Parser_this.input.charCodeAt(pos + shiftToFirstNonWhiteSpace))) {
    shiftToFirstNonWhiteSpace++;
  }
  const ch2 = _Parser_this.input.charCodeAt(shiftToFirstNonWhiteSpace + pos);
  const ch3 = _Parser_this.input.charCodeAt(shiftToFirstNonWhiteSpace + pos + 1);
  if (ch2 === 58 && ch3 === 58) {
    return shiftToFirstNonWhiteSpace + 2;
  }
  if (_Parser_this.input.slice(shiftToFirstNonWhiteSpace + pos, shiftToFirstNonWhiteSpace + pos + 12) === "flow-include") {
    return shiftToFirstNonWhiteSpace + 12;
  }
  if (ch2 === 58 && ch3 !== 58) {
    return shiftToFirstNonWhiteSpace;
  }
  return false;
}
function _flow_hasFlowCommentCompletion() {
  const end = _Parser_this.input.indexOf("*/", _Parser_this.state.pos);
  if (end === -1) {
    throw _Tokenizer_raise(Errors.UnterminatedComment, _Parser_this.state.curPosition());
  }
}
function _flow_flowEnumErrorBooleanMemberNotInitialized(loc, {
  enumName,
  memberName
}) {
  _Tokenizer_raise(FlowErrors.EnumBooleanMemberNotInitialized, loc, {
    memberName,
    enumName
  });
}
function _flow_flowEnumErrorInvalidMemberInitializer(loc, enumContext) {
  return _Tokenizer_raise(!enumContext.explicitType ? FlowErrors.EnumInvalidMemberInitializerUnknownType : enumContext.explicitType === "symbol" ? FlowErrors.EnumInvalidMemberInitializerSymbolType : FlowErrors.EnumInvalidMemberInitializerPrimaryType, loc, enumContext);
}
function _flow_flowEnumErrorNumberMemberNotInitialized(loc, details) {
  _Tokenizer_raise(FlowErrors.EnumNumberMemberNotInitialized, loc, details);
}
function _flow_flowEnumErrorStringMemberInconsistentlyInitialized(node, details) {
  _Tokenizer_raise(FlowErrors.EnumStringMemberInconsistentlyInitialized, node, details);
}
function _flow_flowEnumMemberInit() {
  const startLoc = _Parser_this.state.startLoc;
  const endOfInit = () => _Tokenizer_match(12) || _Tokenizer_match(8);
  switch (_Parser_this.state.type) {
    case 135:
      {
        const literal = _Parser_parseNumericLiteral_dynamic(_Parser_this.state.value);
        if (endOfInit()) {
          return {
            type: "number",
            loc: literal.loc.start,
            value: literal
          };
        }
        return {
          type: "invalid",
          loc: startLoc
        };
      }
    case 134:
      {
        const literal = _Parser_parseStringLiteral_dynamic(_Parser_this.state.value);
        if (endOfInit()) {
          return {
            type: "string",
            loc: literal.loc.start,
            value: literal
          };
        }
        return {
          type: "invalid",
          loc: startLoc
        };
      }
    case 85:
    case 86:
      {
        const literal = _Parser_parseBooleanLiteral_dynamic(_Tokenizer_match(85));
        if (endOfInit()) {
          return {
            type: "boolean",
            loc: literal.loc.start,
            value: literal
          };
        }
        return {
          type: "invalid",
          loc: startLoc
        };
      }
    default:
      return {
        type: "invalid",
        loc: startLoc
      };
  }
}
function _flow_flowEnumMemberRaw() {
  const loc = _Parser_this.state.startLoc;
  const id = _Parser_parseIdentifier_dynamic(true);
  const init = _Tokenizer_eat(29) ? _flow_flowEnumMemberInit() : {
    type: "none",
    loc
  };
  return {
    id,
    init
  };
}
function _flow_flowEnumCheckExplicitTypeMismatch(loc, context, expectedType) {
  const {
    explicitType
  } = context;
  if (explicitType === null) {
    return;
  }
  if (explicitType !== expectedType) {
    _flow_flowEnumErrorInvalidMemberInitializer(loc, context);
  }
}
function _flow_flowEnumMembers({
  enumName,
  explicitType
}) {
  const seenNames = new Set();
  const members = {
    booleanMembers: [],
    numberMembers: [],
    stringMembers: [],
    defaultedMembers: []
  };
  let hasUnknownMembers = false;
  while (!_Tokenizer_match(8)) {
    if (_Tokenizer_eat(21)) {
      hasUnknownMembers = true;
      break;
    }
    const memberNode = _NodeUtils_startNode();
    const {
      id,
      init
    } = _flow_flowEnumMemberRaw();
    const memberName = id.name;
    if (memberName === "") {
      continue;
    }
    if (/^[a-z]/.test(memberName)) {
      _Tokenizer_raise(FlowErrors.EnumInvalidMemberName, id, {
        memberName,
        suggestion: memberName[0].toUpperCase() + memberName.slice(1),
        enumName
      });
    }
    if (seenNames.has(memberName)) {
      _Tokenizer_raise(FlowErrors.EnumDuplicateMemberName, id, {
        memberName,
        enumName
      });
    }
    seenNames.add(memberName);
    const context = {
      enumName,
      explicitType,
      memberName
    };
    memberNode.id = id;
    switch (init.type) {
      case "boolean":
        {
          _flow_flowEnumCheckExplicitTypeMismatch(init.loc, context, "boolean");
          memberNode.init = init.value;
          members.booleanMembers.push(_Parser_finishNode_dynamic(memberNode, "EnumBooleanMember"));
          break;
        }
      case "number":
        {
          _flow_flowEnumCheckExplicitTypeMismatch(init.loc, context, "number");
          memberNode.init = init.value;
          members.numberMembers.push(_Parser_finishNode_dynamic(memberNode, "EnumNumberMember"));
          break;
        }
      case "string":
        {
          _flow_flowEnumCheckExplicitTypeMismatch(init.loc, context, "string");
          memberNode.init = init.value;
          members.stringMembers.push(_Parser_finishNode_dynamic(memberNode, "EnumStringMember"));
          break;
        }
      case "invalid":
        {
          throw _flow_flowEnumErrorInvalidMemberInitializer(init.loc, context);
        }
      case "none":
        {
          switch (explicitType) {
            case "boolean":
              _flow_flowEnumErrorBooleanMemberNotInitialized(init.loc, context);
              break;
            case "number":
              _flow_flowEnumErrorNumberMemberNotInitialized(init.loc, context);
              break;
            default:
              members.defaultedMembers.push(_Parser_finishNode_dynamic(memberNode, "EnumDefaultedMember"));
          }
        }
    }
    if (!_Tokenizer_match(8)) {
      _UtilParser_expect(12);
    }
  }
  return {
    members,
    hasUnknownMembers
  };
}
function _flow_flowEnumStringMembers(initializedMembers, defaultedMembers, {
  enumName
}) {
  if (initializedMembers.length === 0) {
    return defaultedMembers;
  } else if (defaultedMembers.length === 0) {
    return initializedMembers;
  } else if (defaultedMembers.length > initializedMembers.length) {
    for (const member of initializedMembers) {
      _flow_flowEnumErrorStringMemberInconsistentlyInitialized(member, {
        enumName
      });
    }
    return defaultedMembers;
  } else {
    for (const member of defaultedMembers) {
      _flow_flowEnumErrorStringMemberInconsistentlyInitialized(member, {
        enumName
      });
    }
    return initializedMembers;
  }
}
function _flow_flowEnumParseExplicitType({
  enumName
}) {
  if (!_UtilParser_eatContextual(102)) return null;
  if (!tokenIsIdentifier(_Parser_this.state.type)) {
    throw _Tokenizer_raise(FlowErrors.EnumInvalidExplicitTypeUnknownSupplied, _Parser_this.state.startLoc, {
      enumName
    });
  }
  const {
    value
  } = _Parser_this.state;
  _Tokenizer_next();
  if (value !== "boolean" && value !== "number" && value !== "string" && value !== "symbol") {
    _Tokenizer_raise(FlowErrors.EnumInvalidExplicitType, _Parser_this.state.startLoc, {
      enumName,
      invalidEnumType: value
    });
  }
  return value;
}
function _flow_flowEnumBody(node, id) {
  const enumName = id.name;
  const nameLoc = id.loc.start;
  const explicitType = _flow_flowEnumParseExplicitType({
    enumName
  });
  _UtilParser_expect(5);
  const {
    members,
    hasUnknownMembers
  } = _flow_flowEnumMembers({
    enumName,
    explicitType
  });
  node.hasUnknownMembers = hasUnknownMembers;
  switch (explicitType) {
    case "boolean":
      node.explicitType = true;
      node.members = members.booleanMembers;
      _UtilParser_expect(8);
      return _Parser_finishNode_dynamic(node, "EnumBooleanBody");
    case "number":
      node.explicitType = true;
      node.members = members.numberMembers;
      _UtilParser_expect(8);
      return _Parser_finishNode_dynamic(node, "EnumNumberBody");
    case "string":
      node.explicitType = true;
      node.members = _flow_flowEnumStringMembers(members.stringMembers, members.defaultedMembers, {
        enumName
      });
      _UtilParser_expect(8);
      return _Parser_finishNode_dynamic(node, "EnumStringBody");
    case "symbol":
      node.members = members.defaultedMembers;
      _UtilParser_expect(8);
      return _Parser_finishNode_dynamic(node, "EnumSymbolBody");
    default:
      {
        const empty = () => {
          node.members = [];
          _UtilParser_expect(8);
          return _Parser_finishNode_dynamic(node, "EnumStringBody");
        };
        node.explicitType = false;
        const boolsLen = members.booleanMembers.length;
        const numsLen = members.numberMembers.length;
        const strsLen = members.stringMembers.length;
        const defaultedLen = members.defaultedMembers.length;
        if (!boolsLen && !numsLen && !strsLen && !defaultedLen) {
          return empty();
        } else if (!boolsLen && !numsLen) {
          node.members = _flow_flowEnumStringMembers(members.stringMembers, members.defaultedMembers, {
            enumName
          });
          _UtilParser_expect(8);
          return _Parser_finishNode_dynamic(node, "EnumStringBody");
        } else if (!numsLen && !strsLen && boolsLen >= defaultedLen) {
          for (const member of members.defaultedMembers) {
            _flow_flowEnumErrorBooleanMemberNotInitialized(member.loc.start, {
              enumName,
              memberName: member.id.name
            });
          }
          node.members = members.booleanMembers;
          _UtilParser_expect(8);
          return _Parser_finishNode_dynamic(node, "EnumBooleanBody");
        } else if (!boolsLen && !strsLen && numsLen >= defaultedLen) {
          for (const member of members.defaultedMembers) {
            _flow_flowEnumErrorNumberMemberNotInitialized(member.loc.start, {
              enumName,
              memberName: member.id.name
            });
          }
          node.members = members.numberMembers;
          _UtilParser_expect(8);
          return _Parser_finishNode_dynamic(node, "EnumNumberBody");
        } else {
          _Tokenizer_raise(FlowErrors.EnumInconsistentMemberValues, nameLoc, {
            enumName
          });
          return empty();
        }
      }
  }
}
function _flow_flowParseEnumDeclaration(node) {
  const id = _Parser_parseIdentifier_dynamic();
  node.id = id;
  node.body = _flow_flowEnumBody(_NodeUtils_startNode(), id);
  return _Parser_finishNode_dynamic(node, "EnumDeclaration");
}
function _flow_jsxParseOpeningElementAfterName(__super, node) {
  if (_flow_shouldParseTypes()) {
    if (_Tokenizer_match(47) || _Tokenizer_match(51)) {
      node.typeArguments = _flow_flowParseTypeParameterInstantiationInExpression();
    }
  }
  return __super(node);
}
function _flow_isLookaheadToken_lt() {
  const next = _Tokenizer_nextTokenStart();
  if (_Parser_this.input.charCodeAt(next) === 60) {
    const afterNext = _Parser_this.input.charCodeAt(next + 1);
    return afterNext !== 60 && afterNext !== 61;
  }
  return false;
}
function _flow_reScan_lt_gt(__super) {
  const {
    type
  } = _Parser_this.state;
  if (type === 47) {
    _Parser_this.state.pos -= 1;
    _Tokenizer_readToken_lt();
  } else if (type === 48) {
    _Parser_this.state.pos -= 1;
    _Tokenizer_readToken_gt();
  }
}
function _flow_reScan_lt(__super) {
  const {
    type
  } = _Parser_this.state;
  if (type === 51) {
    _Parser_this.state.pos -= 2;
    _Tokenizer_finishOp(47, 1);
    return 47;
  }
  return type;
}
function _flow_maybeUnwrapTypeCastExpression(node) {
  return node.type === "TypeCastExpression" ? node.expression : node;
}
function _jsx_jsxReadToken() {
  let out = "";
  let chunkStart = _Parser_this.state.pos;
  for (;;) {
    if (_Parser_this.state.pos >= _Parser_this.length) {
      throw _Tokenizer_raise(JsxErrors.UnterminatedJsxContent, _Parser_this.state.startLoc);
    }
    const ch = _Parser_this.input.charCodeAt(_Parser_this.state.pos);
    switch (ch) {
      case 60:
      case 123:
        if (_Parser_this.state.pos === _Parser_this.state.start) {
          if (ch === 60 && _Parser_this.state.canStartJSXElement) {
            ++_Parser_this.state.pos;
            _Parser_finishToken_dynamic(143);
          } else {
            _Tokenizer_getTokenFromCode(ch);
          }
          return;
        }
        out += _Parser_this.input.slice(chunkStart, _Parser_this.state.pos);
        _Parser_finishToken_dynamic(142, out);
        return;
      case 38:
        out += _Parser_this.input.slice(chunkStart, _Parser_this.state.pos);
        out += _jsx_jsxReadEntity();
        chunkStart = _Parser_this.state.pos;
        break;
      case 62:
      case 125:
      default:
        if (isNewLine(ch)) {
          out += _Parser_this.input.slice(chunkStart, _Parser_this.state.pos);
          out += _jsx_jsxReadNewLine(true);
          chunkStart = _Parser_this.state.pos;
        } else {
          ++_Parser_this.state.pos;
        }
    }
  }
}
function _jsx_jsxReadNewLine(normalizeCRLF) {
  const ch = _Parser_this.input.charCodeAt(_Parser_this.state.pos);
  let out;
  ++_Parser_this.state.pos;
  if (ch === 13 && _Parser_this.input.charCodeAt(_Parser_this.state.pos) === 10) {
    ++_Parser_this.state.pos;
    out = normalizeCRLF ? "\n" : "\r\n";
  } else {
    out = String.fromCharCode(ch);
  }
  ++_Parser_this.state.curLine;
  _Parser_this.state.lineStart = _Parser_this.state.pos;
  return out;
}
function _jsx_jsxReadString(quote) {
  let out = "";
  let chunkStart = ++_Parser_this.state.pos;
  for (;;) {
    if (_Parser_this.state.pos >= _Parser_this.length) {
      throw _Tokenizer_raise(Errors.UnterminatedString, _Parser_this.state.startLoc);
    }
    const ch = _Parser_this.input.charCodeAt(_Parser_this.state.pos);
    if (ch === quote) break;
    if (ch === 38) {
      out += _Parser_this.input.slice(chunkStart, _Parser_this.state.pos);
      out += _jsx_jsxReadEntity();
      chunkStart = _Parser_this.state.pos;
    } else if (isNewLine(ch)) {
      out += _Parser_this.input.slice(chunkStart, _Parser_this.state.pos);
      out += _jsx_jsxReadNewLine(false);
      chunkStart = _Parser_this.state.pos;
    } else {
      ++_Parser_this.state.pos;
    }
  }
  out += _Parser_this.input.slice(chunkStart, _Parser_this.state.pos++);
  _Parser_finishToken_dynamic(134, out);
}
function _jsx_jsxReadEntity() {
  const startPos = ++_Parser_this.state.pos;
  if (_Tokenizer_codePointAtPos(_Parser_this.state.pos) === 35) {
    ++_Parser_this.state.pos;
    let radix = 10;
    if (_Tokenizer_codePointAtPos(_Parser_this.state.pos) === 120) {
      radix = 16;
      ++_Parser_this.state.pos;
    }
    const codePoint = _Tokenizer_readInt(radix, undefined, false, "bail");
    if (codePoint !== null && _Tokenizer_codePointAtPos(_Parser_this.state.pos) === 59) {
      ++_Parser_this.state.pos;
      return String.fromCodePoint(codePoint);
    }
  } else {
    let count = 0;
    let semi = false;
    while (count++ < 10 && _Parser_this.state.pos < _Parser_this.length && !(semi = _Tokenizer_codePointAtPos(_Parser_this.state.pos) === 59)) {
      ++_Parser_this.state.pos;
    }
    if (semi) {
      const desc = _Parser_this.input.slice(startPos, _Parser_this.state.pos);
      const entity = entities[desc];
      ++_Parser_this.state.pos;
      if (entity) {
        return entity;
      }
    }
  }
  _Parser_this.state.pos = startPos;
  return "&";
}
function _jsx_jsxReadWord() {
  let ch;
  const start = _Parser_this.state.pos;
  do {
    ch = _Parser_this.input.charCodeAt(++_Parser_this.state.pos);
  } while (isIdentifierChar(ch) || ch === 45);
  _Parser_finishToken_dynamic(141, _Parser_this.input.slice(start, _Parser_this.state.pos));
}
function _jsx_jsxParseIdentifier() {
  const node = _NodeUtils_startNode();
  if (_Tokenizer_match(141)) {
    node.name = _Parser_this.state.value;
  } else if (tokenIsKeyword(_Parser_this.state.type)) {
    node.name = tokenLabelName(_Parser_this.state.type);
  } else {
    _Tokenizer_unexpected();
  }
  _Tokenizer_next();
  return _Parser_finishNode_dynamic(node, "JSXIdentifier");
}
function _jsx_jsxParseNamespacedName() {
  const startLoc = _Parser_this.state.startLoc;
  const name = _jsx_jsxParseIdentifier();
  if (!_Tokenizer_eat(14)) return name;
  const node = _NodeUtils_startNodeAt(startLoc);
  node.namespace = name;
  node.name = _jsx_jsxParseIdentifier();
  return _Parser_finishNode_dynamic(node, "JSXNamespacedName");
}
function _jsx_jsxParseElementName() {
  const startLoc = _Parser_this.state.startLoc;
  let node = _jsx_jsxParseNamespacedName();
  if (node.type === "JSXNamespacedName") {
    return node;
  }
  while (_Tokenizer_eat(16)) {
    const newNode = _NodeUtils_startNodeAt(startLoc);
    newNode.object = node;
    newNode.property = _jsx_jsxParseIdentifier();
    node = _Parser_finishNode_dynamic(newNode, "JSXMemberExpression");
  }
  return node;
}
function _jsx_jsxParseAttributeValue() {
  let node;
  switch (_Parser_this.state.type) {
    case 5:
      node = _NodeUtils_startNode();
      _jsx_setContext(types.brace);
      _Tokenizer_next();
      node = _jsx_jsxParseExpressionContainer(node, types.j_oTag);
      if (node.expression.type === "JSXEmptyExpression") {
        _Tokenizer_raise(JsxErrors.AttributeIsEmpty, node);
      }
      return node;
    case 143:
    case 134:
      return _Parser_parseExprAtom_dynamic();
    default:
      throw _Tokenizer_raise(JsxErrors.UnsupportedJsxValue, _Parser_this.state.startLoc);
  }
}
function _jsx_jsxParseEmptyExpression() {
  const node = _NodeUtils_startNodeAt(_Parser_this.state.lastTokEndLoc);
  return _Parser_finishNodeAt_dynamic(node, "JSXEmptyExpression", _Parser_this.state.startLoc);
}
function _jsx_jsxParseSpreadChild(node) {
  _Tokenizer_next();
  node.expression = _ExpressionParser_parseExpression();
  _jsx_setContext(types.j_expr);
  _Parser_this.state.canStartJSXElement = true;
  _UtilParser_expect(8);
  return _Parser_finishNode_dynamic(node, "JSXSpreadChild");
}
function _jsx_jsxParseExpressionContainer(node, previousContext) {
  if (_Tokenizer_match(8)) {
    node.expression = _jsx_jsxParseEmptyExpression();
  } else {
    const expression = _ExpressionParser_parseExpression();
    node.expression = expression;
  }
  _jsx_setContext(previousContext);
  _Parser_this.state.canStartJSXElement = true;
  _UtilParser_expect(8);
  return _Parser_finishNode_dynamic(node, "JSXExpressionContainer");
}
function _jsx_jsxParseAttribute() {
  const node = _NodeUtils_startNode();
  if (_Tokenizer_match(5)) {
    _jsx_setContext(types.brace);
    _Tokenizer_next();
    _UtilParser_expect(21);
    node.argument = _ExpressionParser_parseMaybeAssignAllowIn();
    _jsx_setContext(types.j_oTag);
    _Parser_this.state.canStartJSXElement = true;
    _UtilParser_expect(8);
    return _Parser_finishNode_dynamic(node, "JSXSpreadAttribute");
  }
  node.name = _jsx_jsxParseNamespacedName();
  node.value = _Tokenizer_eat(29) ? _jsx_jsxParseAttributeValue() : null;
  return _Parser_finishNode_dynamic(node, "JSXAttribute");
}
function _jsx_jsxParseOpeningElementAt(startLoc) {
  const node = _NodeUtils_startNodeAt(startLoc);
  if (_Tokenizer_eat(144)) {
    return _Parser_finishNode_dynamic(node, "JSXOpeningFragment");
  }
  node.name = _jsx_jsxParseElementName();
  return _Parser_jsxParseOpeningElementAfterName_dynamic(node);
}
function _jsx_jsxParseOpeningElementAfterName(__super, node) {
  const attributes = [];
  while (!_Tokenizer_match(56) && !_Tokenizer_match(144)) {
    attributes.push(_jsx_jsxParseAttribute());
  }
  node.attributes = attributes;
  node.selfClosing = _Tokenizer_eat(56);
  _UtilParser_expect(144);
  return _Parser_finishNode_dynamic(node, "JSXOpeningElement");
}
function _jsx_jsxParseClosingElementAt(startLoc) {
  const node = _NodeUtils_startNodeAt(startLoc);
  if (_Tokenizer_eat(144)) {
    return _Parser_finishNode_dynamic(node, "JSXClosingFragment");
  }
  node.name = _jsx_jsxParseElementName();
  _UtilParser_expect(144);
  return _Parser_finishNode_dynamic(node, "JSXClosingElement");
}
function _jsx_jsxParseElementAt(startLoc) {
  const node = _NodeUtils_startNodeAt(startLoc);
  const children = [];
  const openingElement = _jsx_jsxParseOpeningElementAt(startLoc);
  let closingElement = null;
  if (!openingElement.selfClosing) {
    contents: for (;;) {
      switch (_Parser_this.state.type) {
        case 143:
          startLoc = _Parser_this.state.startLoc;
          _Tokenizer_next();
          if (_Tokenizer_eat(56)) {
            closingElement = _jsx_jsxParseClosingElementAt(startLoc);
            break contents;
          }
          children.push(_jsx_jsxParseElementAt(startLoc));
          break;
        case 142:
          children.push(_Parser_parseLiteral_dynamic(_Parser_this.state.value, "JSXText"));
          break;
        case 5:
          {
            const node = _NodeUtils_startNode();
            _jsx_setContext(types.brace);
            _Tokenizer_next();
            if (_Tokenizer_match(21)) {
              children.push(_jsx_jsxParseSpreadChild(node));
            } else {
              children.push(_jsx_jsxParseExpressionContainer(node, types.j_expr));
            }
            break;
          }
        default:
          _Tokenizer_unexpected();
      }
    }
    if (isFragment(openingElement) && !isFragment(closingElement) && closingElement !== null) {
      _Tokenizer_raise(JsxErrors.MissingClosingTagFragment, closingElement);
    } else if (!isFragment(openingElement) && isFragment(closingElement)) {
      _Tokenizer_raise(JsxErrors.MissingClosingTagElement, closingElement, {
        openingTagName: getQualifiedJSXName(openingElement.name)
      });
    } else if (!isFragment(openingElement) && !isFragment(closingElement)) {
      if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
        _Tokenizer_raise(JsxErrors.MissingClosingTagElement, closingElement, {
          openingTagName: getQualifiedJSXName(openingElement.name)
        });
      }
    }
  }
  if (isFragment(openingElement)) {
    node.openingFragment = openingElement;
    node.closingFragment = closingElement;
  } else {
    node.openingElement = openingElement;
    node.closingElement = closingElement;
  }
  node.children = children;
  if (_Tokenizer_match(47)) {
    throw _Tokenizer_raise(JsxErrors.UnwrappedAdjacentJSXElements, _Parser_this.state.startLoc);
  }
  return isFragment(openingElement) ? _Parser_finishNode_dynamic(node, "JSXFragment") : _Parser_finishNode_dynamic(node, "JSXElement");
}
function _jsx_jsxParseElement() {
  const startLoc = _Parser_this.state.startLoc;
  _Tokenizer_next();
  return _jsx_jsxParseElementAt(startLoc);
}
function _jsx_setContext(newContext) {
  const {
    context
  } = _Parser_this.state;
  context[context.length - 1] = newContext;
}
function _jsx_parseExprAtom(__super, refExpressionErrors) {
  if (_Tokenizer_match(143)) {
    return _jsx_jsxParseElement();
  } else if (_Tokenizer_match(47) && _Parser_this.input.charCodeAt(_Parser_this.state.pos) !== 33) {
    _Tokenizer_replaceToken(143);
    return _jsx_jsxParseElement();
  } else {
    return __super(refExpressionErrors);
  }
}
function _jsx_skipSpace(__super) {
  const curContext = _Tokenizer_curContext();
  if (!curContext.preserveSpace) __super();
}
function _jsx_getTokenFromCode(__super, code) {
  const context = _Tokenizer_curContext();
  if (context === types.j_expr) {
    _jsx_jsxReadToken();
    return;
  }
  if (context === types.j_oTag || context === types.j_cTag) {
    if (isIdentifierStart(code)) {
      _jsx_jsxReadWord();
      return;
    }
    if (code === 62) {
      ++_Parser_this.state.pos;
      _Parser_finishToken_dynamic(144);
      return;
    }
    if ((code === 34 || code === 39) && context === types.j_oTag) {
      _jsx_jsxReadString(code);
      return;
    }
  }
  if (code === 60 && _Parser_this.state.canStartJSXElement && _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1) !== 33) {
    ++_Parser_this.state.pos;
    _Parser_finishToken_dynamic(143);
    return;
  }
  __super(code);
}
function _jsx_updateContext(__super, prevType) {
  const {
    context,
    type
  } = _Parser_this.state;
  if (type === 56 && prevType === 143) {
    context.splice(-2, 2, types.j_cTag);
    _Parser_this.state.canStartJSXElement = false;
  } else if (type === 143) {
    context.push(types.j_oTag);
  } else if (type === 144) {
    const out = context[context.length - 1];
    if (out === types.j_oTag && prevType === 56 || out === types.j_cTag) {
      context.pop();
      _Parser_this.state.canStartJSXElement = context[context.length - 1] === types.j_expr;
    } else {
      _jsx_setContext(types.j_expr);
      _Parser_this.state.canStartJSXElement = true;
    }
  } else {
    _Parser_this.state.canStartJSXElement = tokenComesBeforeExpression(type);
  }
}
function _estree_parse(__super) {
  const file = toESTreeLocation(__super());
  if (_Parser_this.optionFlags & 256) {
    file.tokens = file.tokens.map(toESTreeLocation);
  }
  return file;
}
function _estree_parseRegExpLiteral(__super, {
  pattern,
  flags
}) {
  let regex = null;
  try {
    regex = new RegExp(pattern, flags);
  } catch (_) {}
  const node = _estree_estreeParseLiteral(regex);
  node.regex = {
    pattern,
    flags
  };
  return node;
}
function _estree_parseBigIntLiteral(__super, value) {
  let bigInt;
  try {
    bigInt = BigInt(value);
  } catch (_unused) {
    bigInt = null;
  }
  const node = _estree_estreeParseLiteral(bigInt);
  node.bigint = String(node.value || value);
  return node;
}
function _estree_parseDecimalLiteral(__super, value) {
  const decimal = null;
  const node = _estree_estreeParseLiteral(decimal);
  node.decimal = String(node.value || value);
  return node;
}
function _estree_estreeParseLiteral(value) {
  return _Parser_parseLiteral_dynamic(value, "Literal");
}
function _estree_parseStringLiteral(__super, value) {
  return _estree_estreeParseLiteral(value);
}
function _estree_parseNumericLiteral(__super, value) {
  return _estree_estreeParseLiteral(value);
}
function _estree_parseNullLiteral(__super) {
  return _estree_estreeParseLiteral(null);
}
function _estree_parseBooleanLiteral(__super, value) {
  return _estree_estreeParseLiteral(value);
}
function _estree_estreeParseChainExpression(node, endLoc) {
  const chain = _NodeUtils_startNodeAtNode(node);
  chain.expression = node;
  return _Parser_finishNodeAt_dynamic(chain, "ChainExpression", endLoc);
}
function _estree_directiveToStmt(directive) {
  const expression = directive.value;
  delete directive.value;
  _Parser_castNodeTo_dynamic(expression, "Literal");
  expression.raw = expression.extra.raw;
  expression.value = expression.extra.expressionValue;
  const stmt = _Parser_castNodeTo_dynamic(directive, "ExpressionStatement");
  stmt.expression = expression;
  stmt.directive = expression.extra.rawValue;
  delete expression.extra;
  return stmt;
}
function _estree_fillOptionalPropertiesForTSESLint(__super, node) {}
function _estree_cloneEstreeStringLiteral(node) {
  const {
    start,
    end,
    loc,
    range,
    raw,
    value
  } = node;
  const cloned = Object.create(node.constructor.prototype);
  cloned.type = "Literal";
  cloned.start = start;
  cloned.end = end;
  cloned.loc = loc;
  cloned.range = range;
  cloned.raw = raw;
  cloned.value = value;
  return cloned;
}
function _estree_initFunction(__super, node, isAsync) {
  __super(node, isAsync);
  node.expression = false;
}
function _estree_checkDeclaration(__super, node) {
  if (node != null && _Parser_isObjectProperty_dynamic(node)) {
    _Parser_checkDeclaration_dynamic(node.value);
  } else {
    __super(node);
  }
}
function _estree_getObjectOrClassMethodParams(__super, method) {
  return method.value.params;
}
function _estree_isValidDirective(__super, stmt) {
  var _stmt$expression$extr;
  return stmt.type === "ExpressionStatement" && stmt.expression.type === "Literal" && typeof stmt.expression.value === "string" && !((_stmt$expression$extr = stmt.expression.extra) != null && _stmt$expression$extr.parenthesized);
}
function _estree_parseBlockBody(__super, node, allowDirectives, topLevel, end, afterBlockParse) {
  __super(node, allowDirectives, topLevel, end, afterBlockParse);
  const directiveStatements = node.directives.map(d => _estree_directiveToStmt(d));
  node.body = directiveStatements.concat(node.body);
  delete node.directives;
}
function _estree_parsePrivateName(__super) {
  const node = __super();
  {
    if (!_BaseParser_getPluginOption("estree", "classFeatures")) {
      return node;
    }
  }
  return _estree_convertPrivateNameToPrivateIdentifier(node);
}
function _estree_convertPrivateNameToPrivateIdentifier(node) {
  const name = _UtilParser_getPrivateNameSV(node);
  node = node;
  delete node.id;
  node.name = name;
  return _Parser_castNodeTo_dynamic(node, "PrivateIdentifier");
}
function _estree_isPrivateName(__super, node) {
  {
    if (!_BaseParser_getPluginOption("estree", "classFeatures")) {
      return __super(node);
    }
  }
  return node.type === "PrivateIdentifier";
}
function _estree_getPrivateNameSV(__super, node) {
  {
    if (!_BaseParser_getPluginOption("estree", "classFeatures")) {
      return __super(node);
    }
  }
  return node.name;
}
function _estree_parseLiteral(__super, value, type) {
  const node = __super(value, type);
  node.raw = node.extra.raw;
  delete node.extra;
  return node;
}
function _estree_parseFunctionBody(__super, node, allowExpression, isMethod = false) {
  __super(node, allowExpression, isMethod);
  node.expression = node.body.type !== "BlockStatement";
}
function _estree_parseMethod(__super, node, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope = false) {
  let funcNode = _NodeUtils_startNode();
  funcNode.kind = node.kind;
  funcNode = __super(funcNode, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope);
  delete funcNode.kind;
  const {
    typeParameters
  } = node;
  if (typeParameters) {
    delete node.typeParameters;
    funcNode.typeParameters = typeParameters;
    _NodeUtils_resetStartLocationFromNode(funcNode, typeParameters);
  }
  const valueNode = _Parser_castNodeTo_dynamic(funcNode, "FunctionExpression");
  node.value = valueNode;
  if (type === "ClassPrivateMethod") {
    node.computed = false;
  }
  if (type === "ObjectMethod") {
    if (node.kind === "method") {
      node.kind = "init";
    }
    node.shorthand = false;
    return _Parser_finishNode_dynamic(node, "Property");
  } else {
    return _Parser_finishNode_dynamic(node, "MethodDefinition");
  }
}
function _estree_nameIsConstructor(__super, key) {
  if (key.type === "Literal") return key.value === "constructor";
  return __super(key);
}
function _estree_parseClassProperty(__super, ...args) {
  const propertyNode = __super(...args);
  {
    if (!_BaseParser_getPluginOption("estree", "classFeatures")) {
      return propertyNode;
    }
  }
  {
    _Parser_castNodeTo_dynamic(propertyNode, "PropertyDefinition");
  }
  return propertyNode;
}
function _estree_parseClassPrivateProperty(__super, ...args) {
  const propertyNode = __super(...args);
  {
    if (!_BaseParser_getPluginOption("estree", "classFeatures")) {
      return propertyNode;
    }
  }
  {
    _Parser_castNodeTo_dynamic(propertyNode, "PropertyDefinition");
  }
  propertyNode.computed = false;
  return propertyNode;
}
function _estree_parseClassAccessorProperty(__super, node) {
  const accessorPropertyNode = __super(node);
  {
    if (!_BaseParser_getPluginOption("estree", "classFeatures")) {
      return accessorPropertyNode;
    }
  }
  if (accessorPropertyNode.abstract && _BaseParser_hasPlugin("typescript")) {
    delete accessorPropertyNode.abstract;
    _Parser_castNodeTo_dynamic(accessorPropertyNode, "TSAbstractAccessorProperty");
  } else {
    _Parser_castNodeTo_dynamic(accessorPropertyNode, "AccessorProperty");
  }
  return accessorPropertyNode;
}
function _estree_parseObjectProperty(__super, prop, startLoc, isPattern, refExpressionErrors) {
  const node = __super(prop, startLoc, isPattern, refExpressionErrors);
  if (node) {
    node.kind = "init";
    _Parser_castNodeTo_dynamic(node, "Property");
  }
  return node;
}
function _estree_finishObjectProperty(__super, node) {
  node.kind = "init";
  return _Parser_finishNode_dynamic(node, "Property");
}
function _estree_isValidLVal(__super, type, isUnparenthesizedInAssign, binding) {
  return type === "Property" ? "value" : __super(type, isUnparenthesizedInAssign, binding);
}
function _estree_isAssignable(__super, node, isBinding) {
  if (node != null && _Parser_isObjectProperty_dynamic(node)) {
    return _Parser_isAssignable_dynamic(node.value, isBinding);
  }
  return __super(node, isBinding);
}
function _estree_toAssignable(__super, node, isLHS = false) {
  if (node != null && _Parser_isObjectProperty_dynamic(node)) {
    const {
      key,
      value
    } = node;
    if (_Parser_isPrivateName_dynamic(key)) {
      _Parser_this.classScope.usePrivateName(_Parser_getPrivateNameSV_dynamic(key), key.loc.start);
    }
    _Parser_toAssignable_dynamic(value, isLHS);
  } else {
    __super(node, isLHS);
  }
}
function _estree_toAssignableObjectExpressionProp(__super, prop, isLast, isLHS) {
  if (prop.type === "Property" && (prop.kind === "get" || prop.kind === "set")) {
    _Tokenizer_raise(Errors.PatternHasAccessor, prop.key);
  } else if (prop.type === "Property" && prop.method) {
    _Tokenizer_raise(Errors.PatternHasMethod, prop.key);
  } else {
    __super(prop, isLast, isLHS);
  }
}
function _estree_finishCallExpression(__super, unfinished, optional) {
  const node = __super(unfinished, optional);
  if (node.callee.type === "Import") {
    var _ref, _ref2;
    _Parser_castNodeTo_dynamic(node, "ImportExpression");
    node.source = node.arguments[0];
    node.options = (_ref = node.arguments[1]) != null ? _ref : null;
    node.attributes = (_ref2 = node.arguments[1]) != null ? _ref2 : null;
    delete node.arguments;
    delete node.callee;
  } else if (node.type === "OptionalCallExpression") {
    _Parser_castNodeTo_dynamic(node, "CallExpression");
  } else {
    node.optional = false;
  }
  return node;
}
function _estree_toReferencedArguments(__super, node) {
  if (node.type === "ImportExpression") {
    return;
  }
  __super(node);
}
function _estree_parseExport(__super, unfinished, decorators) {
  const exportStartLoc = _Parser_this.state.lastTokStartLoc;
  const node = __super(unfinished, decorators);
  switch (node.type) {
    case "ExportAllDeclaration":
      node.exported = null;
      break;
    case "ExportNamedDeclaration":
      if (node.specifiers.length === 1 && node.specifiers[0].type === "ExportNamespaceSpecifier") {
        _Parser_castNodeTo_dynamic(node, "ExportAllDeclaration");
        node.exported = node.specifiers[0].exported;
        delete node.specifiers;
      }
    case "ExportDefaultDeclaration":
      {
        var _declaration$decorato;
        const {
          declaration
        } = node;
        if ((declaration == null ? void 0 : declaration.type) === "ClassDeclaration" && ((_declaration$decorato = declaration.decorators) == null ? void 0 : _declaration$decorato.length) > 0 && declaration.start === node.start) {
          _Parser_resetStartLocation_dynamic(node, exportStartLoc);
        }
      }
      break;
  }
  return node;
}
function _estree_stopParseSubscript(__super, base, state) {
  const node = __super(base, state);
  if (state.optionalChainMember) {
    return _estree_estreeParseChainExpression(node, base.loc.end);
  }
  return node;
}
function _estree_parseMember(__super, base, startLoc, state, computed, optional) {
  const node = __super(base, startLoc, state, computed, optional);
  if (node.type === "OptionalMemberExpression") {
    _Parser_castNodeTo_dynamic(node, "MemberExpression");
  } else {
    node.optional = false;
  }
  return node;
}
function _estree_isOptionalMemberExpression(__super, node) {
  if (node.type === "ChainExpression") {
    return node.expression.type === "MemberExpression";
  }
  return __super(node);
}
function _estree_hasPropertyAsPrivateName(__super, node) {
  if (node.type === "ChainExpression") {
    node = node.expression;
  }
  return __super(node);
}
function _estree_isObjectProperty(__super, node) {
  return node.type === "Property" && node.kind === "init" && !node.method;
}
function _estree_isObjectMethod(__super, node) {
  return node.type === "Property" && (node.method || node.kind === "get" || node.kind === "set");
}
function _estree_castNodeTo(__super, node, type) {
  const result = __super(node, type);
  _Parser_fillOptionalPropertiesForTSESLint_dynamic(result);
  return result;
}
function _estree_cloneIdentifier(__super, node) {
  const cloned = __super(node);
  _Parser_fillOptionalPropertiesForTSESLint_dynamic(cloned);
  return cloned;
}
function _estree_cloneStringLiteral(__super, node) {
  if (node.type === "Literal") {
    return _estree_cloneEstreeStringLiteral(node);
  }
  return __super(node);
}
function _estree_finishNodeAt(__super, node, type, endLoc) {
  return toESTreeLocation(__super(node, type, endLoc));
}
function _estree_finishNode(__super, node, type) {
  const result = __super(node, type);
  _Parser_fillOptionalPropertiesForTSESLint_dynamic(result);
  return result;
}
function _estree_resetStartLocation(__super, node, startLoc) {
  __super(node, startLoc);
  toESTreeLocation(node);
}
function _estree_resetEndLocation(__super, node, endLoc = _Parser_this.state.lastTokEndLoc) {
  __super(node, endLoc);
  toESTreeLocation(node);
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
class Position {
  constructor(line, col, index) {
    this.line = void 0;
    this.column = void 0;
    this.index = void 0;
    this.line = line;
    this.column = col;
    this.index = index;
  }
}
class SourceLocation {
  constructor(start, end) {
    this.start = void 0;
    this.end = void 0;
    this.filename = void 0;
    this.identifierName = void 0;
    this.start = start;
    this.end = end;
  }
}
function createPositionWithColumnOffset(position, columnOffset) {
  const {
    line,
    column,
    index
  } = position;
  return new Position(line, column + columnOffset, index + columnOffset);
}
const code = "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED";
var ModuleErrors = {
  ImportMetaOutsideModule: {
    message: `import.meta may appear only with 'sourceType: "module"'`,
    code
  },
  ImportOutsideModule: {
    message: `'import' and 'export' may appear only with 'sourceType: "module"'`,
    code
  }
};
const NodeDescriptions = {
  ArrayPattern: "array destructuring pattern",
  AssignmentExpression: "assignment expression",
  AssignmentPattern: "assignment expression",
  ArrowFunctionExpression: "arrow function expression",
  ConditionalExpression: "conditional expression",
  CatchClause: "catch clause",
  ForOfStatement: "for-of statement",
  ForInStatement: "for-in statement",
  ForStatement: "for-loop",
  FormalParameters: "function parameter list",
  Identifier: "identifier",
  ImportSpecifier: "import specifier",
  ImportDefaultSpecifier: "import default specifier",
  ImportNamespaceSpecifier: "import namespace specifier",
  ObjectPattern: "object destructuring pattern",
  ParenthesizedExpression: "parenthesized expression",
  RestElement: "rest element",
  UpdateExpression: {
    true: "prefix operation",
    false: "postfix operation"
  },
  VariableDeclarator: "variable declaration",
  YieldExpression: "yield expression"
};
const toNodeDescription = node => node.type === "UpdateExpression" ? NodeDescriptions.UpdateExpression[`${node.prefix}`] : NodeDescriptions[node.type];
var StandardErrors = {
  AccessorIsGenerator: ({
    kind
  }) => `A ${kind}ter cannot be a generator.`,
  ArgumentsInClass: "'arguments' is only allowed in functions and class methods.",
  AsyncFunctionInSingleStatementContext: "Async functions can only be declared at the top level or inside a block.",
  AwaitBindingIdentifier: "Can not use 'await' as identifier inside an async function.",
  AwaitBindingIdentifierInStaticBlock: "Can not use 'await' as identifier inside a static block.",
  AwaitExpressionFormalParameter: "'await' is not allowed in async function parameters.",
  AwaitUsingNotInAsyncContext: "'await using' is only allowed within async functions and at the top levels of modules.",
  AwaitNotInAsyncContext: "'await' is only allowed within async functions and at the top levels of modules.",
  BadGetterArity: "A 'get' accessor must not have any formal parameters.",
  BadSetterArity: "A 'set' accessor must have exactly one formal parameter.",
  BadSetterRestParameter: "A 'set' accessor function argument must not be a rest parameter.",
  ConstructorClassField: "Classes may not have a field named 'constructor'.",
  ConstructorClassPrivateField: "Classes may not have a private field named '#constructor'.",
  ConstructorIsAccessor: "Class constructor may not be an accessor.",
  ConstructorIsAsync: "Constructor can't be an async function.",
  ConstructorIsGenerator: "Constructor can't be a generator.",
  DeclarationMissingInitializer: ({
    kind
  }) => `Missing initializer in ${kind} declaration.`,
  DecoratorArgumentsOutsideParentheses: "Decorator arguments must be moved inside parentheses: use '@(decorator(args))' instead of '@(decorator)(args)'.",
  DecoratorBeforeExport: "Decorators must be placed *before* the 'export' keyword. Remove the 'decoratorsBeforeExport: true' option to use the 'export @decorator class {}' syntax.",
  DecoratorsBeforeAfterExport: "Decorators can be placed *either* before or after the 'export' keyword, but not in both locations at the same time.",
  DecoratorConstructor: "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
  DecoratorExportClass: "Decorators must be placed *after* the 'export' keyword. Remove the 'decoratorsBeforeExport: false' option to use the '@decorator export class {}' syntax.",
  DecoratorSemicolon: "Decorators must not be followed by a semicolon.",
  DecoratorStaticBlock: "Decorators can't be used with a static block.",
  DeferImportRequiresNamespace: 'Only `import defer * as x from "./module"` is valid.',
  DeletePrivateField: "Deleting a private field is not allowed.",
  DestructureNamedImport: "ES2015 named imports do not destructure. Use another statement for destructuring after the import.",
  DuplicateConstructor: "Duplicate constructor in the same class.",
  DuplicateDefaultExport: "Only one default export allowed per module.",
  DuplicateExport: ({
    exportName
  }) => `\`${exportName}\` has already been exported. Exported identifiers must be unique.`,
  DuplicateProto: "Redefinition of __proto__ property.",
  DuplicateRegExpFlags: "Duplicate regular expression flag.",
  ElementAfterRest: "Rest element must be last element.",
  EscapedCharNotAnIdentifier: "Invalid Unicode escape.",
  ExportBindingIsString: ({
    localName,
    exportName
  }) => `A string literal cannot be used as an exported binding without \`from\`.\n- Did you mean \`export { '${localName}' as '${exportName}' } from 'some-module'\`?`,
  ExportDefaultFromAsIdentifier: "'from' is not allowed as an identifier after 'export default'.",
  ForInOfLoopInitializer: ({
    type
  }) => `'${type === "ForInStatement" ? "for-in" : "for-of"}' loop variable declaration may not have an initializer.`,
  ForInUsing: "For-in loop may not start with 'using' declaration.",
  ForOfAsync: "The left-hand side of a for-of loop may not be 'async'.",
  ForOfLet: "The left-hand side of a for-of loop may not start with 'let'.",
  GeneratorInSingleStatementContext: "Generators can only be declared at the top level or inside a block.",
  IllegalBreakContinue: ({
    type
  }) => `Unsyntactic ${type === "BreakStatement" ? "break" : "continue"}.`,
  IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list.",
  IllegalReturn: "'return' outside of function.",
  ImportAttributesUseAssert: "The `assert` keyword in import attributes is deprecated and it has been replaced by the `with` keyword. You can enable the `deprecatedImportAssert` parser plugin to suppress this error.",
  ImportBindingIsString: ({
    importName
  }) => `A string literal cannot be used as an imported binding.\n- Did you mean \`import { "${importName}" as foo }\`?`,
  ImportCallArity: `\`import()\` requires exactly one or two arguments.`,
  ImportCallNotNewExpression: "Cannot use new with import(...).",
  ImportCallSpreadArgument: "`...` is not allowed in `import()`.",
  ImportJSONBindingNotDefault: "A JSON module can only be imported with `default`.",
  ImportReflectionHasAssertion: "`import module x` cannot have assertions.",
  ImportReflectionNotBinding: 'Only `import module x from "./module"` is valid.',
  IncompatibleRegExpUVFlags: "The 'u' and 'v' regular expression flags cannot be enabled at the same time.",
  InvalidBigIntLiteral: "Invalid BigIntLiteral.",
  InvalidCodePoint: "Code point out of bounds.",
  InvalidCoverInitializedName: "Invalid shorthand property initializer.",
  InvalidDecimal: "Invalid decimal.",
  InvalidDigit: ({
    radix
  }) => `Expected number in radix ${radix}.`,
  InvalidEscapeSequence: "Bad character escape sequence.",
  InvalidEscapeSequenceTemplate: "Invalid escape sequence in template.",
  InvalidEscapedReservedWord: ({
    reservedWord
  }) => `Escape sequence in keyword ${reservedWord}.`,
  InvalidIdentifier: ({
    identifierName
  }) => `Invalid identifier ${identifierName}.`,
  InvalidLhs: ({
    ancestor
  }) => `Invalid left-hand side in ${toNodeDescription(ancestor)}.`,
  InvalidLhsBinding: ({
    ancestor
  }) => `Binding invalid left-hand side in ${toNodeDescription(ancestor)}.`,
  InvalidLhsOptionalChaining: ({
    ancestor
  }) => `Invalid optional chaining in the left-hand side of ${toNodeDescription(ancestor)}.`,
  InvalidNumber: "Invalid number.",
  InvalidOrMissingExponent: "Floating-point numbers require a valid exponent after the 'e'.",
  InvalidOrUnexpectedToken: ({
    unexpected
  }) => `Unexpected character '${unexpected}'.`,
  InvalidParenthesizedAssignment: "Invalid parenthesized assignment pattern.",
  InvalidPrivateFieldResolution: ({
    identifierName
  }) => `Private name #${identifierName} is not defined.`,
  InvalidPropertyBindingPattern: "Binding member expression.",
  InvalidRecordProperty: "Only properties and spread elements are allowed in record definitions.",
  InvalidRestAssignmentPattern: "Invalid rest operator's argument.",
  LabelRedeclaration: ({
    labelName
  }) => `Label '${labelName}' is already declared.`,
  LetInLexicalBinding: "'let' is disallowed as a lexically bound name.",
  LineTerminatorBeforeArrow: "No line break is allowed before '=>'.",
  MalformedRegExpFlags: "Invalid regular expression flag.",
  MissingClassName: "A class name is required.",
  MissingEqInAssignment: "Only '=' operator can be used for specifying default value.",
  MissingSemicolon: "Missing semicolon.",
  MissingPlugin: ({
    missingPlugin
  }) => `This experimental syntax requires enabling the parser plugin: ${missingPlugin.map(name => JSON.stringify(name)).join(", ")}.`,
  MissingOneOfPlugins: ({
    missingPlugin
  }) => `This experimental syntax requires enabling one of the following parser plugin(s): ${missingPlugin.map(name => JSON.stringify(name)).join(", ")}.`,
  MissingUnicodeEscape: "Expecting Unicode escape sequence \\uXXXX.",
  MixingCoalesceWithLogical: "Nullish coalescing operator(??) requires parens when mixing with logical operators.",
  ModuleAttributeDifferentFromType: "The only accepted module attribute is `type`.",
  ModuleAttributeInvalidValue: "Only string literals are allowed as module attribute values.",
  ModuleAttributesWithDuplicateKeys: ({
    key
  }) => `Duplicate key "${key}" is not allowed in module attributes.`,
  ModuleExportNameHasLoneSurrogate: ({
    surrogateCharCode
  }) => `An export name cannot include a lone surrogate, found '\\u${surrogateCharCode.toString(16)}'.`,
  ModuleExportUndefined: ({
    localName
  }) => `Export '${localName}' is not defined.`,
  MultipleDefaultsInSwitch: "Multiple default clauses.",
  NewlineAfterThrow: "Illegal newline after throw.",
  NoCatchOrFinally: "Missing catch or finally clause.",
  NumberIdentifier: "Identifier directly after number.",
  NumericSeparatorInEscapeSequence: "Numeric separators are not allowed inside unicode escape sequences or hex escape sequences.",
  ObsoleteAwaitStar: "'await*' has been removed from the async functions proposal. Use Promise.all() instead.",
  OptionalChainingNoNew: "Constructors in/after an Optional Chain are not allowed.",
  OptionalChainingNoTemplate: "Tagged Template Literals are not allowed in optionalChain.",
  OverrideOnConstructor: "'override' modifier cannot appear on a constructor declaration.",
  ParamDupe: "Argument name clash.",
  PatternHasAccessor: "Object pattern can't contain getter or setter.",
  PatternHasMethod: "Object pattern can't contain methods.",
  PrivateInExpectedIn: ({
    identifierName
  }) => `Private names are only allowed in property accesses (\`obj.#${identifierName}\`) or in \`in\` expressions (\`#${identifierName} in obj\`).`,
  PrivateNameRedeclaration: ({
    identifierName
  }) => `Duplicate private name #${identifierName}.`,
  RecordExpressionBarIncorrectEndSyntaxType: "Record expressions ending with '|}' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
  RecordExpressionBarIncorrectStartSyntaxType: "Record expressions starting with '{|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
  RecordExpressionHashIncorrectStartSyntaxType: "Record expressions starting with '#{' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'.",
  RecordNoProto: "'__proto__' is not allowed in Record expressions.",
  RestTrailingComma: "Unexpected trailing comma after rest element.",
  SloppyFunction: "In non-strict mode code, functions can only be declared at top level or inside a block.",
  SloppyFunctionAnnexB: "In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement.",
  SourcePhaseImportRequiresDefault: 'Only `import source x from "./module"` is valid.',
  StaticPrototype: "Classes may not have static property named prototype.",
  SuperNotAllowed: "`super()` is only valid inside a class constructor of a subclass. Maybe a typo in the method name ('constructor') or not extending another class?",
  SuperPrivateField: "Private fields can't be accessed on super.",
  TrailingDecorator: "Decorators must be attached to a class element.",
  TupleExpressionBarIncorrectEndSyntaxType: "Tuple expressions ending with '|]' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
  TupleExpressionBarIncorrectStartSyntaxType: "Tuple expressions starting with '[|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
  TupleExpressionHashIncorrectStartSyntaxType: "Tuple expressions starting with '#[' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'.",
  UnexpectedArgumentPlaceholder: "Unexpected argument placeholder.",
  UnexpectedAwaitAfterPipelineBody: 'Unexpected "await" after pipeline body; await must have parentheses in minimal proposal.',
  UnexpectedDigitAfterHash: "Unexpected digit after hash token.",
  UnexpectedImportExport: "'import' and 'export' may only appear at the top level.",
  UnexpectedKeyword: ({
    keyword
  }) => `Unexpected keyword '${keyword}'.`,
  UnexpectedLeadingDecorator: "Leading decorators must be attached to a class declaration.",
  UnexpectedLexicalDeclaration: "Lexical declaration cannot appear in a single-statement context.",
  UnexpectedNewTarget: "`new.target` can only be used in functions or class properties.",
  UnexpectedNumericSeparator: "A numeric separator is only allowed between two digits.",
  UnexpectedPrivateField: "Unexpected private name.",
  UnexpectedReservedWord: ({
    reservedWord
  }) => `Unexpected reserved word '${reservedWord}'.`,
  UnexpectedSuper: "'super' is only allowed in object methods and classes.",
  UnexpectedToken: ({
    expected,
    unexpected
  }) => `Unexpected token${unexpected ? ` '${unexpected}'.` : ""}${expected ? `, expected "${expected}"` : ""}`,
  UnexpectedTokenUnaryExponentiation: "Illegal expression. Wrap left hand side or entire exponentiation in parentheses.",
  UnexpectedUsingDeclaration: "Using declaration cannot appear in the top level when source type is `script`.",
  UnsupportedBind: "Binding should be performed on object property.",
  UnsupportedDecoratorExport: "A decorated export must export a class declaration.",
  UnsupportedDefaultExport: "Only expressions, functions or classes are allowed as the `default` export.",
  UnsupportedImport: "`import` can only be used in `import()` or `import.meta`.",
  UnsupportedMetaProperty: ({
    target,
    onlyValidPropertyName
  }) => `The only valid meta property for ${target} is ${target}.${onlyValidPropertyName}.`,
  UnsupportedParameterDecorator: "Decorators cannot be used to decorate parameters.",
  UnsupportedPropertyDecorator: "Decorators cannot be used to decorate object literal properties.",
  UnsupportedSuper: "'super' can only be used with function calls (i.e. super()) or in property accesses (i.e. super.prop or super[prop]).",
  UnterminatedComment: "Unterminated comment.",
  UnterminatedRegExp: "Unterminated regular expression.",
  UnterminatedString: "Unterminated string constant.",
  UnterminatedTemplate: "Unterminated template.",
  UsingDeclarationExport: "Using declaration cannot be exported.",
  UsingDeclarationHasBindingPattern: "Using declaration cannot have destructuring patterns.",
  VarRedeclaration: ({
    identifierName
  }) => `Identifier '${identifierName}' has already been declared.`,
  YieldBindingIdentifier: "Can not use 'yield' as identifier inside a generator.",
  YieldInParameter: "Yield expression is not allowed in formal parameters.",
  YieldNotInGeneratorFunction: "'yield' is only allowed within generator functions.",
  ZeroDigitNumericSeparator: "Numeric separator can not be used after leading 0."
};
var StrictModeErrors = {
  StrictDelete: "Deleting local variable in strict mode.",
  StrictEvalArguments: ({
    referenceName
  }) => `Assigning to '${referenceName}' in strict mode.`,
  StrictEvalArgumentsBinding: ({
    bindingName
  }) => `Binding '${bindingName}' in strict mode.`,
  StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block.",
  StrictNumericEscape: "The only valid numeric escape in strict mode is '\\0'.",
  StrictOctalLiteral: "Legacy octal literals are not allowed in strict mode.",
  StrictWith: "'with' in strict mode."
};
const UnparenthesizedPipeBodyDescriptions = new Set(["ArrowFunctionExpression", "AssignmentExpression", "ConditionalExpression", "YieldExpression"]);
var PipelineOperatorErrors = Object.assign({
  PipeBodyIsTighter: "Unexpected yield after pipeline body; any yield expression acting as Hack-style pipe body must be parenthesized due to its loose operator precedence.",
  PipeTopicRequiresHackPipes: 'Topic reference is used, but the pipelineOperator plugin was not passed a "proposal": "hack" or "smart" option.',
  PipeTopicUnbound: "Topic reference is unbound; it must be inside a pipe body.",
  PipeTopicUnconfiguredToken: ({
    token
  }) => `Invalid topic token ${token}. In order to use ${token} as a topic reference, the pipelineOperator plugin must be configured with { "proposal": "hack", "topicToken": "${token}" }.`,
  PipeTopicUnused: "Hack-style pipe body does not contain a topic reference; Hack-style pipes must use topic at least once.",
  PipeUnparenthesizedBody: ({
    type
  }) => `Hack-style pipe body cannot be an unparenthesized ${toNodeDescription({
    type
  })}; please wrap it in parentheses.`
}, {
  PipelineBodyNoArrow: 'Unexpected arrow "=>" after pipeline body; arrow function in pipeline body must be parenthesized.',
  PipelineBodySequenceExpression: "Pipeline body may not be a comma-separated sequence expression.",
  PipelineHeadSequenceExpression: "Pipeline head should not be a comma-separated sequence expression.",
  PipelineTopicUnused: "Pipeline is in topic style but does not use topic reference.",
  PrimaryTopicNotAllowed: "Topic reference was used in a lexical context without topic binding.",
  PrimaryTopicRequiresSmartPipeline: 'Topic reference is used, but the pipelineOperator plugin was not passed a "proposal": "hack" or "smart" option.'
});
const _excluded = ["message"];
function defineHidden(obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: false,
    configurable: true,
    value
  });
}
function toParseErrorConstructor({
  toMessage,
  code,
  reasonCode,
  syntaxPlugin
}) {
  const hasMissingPlugin = reasonCode === "MissingPlugin" || reasonCode === "MissingOneOfPlugins";
  {
    const oldReasonCodes = {
      AccessorCannotDeclareThisParameter: "AccesorCannotDeclareThisParameter",
      AccessorCannotHaveTypeParameters: "AccesorCannotHaveTypeParameters",
      ConstInitializerMustBeStringOrNumericLiteralOrLiteralEnumReference: "ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference",
      SetAccessorCannotHaveOptionalParameter: "SetAccesorCannotHaveOptionalParameter",
      SetAccessorCannotHaveRestParameter: "SetAccesorCannotHaveRestParameter",
      SetAccessorCannotHaveReturnType: "SetAccesorCannotHaveReturnType"
    };
    if (oldReasonCodes[reasonCode]) {
      reasonCode = oldReasonCodes[reasonCode];
    }
  }
  return function constructor(loc, details) {
    const error = new SyntaxError();
    error.code = code;
    error.reasonCode = reasonCode;
    error.loc = loc;
    error.pos = loc.index;
    error.syntaxPlugin = syntaxPlugin;
    if (hasMissingPlugin) {
      error.missingPlugin = details.missingPlugin;
    }
    defineHidden(error, "clone", function clone(overrides = {}) {
      var _overrides$loc;
      const {
        line,
        column,
        index
      } = (_overrides$loc = overrides.loc) != null ? _overrides$loc : loc;
      return constructor(new Position(line, column, index), Object.assign({}, details, overrides.details));
    });
    defineHidden(error, "details", details);
    Object.defineProperty(error, "message", {
      configurable: true,
      get() {
        const message = `${toMessage(details)} (${loc.line}:${loc.column})`;
        this.message = message;
        return message;
      },
      set(value) {
        Object.defineProperty(this, "message", {
          value,
          writable: true
        });
      }
    });
    return error;
  };
}
function ParseErrorEnum(argument, syntaxPlugin) {
  if (Array.isArray(argument)) {
    return parseErrorTemplates => ParseErrorEnum(parseErrorTemplates, argument[0]);
  }
  const ParseErrorConstructors = {};
  for (const reasonCode of Object.keys(argument)) {
    const template = argument[reasonCode];
    const _ref = typeof template === "string" ? {
        message: () => template
      } : typeof template === "function" ? {
        message: template
      } : template,
      {
        message
      } = _ref,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);
    const toMessage = typeof message === "string" ? () => message : message;
    ParseErrorConstructors[reasonCode] = toParseErrorConstructor(Object.assign({
      code: "BABEL_PARSER_SYNTAX_ERROR",
      reasonCode,
      toMessage
    }, syntaxPlugin ? {
      syntaxPlugin
    } : {}, rest));
  }
  return ParseErrorConstructors;
}
const Errors = Object.assign({}, ParseErrorEnum(ModuleErrors), ParseErrorEnum(StandardErrors), ParseErrorEnum(StrictModeErrors), ParseErrorEnum`pipelineOperator`(PipelineOperatorErrors));
function createDefaultOptions() {
  return {
    sourceType: "script",
    sourceFilename: undefined,
    startIndex: 0,
    startColumn: 0,
    startLine: 1,
    allowAwaitOutsideFunction: false,
    allowReturnOutsideFunction: false,
    allowNewTargetOutsideFunction: false,
    allowImportExportEverywhere: false,
    allowSuperOutsideMethod: false,
    allowUndeclaredExports: false,
    allowYieldOutsideFunction: false,
    plugins: [],
    strictMode: null,
    ranges: false,
    tokens: false,
    createImportExpressions: false,
    createParenthesizedExpressions: false,
    errorRecovery: false,
    attachComment: true,
    annexB: true
  };
}
function getOptions(opts) {
  const options = createDefaultOptions();
  if (opts == null) {
    return options;
  }
  if (opts.annexB != null && opts.annexB !== false) {
    throw new Error("The `annexB` option can only be set to `false`.");
  }
  for (const key of Object.keys(options)) {
    if (opts[key] != null) options[key] = opts[key];
  }
  if (options.startLine === 1) {
    if (opts.startIndex == null && options.startColumn > 0) {
      options.startIndex = options.startColumn;
    } else if (opts.startColumn == null && options.startIndex > 0) {
      options.startColumn = options.startIndex;
    }
  } else if (opts.startColumn == null || opts.startIndex == null) {
    if (opts.startIndex != null) {
      throw new Error("With a `startLine > 1` you must also specify `startIndex` and `startColumn`.");
    }
  }
  return options;
}
const {
  defineProperty
} = Object;
const toUnenumerable = (object, key) => {
  if (object) {
    defineProperty(object, key, {
      enumerable: false,
      value: object[key]
    });
  }
};
function toESTreeLocation(node) {
  toUnenumerable(node.loc.start, "index");
  toUnenumerable(node.loc.end, "index");
  return node;
}
var estree = superClass => class estree extends superClass {
  constructor() {
    super(...arguments);
    _Parser_parse_dynamic = _estree_parse.bind(null, _Parser_parse_dynamic);
    _Parser_parseRegExpLiteral_dynamic = _estree_parseRegExpLiteral.bind(null, _Parser_parseRegExpLiteral_dynamic);
    _Parser_parseBigIntLiteral_dynamic = _estree_parseBigIntLiteral.bind(null, _Parser_parseBigIntLiteral_dynamic);
    _Parser_parseDecimalLiteral_dynamic = _estree_parseDecimalLiteral.bind(null, _Parser_parseDecimalLiteral_dynamic);
    _Parser_parseStringLiteral_dynamic = _estree_parseStringLiteral.bind(null, _Parser_parseStringLiteral_dynamic);
    _Parser_parseNumericLiteral_dynamic = _estree_parseNumericLiteral.bind(null, _Parser_parseNumericLiteral_dynamic);
    _Parser_parseNullLiteral_dynamic = _estree_parseNullLiteral.bind(null, _Parser_parseNullLiteral_dynamic);
    _Parser_parseBooleanLiteral_dynamic = _estree_parseBooleanLiteral.bind(null, _Parser_parseBooleanLiteral_dynamic);
    _Parser_fillOptionalPropertiesForTSESLint_dynamic = _estree_fillOptionalPropertiesForTSESLint.bind(null, _Parser_fillOptionalPropertiesForTSESLint_dynamic);
    _Parser_initFunction_dynamic = _estree_initFunction.bind(null, _Parser_initFunction_dynamic);
    _Parser_checkDeclaration_dynamic = _estree_checkDeclaration.bind(null, _Parser_checkDeclaration_dynamic);
    _Parser_getObjectOrClassMethodParams_dynamic = _estree_getObjectOrClassMethodParams.bind(null, _Parser_getObjectOrClassMethodParams_dynamic);
    _Parser_isValidDirective_dynamic = _estree_isValidDirective.bind(null, _Parser_isValidDirective_dynamic);
    _Parser_parseBlockBody_dynamic = _estree_parseBlockBody.bind(null, _Parser_parseBlockBody_dynamic);
    _Parser_parsePrivateName_dynamic = _estree_parsePrivateName.bind(null, _Parser_parsePrivateName_dynamic);
    _Parser_isPrivateName_dynamic = _estree_isPrivateName.bind(null, _Parser_isPrivateName_dynamic);
    _Parser_getPrivateNameSV_dynamic = _estree_getPrivateNameSV.bind(null, _Parser_getPrivateNameSV_dynamic);
    _Parser_parseLiteral_dynamic = _estree_parseLiteral.bind(null, _Parser_parseLiteral_dynamic);
    _Parser_parseFunctionBody_dynamic = _estree_parseFunctionBody.bind(null, _Parser_parseFunctionBody_dynamic);
    _Parser_parseMethod_dynamic = _estree_parseMethod.bind(null, _Parser_parseMethod_dynamic);
    _Parser_nameIsConstructor_dynamic = _estree_nameIsConstructor.bind(null, _Parser_nameIsConstructor_dynamic);
    _Parser_parseClassProperty_dynamic = _estree_parseClassProperty.bind(null, _Parser_parseClassProperty_dynamic);
    _Parser_parseClassPrivateProperty_dynamic = _estree_parseClassPrivateProperty.bind(null, _Parser_parseClassPrivateProperty_dynamic);
    _Parser_parseClassAccessorProperty_dynamic = _estree_parseClassAccessorProperty.bind(null, _Parser_parseClassAccessorProperty_dynamic);
    _Parser_parseObjectProperty_dynamic = _estree_parseObjectProperty.bind(null, _Parser_parseObjectProperty_dynamic);
    _Parser_finishObjectProperty_dynamic = _estree_finishObjectProperty.bind(null, _Parser_finishObjectProperty_dynamic);
    _Parser_isValidLVal_dynamic = _estree_isValidLVal.bind(null, _Parser_isValidLVal_dynamic);
    _Parser_isAssignable_dynamic = _estree_isAssignable.bind(null, _Parser_isAssignable_dynamic);
    _Parser_toAssignable_dynamic = _estree_toAssignable.bind(null, _Parser_toAssignable_dynamic);
    _Parser_toAssignableObjectExpressionProp_dynamic = _estree_toAssignableObjectExpressionProp.bind(null, _Parser_toAssignableObjectExpressionProp_dynamic);
    _Parser_finishCallExpression_dynamic = _estree_finishCallExpression.bind(null, _Parser_finishCallExpression_dynamic);
    _Parser_toReferencedArguments_dynamic = _estree_toReferencedArguments.bind(null, _Parser_toReferencedArguments_dynamic);
    _Parser_parseExport_dynamic = _estree_parseExport.bind(null, _Parser_parseExport_dynamic);
    _Parser_stopParseSubscript_dynamic = _estree_stopParseSubscript.bind(null, _Parser_stopParseSubscript_dynamic);
    _Parser_parseMember_dynamic = _estree_parseMember.bind(null, _Parser_parseMember_dynamic);
    _Parser_isOptionalMemberExpression_dynamic = _estree_isOptionalMemberExpression.bind(null, _Parser_isOptionalMemberExpression_dynamic);
    _Parser_hasPropertyAsPrivateName_dynamic = _estree_hasPropertyAsPrivateName.bind(null, _Parser_hasPropertyAsPrivateName_dynamic);
    _Parser_isObjectProperty_dynamic = _estree_isObjectProperty.bind(null, _Parser_isObjectProperty_dynamic);
    _Parser_isObjectMethod_dynamic = _estree_isObjectMethod.bind(null, _Parser_isObjectMethod_dynamic);
    _Parser_castNodeTo_dynamic = _estree_castNodeTo.bind(null, _Parser_castNodeTo_dynamic);
    _Parser_cloneIdentifier_dynamic = _estree_cloneIdentifier.bind(null, _Parser_cloneIdentifier_dynamic);
    _Parser_cloneStringLiteral_dynamic = _estree_cloneStringLiteral.bind(null, _Parser_cloneStringLiteral_dynamic);
    _Parser_finishNodeAt_dynamic = _estree_finishNodeAt.bind(null, _Parser_finishNodeAt_dynamic);
    _Parser_finishNode_dynamic = _estree_finishNode.bind(null, _Parser_finishNode_dynamic);
    _Parser_resetStartLocation_dynamic = _estree_resetStartLocation.bind(null, _Parser_resetStartLocation_dynamic);
    _Parser_resetEndLocation_dynamic = _estree_resetEndLocation.bind(null, _Parser_resetEndLocation_dynamic);
  }
};
class TokContext {
  constructor(token, preserveSpace) {
    this.token = void 0;
    this.preserveSpace = void 0;
    this.token = token;
    this.preserveSpace = !!preserveSpace;
  }
}
const types = {
  brace: new TokContext("{"),
  j_oTag: new TokContext("<tag"),
  j_cTag: new TokContext("</tag"),
  j_expr: new TokContext("<tag>...</tag>", true)
};
{
  types.template = new TokContext("`", true);
}
const beforeExpr = true;
const startsExpr = true;
const isLoop = true;
const isAssign = true;
const prefix = true;
const postfix = true;
class ExportedTokenType {
  constructor(label, conf = {}) {
    this.label = void 0;
    this.keyword = void 0;
    this.beforeExpr = void 0;
    this.startsExpr = void 0;
    this.rightAssociative = void 0;
    this.isLoop = void 0;
    this.isAssign = void 0;
    this.prefix = void 0;
    this.postfix = void 0;
    this.binop = void 0;
    this.label = label;
    this.keyword = conf.keyword;
    this.beforeExpr = !!conf.beforeExpr;
    this.startsExpr = !!conf.startsExpr;
    this.rightAssociative = !!conf.rightAssociative;
    this.isLoop = !!conf.isLoop;
    this.isAssign = !!conf.isAssign;
    this.prefix = !!conf.prefix;
    this.postfix = !!conf.postfix;
    this.binop = conf.binop != null ? conf.binop : null;
    {
      this.updateContext = null;
    }
  }
}
const keywords$1 = new Map();
function createKeyword(name, options = {}) {
  options.keyword = name;
  const token = createToken(name, options);
  keywords$1.set(name, token);
  return token;
}
function createBinop(name, binop) {
  return createToken(name, {
    beforeExpr,
    binop
  });
}
let tokenTypeCounter = -1;
const tokenTypes = [];
const tokenLabels = [];
const tokenBinops = [];
const tokenBeforeExprs = [];
const tokenStartsExprs = [];
const tokenPrefixes = [];
function createToken(name, options = {}) {
  var _options$binop, _options$beforeExpr, _options$startsExpr, _options$prefix;
  ++tokenTypeCounter;
  tokenLabels.push(name);
  tokenBinops.push((_options$binop = options.binop) != null ? _options$binop : -1);
  tokenBeforeExprs.push((_options$beforeExpr = options.beforeExpr) != null ? _options$beforeExpr : false);
  tokenStartsExprs.push((_options$startsExpr = options.startsExpr) != null ? _options$startsExpr : false);
  tokenPrefixes.push((_options$prefix = options.prefix) != null ? _options$prefix : false);
  tokenTypes.push(new ExportedTokenType(name, options));
  return tokenTypeCounter;
}
function createKeywordLike(name, options = {}) {
  var _options$binop2, _options$beforeExpr2, _options$startsExpr2, _options$prefix2;
  ++tokenTypeCounter;
  keywords$1.set(name, tokenTypeCounter);
  tokenLabels.push(name);
  tokenBinops.push((_options$binop2 = options.binop) != null ? _options$binop2 : -1);
  tokenBeforeExprs.push((_options$beforeExpr2 = options.beforeExpr) != null ? _options$beforeExpr2 : false);
  tokenStartsExprs.push((_options$startsExpr2 = options.startsExpr) != null ? _options$startsExpr2 : false);
  tokenPrefixes.push((_options$prefix2 = options.prefix) != null ? _options$prefix2 : false);
  tokenTypes.push(new ExportedTokenType("name", options));
  return tokenTypeCounter;
}
const tt = {
  bracketL: createToken("[", {
    beforeExpr,
    startsExpr
  }),
  bracketHashL: createToken("#[", {
    beforeExpr,
    startsExpr
  }),
  bracketBarL: createToken("[|", {
    beforeExpr,
    startsExpr
  }),
  bracketR: createToken("]"),
  bracketBarR: createToken("|]"),
  braceL: createToken("{", {
    beforeExpr,
    startsExpr
  }),
  braceBarL: createToken("{|", {
    beforeExpr,
    startsExpr
  }),
  braceHashL: createToken("#{", {
    beforeExpr,
    startsExpr
  }),
  braceR: createToken("}"),
  braceBarR: createToken("|}"),
  parenL: createToken("(", {
    beforeExpr,
    startsExpr
  }),
  parenR: createToken(")"),
  comma: createToken(",", {
    beforeExpr
  }),
  semi: createToken(";", {
    beforeExpr
  }),
  colon: createToken(":", {
    beforeExpr
  }),
  doubleColon: createToken("::", {
    beforeExpr
  }),
  dot: createToken("."),
  question: createToken("?", {
    beforeExpr
  }),
  questionDot: createToken("?."),
  arrow: createToken("=>", {
    beforeExpr
  }),
  template: createToken("template"),
  ellipsis: createToken("...", {
    beforeExpr
  }),
  backQuote: createToken("`", {
    startsExpr
  }),
  dollarBraceL: createToken("${", {
    beforeExpr,
    startsExpr
  }),
  templateTail: createToken("...`", {
    startsExpr
  }),
  templateNonTail: createToken("...${", {
    beforeExpr,
    startsExpr
  }),
  at: createToken("@"),
  hash: createToken("#", {
    startsExpr
  }),
  interpreterDirective: createToken("#!..."),
  eq: createToken("=", {
    beforeExpr,
    isAssign
  }),
  assign: createToken("_=", {
    beforeExpr,
    isAssign
  }),
  slashAssign: createToken("_=", {
    beforeExpr,
    isAssign
  }),
  xorAssign: createToken("_=", {
    beforeExpr,
    isAssign
  }),
  moduloAssign: createToken("_=", {
    beforeExpr,
    isAssign
  }),
  incDec: createToken("++/--", {
    prefix,
    postfix,
    startsExpr
  }),
  bang: createToken("!", {
    beforeExpr,
    prefix,
    startsExpr
  }),
  tilde: createToken("~", {
    beforeExpr,
    prefix,
    startsExpr
  }),
  doubleCaret: createToken("^^", {
    startsExpr
  }),
  doubleAt: createToken("@@", {
    startsExpr
  }),
  pipeline: createBinop("|>", 0),
  nullishCoalescing: createBinop("??", 1),
  logicalOR: createBinop("||", 1),
  logicalAND: createBinop("&&", 2),
  bitwiseOR: createBinop("|", 3),
  bitwiseXOR: createBinop("^", 4),
  bitwiseAND: createBinop("&", 5),
  equality: createBinop("==/!=/===/!==", 6),
  lt: createBinop("</>/<=/>=", 7),
  gt: createBinop("</>/<=/>=", 7),
  relational: createBinop("</>/<=/>=", 7),
  bitShift: createBinop("<</>>/>>>", 8),
  bitShiftL: createBinop("<</>>/>>>", 8),
  bitShiftR: createBinop("<</>>/>>>", 8),
  plusMin: createToken("+/-", {
    beforeExpr,
    binop: 9,
    prefix,
    startsExpr
  }),
  modulo: createToken("%", {
    binop: 10,
    startsExpr
  }),
  star: createToken("*", {
    binop: 10
  }),
  slash: createBinop("/", 10),
  exponent: createToken("**", {
    beforeExpr,
    binop: 11,
    rightAssociative: true
  }),
  _in: createKeyword("in", {
    beforeExpr,
    binop: 7
  }),
  _instanceof: createKeyword("instanceof", {
    beforeExpr,
    binop: 7
  }),
  _break: createKeyword("break"),
  _case: createKeyword("case", {
    beforeExpr
  }),
  _catch: createKeyword("catch"),
  _continue: createKeyword("continue"),
  _debugger: createKeyword("debugger"),
  _default: createKeyword("default", {
    beforeExpr
  }),
  _else: createKeyword("else", {
    beforeExpr
  }),
  _finally: createKeyword("finally"),
  _function: createKeyword("function", {
    startsExpr
  }),
  _if: createKeyword("if"),
  _return: createKeyword("return", {
    beforeExpr
  }),
  _switch: createKeyword("switch"),
  _throw: createKeyword("throw", {
    beforeExpr,
    prefix,
    startsExpr
  }),
  _try: createKeyword("try"),
  _var: createKeyword("var"),
  _const: createKeyword("const"),
  _with: createKeyword("with"),
  _new: createKeyword("new", {
    beforeExpr,
    startsExpr
  }),
  _this: createKeyword("this", {
    startsExpr
  }),
  _super: createKeyword("super", {
    startsExpr
  }),
  _class: createKeyword("class", {
    startsExpr
  }),
  _extends: createKeyword("extends", {
    beforeExpr
  }),
  _export: createKeyword("export"),
  _import: createKeyword("import", {
    startsExpr
  }),
  _null: createKeyword("null", {
    startsExpr
  }),
  _true: createKeyword("true", {
    startsExpr
  }),
  _false: createKeyword("false", {
    startsExpr
  }),
  _typeof: createKeyword("typeof", {
    beforeExpr,
    prefix,
    startsExpr
  }),
  _void: createKeyword("void", {
    beforeExpr,
    prefix,
    startsExpr
  }),
  _delete: createKeyword("delete", {
    beforeExpr,
    prefix,
    startsExpr
  }),
  _do: createKeyword("do", {
    isLoop,
    beforeExpr
  }),
  _for: createKeyword("for", {
    isLoop
  }),
  _while: createKeyword("while", {
    isLoop
  }),
  _as: createKeywordLike("as", {
    startsExpr
  }),
  _assert: createKeywordLike("assert", {
    startsExpr
  }),
  _async: createKeywordLike("async", {
    startsExpr
  }),
  _await: createKeywordLike("await", {
    startsExpr
  }),
  _defer: createKeywordLike("defer", {
    startsExpr
  }),
  _from: createKeywordLike("from", {
    startsExpr
  }),
  _get: createKeywordLike("get", {
    startsExpr
  }),
  _let: createKeywordLike("let", {
    startsExpr
  }),
  _meta: createKeywordLike("meta", {
    startsExpr
  }),
  _of: createKeywordLike("of", {
    startsExpr
  }),
  _sent: createKeywordLike("sent", {
    startsExpr
  }),
  _set: createKeywordLike("set", {
    startsExpr
  }),
  _source: createKeywordLike("source", {
    startsExpr
  }),
  _static: createKeywordLike("static", {
    startsExpr
  }),
  _using: createKeywordLike("using", {
    startsExpr
  }),
  _yield: createKeywordLike("yield", {
    startsExpr
  }),
  _asserts: createKeywordLike("asserts", {
    startsExpr
  }),
  _checks: createKeywordLike("checks", {
    startsExpr
  }),
  _exports: createKeywordLike("exports", {
    startsExpr
  }),
  _global: createKeywordLike("global", {
    startsExpr
  }),
  _implements: createKeywordLike("implements", {
    startsExpr
  }),
  _intrinsic: createKeywordLike("intrinsic", {
    startsExpr
  }),
  _infer: createKeywordLike("infer", {
    startsExpr
  }),
  _is: createKeywordLike("is", {
    startsExpr
  }),
  _mixins: createKeywordLike("mixins", {
    startsExpr
  }),
  _proto: createKeywordLike("proto", {
    startsExpr
  }),
  _require: createKeywordLike("require", {
    startsExpr
  }),
  _satisfies: createKeywordLike("satisfies", {
    startsExpr
  }),
  _keyof: createKeywordLike("keyof", {
    startsExpr
  }),
  _readonly: createKeywordLike("readonly", {
    startsExpr
  }),
  _unique: createKeywordLike("unique", {
    startsExpr
  }),
  _abstract: createKeywordLike("abstract", {
    startsExpr
  }),
  _declare: createKeywordLike("declare", {
    startsExpr
  }),
  _enum: createKeywordLike("enum", {
    startsExpr
  }),
  _module: createKeywordLike("module", {
    startsExpr
  }),
  _namespace: createKeywordLike("namespace", {
    startsExpr
  }),
  _interface: createKeywordLike("interface", {
    startsExpr
  }),
  _type: createKeywordLike("type", {
    startsExpr
  }),
  _opaque: createKeywordLike("opaque", {
    startsExpr
  }),
  name: createToken("name", {
    startsExpr
  }),
  placeholder: createToken("%%", {
    startsExpr: true
  }),
  string: createToken("string", {
    startsExpr
  }),
  num: createToken("num", {
    startsExpr
  }),
  bigint: createToken("bigint", {
    startsExpr
  }),
  decimal: createToken("decimal", {
    startsExpr
  }),
  regexp: createToken("regexp", {
    startsExpr
  }),
  privateName: createToken("#name", {
    startsExpr
  }),
  eof: createToken("eof"),
  jsxName: createToken("jsxName"),
  jsxText: createToken("jsxText", {
    beforeExpr: true
  }),
  jsxTagStart: createToken("jsxTagStart", {
    startsExpr: true
  }),
  jsxTagEnd: createToken("jsxTagEnd")
};
function tokenIsIdentifier(token) {
  return token >= 93 && token <= 133;
}
function tokenKeywordOrIdentifierIsKeyword(token) {
  return token <= 92;
}
function tokenIsKeywordOrIdentifier(token) {
  return token >= 58 && token <= 133;
}
function tokenIsLiteralPropertyName(token) {
  return token >= 58 && token <= 137;
}
function tokenComesBeforeExpression(token) {
  return tokenBeforeExprs[token];
}
function tokenCanStartExpression(token) {
  return tokenStartsExprs[token];
}
function tokenIsAssignment(token) {
  return token >= 29 && token <= 33;
}
function tokenIsFlowInterfaceOrTypeOrOpaque(token) {
  return token >= 129 && token <= 131;
}
function tokenIsLoop(token) {
  return token >= 90 && token <= 92;
}
function tokenIsKeyword(token) {
  return token >= 58 && token <= 92;
}
function tokenIsOperator(token) {
  return token >= 39 && token <= 59;
}
function tokenIsPostfix(token) {
  return token === 34;
}
function tokenIsPrefix(token) {
  return tokenPrefixes[token];
}
function tokenIsTSTypeOperator(token) {
  return token >= 121 && token <= 123;
}
function tokenIsTSDeclarationStart(token) {
  return token >= 124 && token <= 130;
}
function tokenLabelName(token) {
  return tokenLabels[token];
}
function tokenOperatorPrecedence(token) {
  return tokenBinops[token];
}
function tokenIsRightAssociative(token) {
  return token === 57;
}
function tokenIsTemplate(token) {
  return token >= 24 && token <= 25;
}
function getExportedToken(token) {
  return tokenTypes[token];
}
{
  tokenTypes[8].updateContext = context => {
    context.pop();
  };
  tokenTypes[5].updateContext = tokenTypes[7].updateContext = tokenTypes[23].updateContext = context => {
    context.push(types.brace);
  };
  tokenTypes[22].updateContext = context => {
    if (context[context.length - 1] === types.template) {
      context.pop();
    } else {
      context.push(types.template);
    }
  };
  tokenTypes[143].updateContext = context => {
    context.push(types.j_expr, types.j_oTag);
  };
}
let nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u0870-\u0887\u0889-\u088e\u08a0-\u08c9\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c5d\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cdd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d04-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u1711\u171f-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4c\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c8a\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7cd\ua7d0\ua7d1\ua7d3\ua7d5-\ua7dc\ua7f2-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
let nonASCIIidentifierChars = "\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0897-\u089f\u08ca-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3c\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0cf3\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ece\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u180f-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf-\u1ace\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\u30fb\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f\uff65";
const nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
const nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
const astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191];
const astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
function isInAstralSet(code, set) {
  let pos = 0x10000;
  for (let i = 0, length = set.length; i < length; i += 2) {
    pos += set[i];
    if (pos > code) return false;
    pos += set[i + 1];
    if (pos >= code) return true;
  }
  return false;
}
function isIdentifierStart(code) {
  if (code < 65) return code === 36;
  if (code <= 90) return true;
  if (code < 97) return code === 95;
  if (code <= 122) return true;
  if (code <= 0xffff) {
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
  }
  return isInAstralSet(code, astralIdentifierStartCodes);
}
function isIdentifierChar(code) {
  if (code < 48) return code === 36;
  if (code < 58) return true;
  if (code < 65) return false;
  if (code <= 90) return true;
  if (code < 97) return code === 95;
  if (code <= 122) return true;
  if (code <= 0xffff) {
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
  }
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
}
const reservedWords = {
  keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"],
  strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"],
  strictBind: ["eval", "arguments"]
};
const keywords = new Set(reservedWords.keyword);
const reservedWordsStrictSet = new Set(reservedWords.strict);
const reservedWordsStrictBindSet = new Set(reservedWords.strictBind);
function isReservedWord(word, inModule) {
  return inModule && word === "await" || word === "enum";
}
function isStrictReservedWord(word, inModule) {
  return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
}
function isStrictBindOnlyReservedWord(word) {
  return reservedWordsStrictBindSet.has(word);
}
function isStrictBindReservedWord(word, inModule) {
  return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
}
function isKeyword(word) {
  return keywords.has(word);
}
function isIteratorStart(current, next, next2) {
  return current === 64 && next === 64 && isIdentifierStart(next2);
}
const reservedWordLikeSet = new Set(["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", "eval", "arguments", "enum", "await"]);
function canBeReservedWord(word) {
  return reservedWordLikeSet.has(word);
}
class Scope {
  constructor(flags) {
    this.flags = 0;
    this.names = new Map();
    this.firstLexicalName = "";
    this.flags = flags;
  }
}
class ScopeHandler {
  constructor(parser, inModule) {
    this.parser = void 0;
    this.scopeStack = [];
    this.inModule = void 0;
    this.undefinedExports = new Map();
    this.parser = parser;
    this.inModule = inModule;
  }
  get inTopLevel() {
    return (this.currentScope().flags & 1) > 0;
  }
  get inFunction() {
    return (this.currentVarScopeFlags() & 2) > 0;
  }
  get allowSuper() {
    return (this.currentThisScopeFlags() & 16) > 0;
  }
  get allowDirectSuper() {
    return (this.currentThisScopeFlags() & 32) > 0;
  }
  get inClass() {
    return (this.currentThisScopeFlags() & 64) > 0;
  }
  get inClassAndNotInNonArrowFunction() {
    const flags = this.currentThisScopeFlags();
    return (flags & 64) > 0 && (flags & 2) === 0;
  }
  get inStaticBlock() {
    for (let i = this.scopeStack.length - 1;; i--) {
      const {
        flags
      } = this.scopeStack[i];
      if (flags & 128) {
        return true;
      }
      if (flags & (387 | 64)) {
        return false;
      }
    }
  }
  get inNonArrowFunction() {
    return (this.currentThisScopeFlags() & 2) > 0;
  }
  get treatFunctionsAsVar() {
    return this.treatFunctionsAsVarInScope(this.currentScope());
  }
  createScope(flags) {
    return new Scope(flags);
  }
  enter(flags) {
    this.scopeStack.push(this.createScope(flags));
  }
  exit() {
    const scope = this.scopeStack.pop();
    return scope.flags;
  }
  treatFunctionsAsVarInScope(scope) {
    return !!(scope.flags & (2 | 128) || !this.parser.inModule && scope.flags & 1);
  }
  declareName(name, bindingType, loc) {
    let scope = this.currentScope();
    if (bindingType & 8 || bindingType & 16) {
      this.checkRedeclarationInScope(scope, name, bindingType, loc);
      let type = scope.names.get(name) || 0;
      if (bindingType & 16) {
        type = type | 4;
      } else {
        if (!scope.firstLexicalName) {
          scope.firstLexicalName = name;
        }
        type = type | 2;
      }
      scope.names.set(name, type);
      if (bindingType & 8) {
        this.maybeExportDefined(scope, name);
      }
    } else if (bindingType & 4) {
      for (let i = this.scopeStack.length - 1; i >= 0; --i) {
        scope = this.scopeStack[i];
        this.checkRedeclarationInScope(scope, name, bindingType, loc);
        scope.names.set(name, (scope.names.get(name) || 0) | 1);
        this.maybeExportDefined(scope, name);
        if (scope.flags & 387) break;
      }
    }
    if (this.parser.inModule && scope.flags & 1) {
      this.undefinedExports.delete(name);
    }
  }
  maybeExportDefined(scope, name) {
    if (this.parser.inModule && scope.flags & 1) {
      this.undefinedExports.delete(name);
    }
  }
  checkRedeclarationInScope(scope, name, bindingType, loc) {
    if (this.isRedeclaredInScope(scope, name, bindingType)) {
      this.parser.raise(Errors.VarRedeclaration, loc, {
        identifierName: name
      });
    }
  }
  isRedeclaredInScope(scope, name, bindingType) {
    if (!(bindingType & 1)) return false;
    if (bindingType & 8) {
      return scope.names.has(name);
    }
    const type = scope.names.get(name);
    if (bindingType & 16) {
      return (type & 2) > 0 || !this.treatFunctionsAsVarInScope(scope) && (type & 1) > 0;
    }
    return (type & 2) > 0 && !(scope.flags & 8 && scope.firstLexicalName === name) || !this.treatFunctionsAsVarInScope(scope) && (type & 4) > 0;
  }
  checkLocalExport(id) {
    const {
      name
    } = id;
    const topLevelScope = this.scopeStack[0];
    if (!topLevelScope.names.has(name)) {
      this.undefinedExports.set(name, id.loc.start);
    }
  }
  currentScope() {
    return this.scopeStack[this.scopeStack.length - 1];
  }
  currentVarScopeFlags() {
    for (let i = this.scopeStack.length - 1;; i--) {
      const {
        flags
      } = this.scopeStack[i];
      if (flags & 387) {
        return flags;
      }
    }
  }
  currentThisScopeFlags() {
    for (let i = this.scopeStack.length - 1;; i--) {
      const {
        flags
      } = this.scopeStack[i];
      if (flags & (387 | 64) && !(flags & 4)) {
        return flags;
      }
    }
  }
}
class FlowScope extends Scope {
  constructor(...args) {
    super(...args);
    this.declareFunctions = new Set();
  }
}
class FlowScopeHandler extends ScopeHandler {
  createScope(flags) {
    return new FlowScope(flags);
  }
  declareName(name, bindingType, loc) {
    const scope = this.currentScope();
    if (bindingType & 2048) {
      this.checkRedeclarationInScope(scope, name, bindingType, loc);
      this.maybeExportDefined(scope, name);
      scope.declareFunctions.add(name);
      return;
    }
    super.declareName(name, bindingType, loc);
  }
  isRedeclaredInScope(scope, name, bindingType) {
    if (super.isRedeclaredInScope(scope, name, bindingType)) return true;
    if (bindingType & 2048 && !scope.declareFunctions.has(name)) {
      const type = scope.names.get(name);
      return (type & 4) > 0 || (type & 2) > 0;
    }
    return false;
  }
  checkLocalExport(id) {
    if (!this.scopeStack[0].declareFunctions.has(id.name)) {
      super.checkLocalExport(id);
    }
  }
}
const reservedTypes = new Set(["_", "any", "bool", "boolean", "empty", "extends", "false", "interface", "mixed", "null", "number", "static", "string", "true", "typeof", "void"]);
const FlowErrors = ParseErrorEnum`flow`({
  AmbiguousConditionalArrow: "Ambiguous expression: wrap the arrow functions in parentheses to disambiguate.",
  AmbiguousDeclareModuleKind: "Found both `declare module.exports` and `declare export` in the same module. Modules can only have 1 since they are either an ES module or they are a CommonJS module.",
  AssignReservedType: ({
    reservedType
  }) => `Cannot overwrite reserved type ${reservedType}.`,
  DeclareClassElement: "The `declare` modifier can only appear on class fields.",
  DeclareClassFieldInitializer: "Initializers are not allowed in fields with the `declare` modifier.",
  DuplicateDeclareModuleExports: "Duplicate `declare module.exports` statement.",
  EnumBooleanMemberNotInitialized: ({
    memberName,
    enumName
  }) => `Boolean enum members need to be initialized. Use either \`${memberName} = true,\` or \`${memberName} = false,\` in enum \`${enumName}\`.`,
  EnumDuplicateMemberName: ({
    memberName,
    enumName
  }) => `Enum member names need to be unique, but the name \`${memberName}\` has already been used before in enum \`${enumName}\`.`,
  EnumInconsistentMemberValues: ({
    enumName
  }) => `Enum \`${enumName}\` has inconsistent member initializers. Either use no initializers, or consistently use literals (either booleans, numbers, or strings) for all member initializers.`,
  EnumInvalidExplicitType: ({
    invalidEnumType,
    enumName
  }) => `Enum type \`${invalidEnumType}\` is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${enumName}\`.`,
  EnumInvalidExplicitTypeUnknownSupplied: ({
    enumName
  }) => `Supplied enum type is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${enumName}\`.`,
  EnumInvalidMemberInitializerPrimaryType: ({
    enumName,
    memberName,
    explicitType
  }) => `Enum \`${enumName}\` has type \`${explicitType}\`, so the initializer of \`${memberName}\` needs to be a ${explicitType} literal.`,
  EnumInvalidMemberInitializerSymbolType: ({
    enumName,
    memberName
  }) => `Symbol enum members cannot be initialized. Use \`${memberName},\` in enum \`${enumName}\`.`,
  EnumInvalidMemberInitializerUnknownType: ({
    enumName,
    memberName
  }) => `The enum member initializer for \`${memberName}\` needs to be a literal (either a boolean, number, or string) in enum \`${enumName}\`.`,
  EnumInvalidMemberName: ({
    enumName,
    memberName,
    suggestion
  }) => `Enum member names cannot start with lowercase 'a' through 'z'. Instead of using \`${memberName}\`, consider using \`${suggestion}\`, in enum \`${enumName}\`.`,
  EnumNumberMemberNotInitialized: ({
    enumName,
    memberName
  }) => `Number enum members need to be initialized, e.g. \`${memberName} = 1\` in enum \`${enumName}\`.`,
  EnumStringMemberInconsistentlyInitialized: ({
    enumName
  }) => `String enum members need to consistently either all use initializers, or use no initializers, in enum \`${enumName}\`.`,
  GetterMayNotHaveThisParam: "A getter cannot have a `this` parameter.",
  ImportReflectionHasImportType: "An `import module` declaration can not use `type` or `typeof` keyword.",
  ImportTypeShorthandOnlyInPureImport: "The `type` and `typeof` keywords on named imports can only be used on regular `import` statements. It cannot be used with `import type` or `import typeof` statements.",
  InexactInsideExact: "Explicit inexact syntax cannot appear inside an explicit exact object type.",
  InexactInsideNonObject: "Explicit inexact syntax cannot appear in class or interface definitions.",
  InexactVariance: "Explicit inexact syntax cannot have variance.",
  InvalidNonTypeImportInDeclareModule: "Imports within a `declare module` body must always be `import type` or `import typeof`.",
  MissingTypeParamDefault: "Type parameter declaration needs a default, since a preceding type parameter declaration has a default.",
  NestedDeclareModule: "`declare module` cannot be used inside another `declare module`.",
  NestedFlowComment: "Cannot have a flow comment inside another flow comment.",
  PatternIsOptional: Object.assign({
    message: "A binding pattern parameter cannot be optional in an implementation signature."
  }, {
    reasonCode: "OptionalBindingPattern"
  }),
  SetterMayNotHaveThisParam: "A setter cannot have a `this` parameter.",
  SpreadVariance: "Spread properties cannot have variance.",
  ThisParamAnnotationRequired: "A type annotation is required for the `this` parameter.",
  ThisParamBannedInConstructor: "Constructors cannot have a `this` parameter; constructors don't bind `this` like other functions.",
  ThisParamMayNotBeOptional: "The `this` parameter cannot be optional.",
  ThisParamMustBeFirst: "The `this` parameter must be the first function parameter.",
  ThisParamNoDefault: "The `this` parameter may not have a default value.",
  TypeBeforeInitializer: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.",
  TypeCastInPattern: "The type cast expression is expected to be wrapped with parenthesis.",
  UnexpectedExplicitInexactInObject: "Explicit inexact syntax must appear at the end of an inexact object.",
  UnexpectedReservedType: ({
    reservedType
  }) => `Unexpected reserved type ${reservedType}.`,
  UnexpectedReservedUnderscore: "`_` is only allowed as a type argument to call or new.",
  UnexpectedSpaceBetweenModuloChecks: "Spaces between `%` and `checks` are not allowed here.",
  UnexpectedSpreadType: "Spread operator cannot appear in class or interface definitions.",
  UnexpectedSubtractionOperand: 'Unexpected token, expected "number" or "bigint".',
  UnexpectedTokenAfterTypeParameter: "Expected an arrow function after this type parameter declaration.",
  UnexpectedTypeParameterBeforeAsyncArrowFunction: "Type parameters must come after the async keyword, e.g. instead of `<T> async () => {}`, use `async <T>() => {}`.",
  UnsupportedDeclareExportKind: ({
    unsupportedExportKind,
    suggestion
  }) => `\`declare export ${unsupportedExportKind}\` is not supported. Use \`${suggestion}\` instead.`,
  UnsupportedStatementInDeclareModule: "Only declares and type imports are allowed inside declare module.",
  UnterminatedFlowComment: "Unterminated flow-comment."
});
function isEsModuleType(bodyElement) {
  return bodyElement.type === "DeclareExportAllDeclaration" || bodyElement.type === "DeclareExportDeclaration" && (!bodyElement.declaration || bodyElement.declaration.type !== "TypeAlias" && bodyElement.declaration.type !== "InterfaceDeclaration");
}
function hasTypeImportKind(node) {
  return node.importKind === "type" || node.importKind === "typeof";
}
const exportSuggestions = {
  const: "declare export var",
  let: "declare export var",
  type: "export type",
  interface: "export interface"
};
function partition(list, test) {
  const list1 = [];
  const list2 = [];
  for (let i = 0; i < list.length; i++) {
    (test(list[i], i, list) ? list1 : list2).push(list[i]);
  }
  return [list1, list2];
}
const FLOW_PRAGMA_REGEX = /\*?\s*@((?:no)?flow)\b/;
var flow = superClass => class flow extends superClass {
  constructor() {
    super(...arguments);
    _flow_constructor(...arguments);
    _Parser_constructor_dynamic = _flow_constructor.bind(null, _Parser_constructor_dynamic);
    _Parser_getScopeHandler_dynamic = _flow_getScopeHandler.bind(null, _Parser_getScopeHandler_dynamic);
    _Parser_finishToken_dynamic = _flow_finishToken.bind(null, _Parser_finishToken_dynamic);
    _Parser_addComment_dynamic = _flow_addComment.bind(null, _Parser_addComment_dynamic);
    _Parser_typeCastToParameter_dynamic = _flow_typeCastToParameter.bind(null, _Parser_typeCastToParameter_dynamic);
    _Parser_parseFunctionBody_dynamic = _flow_parseFunctionBody.bind(null, _Parser_parseFunctionBody_dynamic);
    _Parser_parseFunctionBodyAndFinish_dynamic = _flow_parseFunctionBodyAndFinish.bind(null, _Parser_parseFunctionBodyAndFinish_dynamic);
    _Parser_parseStatementLike_dynamic = _flow_parseStatementLike.bind(null, _Parser_parseStatementLike_dynamic);
    _Parser_parseExpressionStatement_dynamic = _flow_parseExpressionStatement.bind(null, _Parser_parseExpressionStatement_dynamic);
    _Parser_shouldParseExportDeclaration_dynamic = _flow_shouldParseExportDeclaration.bind(null, _Parser_shouldParseExportDeclaration_dynamic);
    _Parser_isExportDefaultSpecifier_dynamic = _flow_isExportDefaultSpecifier.bind(null, _Parser_isExportDefaultSpecifier_dynamic);
    _Parser_parseExportDefaultExpression_dynamic = _flow_parseExportDefaultExpression.bind(null, _Parser_parseExportDefaultExpression_dynamic);
    _Parser_parseConditional_dynamic = _flow_parseConditional.bind(null, _Parser_parseConditional_dynamic);
    _Parser_parseParenItem_dynamic = _flow_parseParenItem.bind(null, _Parser_parseParenItem_dynamic);
    _Parser_assertModuleNodeAllowed_dynamic = _flow_assertModuleNodeAllowed.bind(null, _Parser_assertModuleNodeAllowed_dynamic);
    _Parser_parseExportDeclaration_dynamic = _flow_parseExportDeclaration.bind(null, _Parser_parseExportDeclaration_dynamic);
    _Parser_eatExportStar_dynamic = _flow_eatExportStar.bind(null, _Parser_eatExportStar_dynamic);
    _Parser_maybeParseExportNamespaceSpecifier_dynamic = _flow_maybeParseExportNamespaceSpecifier.bind(null, _Parser_maybeParseExportNamespaceSpecifier_dynamic);
    _Parser_parseClassId_dynamic = _flow_parseClassId.bind(null, _Parser_parseClassId_dynamic);
    _Parser_parseClassMember_dynamic = _flow_parseClassMember.bind(null, _Parser_parseClassMember_dynamic);
    _Parser_getTokenFromCode_dynamic = _flow_getTokenFromCode.bind(null, _Parser_getTokenFromCode_dynamic);
    _Parser_isAssignable_dynamic = _flow_isAssignable.bind(null, _Parser_isAssignable_dynamic);
    _Parser_toAssignable_dynamic = _flow_toAssignable.bind(null, _Parser_toAssignable_dynamic);
    _Parser_toAssignableList_dynamic = _flow_toAssignableList.bind(null, _Parser_toAssignableList_dynamic);
    _Parser_toReferencedList_dynamic = _flow_toReferencedList.bind(null, _Parser_toReferencedList_dynamic);
    _Parser_parseArrayLike_dynamic = _flow_parseArrayLike.bind(null, _Parser_parseArrayLike_dynamic);
    _Parser_isValidLVal_dynamic = _flow_isValidLVal.bind(null, _Parser_isValidLVal_dynamic);
    _Parser_parseClassProperty_dynamic = _flow_parseClassProperty.bind(null, _Parser_parseClassProperty_dynamic);
    _Parser_parseClassPrivateProperty_dynamic = _flow_parseClassPrivateProperty.bind(null, _Parser_parseClassPrivateProperty_dynamic);
    _Parser_isClassMethod_dynamic = _flow_isClassMethod.bind(null, _Parser_isClassMethod_dynamic);
    _Parser_isClassProperty_dynamic = _flow_isClassProperty.bind(null, _Parser_isClassProperty_dynamic);
    _Parser_isNonstaticConstructor_dynamic = _flow_isNonstaticConstructor.bind(null, _Parser_isNonstaticConstructor_dynamic);
    _Parser_pushClassMethod_dynamic = _flow_pushClassMethod.bind(null, _Parser_pushClassMethod_dynamic);
    _Parser_pushClassPrivateMethod_dynamic = _flow_pushClassPrivateMethod.bind(null, _Parser_pushClassPrivateMethod_dynamic);
    _Parser_parseClassSuper_dynamic = _flow_parseClassSuper.bind(null, _Parser_parseClassSuper_dynamic);
    _Parser_checkGetterSetterParams_dynamic = _flow_checkGetterSetterParams.bind(null, _Parser_checkGetterSetterParams_dynamic);
    _Parser_parsePropertyNamePrefixOperator_dynamic = _flow_parsePropertyNamePrefixOperator.bind(null, _Parser_parsePropertyNamePrefixOperator_dynamic);
    _Parser_parseObjPropValue_dynamic = _flow_parseObjPropValue.bind(null, _Parser_parseObjPropValue_dynamic);
    _Parser_parseFunctionParamType_dynamic = _flow_parseFunctionParamType.bind(null, _Parser_parseFunctionParamType_dynamic);
    _Parser_parseMaybeDefault_dynamic = _flow_parseMaybeDefault.bind(null, _Parser_parseMaybeDefault_dynamic);
    _Parser_checkImportReflection_dynamic = _flow_checkImportReflection.bind(null, _Parser_checkImportReflection_dynamic);
    _Parser_parseImportSpecifierLocal_dynamic = _flow_parseImportSpecifierLocal.bind(null, _Parser_parseImportSpecifierLocal_dynamic);
    _Parser_isPotentialImportPhase_dynamic = _flow_isPotentialImportPhase.bind(null, _Parser_isPotentialImportPhase_dynamic);
    _Parser_applyImportPhase_dynamic = _flow_applyImportPhase.bind(null, _Parser_applyImportPhase_dynamic);
    _Parser_parseImportSpecifier_dynamic = _flow_parseImportSpecifier.bind(null, _Parser_parseImportSpecifier_dynamic);
    _Parser_parseBindingAtom_dynamic = _flow_parseBindingAtom.bind(null, _Parser_parseBindingAtom_dynamic);
    _Parser_parseFunctionParams_dynamic = _flow_parseFunctionParams.bind(null, _Parser_parseFunctionParams_dynamic);
    _Parser_parseVarId_dynamic = _flow_parseVarId.bind(null, _Parser_parseVarId_dynamic);
    _Parser_parseAsyncArrowFromCallExpression_dynamic = _flow_parseAsyncArrowFromCallExpression.bind(null, _Parser_parseAsyncArrowFromCallExpression_dynamic);
    _Parser_shouldParseAsyncArrow_dynamic = _flow_shouldParseAsyncArrow.bind(null, _Parser_shouldParseAsyncArrow_dynamic);
    _Parser_parseMaybeAssign_dynamic = _flow_parseMaybeAssign.bind(null, _Parser_parseMaybeAssign_dynamic);
    _Parser_parseArrow_dynamic = _flow_parseArrow.bind(null, _Parser_parseArrow_dynamic);
    _Parser_shouldParseArrow_dynamic = _flow_shouldParseArrow.bind(null, _Parser_shouldParseArrow_dynamic);
    _Parser_setArrowFunctionParameters_dynamic = _flow_setArrowFunctionParameters.bind(null, _Parser_setArrowFunctionParameters_dynamic);
    _Parser_checkParams_dynamic = _flow_checkParams.bind(null, _Parser_checkParams_dynamic);
    _Parser_parseParenAndDistinguishExpression_dynamic = _flow_parseParenAndDistinguishExpression.bind(null, _Parser_parseParenAndDistinguishExpression_dynamic);
    _Parser_parseSubscripts_dynamic = _flow_parseSubscripts.bind(null, _Parser_parseSubscripts_dynamic);
    _Parser_parseSubscript_dynamic = _flow_parseSubscript.bind(null, _Parser_parseSubscript_dynamic);
    _Parser_parseNewCallee_dynamic = _flow_parseNewCallee.bind(null, _Parser_parseNewCallee_dynamic);
    _Parser_readToken_mult_modulo_dynamic = _flow_readToken_mult_modulo.bind(null, _Parser_readToken_mult_modulo_dynamic);
    _Parser_readToken_pipe_amp_dynamic = _flow_readToken_pipe_amp.bind(null, _Parser_readToken_pipe_amp_dynamic);
    _Parser_parseTopLevel_dynamic = _flow_parseTopLevel.bind(null, _Parser_parseTopLevel_dynamic);
    _Parser_skipBlockComment_dynamic = _flow_skipBlockComment.bind(null, _Parser_skipBlockComment_dynamic);
    _Parser_jsxParseOpeningElementAfterName_dynamic = _flow_jsxParseOpeningElementAfterName.bind(null, _Parser_jsxParseOpeningElementAfterName_dynamic);
    _Parser_reScan_lt_gt_dynamic = _flow_reScan_lt_gt.bind(null, _Parser_reScan_lt_gt_dynamic);
    _Parser_reScan_lt_dynamic = _flow_reScan_lt.bind(null, _Parser_reScan_lt_dynamic);
  }
};
const entities = {
  __proto__: null,
  quot: "\u0022",
  amp: "&",
  apos: "\u0027",
  lt: "<",
  gt: ">",
  nbsp: "\u00A0",
  iexcl: "\u00A1",
  cent: "\u00A2",
  pound: "\u00A3",
  curren: "\u00A4",
  yen: "\u00A5",
  brvbar: "\u00A6",
  sect: "\u00A7",
  uml: "\u00A8",
  copy: "\u00A9",
  ordf: "\u00AA",
  laquo: "\u00AB",
  not: "\u00AC",
  shy: "\u00AD",
  reg: "\u00AE",
  macr: "\u00AF",
  deg: "\u00B0",
  plusmn: "\u00B1",
  sup2: "\u00B2",
  sup3: "\u00B3",
  acute: "\u00B4",
  micro: "\u00B5",
  para: "\u00B6",
  middot: "\u00B7",
  cedil: "\u00B8",
  sup1: "\u00B9",
  ordm: "\u00BA",
  raquo: "\u00BB",
  frac14: "\u00BC",
  frac12: "\u00BD",
  frac34: "\u00BE",
  iquest: "\u00BF",
  Agrave: "\u00C0",
  Aacute: "\u00C1",
  Acirc: "\u00C2",
  Atilde: "\u00C3",
  Auml: "\u00C4",
  Aring: "\u00C5",
  AElig: "\u00C6",
  Ccedil: "\u00C7",
  Egrave: "\u00C8",
  Eacute: "\u00C9",
  Ecirc: "\u00CA",
  Euml: "\u00CB",
  Igrave: "\u00CC",
  Iacute: "\u00CD",
  Icirc: "\u00CE",
  Iuml: "\u00CF",
  ETH: "\u00D0",
  Ntilde: "\u00D1",
  Ograve: "\u00D2",
  Oacute: "\u00D3",
  Ocirc: "\u00D4",
  Otilde: "\u00D5",
  Ouml: "\u00D6",
  times: "\u00D7",
  Oslash: "\u00D8",
  Ugrave: "\u00D9",
  Uacute: "\u00DA",
  Ucirc: "\u00DB",
  Uuml: "\u00DC",
  Yacute: "\u00DD",
  THORN: "\u00DE",
  szlig: "\u00DF",
  agrave: "\u00E0",
  aacute: "\u00E1",
  acirc: "\u00E2",
  atilde: "\u00E3",
  auml: "\u00E4",
  aring: "\u00E5",
  aelig: "\u00E6",
  ccedil: "\u00E7",
  egrave: "\u00E8",
  eacute: "\u00E9",
  ecirc: "\u00EA",
  euml: "\u00EB",
  igrave: "\u00EC",
  iacute: "\u00ED",
  icirc: "\u00EE",
  iuml: "\u00EF",
  eth: "\u00F0",
  ntilde: "\u00F1",
  ograve: "\u00F2",
  oacute: "\u00F3",
  ocirc: "\u00F4",
  otilde: "\u00F5",
  ouml: "\u00F6",
  divide: "\u00F7",
  oslash: "\u00F8",
  ugrave: "\u00F9",
  uacute: "\u00FA",
  ucirc: "\u00FB",
  uuml: "\u00FC",
  yacute: "\u00FD",
  thorn: "\u00FE",
  yuml: "\u00FF",
  OElig: "\u0152",
  oelig: "\u0153",
  Scaron: "\u0160",
  scaron: "\u0161",
  Yuml: "\u0178",
  fnof: "\u0192",
  circ: "\u02C6",
  tilde: "\u02DC",
  Alpha: "\u0391",
  Beta: "\u0392",
  Gamma: "\u0393",
  Delta: "\u0394",
  Epsilon: "\u0395",
  Zeta: "\u0396",
  Eta: "\u0397",
  Theta: "\u0398",
  Iota: "\u0399",
  Kappa: "\u039A",
  Lambda: "\u039B",
  Mu: "\u039C",
  Nu: "\u039D",
  Xi: "\u039E",
  Omicron: "\u039F",
  Pi: "\u03A0",
  Rho: "\u03A1",
  Sigma: "\u03A3",
  Tau: "\u03A4",
  Upsilon: "\u03A5",
  Phi: "\u03A6",
  Chi: "\u03A7",
  Psi: "\u03A8",
  Omega: "\u03A9",
  alpha: "\u03B1",
  beta: "\u03B2",
  gamma: "\u03B3",
  delta: "\u03B4",
  epsilon: "\u03B5",
  zeta: "\u03B6",
  eta: "\u03B7",
  theta: "\u03B8",
  iota: "\u03B9",
  kappa: "\u03BA",
  lambda: "\u03BB",
  mu: "\u03BC",
  nu: "\u03BD",
  xi: "\u03BE",
  omicron: "\u03BF",
  pi: "\u03C0",
  rho: "\u03C1",
  sigmaf: "\u03C2",
  sigma: "\u03C3",
  tau: "\u03C4",
  upsilon: "\u03C5",
  phi: "\u03C6",
  chi: "\u03C7",
  psi: "\u03C8",
  omega: "\u03C9",
  thetasym: "\u03D1",
  upsih: "\u03D2",
  piv: "\u03D6",
  ensp: "\u2002",
  emsp: "\u2003",
  thinsp: "\u2009",
  zwnj: "\u200C",
  zwj: "\u200D",
  lrm: "\u200E",
  rlm: "\u200F",
  ndash: "\u2013",
  mdash: "\u2014",
  lsquo: "\u2018",
  rsquo: "\u2019",
  sbquo: "\u201A",
  ldquo: "\u201C",
  rdquo: "\u201D",
  bdquo: "\u201E",
  dagger: "\u2020",
  Dagger: "\u2021",
  bull: "\u2022",
  hellip: "\u2026",
  permil: "\u2030",
  prime: "\u2032",
  Prime: "\u2033",
  lsaquo: "\u2039",
  rsaquo: "\u203A",
  oline: "\u203E",
  frasl: "\u2044",
  euro: "\u20AC",
  image: "\u2111",
  weierp: "\u2118",
  real: "\u211C",
  trade: "\u2122",
  alefsym: "\u2135",
  larr: "\u2190",
  uarr: "\u2191",
  rarr: "\u2192",
  darr: "\u2193",
  harr: "\u2194",
  crarr: "\u21B5",
  lArr: "\u21D0",
  uArr: "\u21D1",
  rArr: "\u21D2",
  dArr: "\u21D3",
  hArr: "\u21D4",
  forall: "\u2200",
  part: "\u2202",
  exist: "\u2203",
  empty: "\u2205",
  nabla: "\u2207",
  isin: "\u2208",
  notin: "\u2209",
  ni: "\u220B",
  prod: "\u220F",
  sum: "\u2211",
  minus: "\u2212",
  lowast: "\u2217",
  radic: "\u221A",
  prop: "\u221D",
  infin: "\u221E",
  ang: "\u2220",
  and: "\u2227",
  or: "\u2228",
  cap: "\u2229",
  cup: "\u222A",
  int: "\u222B",
  there4: "\u2234",
  sim: "\u223C",
  cong: "\u2245",
  asymp: "\u2248",
  ne: "\u2260",
  equiv: "\u2261",
  le: "\u2264",
  ge: "\u2265",
  sub: "\u2282",
  sup: "\u2283",
  nsub: "\u2284",
  sube: "\u2286",
  supe: "\u2287",
  oplus: "\u2295",
  otimes: "\u2297",
  perp: "\u22A5",
  sdot: "\u22C5",
  lceil: "\u2308",
  rceil: "\u2309",
  lfloor: "\u230A",
  rfloor: "\u230B",
  lang: "\u2329",
  rang: "\u232A",
  loz: "\u25CA",
  spades: "\u2660",
  clubs: "\u2663",
  hearts: "\u2665",
  diams: "\u2666"
};
const lineBreak = /\r\n|[\r\n\u2028\u2029]/;
const lineBreakG = new RegExp(lineBreak.source, "g");
function isNewLine(code) {
  switch (code) {
    case 10:
    case 13:
    case 8232:
    case 8233:
      return true;
    default:
      return false;
  }
}
function hasNewLine(input, start, end) {
  for (let i = start; i < end; i++) {
    if (isNewLine(input.charCodeAt(i))) {
      return true;
    }
  }
  return false;
}
const skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
const skipWhiteSpaceInLine = /(?:[^\S\n\r\u2028\u2029]|\/\/.*|\/\*.*?\*\/)*/g;
function isWhitespace(code) {
  switch (code) {
    case 0x0009:
    case 0x000b:
    case 0x000c:
    case 32:
    case 160:
    case 5760:
    case 0x2000:
    case 0x2001:
    case 0x2002:
    case 0x2003:
    case 0x2004:
    case 0x2005:
    case 0x2006:
    case 0x2007:
    case 0x2008:
    case 0x2009:
    case 0x200a:
    case 0x202f:
    case 0x205f:
    case 0x3000:
    case 0xfeff:
      return true;
    default:
      return false;
  }
}
const JsxErrors = ParseErrorEnum`jsx`({
  AttributeIsEmpty: "JSX attributes must only be assigned a non-empty expression.",
  MissingClosingTagElement: ({
    openingTagName
  }) => `Expected corresponding JSX closing tag for <${openingTagName}>.`,
  MissingClosingTagFragment: "Expected corresponding JSX closing tag for <>.",
  UnexpectedSequenceExpression: "Sequence expressions cannot be directly nested inside JSX. Did you mean to wrap it in parentheses (...)?",
  UnexpectedToken: ({
    unexpected,
    HTMLEntity
  }) => `Unexpected token \`${unexpected}\`. Did you mean \`${HTMLEntity}\` or \`{'${unexpected}'}\`?`,
  UnsupportedJsxValue: "JSX value should be either an expression or a quoted JSX text.",
  UnterminatedJsxContent: "Unterminated JSX contents.",
  UnwrappedAdjacentJSXElements: "Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?"
});
function isFragment(object) {
  return object ? object.type === "JSXOpeningFragment" || object.type === "JSXClosingFragment" : false;
}
function getQualifiedJSXName(object) {
  if (object.type === "JSXIdentifier") {
    return object.name;
  }
  if (object.type === "JSXNamespacedName") {
    return object.namespace.name + ":" + object.name.name;
  }
  if (object.type === "JSXMemberExpression") {
    return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
  }
  throw new Error("Node had unexpected type: " + object.type);
}
var jsx = superClass => class jsx extends superClass {
  constructor() {
    super(...arguments);
    _Parser_jsxParseOpeningElementAfterName_dynamic = _jsx_jsxParseOpeningElementAfterName.bind(null, _Parser_jsxParseOpeningElementAfterName_dynamic);
    _Parser_parseExprAtom_dynamic = _jsx_parseExprAtom.bind(null, _Parser_parseExprAtom_dynamic);
    _Parser_skipSpace_dynamic = _jsx_skipSpace.bind(null, _Parser_skipSpace_dynamic);
    _Parser_getTokenFromCode_dynamic = _jsx_getTokenFromCode.bind(null, _Parser_getTokenFromCode_dynamic);
    _Parser_updateContext_dynamic = _jsx_updateContext.bind(null, _Parser_updateContext_dynamic);
  }
};
class TypeScriptScope extends Scope {
  constructor(...args) {
    super(...args);
    this.tsNames = new Map();
  }
}
class TypeScriptScopeHandler extends ScopeHandler {
  constructor(...args) {
    super(...args);
    this.importsStack = [];
  }
  createScope(flags) {
    this.importsStack.push(new Set());
    return new TypeScriptScope(flags);
  }
  enter(flags) {
    if (flags === 256) {
      this.importsStack.push(new Set());
    }
    super.enter(flags);
  }
  exit() {
    const flags = super.exit();
    if (flags === 256) {
      this.importsStack.pop();
    }
    return flags;
  }
  hasImport(name, allowShadow) {
    const len = this.importsStack.length;
    if (this.importsStack[len - 1].has(name)) {
      return true;
    }
    if (!allowShadow && len > 1) {
      for (let i = 0; i < len - 1; i++) {
        if (this.importsStack[i].has(name)) return true;
      }
    }
    return false;
  }
  declareName(name, bindingType, loc) {
    if (bindingType & 4096) {
      if (this.hasImport(name, true)) {
        this.parser.raise(Errors.VarRedeclaration, loc, {
          identifierName: name
        });
      }
      this.importsStack[this.importsStack.length - 1].add(name);
      return;
    }
    const scope = this.currentScope();
    let type = scope.tsNames.get(name) || 0;
    if (bindingType & 1024) {
      this.maybeExportDefined(scope, name);
      scope.tsNames.set(name, type | 16);
      return;
    }
    super.declareName(name, bindingType, loc);
    if (bindingType & 2) {
      if (!(bindingType & 1)) {
        this.checkRedeclarationInScope(scope, name, bindingType, loc);
        this.maybeExportDefined(scope, name);
      }
      type = type | 1;
    }
    if (bindingType & 256) {
      type = type | 2;
    }
    if (bindingType & 512) {
      type = type | 4;
    }
    if (bindingType & 128) {
      type = type | 8;
    }
    if (type) scope.tsNames.set(name, type);
  }
  isRedeclaredInScope(scope, name, bindingType) {
    const type = scope.tsNames.get(name);
    if ((type & 2) > 0) {
      if (bindingType & 256) {
        const isConst = !!(bindingType & 512);
        const wasConst = (type & 4) > 0;
        return isConst !== wasConst;
      }
      return true;
    }
    if (bindingType & 128 && (type & 8) > 0) {
      if (scope.names.get(name) & 2) {
        return !!(bindingType & 1);
      } else {
        return false;
      }
    }
    if (bindingType & 2 && (type & 1) > 0) {
      return true;
    }
    return super.isRedeclaredInScope(scope, name, bindingType);
  }
  checkLocalExport(id) {
    const {
      name
    } = id;
    if (this.hasImport(name)) return;
    const len = this.scopeStack.length;
    for (let i = len - 1; i >= 0; i--) {
      const scope = this.scopeStack[i];
      const type = scope.tsNames.get(name);
      if ((type & 1) > 0 || (type & 16) > 0) {
        return;
      }
    }
    super.checkLocalExport(id);
  }
}
class ProductionParameterHandler {
  constructor() {
    this.stacks = [];
  }
  enter(flags) {
    this.stacks.push(flags);
  }
  exit() {
    this.stacks.pop();
  }
  currentFlags() {
    return this.stacks[this.stacks.length - 1];
  }
  get hasAwait() {
    return (this.currentFlags() & 2) > 0;
  }
  get hasYield() {
    return (this.currentFlags() & 1) > 0;
  }
  get hasReturn() {
    return (this.currentFlags() & 4) > 0;
  }
  get hasIn() {
    return (this.currentFlags() & 8) > 0;
  }
}
function functionFlags(isAsync, isGenerator) {
  return (isAsync ? 2 : 0) | (isGenerator ? 1 : 0);
}
function setTrailingComments(node, comments) {
  if (node.trailingComments === undefined) {
    node.trailingComments = comments;
  } else {
    node.trailingComments.unshift(...comments);
  }
}
function setLeadingComments(node, comments) {
  if (node.leadingComments === undefined) {
    node.leadingComments = comments;
  } else {
    node.leadingComments.unshift(...comments);
  }
}
function setInnerComments(node, comments) {
  if (node.innerComments === undefined) {
    node.innerComments = comments;
  } else {
    node.innerComments.unshift(...comments);
  }
}
function adjustInnerComments(node, elements, commentWS) {
  let lastElement = null;
  let i = elements.length;
  while (lastElement === null && i > 0) {
    lastElement = elements[--i];
  }
  if (lastElement === null || lastElement.start > commentWS.start) {
    setInnerComments(node, commentWS.comments);
  } else {
    setTrailingComments(lastElement, commentWS.comments);
  }
}
class State {
  constructor() {
    this.flags = 1024;
    this.startIndex = void 0;
    this.curLine = void 0;
    this.lineStart = void 0;
    this.startLoc = void 0;
    this.endLoc = void 0;
    this.errors = [];
    this.potentialArrowAt = -1;
    this.noArrowAt = [];
    this.noArrowParamsConversionAt = [];
    this.topicContext = {
      maxNumOfResolvableTopics: 0,
      maxTopicIndex: null
    };
    this.labels = [];
    this.commentsLen = 0;
    this.commentStack = [];
    this.pos = 0;
    this.type = 140;
    this.value = null;
    this.start = 0;
    this.end = 0;
    this.lastTokEndLoc = null;
    this.lastTokStartLoc = null;
    this.context = [types.brace];
    this.firstInvalidTemplateEscapePos = null;
    this.strictErrors = new Map();
    this.tokensLength = 0;
  }
  get strict() {
    return (this.flags & 1) > 0;
  }
  set strict(v) {
    if (v) this.flags |= 1;else this.flags &= -2;
  }
  init({
    strictMode,
    sourceType,
    startIndex,
    startLine,
    startColumn
  }) {
    this.strict = strictMode === false ? false : strictMode === true ? true : sourceType === "module";
    this.startIndex = startIndex;
    this.curLine = startLine;
    this.lineStart = -startColumn;
    this.startLoc = this.endLoc = new Position(startLine, startColumn, startIndex);
  }
  get maybeInArrowParameters() {
    return (this.flags & 2) > 0;
  }
  set maybeInArrowParameters(v) {
    if (v) this.flags |= 2;else this.flags &= -3;
  }
  get inType() {
    return (this.flags & 4) > 0;
  }
  set inType(v) {
    if (v) this.flags |= 4;else this.flags &= -5;
  }
  get noAnonFunctionType() {
    return (this.flags & 8) > 0;
  }
  set noAnonFunctionType(v) {
    if (v) this.flags |= 8;else this.flags &= -9;
  }
  get hasFlowComment() {
    return (this.flags & 16) > 0;
  }
  set hasFlowComment(v) {
    if (v) this.flags |= 16;else this.flags &= -17;
  }
  get isAmbientContext() {
    return (this.flags & 32) > 0;
  }
  set isAmbientContext(v) {
    if (v) this.flags |= 32;else this.flags &= -33;
  }
  get inAbstractClass() {
    return (this.flags & 64) > 0;
  }
  set inAbstractClass(v) {
    if (v) this.flags |= 64;else this.flags &= -65;
  }
  get inDisallowConditionalTypesContext() {
    return (this.flags & 128) > 0;
  }
  set inDisallowConditionalTypesContext(v) {
    if (v) this.flags |= 128;else this.flags &= -129;
  }
  get soloAwait() {
    return (this.flags & 256) > 0;
  }
  set soloAwait(v) {
    if (v) this.flags |= 256;else this.flags &= -257;
  }
  get inFSharpPipelineDirectBody() {
    return (this.flags & 512) > 0;
  }
  set inFSharpPipelineDirectBody(v) {
    if (v) this.flags |= 512;else this.flags &= -513;
  }
  get canStartJSXElement() {
    return (this.flags & 1024) > 0;
  }
  set canStartJSXElement(v) {
    if (v) this.flags |= 1024;else this.flags &= -1025;
  }
  get containsEsc() {
    return (this.flags & 2048) > 0;
  }
  set containsEsc(v) {
    if (v) this.flags |= 2048;else this.flags &= -2049;
  }
  get hasTopLevelAwait() {
    return (this.flags & 4096) > 0;
  }
  set hasTopLevelAwait(v) {
    if (v) this.flags |= 4096;else this.flags &= -4097;
  }
  curPosition() {
    return new Position(this.curLine, this.pos - this.lineStart, this.pos + this.startIndex);
  }
  clone() {
    const state = new State();
    state.flags = this.flags;
    state.startIndex = this.startIndex;
    state.curLine = this.curLine;
    state.lineStart = this.lineStart;
    state.startLoc = this.startLoc;
    state.endLoc = this.endLoc;
    state.errors = this.errors.slice();
    state.potentialArrowAt = this.potentialArrowAt;
    state.noArrowAt = this.noArrowAt.slice();
    state.noArrowParamsConversionAt = this.noArrowParamsConversionAt.slice();
    state.topicContext = this.topicContext;
    state.labels = this.labels.slice();
    state.commentsLen = this.commentsLen;
    state.commentStack = this.commentStack.slice();
    state.pos = this.pos;
    state.type = this.type;
    state.value = this.value;
    state.start = this.start;
    state.end = this.end;
    state.lastTokEndLoc = this.lastTokEndLoc;
    state.lastTokStartLoc = this.lastTokStartLoc;
    state.context = this.context.slice();
    state.firstInvalidTemplateEscapePos = this.firstInvalidTemplateEscapePos;
    state.strictErrors = this.strictErrors;
    state.tokensLength = this.tokensLength;
    return state;
  }
}
var _isDigit = function isDigit(code) {
  return code >= 48 && code <= 57;
};
const forbiddenNumericSeparatorSiblings = {
  decBinOct: new Set([46, 66, 69, 79, 95, 98, 101, 111]),
  hex: new Set([46, 88, 95, 120])
};
const isAllowedNumericSeparatorSibling = {
  bin: ch => ch === 48 || ch === 49,
  oct: ch => ch >= 48 && ch <= 55,
  dec: ch => ch >= 48 && ch <= 57,
  hex: ch => ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102
};
function readStringContents(type, input, pos, lineStart, curLine, errors) {
  const initialPos = pos;
  const initialLineStart = lineStart;
  const initialCurLine = curLine;
  let out = "";
  let firstInvalidLoc = null;
  let chunkStart = pos;
  const {
    length
  } = input;
  for (;;) {
    if (pos >= length) {
      errors.unterminated(initialPos, initialLineStart, initialCurLine);
      out += input.slice(chunkStart, pos);
      break;
    }
    const ch = input.charCodeAt(pos);
    if (isStringEnd(type, ch, input, pos)) {
      out += input.slice(chunkStart, pos);
      break;
    }
    if (ch === 92) {
      out += input.slice(chunkStart, pos);
      const res = readEscapedChar(input, pos, lineStart, curLine, type === "template", errors);
      if (res.ch === null && !firstInvalidLoc) {
        firstInvalidLoc = {
          pos,
          lineStart,
          curLine
        };
      } else {
        out += res.ch;
      }
      ({
        pos,
        lineStart,
        curLine
      } = res);
      chunkStart = pos;
    } else if (ch === 8232 || ch === 8233) {
      ++pos;
      ++curLine;
      lineStart = pos;
    } else if (ch === 10 || ch === 13) {
      if (type === "template") {
        out += input.slice(chunkStart, pos) + "\n";
        ++pos;
        if (ch === 13 && input.charCodeAt(pos) === 10) {
          ++pos;
        }
        ++curLine;
        chunkStart = lineStart = pos;
      } else {
        errors.unterminated(initialPos, initialLineStart, initialCurLine);
      }
    } else {
      ++pos;
    }
  }
  return {
    pos,
    str: out,
    firstInvalidLoc,
    lineStart,
    curLine,
    containsInvalid: !!firstInvalidLoc
  };
}
function isStringEnd(type, ch, input, pos) {
  if (type === "template") {
    return ch === 96 || ch === 36 && input.charCodeAt(pos + 1) === 123;
  }
  return ch === (type === "double" ? 34 : 39);
}
function readEscapedChar(input, pos, lineStart, curLine, inTemplate, errors) {
  const throwOnInvalid = !inTemplate;
  pos++;
  const res = ch => ({
    pos,
    ch,
    lineStart,
    curLine
  });
  const ch = input.charCodeAt(pos++);
  switch (ch) {
    case 110:
      return res("\n");
    case 114:
      return res("\r");
    case 120:
      {
        let code;
        ({
          code,
          pos
        } = readHexChar(input, pos, lineStart, curLine, 2, false, throwOnInvalid, errors));
        return res(code === null ? null : String.fromCharCode(code));
      }
    case 117:
      {
        let code;
        ({
          code,
          pos
        } = readCodePoint(input, pos, lineStart, curLine, throwOnInvalid, errors));
        return res(code === null ? null : String.fromCodePoint(code));
      }
    case 116:
      return res("\t");
    case 98:
      return res("\b");
    case 118:
      return res("\u000b");
    case 102:
      return res("\f");
    case 13:
      if (input.charCodeAt(pos) === 10) {
        ++pos;
      }
    case 10:
      lineStart = pos;
      ++curLine;
    case 8232:
    case 8233:
      return res("");
    case 56:
    case 57:
      if (inTemplate) {
        return res(null);
      } else {
        errors.strictNumericEscape(pos - 1, lineStart, curLine);
      }
    default:
      if (ch >= 48 && ch <= 55) {
        const startPos = pos - 1;
        const match = /^[0-7]+/.exec(input.slice(startPos, pos + 2));
        let octalStr = match[0];
        let octal = parseInt(octalStr, 8);
        if (octal > 255) {
          octalStr = octalStr.slice(0, -1);
          octal = parseInt(octalStr, 8);
        }
        pos += octalStr.length - 1;
        const next = input.charCodeAt(pos);
        if (octalStr !== "0" || next === 56 || next === 57) {
          if (inTemplate) {
            return res(null);
          } else {
            errors.strictNumericEscape(startPos, lineStart, curLine);
          }
        }
        return res(String.fromCharCode(octal));
      }
      return res(String.fromCharCode(ch));
  }
}
function readHexChar(input, pos, lineStart, curLine, len, forceLen, throwOnInvalid, errors) {
  const initialPos = pos;
  let n;
  ({
    n,
    pos
  } = readInt(input, pos, lineStart, curLine, 16, len, forceLen, false, errors, !throwOnInvalid));
  if (n === null) {
    if (throwOnInvalid) {
      errors.invalidEscapeSequence(initialPos, lineStart, curLine);
    } else {
      pos = initialPos - 1;
    }
  }
  return {
    code: n,
    pos
  };
}
function readInt(input, pos, lineStart, curLine, radix, len, forceLen, allowNumSeparator, errors, bailOnError) {
  const start = pos;
  const forbiddenSiblings = radix === 16 ? forbiddenNumericSeparatorSiblings.hex : forbiddenNumericSeparatorSiblings.decBinOct;
  const isAllowedSibling = radix === 16 ? isAllowedNumericSeparatorSibling.hex : radix === 10 ? isAllowedNumericSeparatorSibling.dec : radix === 8 ? isAllowedNumericSeparatorSibling.oct : isAllowedNumericSeparatorSibling.bin;
  let invalid = false;
  let total = 0;
  for (let i = 0, e = len == null ? Infinity : len; i < e; ++i) {
    const code = input.charCodeAt(pos);
    let val;
    if (code === 95 && allowNumSeparator !== "bail") {
      const prev = input.charCodeAt(pos - 1);
      const next = input.charCodeAt(pos + 1);
      if (!allowNumSeparator) {
        if (bailOnError) return {
          n: null,
          pos
        };
        errors.numericSeparatorInEscapeSequence(pos, lineStart, curLine);
      } else if (Number.isNaN(next) || !isAllowedSibling(next) || forbiddenSiblings.has(prev) || forbiddenSiblings.has(next)) {
        if (bailOnError) return {
          n: null,
          pos
        };
        errors.unexpectedNumericSeparator(pos, lineStart, curLine);
      }
      ++pos;
      continue;
    }
    if (code >= 97) {
      val = code - 97 + 10;
    } else if (code >= 65) {
      val = code - 65 + 10;
    } else if (_isDigit(code)) {
      val = code - 48;
    } else {
      val = Infinity;
    }
    if (val >= radix) {
      if (val <= 9 && bailOnError) {
        return {
          n: null,
          pos
        };
      } else if (val <= 9 && errors.invalidDigit(pos, lineStart, curLine, radix)) {
        val = 0;
      } else if (forceLen) {
        val = 0;
        invalid = true;
      } else {
        break;
      }
    }
    ++pos;
    total = total * radix + val;
  }
  if (pos === start || len != null && pos - start !== len || invalid) {
    return {
      n: null,
      pos
    };
  }
  return {
    n: total,
    pos
  };
}
function readCodePoint(input, pos, lineStart, curLine, throwOnInvalid, errors) {
  const ch = input.charCodeAt(pos);
  let code;
  if (ch === 123) {
    ++pos;
    ({
      code,
      pos
    } = readHexChar(input, pos, lineStart, curLine, input.indexOf("}", pos) - pos, true, throwOnInvalid, errors));
    ++pos;
    if (code !== null && code > 0x10ffff) {
      if (throwOnInvalid) {
        errors.invalidCodePoint(pos, lineStart, curLine);
      } else {
        return {
          code: null,
          pos
        };
      }
    }
  } else {
    ({
      code,
      pos
    } = readHexChar(input, pos, lineStart, curLine, 4, false, throwOnInvalid, errors));
  }
  return {
    code,
    pos
  };
}
function buildPosition(pos, lineStart, curLine) {
  return new Position(curLine, pos - lineStart, pos);
}
const VALID_REGEX_FLAGS = new Set([103, 109, 115, 105, 121, 117, 100, 118]);
class Token {
  constructor(state) {
    const startIndex = state.startIndex || 0;
    this.type = state.type;
    this.value = state.value;
    this.start = startIndex + state.start;
    this.end = startIndex + state.end;
    this.loc = new SourceLocation(state.startLoc, state.endLoc);
  }
}
class ClassScope {
  constructor() {
    this.privateNames = new Set();
    this.loneAccessors = new Map();
    this.undefinedPrivateNames = new Map();
  }
}
class ClassScopeHandler {
  constructor(parser) {
    this.parser = void 0;
    this.stack = [];
    this.undefinedPrivateNames = new Map();
    this.parser = parser;
  }
  current() {
    return this.stack[this.stack.length - 1];
  }
  enter() {
    this.stack.push(new ClassScope());
  }
  exit() {
    const oldClassScope = this.stack.pop();
    const current = this.current();
    for (const [name, loc] of Array.from(oldClassScope.undefinedPrivateNames)) {
      if (current) {
        if (!current.undefinedPrivateNames.has(name)) {
          current.undefinedPrivateNames.set(name, loc);
        }
      } else {
        this.parser.raise(Errors.InvalidPrivateFieldResolution, loc, {
          identifierName: name
        });
      }
    }
  }
  declarePrivateName(name, elementType, loc) {
    const {
      privateNames,
      loneAccessors,
      undefinedPrivateNames
    } = this.current();
    let redefined = privateNames.has(name);
    if (elementType & 3) {
      const accessor = redefined && loneAccessors.get(name);
      if (accessor) {
        const oldStatic = accessor & 4;
        const newStatic = elementType & 4;
        const oldKind = accessor & 3;
        const newKind = elementType & 3;
        redefined = oldKind === newKind || oldStatic !== newStatic;
        if (!redefined) loneAccessors.delete(name);
      } else if (!redefined) {
        loneAccessors.set(name, elementType);
      }
    }
    if (redefined) {
      this.parser.raise(Errors.PrivateNameRedeclaration, loc, {
        identifierName: name
      });
    }
    privateNames.add(name);
    undefinedPrivateNames.delete(name);
  }
  usePrivateName(name, loc) {
    let classScope;
    for (classScope of this.stack) {
      if (classScope.privateNames.has(name)) return;
    }
    if (classScope) {
      classScope.undefinedPrivateNames.set(name, loc);
    } else {
      this.parser.raise(Errors.InvalidPrivateFieldResolution, loc, {
        identifierName: name
      });
    }
  }
}
class ExpressionScope {
  constructor(type = 0) {
    this.type = type;
  }
  canBeArrowParameterDeclaration() {
    return this.type === 2 || this.type === 1;
  }
  isCertainlyParameterDeclaration() {
    return this.type === 3;
  }
}
class ArrowHeadParsingScope extends ExpressionScope {
  constructor(type) {
    super(type);
    this.declarationErrors = new Map();
  }
  recordDeclarationError(ParsingErrorClass, at) {
    const index = at.index;
    this.declarationErrors.set(index, [ParsingErrorClass, at]);
  }
  clearDeclarationError(index) {
    this.declarationErrors.delete(index);
  }
  iterateErrors(iterator) {
    this.declarationErrors.forEach(iterator);
  }
}
class ExpressionScopeHandler {
  constructor(parser) {
    this.parser = void 0;
    this.stack = [new ExpressionScope()];
    this.parser = parser;
  }
  enter(scope) {
    this.stack.push(scope);
  }
  exit() {
    this.stack.pop();
  }
  recordParameterInitializerError(toParseError, node) {
    const origin = node.loc.start;
    const {
      stack
    } = this;
    let i = stack.length - 1;
    let scope = stack[i];
    while (!scope.isCertainlyParameterDeclaration()) {
      if (scope.canBeArrowParameterDeclaration()) {
        scope.recordDeclarationError(toParseError, origin);
      } else {
        return;
      }
      scope = stack[--i];
    }
    this.parser.raise(toParseError, origin);
  }
  recordArrowParameterBindingError(error, node) {
    const {
      stack
    } = this;
    const scope = stack[stack.length - 1];
    const origin = node.loc.start;
    if (scope.isCertainlyParameterDeclaration()) {
      this.parser.raise(error, origin);
    } else if (scope.canBeArrowParameterDeclaration()) {
      scope.recordDeclarationError(error, origin);
    } else {
      return;
    }
  }
  recordAsyncArrowParametersError(at) {
    const {
      stack
    } = this;
    let i = stack.length - 1;
    let scope = stack[i];
    while (scope.canBeArrowParameterDeclaration()) {
      if (scope.type === 2) {
        scope.recordDeclarationError(Errors.AwaitBindingIdentifier, at);
      }
      scope = stack[--i];
    }
  }
  validateAsPattern() {
    const {
      stack
    } = this;
    const currentScope = stack[stack.length - 1];
    if (!currentScope.canBeArrowParameterDeclaration()) return;
    currentScope.iterateErrors(([toParseError, loc]) => {
      this.parser.raise(toParseError, loc);
      let i = stack.length - 2;
      let scope = stack[i];
      while (scope.canBeArrowParameterDeclaration()) {
        scope.clearDeclarationError(loc.index);
        scope = stack[--i];
      }
    });
  }
}
function newParameterDeclarationScope() {
  return new ExpressionScope(3);
}
function newArrowHeadScope() {
  return new ArrowHeadParsingScope(1);
}
function newAsyncArrowScope() {
  return new ArrowHeadParsingScope(2);
}
function newExpressionScope() {
  return new ExpressionScope();
}
class ExpressionErrors {
  constructor() {
    this.shorthandAssignLoc = null;
    this.doubleProtoLoc = null;
    this.privateKeyLoc = null;
    this.optionalParametersLoc = null;
  }
}
class Node {
  constructor(parser, pos, loc) {
    this.type = "";
    this.start = pos;
    this.end = 0;
    this.loc = new SourceLocation(loc);
    if ((parser == null ? void 0 : parser.optionFlags) & 128) this.range = [pos, 0];
    if (parser != null && parser.filename) this.loc.filename = parser.filename;
  }
}
const NodePrototype = Node.prototype;
{
  NodePrototype.__clone = function () {
    const newNode = new Node(undefined, this.start, this.loc.start);
    const keys = Object.keys(this);
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i];
      if (key !== "leadingComments" && key !== "trailingComments" && key !== "innerComments") {
        newNode[key] = this[key];
      }
    }
    return newNode;
  };
}
const unwrapParenthesizedExpression = node => {
  return node.type === "ParenthesizedExpression" ? unwrapParenthesizedExpression(node.expression) : node;
};
function nonNull(x) {
  if (x == null) {
    throw new Error(`Unexpected ${x} value.`);
  }
  return x;
}
function assert(x) {
  if (!x) {
    throw new Error("Assert fail");
  }
}
const TSErrors = ParseErrorEnum`typescript`({
  AbstractMethodHasImplementation: ({
    methodName
  }) => `Method '${methodName}' cannot have an implementation because it is marked abstract.`,
  AbstractPropertyHasInitializer: ({
    propertyName
  }) => `Property '${propertyName}' cannot have an initializer because it is marked abstract.`,
  AccessorCannotBeOptional: "An 'accessor' property cannot be declared optional.",
  AccessorCannotDeclareThisParameter: "'get' and 'set' accessors cannot declare 'this' parameters.",
  AccessorCannotHaveTypeParameters: "An accessor cannot have type parameters.",
  ClassMethodHasDeclare: "Class methods cannot have the 'declare' modifier.",
  ClassMethodHasReadonly: "Class methods cannot have the 'readonly' modifier.",
  ConstInitializerMustBeStringOrNumericLiteralOrLiteralEnumReference: "A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference.",
  ConstructorHasTypeParameters: "Type parameters cannot appear on a constructor declaration.",
  DeclareAccessor: ({
    kind
  }) => `'declare' is not allowed in ${kind}ters.`,
  DeclareClassFieldHasInitializer: "Initializers are not allowed in ambient contexts.",
  DeclareFunctionHasImplementation: "An implementation cannot be declared in ambient contexts.",
  DuplicateAccessibilityModifier: ({
    modifier
  }) => `Accessibility modifier already seen.`,
  DuplicateModifier: ({
    modifier
  }) => `Duplicate modifier: '${modifier}'.`,
  EmptyHeritageClauseType: ({
    token
  }) => `'${token}' list cannot be empty.`,
  EmptyTypeArguments: "Type argument list cannot be empty.",
  EmptyTypeParameters: "Type parameter list cannot be empty.",
  ExpectedAmbientAfterExportDeclare: "'export declare' must be followed by an ambient declaration.",
  ImportAliasHasImportType: "An import alias can not use 'import type'.",
  ImportReflectionHasImportType: "An `import module` declaration can not use `type` modifier",
  IncompatibleModifiers: ({
    modifiers
  }) => `'${modifiers[0]}' modifier cannot be used with '${modifiers[1]}' modifier.`,
  IndexSignatureHasAbstract: "Index signatures cannot have the 'abstract' modifier.",
  IndexSignatureHasAccessibility: ({
    modifier
  }) => `Index signatures cannot have an accessibility modifier ('${modifier}').`,
  IndexSignatureHasDeclare: "Index signatures cannot have the 'declare' modifier.",
  IndexSignatureHasOverride: "'override' modifier cannot appear on an index signature.",
  IndexSignatureHasStatic: "Index signatures cannot have the 'static' modifier.",
  InitializerNotAllowedInAmbientContext: "Initializers are not allowed in ambient contexts.",
  InvalidHeritageClauseType: ({
    token
  }) => `'${token}' list can only include identifiers or qualified-names with optional type arguments.`,
  InvalidModifierOnTypeMember: ({
    modifier
  }) => `'${modifier}' modifier cannot appear on a type member.`,
  InvalidModifierOnTypeParameter: ({
    modifier
  }) => `'${modifier}' modifier cannot appear on a type parameter.`,
  InvalidModifierOnTypeParameterPositions: ({
    modifier
  }) => `'${modifier}' modifier can only appear on a type parameter of a class, interface or type alias.`,
  InvalidModifiersOrder: ({
    orderedModifiers
  }) => `'${orderedModifiers[0]}' modifier must precede '${orderedModifiers[1]}' modifier.`,
  InvalidPropertyAccessAfterInstantiationExpression: "Invalid property access after an instantiation expression. " + "You can either wrap the instantiation expression in parentheses, or delete the type arguments.",
  InvalidTupleMemberLabel: "Tuple members must be labeled with a simple identifier.",
  MissingInterfaceName: "'interface' declarations must be followed by an identifier.",
  NonAbstractClassHasAbstractMethod: "Abstract methods can only appear within an abstract class.",
  NonClassMethodPropertyHasAbstractModifer: "'abstract' modifier can only appear on a class, method, or property declaration.",
  OptionalTypeBeforeRequired: "A required element cannot follow an optional element.",
  OverrideNotInSubClass: "This member cannot have an 'override' modifier because its containing class does not extend another class.",
  PatternIsOptional: "A binding pattern parameter cannot be optional in an implementation signature.",
  PrivateElementHasAbstract: "Private elements cannot have the 'abstract' modifier.",
  PrivateElementHasAccessibility: ({
    modifier
  }) => `Private elements cannot have an accessibility modifier ('${modifier}').`,
  ReadonlyForMethodSignature: "'readonly' modifier can only appear on a property declaration or index signature.",
  ReservedArrowTypeParam: "This syntax is reserved in files with the .mts or .cts extension. Add a trailing comma, as in `<T,>() => ...`.",
  ReservedTypeAssertion: "This syntax is reserved in files with the .mts or .cts extension. Use an `as` expression instead.",
  SetAccessorCannotHaveOptionalParameter: "A 'set' accessor cannot have an optional parameter.",
  SetAccessorCannotHaveRestParameter: "A 'set' accessor cannot have rest parameter.",
  SetAccessorCannotHaveReturnType: "A 'set' accessor cannot have a return type annotation.",
  SingleTypeParameterWithoutTrailingComma: ({
    typeParameterName
  }) => `Single type parameter ${typeParameterName} should have a trailing comma. Example usage: <${typeParameterName},>.`,
  StaticBlockCannotHaveModifier: "Static class blocks cannot have any modifier.",
  TupleOptionalAfterType: "A labeled tuple optional element must be declared using a question mark after the name and before the colon (`name?: type`), rather than after the type (`name: type?`).",
  TypeAnnotationAfterAssign: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.",
  TypeImportCannotSpecifyDefaultAndNamed: "A type-only import can specify a default import or named bindings, but not both.",
  TypeModifierIsUsedInTypeExports: "The 'type' modifier cannot be used on a named export when 'export type' is used on its export statement.",
  TypeModifierIsUsedInTypeImports: "The 'type' modifier cannot be used on a named import when 'import type' is used on its import statement.",
  UnexpectedParameterModifier: "A parameter property is only allowed in a constructor implementation.",
  UnexpectedReadonly: "'readonly' type modifier is only permitted on array and tuple literal types.",
  UnexpectedTypeAnnotation: "Did not expect a type annotation here.",
  UnexpectedTypeCastInParameter: "Unexpected type cast in parameter position.",
  UnsupportedImportTypeArgument: "Argument in a type import must be a string literal.",
  UnsupportedParameterPropertyKind: "A parameter property may not be declared using a binding pattern.",
  UnsupportedSignatureParameterKind: ({
    type
  }) => `Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got ${type}.`
});
function keywordTypeFromName(value) {
  switch (value) {
    case "any":
      return "TSAnyKeyword";
    case "boolean":
      return "TSBooleanKeyword";
    case "bigint":
      return "TSBigIntKeyword";
    case "never":
      return "TSNeverKeyword";
    case "number":
      return "TSNumberKeyword";
    case "object":
      return "TSObjectKeyword";
    case "string":
      return "TSStringKeyword";
    case "symbol":
      return "TSSymbolKeyword";
    case "undefined":
      return "TSUndefinedKeyword";
    case "unknown":
      return "TSUnknownKeyword";
    default:
      return undefined;
  }
}
function tsIsAccessModifier(modifier) {
  return modifier === "private" || modifier === "public" || modifier === "protected";
}
function tsIsVarianceAnnotations(modifier) {
  return modifier === "in" || modifier === "out";
}
var typescript = superClass => class typescript extends superClass {
  constructor() {
    super(...arguments);
    _typescript_constructor(...arguments);
    _Parser_constructor_dynamic = _typescript_constructor.bind(null, _Parser_constructor_dynamic);
    _Parser_getScopeHandler_dynamic = _typescript_getScopeHandler.bind(null, _Parser_getScopeHandler_dynamic);
    _Parser_parseTemplateSubstitution_dynamic = _typescript_parseTemplateSubstitution.bind(null, _Parser_parseTemplateSubstitution_dynamic);
    _Parser_isExportDefaultSpecifier_dynamic = _typescript_isExportDefaultSpecifier.bind(null, _Parser_isExportDefaultSpecifier_dynamic);
    _Parser_parseBindingElement_dynamic = _typescript_parseBindingElement.bind(null, _Parser_parseBindingElement_dynamic);
    _Parser_isSimpleParameter_dynamic = _typescript_isSimpleParameter.bind(null, _Parser_isSimpleParameter_dynamic);
    _Parser_setArrowFunctionParameters_dynamic = _typescript_setArrowFunctionParameters.bind(null, _Parser_setArrowFunctionParameters_dynamic);
    _Parser_parseFunctionBodyAndFinish_dynamic = _typescript_parseFunctionBodyAndFinish.bind(null, _Parser_parseFunctionBodyAndFinish_dynamic);
    _Parser_registerFunctionStatementId_dynamic = _typescript_registerFunctionStatementId.bind(null, _Parser_registerFunctionStatementId_dynamic);
    _Parser_toReferencedList_dynamic = _typescript_toReferencedList.bind(null, _Parser_toReferencedList_dynamic);
    _Parser_parseArrayLike_dynamic = _typescript_parseArrayLike.bind(null, _Parser_parseArrayLike_dynamic);
    _Parser_parseSubscript_dynamic = _typescript_parseSubscript.bind(null, _Parser_parseSubscript_dynamic);
    _Parser_parseNewCallee_dynamic = _typescript_parseNewCallee.bind(null, _Parser_parseNewCallee_dynamic);
    _Parser_parseExprOp_dynamic = _typescript_parseExprOp.bind(null, _Parser_parseExprOp_dynamic);
    _Parser_checkReservedWord_dynamic = _typescript_checkReservedWord.bind(null, _Parser_checkReservedWord_dynamic);
    _Parser_checkImportReflection_dynamic = _typescript_checkImportReflection.bind(null, _Parser_checkImportReflection_dynamic);
    _Parser_checkDuplicateExports_dynamic = _typescript_checkDuplicateExports.bind(null, _Parser_checkDuplicateExports_dynamic);
    _Parser_isPotentialImportPhase_dynamic = _typescript_isPotentialImportPhase.bind(null, _Parser_isPotentialImportPhase_dynamic);
    _Parser_applyImportPhase_dynamic = _typescript_applyImportPhase.bind(null, _Parser_applyImportPhase_dynamic);
    _Parser_parseImport_dynamic = _typescript_parseImport.bind(null, _Parser_parseImport_dynamic);
    _Parser_parseExport_dynamic = _typescript_parseExport.bind(null, _Parser_parseExport_dynamic);
    _Parser_parseExportDefaultExpression_dynamic = _typescript_parseExportDefaultExpression.bind(null, _Parser_parseExportDefaultExpression_dynamic);
    _Parser_parseVarStatement_dynamic = _typescript_parseVarStatement.bind(null, _Parser_parseVarStatement_dynamic);
    _Parser_parseStatementContent_dynamic = _typescript_parseStatementContent.bind(null, _Parser_parseStatementContent_dynamic);
    _Parser_parseClassMember_dynamic = _typescript_parseClassMember.bind(null, _Parser_parseClassMember_dynamic);
    _Parser_parseClassMemberWithIsStatic_dynamic = _typescript_parseClassMemberWithIsStatic.bind(null, _Parser_parseClassMemberWithIsStatic_dynamic);
    _Parser_parsePostMemberNameModifiers_dynamic = _typescript_parsePostMemberNameModifiers.bind(null, _Parser_parsePostMemberNameModifiers_dynamic);
    _Parser_parseExpressionStatement_dynamic = _typescript_parseExpressionStatement.bind(null, _Parser_parseExpressionStatement_dynamic);
    _Parser_shouldParseExportDeclaration_dynamic = _typescript_shouldParseExportDeclaration.bind(null, _Parser_shouldParseExportDeclaration_dynamic);
    _Parser_parseConditional_dynamic = _typescript_parseConditional.bind(null, _Parser_parseConditional_dynamic);
    _Parser_parseParenItem_dynamic = _typescript_parseParenItem.bind(null, _Parser_parseParenItem_dynamic);
    _Parser_parseExportDeclaration_dynamic = _typescript_parseExportDeclaration.bind(null, _Parser_parseExportDeclaration_dynamic);
    _Parser_parseClassId_dynamic = _typescript_parseClassId.bind(null, _Parser_parseClassId_dynamic);
    _Parser_parseClassProperty_dynamic = _typescript_parseClassProperty.bind(null, _Parser_parseClassProperty_dynamic);
    _Parser_parseClassPrivateProperty_dynamic = _typescript_parseClassPrivateProperty.bind(null, _Parser_parseClassPrivateProperty_dynamic);
    _Parser_parseClassAccessorProperty_dynamic = _typescript_parseClassAccessorProperty.bind(null, _Parser_parseClassAccessorProperty_dynamic);
    _Parser_pushClassMethod_dynamic = _typescript_pushClassMethod.bind(null, _Parser_pushClassMethod_dynamic);
    _Parser_pushClassPrivateMethod_dynamic = _typescript_pushClassPrivateMethod.bind(null, _Parser_pushClassPrivateMethod_dynamic);
    _Parser_declareClassPrivateMethodInScope_dynamic = _typescript_declareClassPrivateMethodInScope.bind(null, _Parser_declareClassPrivateMethodInScope_dynamic);
    _Parser_parseClassSuper_dynamic = _typescript_parseClassSuper.bind(null, _Parser_parseClassSuper_dynamic);
    _Parser_parseObjPropValue_dynamic = _typescript_parseObjPropValue.bind(null, _Parser_parseObjPropValue_dynamic);
    _Parser_parseFunctionParams_dynamic = _typescript_parseFunctionParams.bind(null, _Parser_parseFunctionParams_dynamic);
    _Parser_parseVarId_dynamic = _typescript_parseVarId.bind(null, _Parser_parseVarId_dynamic);
    _Parser_parseAsyncArrowFromCallExpression_dynamic = _typescript_parseAsyncArrowFromCallExpression.bind(null, _Parser_parseAsyncArrowFromCallExpression_dynamic);
    _Parser_parseMaybeAssign_dynamic = _typescript_parseMaybeAssign.bind(null, _Parser_parseMaybeAssign_dynamic);
    _Parser_parseMaybeUnary_dynamic = _typescript_parseMaybeUnary.bind(null, _Parser_parseMaybeUnary_dynamic);
    _Parser_parseArrow_dynamic = _typescript_parseArrow.bind(null, _Parser_parseArrow_dynamic);
    _Parser_parseFunctionParamType_dynamic = _typescript_parseFunctionParamType.bind(null, _Parser_parseFunctionParamType_dynamic);
    _Parser_isAssignable_dynamic = _typescript_isAssignable.bind(null, _Parser_isAssignable_dynamic);
    _Parser_toAssignable_dynamic = _typescript_toAssignable.bind(null, _Parser_toAssignable_dynamic);
    _Parser_checkToRestConversion_dynamic = _typescript_checkToRestConversion.bind(null, _Parser_checkToRestConversion_dynamic);
    _Parser_isValidLVal_dynamic = _typescript_isValidLVal.bind(null, _Parser_isValidLVal_dynamic);
    _Parser_parseBindingAtom_dynamic = _typescript_parseBindingAtom.bind(null, _Parser_parseBindingAtom_dynamic);
    _Parser_parseMaybeDecoratorArguments_dynamic = _typescript_parseMaybeDecoratorArguments.bind(null, _Parser_parseMaybeDecoratorArguments_dynamic);
    _Parser_checkCommaAfterRest_dynamic = _typescript_checkCommaAfterRest.bind(null, _Parser_checkCommaAfterRest_dynamic);
    _Parser_isClassMethod_dynamic = _typescript_isClassMethod.bind(null, _Parser_isClassMethod_dynamic);
    _Parser_isClassProperty_dynamic = _typescript_isClassProperty.bind(null, _Parser_isClassProperty_dynamic);
    _Parser_parseMaybeDefault_dynamic = _typescript_parseMaybeDefault.bind(null, _Parser_parseMaybeDefault_dynamic);
    _Parser_getTokenFromCode_dynamic = _typescript_getTokenFromCode.bind(null, _Parser_getTokenFromCode_dynamic);
    _Parser_reScan_lt_gt_dynamic = _typescript_reScan_lt_gt.bind(null, _Parser_reScan_lt_gt_dynamic);
    _Parser_reScan_lt_dynamic = _typescript_reScan_lt.bind(null, _Parser_reScan_lt_dynamic);
    _Parser_toAssignableListItem_dynamic = _typescript_toAssignableListItem.bind(null, _Parser_toAssignableListItem_dynamic);
    _Parser_typeCastToParameter_dynamic = _typescript_typeCastToParameter.bind(null, _Parser_typeCastToParameter_dynamic);
    _Parser_shouldParseArrow_dynamic = _typescript_shouldParseArrow.bind(null, _Parser_shouldParseArrow_dynamic);
    _Parser_shouldParseAsyncArrow_dynamic = _typescript_shouldParseAsyncArrow.bind(null, _Parser_shouldParseAsyncArrow_dynamic);
    _Parser_canHaveLeadingDecorator_dynamic = _typescript_canHaveLeadingDecorator.bind(null, _Parser_canHaveLeadingDecorator_dynamic);
    _Parser_jsxParseOpeningElementAfterName_dynamic = _typescript_jsxParseOpeningElementAfterName.bind(null, _Parser_jsxParseOpeningElementAfterName_dynamic);
    _Parser_getGetterSetterExpectedParamCount_dynamic = _typescript_getGetterSetterExpectedParamCount.bind(null, _Parser_getGetterSetterExpectedParamCount_dynamic);
    _Parser_parseCatchClauseParam_dynamic = _typescript_parseCatchClauseParam.bind(null, _Parser_parseCatchClauseParam_dynamic);
    _Parser_parseClass_dynamic = _typescript_parseClass.bind(null, _Parser_parseClass_dynamic);
    _Parser_parseMethod_dynamic = _typescript_parseMethod.bind(null, _Parser_parseMethod_dynamic);
    _Parser_parse_dynamic = _typescript_parse.bind(null, _Parser_parse_dynamic);
    _Parser_getExpression_dynamic = _typescript_getExpression.bind(null, _Parser_getExpression_dynamic);
    _Parser_parseExportSpecifier_dynamic = _typescript_parseExportSpecifier.bind(null, _Parser_parseExportSpecifier_dynamic);
    _Parser_parseImportSpecifier_dynamic = _typescript_parseImportSpecifier.bind(null, _Parser_parseImportSpecifier_dynamic);
    _Parser_fillOptionalPropertiesForTSESLint_dynamic = _typescript_fillOptionalPropertiesForTSESLint.bind(null, _Parser_fillOptionalPropertiesForTSESLint_dynamic);
  }
};
function isPossiblyLiteralEnum(expression) {
  if (expression.type !== "MemberExpression") return false;
  const {
    computed,
    property
  } = expression;
  if (computed && property.type !== "StringLiteral" && (property.type !== "TemplateLiteral" || property.expressions.length > 0)) {
    return false;
  }
  return isUncomputedMemberExpressionChain(expression.object);
}
function isValidAmbientConstInitializer(expression, estree) {
  var _expression$extra;
  const {
    type
  } = expression;
  if ((_expression$extra = expression.extra) != null && _expression$extra.parenthesized) {
    return false;
  }
  if (estree) {
    if (type === "Literal") {
      const {
        value
      } = expression;
      if (typeof value === "string" || typeof value === "boolean") {
        return true;
      }
    }
  } else {
    if (type === "StringLiteral" || type === "BooleanLiteral") {
      return true;
    }
  }
  if (isNumber(expression, estree) || isNegativeNumber(expression, estree)) {
    return true;
  }
  if (type === "TemplateLiteral" && expression.expressions.length === 0) {
    return true;
  }
  if (isPossiblyLiteralEnum(expression)) {
    return true;
  }
  return false;
}
function isNumber(expression, estree) {
  if (estree) {
    return expression.type === "Literal" && (typeof expression.value === "number" || "bigint" in expression);
  }
  return expression.type === "NumericLiteral" || expression.type === "BigIntLiteral";
}
function isNegativeNumber(expression, estree) {
  if (expression.type === "UnaryExpression") {
    const {
      operator,
      argument
    } = expression;
    if (operator === "-" && isNumber(argument, estree)) {
      return true;
    }
  }
  return false;
}
function isUncomputedMemberExpressionChain(expression) {
  if (expression.type === "Identifier") return true;
  if (expression.type !== "MemberExpression" || expression.computed) {
    return false;
  }
  return isUncomputedMemberExpressionChain(expression.object);
}
const PlaceholderErrors = ParseErrorEnum`placeholders`({
  ClassNameIsRequired: "A class name is required.",
  UnexpectedSpace: "Unexpected space in placeholder."
});
var placeholders = superClass => class placeholders extends superClass {
  constructor() {
    super(...arguments);
    _Parser_getTokenFromCode_dynamic = _placeholders_getTokenFromCode.bind(null, _Parser_getTokenFromCode_dynamic);
    _Parser_parseExprAtom_dynamic = _placeholders_parseExprAtom.bind(null, _Parser_parseExprAtom_dynamic);
    _Parser_parseIdentifier_dynamic = _placeholders_parseIdentifier.bind(null, _Parser_parseIdentifier_dynamic);
    _Parser_checkReservedWord_dynamic = _placeholders_checkReservedWord.bind(null, _Parser_checkReservedWord_dynamic);
    _Parser_cloneIdentifier_dynamic = _placeholders_cloneIdentifier.bind(null, _Parser_cloneIdentifier_dynamic);
    _Parser_cloneStringLiteral_dynamic = _placeholders_cloneStringLiteral.bind(null, _Parser_cloneStringLiteral_dynamic);
    _Parser_parseBindingAtom_dynamic = _placeholders_parseBindingAtom.bind(null, _Parser_parseBindingAtom_dynamic);
    _Parser_isValidLVal_dynamic = _placeholders_isValidLVal.bind(null, _Parser_isValidLVal_dynamic);
    _Parser_toAssignable_dynamic = _placeholders_toAssignable.bind(null, _Parser_toAssignable_dynamic);
    _Parser_chStartsBindingIdentifier_dynamic = _placeholders_chStartsBindingIdentifier.bind(null, _Parser_chStartsBindingIdentifier_dynamic);
    _Parser_verifyBreakContinue_dynamic = _placeholders_verifyBreakContinue.bind(null, _Parser_verifyBreakContinue_dynamic);
    _Parser_parseExpressionStatement_dynamic = _placeholders_parseExpressionStatement.bind(null, _Parser_parseExpressionStatement_dynamic);
    _Parser_parseBlock_dynamic = _placeholders_parseBlock.bind(null, _Parser_parseBlock_dynamic);
    _Parser_parseFunctionId_dynamic = _placeholders_parseFunctionId.bind(null, _Parser_parseFunctionId_dynamic);
    _Parser_parseClass_dynamic = _placeholders_parseClass.bind(null, _Parser_parseClass_dynamic);
    _Parser_parseExport_dynamic = _placeholders_parseExport.bind(null, _Parser_parseExport_dynamic);
    _Parser_isExportDefaultSpecifier_dynamic = _placeholders_isExportDefaultSpecifier.bind(null, _Parser_isExportDefaultSpecifier_dynamic);
    _Parser_maybeParseExportDefaultSpecifier_dynamic = _placeholders_maybeParseExportDefaultSpecifier.bind(null, _Parser_maybeParseExportDefaultSpecifier_dynamic);
    _Parser_checkExport_dynamic = _placeholders_checkExport.bind(null, _Parser_checkExport_dynamic);
    _Parser_parseImport_dynamic = _placeholders_parseImport.bind(null, _Parser_parseImport_dynamic);
    _Parser_parseImportSource_dynamic = _placeholders_parseImportSource.bind(null, _Parser_parseImportSource_dynamic);
  }
};
var v8intrinsic = superClass => class v8intrinsic extends superClass {
  constructor() {
    super(...arguments);
    _Parser_parseExprAtom_dynamic = _v8intrinsic_parseExprAtom.bind(null, _Parser_parseExprAtom_dynamic);
  }
};
const PIPELINE_PROPOSALS = ["minimal", "fsharp", "hack", "smart"];
const TOPIC_TOKENS = ["^^", "@@", "^", "%", "#"];
function validatePlugins(pluginsMap) {
  if (pluginsMap.has("decorators")) {
    if (pluginsMap.has("decorators-legacy")) {
      throw new Error("Cannot use the decorators and decorators-legacy plugin together");
    }
    const decoratorsBeforeExport = pluginsMap.get("decorators").decoratorsBeforeExport;
    if (decoratorsBeforeExport != null && typeof decoratorsBeforeExport !== "boolean") {
      throw new Error("'decoratorsBeforeExport' must be a boolean, if specified.");
    }
    const allowCallParenthesized = pluginsMap.get("decorators").allowCallParenthesized;
    if (allowCallParenthesized != null && typeof allowCallParenthesized !== "boolean") {
      throw new Error("'allowCallParenthesized' must be a boolean.");
    }
  }
  if (pluginsMap.has("flow") && pluginsMap.has("typescript")) {
    throw new Error("Cannot combine flow and typescript plugins.");
  }
  if (pluginsMap.has("placeholders") && pluginsMap.has("v8intrinsic")) {
    throw new Error("Cannot combine placeholders and v8intrinsic plugins.");
  }
  if (pluginsMap.has("pipelineOperator")) {
    var _pluginsMap$get2;
    const proposal = pluginsMap.get("pipelineOperator").proposal;
    if (!PIPELINE_PROPOSALS.includes(proposal)) {
      const proposalList = PIPELINE_PROPOSALS.map(p => `"${p}"`).join(", ");
      throw new Error(`"pipelineOperator" requires "proposal" option whose value must be one of: ${proposalList}.`);
    }
    if (proposal === "hack") {
      if (pluginsMap.has("placeholders")) {
        throw new Error("Cannot combine placeholders plugin and Hack-style pipes.");
      }
      if (pluginsMap.has("v8intrinsic")) {
        throw new Error("Cannot combine v8intrinsic plugin and Hack-style pipes.");
      }
      const topicToken = pluginsMap.get("pipelineOperator").topicToken;
      if (!TOPIC_TOKENS.includes(topicToken)) {
        const tokenList = TOPIC_TOKENS.map(t => `"${t}"`).join(", ");
        throw new Error(`"pipelineOperator" in "proposal": "hack" mode also requires a "topicToken" option whose value must be one of: ${tokenList}.`);
      }
      {
        var _pluginsMap$get;
        if (topicToken === "#" && ((_pluginsMap$get = pluginsMap.get("recordAndTuple")) == null ? void 0 : _pluginsMap$get.syntaxType) === "hash") {
          throw new Error(`Plugin conflict between \`["pipelineOperator", { proposal: "hack", topicToken: "#" }]\` and \`${JSON.stringify(["recordAndTuple", pluginsMap.get("recordAndTuple")])}\`.`);
        }
      }
    } else if (proposal === "smart" && ((_pluginsMap$get2 = pluginsMap.get("recordAndTuple")) == null ? void 0 : _pluginsMap$get2.syntaxType) === "hash") {
      throw new Error(`Plugin conflict between \`["pipelineOperator", { proposal: "smart" }]\` and \`${JSON.stringify(["recordAndTuple", pluginsMap.get("recordAndTuple")])}\`.`);
    }
  }
  if (pluginsMap.has("moduleAttributes")) {
    {
      if (pluginsMap.has("deprecatedImportAssert") || pluginsMap.has("importAssertions")) {
        throw new Error("Cannot combine importAssertions, deprecatedImportAssert and moduleAttributes plugins.");
      }
      const moduleAttributesVersionPluginOption = pluginsMap.get("moduleAttributes").version;
      if (moduleAttributesVersionPluginOption !== "may-2020") {
        throw new Error("The 'moduleAttributes' plugin requires a 'version' option," + " representing the last proposal update. Currently, the" + " only supported value is 'may-2020'.");
      }
    }
  }
  if (pluginsMap.has("importAssertions")) {
    if (pluginsMap.has("deprecatedImportAssert")) {
      throw new Error("Cannot combine importAssertions and deprecatedImportAssert plugins.");
    }
  }
  if (!pluginsMap.has("deprecatedImportAssert") && pluginsMap.has("importAttributes") && pluginsMap.get("importAttributes").deprecatedAssertSyntax) {
    {
      pluginsMap.set("deprecatedImportAssert", {});
    }
  }
  if (pluginsMap.has("recordAndTuple")) {
    {
      const syntaxType = pluginsMap.get("recordAndTuple").syntaxType;
      if (syntaxType != null) {
        const RECORD_AND_TUPLE_SYNTAX_TYPES = ["hash", "bar"];
        if (!RECORD_AND_TUPLE_SYNTAX_TYPES.includes(syntaxType)) {
          throw new Error("The 'syntaxType' option of the 'recordAndTuple' plugin must be one of: " + RECORD_AND_TUPLE_SYNTAX_TYPES.map(p => `'${p}'`).join(", "));
        }
      }
    }
  }
  if (pluginsMap.has("asyncDoExpressions") && !pluginsMap.has("doExpressions")) {
    const error = new Error("'asyncDoExpressions' requires 'doExpressions', please add 'doExpressions' to parser plugins.");
    error.missingPlugins = "doExpressions";
    throw error;
  }
  if (pluginsMap.has("optionalChainingAssign") && pluginsMap.get("optionalChainingAssign").version !== "2023-07") {
    throw new Error("The 'optionalChainingAssign' plugin requires a 'version' option," + " representing the last proposal update. Currently, the" + " only supported value is '2023-07'.");
  }
}
const mixinPlugins = {
  estree,
  jsx,
  flow,
  typescript,
  v8intrinsic,
  placeholders
};
const mixinPluginNames = Object.keys(mixinPlugins);
const loopLabel = {
    kind: 1
  },
  switchLabel = {
    kind: 2
  };
const loneSurrogate = /[\uD800-\uDFFF]/u;
const keywordRelationalOperator = /in(?:stanceof)?/y;
function babel7CompatTokens(tokens, input, startIndex) {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const {
      type
    } = token;
    if (typeof type === "number") {
      {
        if (type === 139) {
          const {
            loc,
            start,
            value,
            end
          } = token;
          const hashEndPos = start + 1;
          const hashEndLoc = createPositionWithColumnOffset(loc.start, 1);
          tokens.splice(i, 1, new Token({
            type: getExportedToken(27),
            value: "#",
            start: start,
            end: hashEndPos,
            startLoc: loc.start,
            endLoc: hashEndLoc
          }), new Token({
            type: getExportedToken(132),
            value: value,
            start: hashEndPos,
            end: end,
            startLoc: hashEndLoc,
            endLoc: loc.end
          }));
          i++;
          continue;
        }
        if (tokenIsTemplate(type)) {
          const {
            loc,
            start,
            value,
            end
          } = token;
          const backquoteEnd = start + 1;
          const backquoteEndLoc = createPositionWithColumnOffset(loc.start, 1);
          let startToken;
          if (input.charCodeAt(start - startIndex) === 96) {
            startToken = new Token({
              type: getExportedToken(22),
              value: "`",
              start: start,
              end: backquoteEnd,
              startLoc: loc.start,
              endLoc: backquoteEndLoc
            });
          } else {
            startToken = new Token({
              type: getExportedToken(8),
              value: "}",
              start: start,
              end: backquoteEnd,
              startLoc: loc.start,
              endLoc: backquoteEndLoc
            });
          }
          let templateValue, templateElementEnd, templateElementEndLoc, endToken;
          if (type === 24) {
            templateElementEnd = end - 1;
            templateElementEndLoc = createPositionWithColumnOffset(loc.end, -1);
            templateValue = value === null ? null : value.slice(1, -1);
            endToken = new Token({
              type: getExportedToken(22),
              value: "`",
              start: templateElementEnd,
              end: end,
              startLoc: templateElementEndLoc,
              endLoc: loc.end
            });
          } else {
            templateElementEnd = end - 2;
            templateElementEndLoc = createPositionWithColumnOffset(loc.end, -2);
            templateValue = value === null ? null : value.slice(1, -2);
            endToken = new Token({
              type: getExportedToken(23),
              value: "${",
              start: templateElementEnd,
              end: end,
              startLoc: templateElementEndLoc,
              endLoc: loc.end
            });
          }
          tokens.splice(i, 1, startToken, new Token({
            type: getExportedToken(20),
            value: templateValue,
            start: backquoteEnd,
            end: templateElementEnd,
            startLoc: backquoteEndLoc,
            endLoc: templateElementEndLoc
          }), endToken);
          i += 2;
          continue;
        }
      }
      token.type = getExportedToken(type);
    }
  }
  return tokens;
}
class Parser {
  constructor() {
    _Parser_constructor_dynamic = _BaseParser_constructor;
    _Parser_getScopeHandler_dynamic = _Parser_getScopeHandler;
    _Parser_parse_dynamic = _Parser_parse;
    _Parser_parseTopLevel_dynamic = _StatementParser_parseTopLevel;
    _Parser_chStartsBindingIdentifier_dynamic = _StatementParser_chStartsBindingIdentifier;
    _Parser_parseStatementLike_dynamic = _StatementParser_parseStatementLike;
    _Parser_parseStatementContent_dynamic = _StatementParser_parseStatementContent;
    _Parser_assertModuleNodeAllowed_dynamic = _StatementParser_assertModuleNodeAllowed;
    _Parser_canHaveLeadingDecorator_dynamic = _StatementParser_canHaveLeadingDecorator;
    _Parser_parseMaybeDecoratorArguments_dynamic = _StatementParser_parseMaybeDecoratorArguments;
    _Parser_verifyBreakContinue_dynamic = _StatementParser_verifyBreakContinue;
    _Parser_parseCatchClauseParam_dynamic = _StatementParser_parseCatchClauseParam;
    _Parser_parseVarStatement_dynamic = _StatementParser_parseVarStatement;
    _Parser_parseExpressionStatement_dynamic = _StatementParser_parseExpressionStatement;
    _Parser_parseBlock_dynamic = _StatementParser_parseBlock;
    _Parser_isValidDirective_dynamic = _StatementParser_isValidDirective;
    _Parser_parseBlockBody_dynamic = _StatementParser_parseBlockBody;
    _Parser_parseVarId_dynamic = _StatementParser_parseVarId;
    _Parser_parseFunctionId_dynamic = _StatementParser_parseFunctionId;
    _Parser_parseFunctionParams_dynamic = _StatementParser_parseFunctionParams;
    _Parser_registerFunctionStatementId_dynamic = _StatementParser_registerFunctionStatementId;
    _Parser_parseClass_dynamic = _StatementParser_parseClass;
    _Parser_isClassProperty_dynamic = _StatementParser_isClassProperty;
    _Parser_isClassMethod_dynamic = _StatementParser_isClassMethod;
    _Parser_nameIsConstructor_dynamic = _StatementParser_nameIsConstructor;
    _Parser_isNonstaticConstructor_dynamic = _StatementParser_isNonstaticConstructor;
    _Parser_parseClassMember_dynamic = _StatementParser_parseClassMember;
    _Parser_parseClassMemberWithIsStatic_dynamic = _StatementParser_parseClassMemberWithIsStatic;
    _Parser_pushClassMethod_dynamic = _StatementParser_pushClassMethod;
    _Parser_pushClassPrivateMethod_dynamic = _StatementParser_pushClassPrivateMethod;
    _Parser_declareClassPrivateMethodInScope_dynamic = _StatementParser_declareClassPrivateMethodInScope;
    _Parser_parsePostMemberNameModifiers_dynamic = _StatementParser_parsePostMemberNameModifiers;
    _Parser_parseClassPrivateProperty_dynamic = _StatementParser_parseClassPrivateProperty;
    _Parser_parseClassProperty_dynamic = _StatementParser_parseClassProperty;
    _Parser_parseClassAccessorProperty_dynamic = _StatementParser_parseClassAccessorProperty;
    _Parser_parseClassId_dynamic = _StatementParser_parseClassId;
    _Parser_parseClassSuper_dynamic = _StatementParser_parseClassSuper;
    _Parser_parseExport_dynamic = _StatementParser_parseExport;
    _Parser_eatExportStar_dynamic = _StatementParser_eatExportStar;
    _Parser_maybeParseExportDefaultSpecifier_dynamic = _StatementParser_maybeParseExportDefaultSpecifier;
    _Parser_maybeParseExportNamespaceSpecifier_dynamic = _StatementParser_maybeParseExportNamespaceSpecifier;
    _Parser_parseExportDefaultExpression_dynamic = _StatementParser_parseExportDefaultExpression;
    _Parser_parseExportDeclaration_dynamic = _StatementParser_parseExportDeclaration;
    _Parser_isExportDefaultSpecifier_dynamic = _StatementParser_isExportDefaultSpecifier;
    _Parser_shouldParseExportDeclaration_dynamic = _StatementParser_shouldParseExportDeclaration;
    _Parser_checkExport_dynamic = _StatementParser_checkExport;
    _Parser_checkDeclaration_dynamic = _StatementParser_checkDeclaration;
    _Parser_checkDuplicateExports_dynamic = _StatementParser_checkDuplicateExports;
    _Parser_parseExportSpecifier_dynamic = _StatementParser_parseExportSpecifier;
    _Parser_checkImportReflection_dynamic = _StatementParser_checkImportReflection;
    _Parser_isPotentialImportPhase_dynamic = _StatementParser_isPotentialImportPhase;
    _Parser_applyImportPhase_dynamic = _StatementParser_applyImportPhase;
    _Parser_parseImport_dynamic = _StatementParser_parseImport;
    _Parser_parseImportSource_dynamic = _StatementParser_parseImportSource;
    _Parser_parseImportSpecifierLocal_dynamic = _StatementParser_parseImportSpecifierLocal;
    _Parser_parseImportSpecifier_dynamic = _StatementParser_parseImportSpecifier;
    _Parser_getExpression_dynamic = _ExpressionParser_getExpression;
    _Parser_parseMaybeAssign_dynamic = _ExpressionParser_parseMaybeAssign;
    _Parser_parseConditional_dynamic = _ExpressionParser_parseConditional;
    _Parser_parseExprOp_dynamic = _ExpressionParser_parseExprOp;
    _Parser_parseMaybeUnary_dynamic = _ExpressionParser_parseMaybeUnary;
    _Parser_parseSubscripts_dynamic = _ExpressionParser_parseSubscripts;
    _Parser_parseSubscript_dynamic = _ExpressionParser_parseSubscript;
    _Parser_stopParseSubscript_dynamic = _ExpressionParser_stopParseSubscript;
    _Parser_parseMember_dynamic = _ExpressionParser_parseMember;
    _Parser_toReferencedArguments_dynamic = _ExpressionParser_toReferencedArguments;
    _Parser_finishCallExpression_dynamic = _ExpressionParser_finishCallExpression;
    _Parser_shouldParseAsyncArrow_dynamic = _ExpressionParser_shouldParseAsyncArrow;
    _Parser_parseAsyncArrowFromCallExpression_dynamic = _ExpressionParser_parseAsyncArrowFromCallExpression;
    _Parser_parseExprAtom_dynamic = _ExpressionParser_parseExprAtom;
    _Parser_parsePrivateName_dynamic = _ExpressionParser_parsePrivateName;
    _Parser_parseLiteral_dynamic = _ExpressionParser_parseLiteral;
    _Parser_parseStringLiteral_dynamic = _ExpressionParser_parseStringLiteral;
    _Parser_parseNumericLiteral_dynamic = _ExpressionParser_parseNumericLiteral;
    _Parser_parseBigIntLiteral_dynamic = _ExpressionParser_parseBigIntLiteral;
    _Parser_parseDecimalLiteral_dynamic = _ExpressionParser_parseDecimalLiteral;
    _Parser_parseRegExpLiteral_dynamic = _ExpressionParser_parseRegExpLiteral;
    _Parser_parseBooleanLiteral_dynamic = _ExpressionParser_parseBooleanLiteral;
    _Parser_parseNullLiteral_dynamic = _ExpressionParser_parseNullLiteral;
    _Parser_parseParenAndDistinguishExpression_dynamic = _ExpressionParser_parseParenAndDistinguishExpression;
    _Parser_shouldParseArrow_dynamic = _ExpressionParser_shouldParseArrow;
    _Parser_parseArrow_dynamic = _ExpressionParser_parseArrow;
    _Parser_parseParenItem_dynamic = _ExpressionParser_parseParenItem;
    _Parser_parseNewCallee_dynamic = _ExpressionParser_parseNewCallee;
    _Parser_parseTemplateSubstitution_dynamic = _ExpressionParser_parseTemplateSubstitution;
    _Parser_getGetterSetterExpectedParamCount_dynamic = _ExpressionParser_getGetterSetterExpectedParamCount;
    _Parser_getObjectOrClassMethodParams_dynamic = _ExpressionParser_getObjectOrClassMethodParams;
    _Parser_checkGetterSetterParams_dynamic = _ExpressionParser_checkGetterSetterParams;
    _Parser_parseObjectProperty_dynamic = _ExpressionParser_parseObjectProperty;
    _Parser_finishObjectProperty_dynamic = _ExpressionParser_finishObjectProperty;
    _Parser_parseObjPropValue_dynamic = _ExpressionParser_parseObjPropValue;
    _Parser_initFunction_dynamic = _ExpressionParser_initFunction;
    _Parser_parseMethod_dynamic = _ExpressionParser_parseMethod;
    _Parser_parseArrayLike_dynamic = _ExpressionParser_parseArrayLike;
    _Parser_setArrowFunctionParameters_dynamic = _ExpressionParser_setArrowFunctionParameters;
    _Parser_parseFunctionBodyAndFinish_dynamic = _ExpressionParser_parseFunctionBodyAndFinish;
    _Parser_parseFunctionBody_dynamic = _ExpressionParser_parseFunctionBody;
    _Parser_isSimpleParameter_dynamic = _ExpressionParser_isSimpleParameter;
    _Parser_checkParams_dynamic = _ExpressionParser_checkParams;
    _Parser_parseIdentifier_dynamic = _ExpressionParser_parseIdentifier;
    _Parser_checkReservedWord_dynamic = _ExpressionParser_checkReservedWord;
    _Parser_parsePropertyNamePrefixOperator_dynamic = _ExpressionParser_parsePropertyNamePrefixOperator;
    _Parser_toAssignable_dynamic = _LValParser_toAssignable;
    _Parser_toAssignableObjectExpressionProp_dynamic = _LValParser_toAssignableObjectExpressionProp;
    _Parser_toAssignableList_dynamic = _LValParser_toAssignableList;
    _Parser_toAssignableListItem_dynamic = _LValParser_toAssignableListItem;
    _Parser_isAssignable_dynamic = _LValParser_isAssignable;
    _Parser_toReferencedList_dynamic = _LValParser_toReferencedList;
    _Parser_parseBindingAtom_dynamic = _LValParser_parseBindingAtom;
    _Parser_parseBindingElement_dynamic = _LValParser_parseBindingElement;
    _Parser_parseFunctionParamType_dynamic = _LValParser_parseFunctionParamType;
    _Parser_parseMaybeDefault_dynamic = _LValParser_parseMaybeDefault;
    _Parser_isValidLVal_dynamic = _LValParser_isValidLVal;
    _Parser_isOptionalMemberExpression_dynamic = _LValParser_isOptionalMemberExpression;
    _Parser_checkToRestConversion_dynamic = _LValParser_checkToRestConversion;
    _Parser_checkCommaAfterRest_dynamic = _LValParser_checkCommaAfterRest;
    _Parser_finishNode_dynamic = _NodeUtils_finishNode;
    _Parser_finishNodeAt_dynamic = _NodeUtils_finishNodeAt;
    _Parser_resetStartLocation_dynamic = _NodeUtils_resetStartLocation;
    _Parser_resetEndLocation_dynamic = _NodeUtils_resetEndLocation;
    _Parser_castNodeTo_dynamic = _NodeUtils_castNodeTo;
    _Parser_cloneIdentifier_dynamic = _NodeUtils_cloneIdentifier;
    _Parser_cloneStringLiteral_dynamic = _NodeUtils_cloneStringLiteral;
    _Parser_isPrivateName_dynamic = _UtilParser_isPrivateName;
    _Parser_getPrivateNameSV_dynamic = _UtilParser_getPrivateNameSV;
    _Parser_hasPropertyAsPrivateName_dynamic = _UtilParser_hasPropertyAsPrivateName;
    _Parser_isObjectProperty_dynamic = _UtilParser_isObjectProperty;
    _Parser_isObjectMethod_dynamic = _UtilParser_isObjectMethod;
    _Parser_skipBlockComment_dynamic = _Tokenizer_skipBlockComment;
    _Parser_skipSpace_dynamic = _Tokenizer_skipSpace;
    _Parser_finishToken_dynamic = _Tokenizer_finishToken;
    _Parser_readToken_mult_modulo_dynamic = _Tokenizer_readToken_mult_modulo;
    _Parser_readToken_pipe_amp_dynamic = _Tokenizer_readToken_pipe_amp;
    _Parser_getTokenFromCode_dynamic = _Tokenizer_getTokenFromCode;
    _Parser_updateContext_dynamic = _Tokenizer_updateContext;
    _Parser_addComment_dynamic = _CommentsParser_addComment;
    _Parser_this = {};
    _Parser_constructor.apply(null, arguments);
  }
  parse() {
    return _Parser_parse_dynamic.apply(null, arguments);
  }
  parseExpression() {
    return _ExpressionParser_parseExpression.apply(null, arguments);
  }
}
function _BaseParser_constructor() {
  _Parser_this.sawUnambiguousESM = false;
  _Parser_this.ambiguousScriptDifferentAst = false;
}
function _BaseParser_sourceToOffsetPos(sourcePos) {
  return sourcePos + _Parser_this.startIndex;
}
function _BaseParser_offsetToSourcePos(offsetPos) {
  return offsetPos - _Parser_this.startIndex;
}
function _BaseParser_hasPlugin(pluginConfig) {
  if (typeof pluginConfig === "string") {
    return _Parser_this.plugins.has(pluginConfig);
  } else {
    const [pluginName, pluginOptions] = pluginConfig;
    if (!_BaseParser_hasPlugin(pluginName)) {
      return false;
    }
    const actualOptions = _Parser_this.plugins.get(pluginName);
    for (const key of Object.keys(pluginOptions)) {
      if ((actualOptions == null ? void 0 : actualOptions[key]) !== pluginOptions[key]) {
        return false;
      }
    }
    return true;
  }
}
function _BaseParser_getPluginOption(plugin, name) {
  var _this$plugins$get;
  return (_this$plugins$get = _Parser_this.plugins.get(plugin)) == null ? void 0 : _this$plugins$get[name];
}
function _CommentsParser_addComment(comment) {
  if (_Parser_this.filename) comment.loc.filename = _Parser_this.filename;
  const {
    commentsLen
  } = _Parser_this.state;
  if (_Parser_this.comments.length !== commentsLen) {
    _Parser_this.comments.length = commentsLen;
  }
  _Parser_this.comments.push(comment);
  _Parser_this.state.commentsLen++;
}
function _CommentsParser_processComment(node) {
  const {
    commentStack
  } = _Parser_this.state;
  const commentStackLength = commentStack.length;
  if (commentStackLength === 0) return;
  let i = commentStackLength - 1;
  const lastCommentWS = commentStack[i];
  if (lastCommentWS.start === node.end) {
    lastCommentWS.leadingNode = node;
    i--;
  }
  const {
    start: nodeStart
  } = node;
  for (; i >= 0; i--) {
    const commentWS = commentStack[i];
    const commentEnd = commentWS.end;
    if (commentEnd > nodeStart) {
      commentWS.containingNode = node;
      _CommentsParser_finalizeComment(commentWS);
      commentStack.splice(i, 1);
    } else {
      if (commentEnd === nodeStart) {
        commentWS.trailingNode = node;
      }
      break;
    }
  }
}
function _CommentsParser_finalizeComment(commentWS) {
  var _node$options;
  const {
    comments
  } = commentWS;
  if (commentWS.leadingNode !== null || commentWS.trailingNode !== null) {
    if (commentWS.leadingNode !== null) {
      setTrailingComments(commentWS.leadingNode, comments);
    }
    if (commentWS.trailingNode !== null) {
      setLeadingComments(commentWS.trailingNode, comments);
    }
  } else {
    const {
      containingNode: node,
      start: commentStart
    } = commentWS;
    if (_Parser_this.input.charCodeAt(_BaseParser_offsetToSourcePos(commentStart) - 1) === 44) {
      switch (node.type) {
        case "ObjectExpression":
        case "ObjectPattern":
        case "RecordExpression":
          adjustInnerComments(node, node.properties, commentWS);
          break;
        case "CallExpression":
        case "OptionalCallExpression":
          adjustInnerComments(node, node.arguments, commentWS);
          break;
        case "ImportExpression":
          adjustInnerComments(node, [node.source, (_node$options = node.options) != null ? _node$options : null], commentWS);
          break;
        case "FunctionDeclaration":
        case "FunctionExpression":
        case "ArrowFunctionExpression":
        case "ObjectMethod":
        case "ClassMethod":
        case "ClassPrivateMethod":
          adjustInnerComments(node, node.params, commentWS);
          break;
        case "ArrayExpression":
        case "ArrayPattern":
        case "TupleExpression":
          adjustInnerComments(node, node.elements, commentWS);
          break;
        case "ExportNamedDeclaration":
        case "ImportDeclaration":
          adjustInnerComments(node, node.specifiers, commentWS);
          break;
        case "TSEnumDeclaration":
          {
            adjustInnerComments(node, node.members, commentWS);
          }
          break;
        case "TSEnumBody":
          adjustInnerComments(node, node.members, commentWS);
          break;
        default:
          {
            setInnerComments(node, comments);
          }
      }
    } else {
      setInnerComments(node, comments);
    }
  }
}
function _CommentsParser_finalizeRemainingComments() {
  const {
    commentStack
  } = _Parser_this.state;
  for (let i = commentStack.length - 1; i >= 0; i--) {
    _CommentsParser_finalizeComment(commentStack[i]);
  }
  _Parser_this.state.commentStack = [];
}
function _CommentsParser_resetPreviousNodeTrailingComments(node) {
  const {
    commentStack
  } = _Parser_this.state;
  const {
    length
  } = commentStack;
  if (length === 0) return;
  const commentWS = commentStack[length - 1];
  if (commentWS.leadingNode === node) {
    commentWS.leadingNode = null;
  }
}
function _CommentsParser_takeSurroundingComments(node, start, end) {
  const {
    commentStack
  } = _Parser_this.state;
  const commentStackLength = commentStack.length;
  if (commentStackLength === 0) return;
  let i = commentStackLength - 1;
  for (; i >= 0; i--) {
    const commentWS = commentStack[i];
    const commentEnd = commentWS.end;
    const commentStart = commentWS.start;
    if (commentStart === end) {
      commentWS.leadingNode = node;
    } else if (commentEnd === start) {
      commentWS.trailingNode = node;
    } else if (commentEnd < start) {
      break;
    }
  }
}
function _Tokenizer_constructor(options, input) {
  _BaseParser_constructor();
  _Parser_this.isLookahead = void 0;
  _Parser_this.tokens = [];
  _Parser_this.errorHandlers_readInt = {
    invalidDigit: (pos, lineStart, curLine, radix) => {
      if (!(_Parser_this.optionFlags & 2048)) return false;
      _Tokenizer_raise(Errors.InvalidDigit, buildPosition(pos, lineStart, curLine), {
        radix
      });
      return true;
    },
    numericSeparatorInEscapeSequence: _Tokenizer_errorBuilder(Errors.NumericSeparatorInEscapeSequence),
    unexpectedNumericSeparator: _Tokenizer_errorBuilder(Errors.UnexpectedNumericSeparator)
  };
  _Parser_this.errorHandlers_readCodePoint = Object.assign({}, _Parser_this.errorHandlers_readInt, {
    invalidEscapeSequence: _Tokenizer_errorBuilder(Errors.InvalidEscapeSequence),
    invalidCodePoint: _Tokenizer_errorBuilder(Errors.InvalidCodePoint)
  });
  _Parser_this.errorHandlers_readStringContents_string = Object.assign({}, _Parser_this.errorHandlers_readCodePoint, {
    strictNumericEscape: (pos, lineStart, curLine) => {
      _Tokenizer_recordStrictModeErrors(Errors.StrictNumericEscape, buildPosition(pos, lineStart, curLine));
    },
    unterminated: (pos, lineStart, curLine) => {
      throw _Tokenizer_raise(Errors.UnterminatedString, buildPosition(pos - 1, lineStart, curLine));
    }
  });
  _Parser_this.errorHandlers_readStringContents_template = Object.assign({}, _Parser_this.errorHandlers_readCodePoint, {
    strictNumericEscape: _Tokenizer_errorBuilder(Errors.StrictNumericEscape),
    unterminated: (pos, lineStart, curLine) => {
      throw _Tokenizer_raise(Errors.UnterminatedTemplate, buildPosition(pos, lineStart, curLine));
    }
  });
  _Parser_this.state = new State();
  _Parser_this.state.init(options);
  _Parser_this.input = input;
  _Parser_this.length = input.length;
  _Parser_this.comments = [];
  _Parser_this.isLookahead = false;
}
function _Tokenizer_pushToken(token) {
  _Parser_this.tokens.length = _Parser_this.state.tokensLength;
  _Parser_this.tokens.push(token);
  ++_Parser_this.state.tokensLength;
}
function _Tokenizer_next() {
  _Tokenizer_checkKeywordEscapes();
  if (_Parser_this.optionFlags & 256) {
    _Tokenizer_pushToken(new Token(_Parser_this.state));
  }
  _Parser_this.state.lastTokEndLoc = _Parser_this.state.endLoc;
  _Parser_this.state.lastTokStartLoc = _Parser_this.state.startLoc;
  _Tokenizer_nextToken();
}
function _Tokenizer_eat(type) {
  if (_Tokenizer_match(type)) {
    _Tokenizer_next();
    return true;
  } else {
    return false;
  }
}
function _Tokenizer_match(type) {
  return _Parser_this.state.type === type;
}
function _Tokenizer_createLookaheadState(state) {
  return {
    pos: state.pos,
    value: null,
    type: state.type,
    start: state.start,
    end: state.end,
    context: [_Tokenizer_curContext()],
    inType: state.inType,
    startLoc: state.startLoc,
    lastTokEndLoc: state.lastTokEndLoc,
    curLine: state.curLine,
    lineStart: state.lineStart,
    curPosition: state.curPosition
  };
}
function _Tokenizer_lookahead() {
  const old = _Parser_this.state;
  _Parser_this.state = _Tokenizer_createLookaheadState(old);
  _Parser_this.isLookahead = true;
  _Tokenizer_nextToken();
  _Parser_this.isLookahead = false;
  const curr = _Parser_this.state;
  _Parser_this.state = old;
  return curr;
}
function _Tokenizer_nextTokenStart() {
  return _Tokenizer_nextTokenStartSince(_Parser_this.state.pos);
}
function _Tokenizer_nextTokenStartSince(pos) {
  skipWhiteSpace.lastIndex = pos;
  return skipWhiteSpace.test(_Parser_this.input) ? skipWhiteSpace.lastIndex : pos;
}
function _Tokenizer_lookaheadCharCode() {
  return _Tokenizer_lookaheadCharCodeSince(_Parser_this.state.pos);
}
function _Tokenizer_lookaheadCharCodeSince(pos) {
  return _Parser_this.input.charCodeAt(_Tokenizer_nextTokenStartSince(pos));
}
function _Tokenizer_nextTokenInLineStart() {
  return _Tokenizer_nextTokenInLineStartSince(_Parser_this.state.pos);
}
function _Tokenizer_nextTokenInLineStartSince(pos) {
  skipWhiteSpaceInLine.lastIndex = pos;
  return skipWhiteSpaceInLine.test(_Parser_this.input) ? skipWhiteSpaceInLine.lastIndex : pos;
}
function _Tokenizer_lookaheadInLineCharCode() {
  return _Parser_this.input.charCodeAt(_Tokenizer_nextTokenInLineStart());
}
function _Tokenizer_codePointAtPos(pos) {
  let cp = _Parser_this.input.charCodeAt(pos);
  if ((cp & 0xfc00) === 0xd800 && ++pos < _Parser_this.input.length) {
    const trail = _Parser_this.input.charCodeAt(pos);
    if ((trail & 0xfc00) === 0xdc00) {
      cp = 0x10000 + ((cp & 0x3ff) << 10) + (trail & 0x3ff);
    }
  }
  return cp;
}
function _Tokenizer_setStrict(strict) {
  _Parser_this.state.strict = strict;
  if (strict) {
    _Parser_this.state.strictErrors.forEach(([toParseError, at]) => _Tokenizer_raise(toParseError, at));
    _Parser_this.state.strictErrors.clear();
  }
}
function _Tokenizer_curContext() {
  return _Parser_this.state.context[_Parser_this.state.context.length - 1];
}
function _Tokenizer_nextToken() {
  _Parser_skipSpace_dynamic();
  _Parser_this.state.start = _Parser_this.state.pos;
  if (!_Parser_this.isLookahead) _Parser_this.state.startLoc = _Parser_this.state.curPosition();
  if (_Parser_this.state.pos >= _Parser_this.length) {
    _Parser_finishToken_dynamic(140);
    return;
  }
  _Parser_getTokenFromCode_dynamic(_Tokenizer_codePointAtPos(_Parser_this.state.pos));
}
function _Tokenizer_skipBlockComment(commentEnd) {
  let startLoc;
  if (!_Parser_this.isLookahead) startLoc = _Parser_this.state.curPosition();
  const start = _Parser_this.state.pos;
  const end = _Parser_this.input.indexOf(commentEnd, start + 2);
  if (end === -1) {
    throw _Tokenizer_raise(Errors.UnterminatedComment, _Parser_this.state.curPosition());
  }
  _Parser_this.state.pos = end + commentEnd.length;
  lineBreakG.lastIndex = start + 2;
  while (lineBreakG.test(_Parser_this.input) && lineBreakG.lastIndex <= end) {
    ++_Parser_this.state.curLine;
    _Parser_this.state.lineStart = lineBreakG.lastIndex;
  }
  if (_Parser_this.isLookahead) return;
  const comment = {
    type: "CommentBlock",
    value: _Parser_this.input.slice(start + 2, end),
    start: _BaseParser_sourceToOffsetPos(start),
    end: _BaseParser_sourceToOffsetPos(end + commentEnd.length),
    loc: new SourceLocation(startLoc, _Parser_this.state.curPosition())
  };
  if (_Parser_this.optionFlags & 256) _Tokenizer_pushToken(comment);
  return comment;
}
function _Tokenizer_skipLineComment(startSkip) {
  const start = _Parser_this.state.pos;
  let startLoc;
  if (!_Parser_this.isLookahead) startLoc = _Parser_this.state.curPosition();
  let ch = _Parser_this.input.charCodeAt(_Parser_this.state.pos += startSkip);
  if (_Parser_this.state.pos < _Parser_this.length) {
    while (!isNewLine(ch) && ++_Parser_this.state.pos < _Parser_this.length) {
      ch = _Parser_this.input.charCodeAt(_Parser_this.state.pos);
    }
  }
  if (_Parser_this.isLookahead) return;
  const end = _Parser_this.state.pos;
  const value = _Parser_this.input.slice(start + startSkip, end);
  const comment = {
    type: "CommentLine",
    value,
    start: _BaseParser_sourceToOffsetPos(start),
    end: _BaseParser_sourceToOffsetPos(end),
    loc: new SourceLocation(startLoc, _Parser_this.state.curPosition())
  };
  if (_Parser_this.optionFlags & 256) _Tokenizer_pushToken(comment);
  return comment;
}
function _Tokenizer_skipSpace() {
  const spaceStart = _Parser_this.state.pos;
  const comments = _Parser_this.optionFlags & 4096 ? [] : null;
  loop: while (_Parser_this.state.pos < _Parser_this.length) {
    const ch = _Parser_this.input.charCodeAt(_Parser_this.state.pos);
    switch (ch) {
      case 32:
      case 160:
      case 9:
        ++_Parser_this.state.pos;
        break;
      case 13:
        if (_Parser_this.input.charCodeAt(_Parser_this.state.pos + 1) === 10) {
          ++_Parser_this.state.pos;
        }
      case 10:
      case 8232:
      case 8233:
        ++_Parser_this.state.pos;
        ++_Parser_this.state.curLine;
        _Parser_this.state.lineStart = _Parser_this.state.pos;
        break;
      case 47:
        switch (_Parser_this.input.charCodeAt(_Parser_this.state.pos + 1)) {
          case 42:
            {
              const comment = _Parser_skipBlockComment_dynamic("*/");
              if (comment !== undefined) {
                _Parser_addComment_dynamic(comment);
                comments == null || comments.push(comment);
              }
              break;
            }
          case 47:
            {
              const comment = _Tokenizer_skipLineComment(2);
              if (comment !== undefined) {
                _Parser_addComment_dynamic(comment);
                comments == null || comments.push(comment);
              }
              break;
            }
          default:
            break loop;
        }
        break;
      default:
        if (isWhitespace(ch)) {
          ++_Parser_this.state.pos;
        } else if (ch === 45 && !_Parser_this.inModule && _Parser_this.optionFlags & 8192) {
          const pos = _Parser_this.state.pos;
          if (_Parser_this.input.charCodeAt(pos + 1) === 45 && _Parser_this.input.charCodeAt(pos + 2) === 62 && (spaceStart === 0 || _Parser_this.state.lineStart > spaceStart)) {
            const comment = _Tokenizer_skipLineComment(3);
            if (comment !== undefined) {
              _Parser_addComment_dynamic(comment);
              comments == null || comments.push(comment);
            }
          } else {
            break loop;
          }
        } else if (ch === 60 && !_Parser_this.inModule && _Parser_this.optionFlags & 8192) {
          const pos = _Parser_this.state.pos;
          if (_Parser_this.input.charCodeAt(pos + 1) === 33 && _Parser_this.input.charCodeAt(pos + 2) === 45 && _Parser_this.input.charCodeAt(pos + 3) === 45) {
            const comment = _Tokenizer_skipLineComment(4);
            if (comment !== undefined) {
              _Parser_addComment_dynamic(comment);
              comments == null || comments.push(comment);
            }
          } else {
            break loop;
          }
        } else {
          break loop;
        }
    }
  }
  if ((comments == null ? void 0 : comments.length) > 0) {
    const end = _Parser_this.state.pos;
    const commentWhitespace = {
      start: _BaseParser_sourceToOffsetPos(spaceStart),
      end: _BaseParser_sourceToOffsetPos(end),
      comments,
      leadingNode: null,
      trailingNode: null,
      containingNode: null
    };
    _Parser_this.state.commentStack.push(commentWhitespace);
  }
}
function _Tokenizer_finishToken(type, val) {
  _Parser_this.state.end = _Parser_this.state.pos;
  _Parser_this.state.endLoc = _Parser_this.state.curPosition();
  const prevType = _Parser_this.state.type;
  _Parser_this.state.type = type;
  _Parser_this.state.value = val;
  if (!_Parser_this.isLookahead) {
    _Parser_updateContext_dynamic(prevType);
  }
}
function _Tokenizer_replaceToken(type) {
  _Parser_this.state.type = type;
  _Parser_updateContext_dynamic();
}
function _Tokenizer_readToken_numberSign() {
  if (_Parser_this.state.pos === 0 && _Tokenizer_readToken_interpreter()) {
    return;
  }
  const nextPos = _Parser_this.state.pos + 1;
  const next = _Tokenizer_codePointAtPos(nextPos);
  if (next >= 48 && next <= 57) {
    throw _Tokenizer_raise(Errors.UnexpectedDigitAfterHash, _Parser_this.state.curPosition());
  }
  if (next === 123 || next === 91 && _BaseParser_hasPlugin("recordAndTuple")) {
    _Tokenizer_expectPlugin("recordAndTuple");
    if (_BaseParser_getPluginOption("recordAndTuple", "syntaxType") === "bar") {
      throw _Tokenizer_raise(next === 123 ? Errors.RecordExpressionHashIncorrectStartSyntaxType : Errors.TupleExpressionHashIncorrectStartSyntaxType, _Parser_this.state.curPosition());
    }
    _Parser_this.state.pos += 2;
    if (next === 123) {
      _Parser_finishToken_dynamic(7);
    } else {
      _Parser_finishToken_dynamic(1);
    }
  } else if (isIdentifierStart(next)) {
    ++_Parser_this.state.pos;
    _Parser_finishToken_dynamic(139, _Tokenizer_readWord(next));
  } else if (next === 92) {
    ++_Parser_this.state.pos;
    _Parser_finishToken_dynamic(139, _Tokenizer_readWord());
  } else {
    _Tokenizer_finishOp(27, 1);
  }
}
function _Tokenizer_readToken_dot() {
  const next = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1);
  if (next >= 48 && next <= 57) {
    _Tokenizer_readNumber(true);
    return;
  }
  if (next === 46 && _Parser_this.input.charCodeAt(_Parser_this.state.pos + 2) === 46) {
    _Parser_this.state.pos += 3;
    _Parser_finishToken_dynamic(21);
  } else {
    ++_Parser_this.state.pos;
    _Parser_finishToken_dynamic(16);
  }
}
function _Tokenizer_readToken_slash() {
  const next = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1);
  if (next === 61) {
    _Tokenizer_finishOp(31, 2);
  } else {
    _Tokenizer_finishOp(56, 1);
  }
}
function _Tokenizer_readToken_interpreter() {
  if (_Parser_this.state.pos !== 0 || _Parser_this.length < 2) return false;
  let ch = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1);
  if (ch !== 33) return false;
  const start = _Parser_this.state.pos;
  _Parser_this.state.pos += 1;
  while (!isNewLine(ch) && ++_Parser_this.state.pos < _Parser_this.length) {
    ch = _Parser_this.input.charCodeAt(_Parser_this.state.pos);
  }
  const value = _Parser_this.input.slice(start + 2, _Parser_this.state.pos);
  _Parser_finishToken_dynamic(28, value);
  return true;
}
function _Tokenizer_readToken_mult_modulo(code) {
  let type = code === 42 ? 55 : 54;
  let width = 1;
  let next = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1);
  if (code === 42 && next === 42) {
    width++;
    next = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 2);
    type = 57;
  }
  if (next === 61 && !_Parser_this.state.inType) {
    width++;
    type = code === 37 ? 33 : 30;
  }
  _Tokenizer_finishOp(type, width);
}
function _Tokenizer_readToken_pipe_amp(code) {
  const next = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1);
  if (next === code) {
    if (_Parser_this.input.charCodeAt(_Parser_this.state.pos + 2) === 61) {
      _Tokenizer_finishOp(30, 3);
    } else {
      _Tokenizer_finishOp(code === 124 ? 41 : 42, 2);
    }
    return;
  }
  if (code === 124) {
    if (next === 62) {
      _Tokenizer_finishOp(39, 2);
      return;
    }
    if (_BaseParser_hasPlugin("recordAndTuple") && next === 125) {
      if (_BaseParser_getPluginOption("recordAndTuple", "syntaxType") !== "bar") {
        throw _Tokenizer_raise(Errors.RecordExpressionBarIncorrectEndSyntaxType, _Parser_this.state.curPosition());
      }
      _Parser_this.state.pos += 2;
      _Parser_finishToken_dynamic(9);
      return;
    }
    if (_BaseParser_hasPlugin("recordAndTuple") && next === 93) {
      if (_BaseParser_getPluginOption("recordAndTuple", "syntaxType") !== "bar") {
        throw _Tokenizer_raise(Errors.TupleExpressionBarIncorrectEndSyntaxType, _Parser_this.state.curPosition());
      }
      _Parser_this.state.pos += 2;
      _Parser_finishToken_dynamic(4);
      return;
    }
  }
  if (next === 61) {
    _Tokenizer_finishOp(30, 2);
    return;
  }
  _Tokenizer_finishOp(code === 124 ? 43 : 45, 1);
}
function _Tokenizer_readToken_caret() {
  const next = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1);
  if (next === 61 && !_Parser_this.state.inType) {
    _Tokenizer_finishOp(32, 2);
  } else if (next === 94 && _BaseParser_hasPlugin(["pipelineOperator", {
    proposal: "hack",
    topicToken: "^^"
  }])) {
    _Tokenizer_finishOp(37, 2);
    const lookaheadCh = _Parser_this.input.codePointAt(_Parser_this.state.pos);
    if (lookaheadCh === 94) {
      _Tokenizer_unexpected();
    }
  } else {
    _Tokenizer_finishOp(44, 1);
  }
}
function _Tokenizer_readToken_atSign() {
  const next = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1);
  if (next === 64 && _BaseParser_hasPlugin(["pipelineOperator", {
    proposal: "hack",
    topicToken: "@@"
  }])) {
    _Tokenizer_finishOp(38, 2);
  } else {
    _Tokenizer_finishOp(26, 1);
  }
}
function _Tokenizer_readToken_plus_min(code) {
  const next = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1);
  if (next === code) {
    _Tokenizer_finishOp(34, 2);
    return;
  }
  if (next === 61) {
    _Tokenizer_finishOp(30, 2);
  } else {
    _Tokenizer_finishOp(53, 1);
  }
}
function _Tokenizer_readToken_lt() {
  const {
    pos
  } = _Parser_this.state;
  const next = _Parser_this.input.charCodeAt(pos + 1);
  if (next === 60) {
    if (_Parser_this.input.charCodeAt(pos + 2) === 61) {
      _Tokenizer_finishOp(30, 3);
      return;
    }
    _Tokenizer_finishOp(51, 2);
    return;
  }
  if (next === 61) {
    _Tokenizer_finishOp(49, 2);
    return;
  }
  _Tokenizer_finishOp(47, 1);
}
function _Tokenizer_readToken_gt() {
  const {
    pos
  } = _Parser_this.state;
  const next = _Parser_this.input.charCodeAt(pos + 1);
  if (next === 62) {
    const size = _Parser_this.input.charCodeAt(pos + 2) === 62 ? 3 : 2;
    if (_Parser_this.input.charCodeAt(pos + size) === 61) {
      _Tokenizer_finishOp(30, size + 1);
      return;
    }
    _Tokenizer_finishOp(52, size);
    return;
  }
  if (next === 61) {
    _Tokenizer_finishOp(49, 2);
    return;
  }
  _Tokenizer_finishOp(48, 1);
}
function _Tokenizer_readToken_eq_excl(code) {
  const next = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1);
  if (next === 61) {
    _Tokenizer_finishOp(46, _Parser_this.input.charCodeAt(_Parser_this.state.pos + 2) === 61 ? 3 : 2);
    return;
  }
  if (code === 61 && next === 62) {
    _Parser_this.state.pos += 2;
    _Parser_finishToken_dynamic(19);
    return;
  }
  _Tokenizer_finishOp(code === 61 ? 29 : 35, 1);
}
function _Tokenizer_readToken_question() {
  const next = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1);
  const next2 = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 2);
  if (next === 63) {
    if (next2 === 61) {
      _Tokenizer_finishOp(30, 3);
    } else {
      _Tokenizer_finishOp(40, 2);
    }
  } else if (next === 46 && !(next2 >= 48 && next2 <= 57)) {
    _Parser_this.state.pos += 2;
    _Parser_finishToken_dynamic(18);
  } else {
    ++_Parser_this.state.pos;
    _Parser_finishToken_dynamic(17);
  }
}
function _Tokenizer_getTokenFromCode(code) {
  switch (code) {
    case 46:
      _Tokenizer_readToken_dot();
      return;
    case 40:
      ++_Parser_this.state.pos;
      _Parser_finishToken_dynamic(10);
      return;
    case 41:
      ++_Parser_this.state.pos;
      _Parser_finishToken_dynamic(11);
      return;
    case 59:
      ++_Parser_this.state.pos;
      _Parser_finishToken_dynamic(13);
      return;
    case 44:
      ++_Parser_this.state.pos;
      _Parser_finishToken_dynamic(12);
      return;
    case 91:
      if (_BaseParser_hasPlugin("recordAndTuple") && _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1) === 124) {
        if (_BaseParser_getPluginOption("recordAndTuple", "syntaxType") !== "bar") {
          throw _Tokenizer_raise(Errors.TupleExpressionBarIncorrectStartSyntaxType, _Parser_this.state.curPosition());
        }
        _Parser_this.state.pos += 2;
        _Parser_finishToken_dynamic(2);
      } else {
        ++_Parser_this.state.pos;
        _Parser_finishToken_dynamic(0);
      }
      return;
    case 93:
      ++_Parser_this.state.pos;
      _Parser_finishToken_dynamic(3);
      return;
    case 123:
      if (_BaseParser_hasPlugin("recordAndTuple") && _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1) === 124) {
        if (_BaseParser_getPluginOption("recordAndTuple", "syntaxType") !== "bar") {
          throw _Tokenizer_raise(Errors.RecordExpressionBarIncorrectStartSyntaxType, _Parser_this.state.curPosition());
        }
        _Parser_this.state.pos += 2;
        _Parser_finishToken_dynamic(6);
      } else {
        ++_Parser_this.state.pos;
        _Parser_finishToken_dynamic(5);
      }
      return;
    case 125:
      ++_Parser_this.state.pos;
      _Parser_finishToken_dynamic(8);
      return;
    case 58:
      if (_BaseParser_hasPlugin("functionBind") && _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1) === 58) {
        _Tokenizer_finishOp(15, 2);
      } else {
        ++_Parser_this.state.pos;
        _Parser_finishToken_dynamic(14);
      }
      return;
    case 63:
      _Tokenizer_readToken_question();
      return;
    case 96:
      _Tokenizer_readTemplateToken();
      return;
    case 48:
      {
        const next = _Parser_this.input.charCodeAt(_Parser_this.state.pos + 1);
        if (next === 120 || next === 88) {
          _Tokenizer_readRadixNumber(16);
          return;
        }
        if (next === 111 || next === 79) {
          _Tokenizer_readRadixNumber(8);
          return;
        }
        if (next === 98 || next === 66) {
          _Tokenizer_readRadixNumber(2);
          return;
        }
      }
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      _Tokenizer_readNumber(false);
      return;
    case 34:
    case 39:
      _Tokenizer_readString(code);
      return;
    case 47:
      _Tokenizer_readToken_slash();
      return;
    case 37:
    case 42:
      _Parser_readToken_mult_modulo_dynamic(code);
      return;
    case 124:
    case 38:
      _Parser_readToken_pipe_amp_dynamic(code);
      return;
    case 94:
      _Tokenizer_readToken_caret();
      return;
    case 43:
    case 45:
      _Tokenizer_readToken_plus_min(code);
      return;
    case 60:
      _Tokenizer_readToken_lt();
      return;
    case 62:
      _Tokenizer_readToken_gt();
      return;
    case 61:
    case 33:
      _Tokenizer_readToken_eq_excl(code);
      return;
    case 126:
      _Tokenizer_finishOp(36, 1);
      return;
    case 64:
      _Tokenizer_readToken_atSign();
      return;
    case 35:
      _Tokenizer_readToken_numberSign();
      return;
    case 92:
      _Tokenizer_readWord2();
      return;
    default:
      if (isIdentifierStart(code)) {
        _Tokenizer_readWord2(code);
        return;
      }
  }
  throw _Tokenizer_raise(Errors.InvalidOrUnexpectedToken, _Parser_this.state.curPosition(), {
    unexpected: String.fromCodePoint(code)
  });
}
function _Tokenizer_finishOp(type, size) {
  const str = _Parser_this.input.slice(_Parser_this.state.pos, _Parser_this.state.pos + size);
  _Parser_this.state.pos += size;
  _Parser_finishToken_dynamic(type, str);
}
function _Tokenizer_readRegexp() {
  const startLoc = _Parser_this.state.startLoc;
  const start = _Parser_this.state.start + 1;
  let escaped, inClass;
  let {
    pos
  } = _Parser_this.state;
  for (;; ++pos) {
    if (pos >= _Parser_this.length) {
      throw _Tokenizer_raise(Errors.UnterminatedRegExp, createPositionWithColumnOffset(startLoc, 1));
    }
    const ch = _Parser_this.input.charCodeAt(pos);
    if (isNewLine(ch)) {
      throw _Tokenizer_raise(Errors.UnterminatedRegExp, createPositionWithColumnOffset(startLoc, 1));
    }
    if (escaped) {
      escaped = false;
    } else {
      if (ch === 91) {
        inClass = true;
      } else if (ch === 93 && inClass) {
        inClass = false;
      } else if (ch === 47 && !inClass) {
        break;
      }
      escaped = ch === 92;
    }
  }
  const content = _Parser_this.input.slice(start, pos);
  ++pos;
  let mods = "";
  const nextPos = () => createPositionWithColumnOffset(startLoc, pos + 2 - start);
  while (pos < _Parser_this.length) {
    const cp = _Tokenizer_codePointAtPos(pos);
    const char = String.fromCharCode(cp);
    if (VALID_REGEX_FLAGS.has(cp)) {
      if (cp === 118) {
        if (mods.includes("u")) {
          _Tokenizer_raise(Errors.IncompatibleRegExpUVFlags, nextPos());
        }
      } else if (cp === 117) {
        if (mods.includes("v")) {
          _Tokenizer_raise(Errors.IncompatibleRegExpUVFlags, nextPos());
        }
      }
      if (mods.includes(char)) {
        _Tokenizer_raise(Errors.DuplicateRegExpFlags, nextPos());
      }
    } else if (isIdentifierChar(cp) || cp === 92) {
      _Tokenizer_raise(Errors.MalformedRegExpFlags, nextPos());
    } else {
      break;
    }
    ++pos;
    mods += char;
  }
  _Parser_this.state.pos = pos;
  _Parser_finishToken_dynamic(138, {
    pattern: content,
    flags: mods
  });
}
function _Tokenizer_readInt(radix, len, forceLen = false, allowNumSeparator = true) {
  const {
    n,
    pos
  } = readInt(_Parser_this.input, _Parser_this.state.pos, _Parser_this.state.lineStart, _Parser_this.state.curLine, radix, len, forceLen, allowNumSeparator, _Parser_this.errorHandlers_readInt, false);
  _Parser_this.state.pos = pos;
  return n;
}
function _Tokenizer_readRadixNumber(radix) {
  const start = _Parser_this.state.pos;
  const startLoc = _Parser_this.state.curPosition();
  let isBigInt = false;
  _Parser_this.state.pos += 2;
  const val = _Tokenizer_readInt(radix);
  if (val == null) {
    _Tokenizer_raise(Errors.InvalidDigit, createPositionWithColumnOffset(startLoc, 2), {
      radix
    });
  }
  const next = _Parser_this.input.charCodeAt(_Parser_this.state.pos);
  if (next === 110) {
    ++_Parser_this.state.pos;
    isBigInt = true;
  } else if (next === 109) {
    throw _Tokenizer_raise(Errors.InvalidDecimal, startLoc);
  }
  if (isIdentifierStart(_Tokenizer_codePointAtPos(_Parser_this.state.pos))) {
    throw _Tokenizer_raise(Errors.NumberIdentifier, _Parser_this.state.curPosition());
  }
  if (isBigInt) {
    const str = _Parser_this.input.slice(start, _Parser_this.state.pos).replace(/[_n]/g, "");
    _Parser_finishToken_dynamic(136, str);
    return;
  }
  _Parser_finishToken_dynamic(135, val);
}
function _Tokenizer_readNumber(startsWithDot) {
  const start = _Parser_this.state.pos;
  const startLoc = _Parser_this.state.curPosition();
  let isFloat = false;
  let isBigInt = false;
  let hasExponent = false;
  let isOctal = false;
  if (!startsWithDot && _Tokenizer_readInt(10) === null) {
    _Tokenizer_raise(Errors.InvalidNumber, _Parser_this.state.curPosition());
  }
  const hasLeadingZero = _Parser_this.state.pos - start >= 2 && _Parser_this.input.charCodeAt(start) === 48;
  if (hasLeadingZero) {
    const integer = _Parser_this.input.slice(start, _Parser_this.state.pos);
    _Tokenizer_recordStrictModeErrors(Errors.StrictOctalLiteral, startLoc);
    if (!_Parser_this.state.strict) {
      const underscorePos = integer.indexOf("_");
      if (underscorePos > 0) {
        _Tokenizer_raise(Errors.ZeroDigitNumericSeparator, createPositionWithColumnOffset(startLoc, underscorePos));
      }
    }
    isOctal = hasLeadingZero && !/[89]/.test(integer);
  }
  let next = _Parser_this.input.charCodeAt(_Parser_this.state.pos);
  if (next === 46 && !isOctal) {
    ++_Parser_this.state.pos;
    _Tokenizer_readInt(10);
    isFloat = true;
    next = _Parser_this.input.charCodeAt(_Parser_this.state.pos);
  }
  if ((next === 69 || next === 101) && !isOctal) {
    next = _Parser_this.input.charCodeAt(++_Parser_this.state.pos);
    if (next === 43 || next === 45) {
      ++_Parser_this.state.pos;
    }
    if (_Tokenizer_readInt(10) === null) {
      _Tokenizer_raise(Errors.InvalidOrMissingExponent, startLoc);
    }
    isFloat = true;
    hasExponent = true;
    next = _Parser_this.input.charCodeAt(_Parser_this.state.pos);
  }
  if (next === 110) {
    if (isFloat || hasLeadingZero) {
      _Tokenizer_raise(Errors.InvalidBigIntLiteral, startLoc);
    }
    ++_Parser_this.state.pos;
    isBigInt = true;
  }
  if (next === 109) {
    _Tokenizer_expectPlugin("decimal", _Parser_this.state.curPosition());
    if (hasExponent || hasLeadingZero) {
      _Tokenizer_raise(Errors.InvalidDecimal, startLoc);
    }
    ++_Parser_this.state.pos;
    var isDecimal = true;
  }
  if (isIdentifierStart(_Tokenizer_codePointAtPos(_Parser_this.state.pos))) {
    throw _Tokenizer_raise(Errors.NumberIdentifier, _Parser_this.state.curPosition());
  }
  const str = _Parser_this.input.slice(start, _Parser_this.state.pos).replace(/[_mn]/g, "");
  if (isBigInt) {
    _Parser_finishToken_dynamic(136, str);
    return;
  }
  if (isDecimal) {
    _Parser_finishToken_dynamic(137, str);
    return;
  }
  const val = isOctal ? parseInt(str, 8) : parseFloat(str);
  _Parser_finishToken_dynamic(135, val);
}
function _Tokenizer_readCodePoint(throwOnInvalid) {
  const {
    code,
    pos
  } = readCodePoint(_Parser_this.input, _Parser_this.state.pos, _Parser_this.state.lineStart, _Parser_this.state.curLine, throwOnInvalid, _Parser_this.errorHandlers_readCodePoint);
  _Parser_this.state.pos = pos;
  return code;
}
function _Tokenizer_readString(quote) {
  const {
    str,
    pos,
    curLine,
    lineStart
  } = readStringContents(quote === 34 ? "double" : "single", _Parser_this.input, _Parser_this.state.pos + 1, _Parser_this.state.lineStart, _Parser_this.state.curLine, _Parser_this.errorHandlers_readStringContents_string);
  _Parser_this.state.pos = pos + 1;
  _Parser_this.state.lineStart = lineStart;
  _Parser_this.state.curLine = curLine;
  _Parser_finishToken_dynamic(134, str);
}
function _Tokenizer_readTemplateContinuation() {
  if (!_Tokenizer_match(8)) {
    _Tokenizer_unexpected(null, 8);
  }
  _Parser_this.state.pos--;
  _Tokenizer_readTemplateToken();
}
function _Tokenizer_readTemplateToken() {
  const opening = _Parser_this.input[_Parser_this.state.pos];
  const {
    str,
    firstInvalidLoc,
    pos,
    curLine,
    lineStart
  } = readStringContents("template", _Parser_this.input, _Parser_this.state.pos + 1, _Parser_this.state.lineStart, _Parser_this.state.curLine, _Parser_this.errorHandlers_readStringContents_template);
  _Parser_this.state.pos = pos + 1;
  _Parser_this.state.lineStart = lineStart;
  _Parser_this.state.curLine = curLine;
  if (firstInvalidLoc) {
    _Parser_this.state.firstInvalidTemplateEscapePos = new Position(firstInvalidLoc.curLine, firstInvalidLoc.pos - firstInvalidLoc.lineStart, _BaseParser_sourceToOffsetPos(firstInvalidLoc.pos));
  }
  if (_Parser_this.input.codePointAt(pos) === 96) {
    _Parser_finishToken_dynamic(24, firstInvalidLoc ? null : opening + str + "`");
  } else {
    _Parser_this.state.pos++;
    _Parser_finishToken_dynamic(25, firstInvalidLoc ? null : opening + str + "${");
  }
}
function _Tokenizer_recordStrictModeErrors(toParseError, at) {
  const index = at.index;
  if (_Parser_this.state.strict && !_Parser_this.state.strictErrors.has(index)) {
    _Tokenizer_raise(toParseError, at);
  } else {
    _Parser_this.state.strictErrors.set(index, [toParseError, at]);
  }
}
function _Tokenizer_readWord(firstCode) {
  _Parser_this.state.containsEsc = false;
  let word = "";
  const start = _Parser_this.state.pos;
  let chunkStart = _Parser_this.state.pos;
  if (firstCode !== undefined) {
    _Parser_this.state.pos += firstCode <= 0xffff ? 1 : 2;
  }
  while (_Parser_this.state.pos < _Parser_this.length) {
    const ch = _Tokenizer_codePointAtPos(_Parser_this.state.pos);
    if (isIdentifierChar(ch)) {
      _Parser_this.state.pos += ch <= 0xffff ? 1 : 2;
    } else if (ch === 92) {
      _Parser_this.state.containsEsc = true;
      word += _Parser_this.input.slice(chunkStart, _Parser_this.state.pos);
      const escStart = _Parser_this.state.curPosition();
      const identifierCheck = _Parser_this.state.pos === start ? isIdentifierStart : isIdentifierChar;
      if (_Parser_this.input.charCodeAt(++_Parser_this.state.pos) !== 117) {
        _Tokenizer_raise(Errors.MissingUnicodeEscape, _Parser_this.state.curPosition());
        chunkStart = _Parser_this.state.pos - 1;
        continue;
      }
      ++_Parser_this.state.pos;
      const esc = _Tokenizer_readCodePoint(true);
      if (esc !== null) {
        if (!identifierCheck(esc)) {
          _Tokenizer_raise(Errors.EscapedCharNotAnIdentifier, escStart);
        }
        word += String.fromCodePoint(esc);
      }
      chunkStart = _Parser_this.state.pos;
    } else {
      break;
    }
  }
  return word + _Parser_this.input.slice(chunkStart, _Parser_this.state.pos);
}
function _Tokenizer_readWord2(firstCode) {
  const word = _Tokenizer_readWord(firstCode);
  const type = keywords$1.get(word);
  if (type !== undefined) {
    _Parser_finishToken_dynamic(type, tokenLabelName(type));
  } else {
    _Parser_finishToken_dynamic(132, word);
  }
}
function _Tokenizer_checkKeywordEscapes() {
  const {
    type
  } = _Parser_this.state;
  if (tokenIsKeyword(type) && _Parser_this.state.containsEsc) {
    _Tokenizer_raise(Errors.InvalidEscapedReservedWord, _Parser_this.state.startLoc, {
      reservedWord: tokenLabelName(type)
    });
  }
}
function _Tokenizer_raise(toParseError, at, details = {}) {
  const loc = at instanceof Position ? at : at.loc.start;
  const error = toParseError(loc, details);
  if (!(_Parser_this.optionFlags & 2048)) throw error;
  if (!_Parser_this.isLookahead) _Parser_this.state.errors.push(error);
  return error;
}
function _Tokenizer_raiseOverwrite(toParseError, at, details = {}) {
  const loc = at instanceof Position ? at : at.loc.start;
  const pos = loc.index;
  const errors = _Parser_this.state.errors;
  for (let i = errors.length - 1; i >= 0; i--) {
    const error = errors[i];
    if (error.loc.index === pos) {
      return errors[i] = toParseError(loc, details);
    }
    if (error.loc.index < pos) break;
  }
  return _Tokenizer_raise(toParseError, at, details);
}
function _Tokenizer_updateContext(prevType) {}
function _Tokenizer_unexpected(loc, type) {
  throw _Tokenizer_raise(Errors.UnexpectedToken, loc != null ? loc : _Parser_this.state.startLoc, {
    expected: type ? tokenLabelName(type) : null
  });
}
function _Tokenizer_expectPlugin(pluginName, loc) {
  if (_BaseParser_hasPlugin(pluginName)) {
    return true;
  }
  throw _Tokenizer_raise(Errors.MissingPlugin, loc != null ? loc : _Parser_this.state.startLoc, {
    missingPlugin: [pluginName]
  });
}
function _Tokenizer_expectOnePlugin(pluginNames) {
  if (!pluginNames.some(name => _BaseParser_hasPlugin(name))) {
    throw _Tokenizer_raise(Errors.MissingOneOfPlugins, _Parser_this.state.startLoc, {
      missingPlugin: pluginNames
    });
  }
}
function _Tokenizer_errorBuilder(error) {
  return (pos, lineStart, curLine) => {
    _Tokenizer_raise(error, buildPosition(pos, lineStart, curLine));
  };
}
function _UtilParser_addExtra(node, key, value, enumerable = true) {
  if (!node) return;
  let {
    extra
  } = node;
  if (extra == null) {
    extra = {};
    node.extra = extra;
  }
  if (enumerable) {
    extra[key] = value;
  } else {
    Object.defineProperty(extra, key, {
      enumerable,
      value
    });
  }
}
function _UtilParser_isContextual(token) {
  return _Parser_this.state.type === token && !_Parser_this.state.containsEsc;
}
function _UtilParser_isUnparsedContextual(nameStart, name) {
  const nameEnd = nameStart + name.length;
  if (_Parser_this.input.slice(nameStart, nameEnd) === name) {
    const nextCh = _Parser_this.input.charCodeAt(nameEnd);
    return !(isIdentifierChar(nextCh) || (nextCh & 0xfc00) === 0xd800);
  }
  return false;
}
function _UtilParser_isLookaheadContextual(name) {
  const next = _Tokenizer_nextTokenStart();
  return _UtilParser_isUnparsedContextual(next, name);
}
function _UtilParser_eatContextual(token) {
  if (_UtilParser_isContextual(token)) {
    _Tokenizer_next();
    return true;
  }
  return false;
}
function _UtilParser_expectContextual(token, toParseError) {
  if (!_UtilParser_eatContextual(token)) {
    if (toParseError != null) {
      throw _Tokenizer_raise(toParseError, _Parser_this.state.startLoc);
    }
    _Tokenizer_unexpected(null, token);
  }
}
function _UtilParser_canInsertSemicolon() {
  return _Tokenizer_match(140) || _Tokenizer_match(8) || _UtilParser_hasPrecedingLineBreak();
}
function _UtilParser_hasPrecedingLineBreak() {
  return hasNewLine(_Parser_this.input, _BaseParser_offsetToSourcePos(_Parser_this.state.lastTokEndLoc.index), _Parser_this.state.start);
}
function _UtilParser_hasFollowingLineBreak() {
  return hasNewLine(_Parser_this.input, _Parser_this.state.end, _Tokenizer_nextTokenStart());
}
function _UtilParser_isLineTerminator() {
  return _Tokenizer_eat(13) || _UtilParser_canInsertSemicolon();
}
function _UtilParser_semicolon(allowAsi = true) {
  if (allowAsi ? _UtilParser_isLineTerminator() : _Tokenizer_eat(13)) return;
  _Tokenizer_raise(Errors.MissingSemicolon, _Parser_this.state.lastTokEndLoc);
}
function _UtilParser_expect(type, loc) {
  if (!_Tokenizer_eat(type)) {
    _Tokenizer_unexpected(loc, type);
  }
}
function _UtilParser_tryParse(fn, oldState = _Parser_this.state.clone()) {
  const abortSignal = {
    node: null
  };
  try {
    const node = fn((node = null) => {
      abortSignal.node = node;
      throw abortSignal;
    });
    if (_Parser_this.state.errors.length > oldState.errors.length) {
      const failState = _Parser_this.state;
      _Parser_this.state = oldState;
      _Parser_this.state.tokensLength = failState.tokensLength;
      return {
        node,
        error: failState.errors[oldState.errors.length],
        thrown: false,
        aborted: false,
        failState
      };
    }
    return {
      node,
      error: null,
      thrown: false,
      aborted: false,
      failState: null
    };
  } catch (error) {
    const failState = _Parser_this.state;
    _Parser_this.state = oldState;
    if (error instanceof SyntaxError) {
      return {
        node: null,
        error,
        thrown: true,
        aborted: false,
        failState
      };
    }
    if (error === abortSignal) {
      return {
        node: abortSignal.node,
        error: null,
        thrown: false,
        aborted: true,
        failState
      };
    }
    throw error;
  }
}
function _UtilParser_checkExpressionErrors(refExpressionErrors, andThrow) {
  if (!refExpressionErrors) return false;
  const {
    shorthandAssignLoc,
    doubleProtoLoc,
    privateKeyLoc,
    optionalParametersLoc
  } = refExpressionErrors;
  const hasErrors = !!shorthandAssignLoc || !!doubleProtoLoc || !!optionalParametersLoc || !!privateKeyLoc;
  if (!andThrow) {
    return hasErrors;
  }
  if (shorthandAssignLoc != null) {
    _Tokenizer_raise(Errors.InvalidCoverInitializedName, shorthandAssignLoc);
  }
  if (doubleProtoLoc != null) {
    _Tokenizer_raise(Errors.DuplicateProto, doubleProtoLoc);
  }
  if (privateKeyLoc != null) {
    _Tokenizer_raise(Errors.UnexpectedPrivateField, privateKeyLoc);
  }
  if (optionalParametersLoc != null) {
    _Tokenizer_unexpected(optionalParametersLoc);
  }
}
function _UtilParser_isLiteralPropertyName() {
  return tokenIsLiteralPropertyName(_Parser_this.state.type);
}
function _UtilParser_isPrivateName(node) {
  return node.type === "PrivateName";
}
function _UtilParser_getPrivateNameSV(node) {
  return node.id.name;
}
function _UtilParser_hasPropertyAsPrivateName(node) {
  return (node.type === "MemberExpression" || node.type === "OptionalMemberExpression") && _Parser_isPrivateName_dynamic(node.property);
}
function _UtilParser_isObjectProperty(node) {
  return node.type === "ObjectProperty";
}
function _UtilParser_isObjectMethod(node) {
  return node.type === "ObjectMethod";
}
function _UtilParser_initializeScopes(inModule = _Parser_this.options.sourceType === "module") {
  const oldLabels = _Parser_this.state.labels;
  _Parser_this.state.labels = [];
  const oldExportedIdentifiers = _Parser_this.exportedIdentifiers;
  _Parser_this.exportedIdentifiers = new Set();
  const oldInModule = _Parser_this.inModule;
  _Parser_this.inModule = inModule;
  const oldScope = _Parser_this.scope;
  const ScopeHandler = _Parser_getScopeHandler_dynamic();
  _Parser_this.scope = new ScopeHandler(_Parser_this, inModule);
  const oldProdParam = _Parser_this.prodParam;
  _Parser_this.prodParam = new ProductionParameterHandler();
  const oldClassScope = _Parser_this.classScope;
  _Parser_this.classScope = new ClassScopeHandler(_Parser_this);
  const oldExpressionScope = _Parser_this.expressionScope;
  _Parser_this.expressionScope = new ExpressionScopeHandler(_Parser_this);
  return () => {
    _Parser_this.state.labels = oldLabels;
    _Parser_this.exportedIdentifiers = oldExportedIdentifiers;
    _Parser_this.inModule = oldInModule;
    _Parser_this.scope = oldScope;
    _Parser_this.prodParam = oldProdParam;
    _Parser_this.classScope = oldClassScope;
    _Parser_this.expressionScope = oldExpressionScope;
  };
}
function _UtilParser_enterInitialScopes() {
  let paramFlags = 0;
  if (_Parser_this.inModule) {
    paramFlags |= 2;
  }
  if (_Parser_this.optionFlags & 32) {
    paramFlags |= 1;
  }
  _Parser_this.scope.enter(1);
  _Parser_this.prodParam.enter(paramFlags);
}
function _UtilParser_checkDestructuringPrivate(refExpressionErrors) {
  const {
    privateKeyLoc
  } = refExpressionErrors;
  if (privateKeyLoc !== null) {
    _Tokenizer_expectPlugin("destructuringPrivate", privateKeyLoc);
  }
}
function _NodeUtils_startNode() {
  const loc = _Parser_this.state.startLoc;
  return new Node(_Parser_this, loc.index, loc);
}
function _NodeUtils_startNodeAt(loc) {
  return new Node(_Parser_this, loc.index, loc);
}
function _NodeUtils_startNodeAtNode(type) {
  return _NodeUtils_startNodeAt(type.loc.start);
}
function _NodeUtils_finishNode(node, type) {
  return _Parser_finishNodeAt_dynamic(node, type, _Parser_this.state.lastTokEndLoc);
}
function _NodeUtils_finishNodeAt(node, type, endLoc) {
  node.type = type;
  node.end = endLoc.index;
  node.loc.end = endLoc;
  if (_Parser_this.optionFlags & 128) node.range[1] = endLoc.index;
  if (_Parser_this.optionFlags & 4096) {
    _CommentsParser_processComment(node);
  }
  return node;
}
function _NodeUtils_resetStartLocation(node, startLoc) {
  node.start = startLoc.index;
  node.loc.start = startLoc;
  if (_Parser_this.optionFlags & 128) node.range[0] = startLoc.index;
}
function _NodeUtils_resetEndLocation(node, endLoc = _Parser_this.state.lastTokEndLoc) {
  node.end = endLoc.index;
  node.loc.end = endLoc;
  if (_Parser_this.optionFlags & 128) node.range[1] = endLoc.index;
}
function _NodeUtils_resetStartLocationFromNode(node, locationNode) {
  _Parser_resetStartLocation_dynamic(node, locationNode.loc.start);
}
function _NodeUtils_castNodeTo(node, type) {
  node.type = type;
  return node;
}
function _NodeUtils_cloneIdentifier(node) {
  const {
    type,
    start,
    end,
    loc,
    range,
    name
  } = node;
  const cloned = Object.create(NodePrototype);
  cloned.type = type;
  cloned.start = start;
  cloned.end = end;
  cloned.loc = loc;
  cloned.range = range;
  cloned.name = name;
  if (node.extra) cloned.extra = node.extra;
  return cloned;
}
function _NodeUtils_cloneStringLiteral(node) {
  const {
    type,
    start,
    end,
    loc,
    range,
    extra
  } = node;
  const cloned = Object.create(NodePrototype);
  cloned.type = type;
  cloned.start = start;
  cloned.end = end;
  cloned.loc = loc;
  cloned.range = range;
  cloned.extra = extra;
  cloned.value = node.value;
  return cloned;
}
function _LValParser_toAssignable(node, isLHS = false) {
  var _node$extra, _node$extra3;
  let parenthesized = undefined;
  if (node.type === "ParenthesizedExpression" || (_node$extra = node.extra) != null && _node$extra.parenthesized) {
    parenthesized = unwrapParenthesizedExpression(node);
    if (isLHS) {
      if (parenthesized.type === "Identifier") {
        _Parser_this.expressionScope.recordArrowParameterBindingError(Errors.InvalidParenthesizedAssignment, node);
      } else if (parenthesized.type !== "MemberExpression" && !_Parser_isOptionalMemberExpression_dynamic(parenthesized)) {
        _Tokenizer_raise(Errors.InvalidParenthesizedAssignment, node);
      }
    } else {
      _Tokenizer_raise(Errors.InvalidParenthesizedAssignment, node);
    }
  }
  switch (node.type) {
    case "Identifier":
    case "ObjectPattern":
    case "ArrayPattern":
    case "AssignmentPattern":
    case "RestElement":
      break;
    case "ObjectExpression":
      _Parser_castNodeTo_dynamic(node, "ObjectPattern");
      for (let i = 0, length = node.properties.length, last = length - 1; i < length; i++) {
        var _node$extra2;
        const prop = node.properties[i];
        const isLast = i === last;
        _Parser_toAssignableObjectExpressionProp_dynamic(prop, isLast, isLHS);
        if (isLast && prop.type === "RestElement" && (_node$extra2 = node.extra) != null && _node$extra2.trailingCommaLoc) {
          _Tokenizer_raise(Errors.RestTrailingComma, node.extra.trailingCommaLoc);
        }
      }
      break;
    case "ObjectProperty":
      {
        const {
          key,
          value
        } = node;
        if (_Parser_isPrivateName_dynamic(key)) {
          _Parser_this.classScope.usePrivateName(_Parser_getPrivateNameSV_dynamic(key), key.loc.start);
        }
        _Parser_toAssignable_dynamic(value, isLHS);
        break;
      }
    case "SpreadElement":
      {
        throw new Error("Internal @babel/parser error (this is a bug, please report it)." + " SpreadElement should be converted by .toAssignable's caller.");
      }
    case "ArrayExpression":
      _Parser_castNodeTo_dynamic(node, "ArrayPattern");
      _Parser_toAssignableList_dynamic(node.elements, (_node$extra3 = node.extra) == null ? void 0 : _node$extra3.trailingCommaLoc, isLHS);
      break;
    case "AssignmentExpression":
      if (node.operator !== "=") {
        _Tokenizer_raise(Errors.MissingEqInAssignment, node.left.loc.end);
      }
      _Parser_castNodeTo_dynamic(node, "AssignmentPattern");
      delete node.operator;
      _Parser_toAssignable_dynamic(node.left, isLHS);
      break;
    case "ParenthesizedExpression":
      _Parser_toAssignable_dynamic(parenthesized, isLHS);
      break;
  }
}
function _LValParser_toAssignableObjectExpressionProp(prop, isLast, isLHS) {
  if (prop.type === "ObjectMethod") {
    _Tokenizer_raise(prop.kind === "get" || prop.kind === "set" ? Errors.PatternHasAccessor : Errors.PatternHasMethod, prop.key);
  } else if (prop.type === "SpreadElement") {
    _Parser_castNodeTo_dynamic(prop, "RestElement");
    const arg = prop.argument;
    _Parser_checkToRestConversion_dynamic(arg, false);
    _Parser_toAssignable_dynamic(arg, isLHS);
    if (!isLast) {
      _Tokenizer_raise(Errors.RestTrailingComma, prop);
    }
  } else {
    _Parser_toAssignable_dynamic(prop, isLHS);
  }
}
function _LValParser_toAssignableList(exprList, trailingCommaLoc, isLHS) {
  const end = exprList.length - 1;
  for (let i = 0; i <= end; i++) {
    const elt = exprList[i];
    if (!elt) continue;
    _Parser_toAssignableListItem_dynamic(exprList, i, isLHS);
    if (elt.type === "RestElement") {
      if (i < end) {
        _Tokenizer_raise(Errors.RestTrailingComma, elt);
      } else if (trailingCommaLoc) {
        _Tokenizer_raise(Errors.RestTrailingComma, trailingCommaLoc);
      }
    }
  }
}
function _LValParser_toAssignableListItem(exprList, index, isLHS) {
  const node = exprList[index];
  if (node.type === "SpreadElement") {
    _Parser_castNodeTo_dynamic(node, "RestElement");
    const arg = node.argument;
    _Parser_checkToRestConversion_dynamic(arg, true);
    _Parser_toAssignable_dynamic(arg, isLHS);
  } else {
    _Parser_toAssignable_dynamic(node, isLHS);
  }
}
function _LValParser_isAssignable(node, isBinding) {
  switch (node.type) {
    case "Identifier":
    case "ObjectPattern":
    case "ArrayPattern":
    case "AssignmentPattern":
    case "RestElement":
      return true;
    case "ObjectExpression":
      {
        const last = node.properties.length - 1;
        return node.properties.every((prop, i) => {
          return prop.type !== "ObjectMethod" && (i === last || prop.type !== "SpreadElement") && _Parser_isAssignable_dynamic(prop);
        });
      }
    case "ObjectProperty":
      return _Parser_isAssignable_dynamic(node.value);
    case "SpreadElement":
      return _Parser_isAssignable_dynamic(node.argument);
    case "ArrayExpression":
      return node.elements.every(element => element === null || _Parser_isAssignable_dynamic(element));
    case "AssignmentExpression":
      return node.operator === "=";
    case "ParenthesizedExpression":
      return _Parser_isAssignable_dynamic(node.expression);
    case "MemberExpression":
    case "OptionalMemberExpression":
      return !isBinding;
    default:
      return false;
  }
}
function _LValParser_toReferencedList(exprList, isParenthesizedExpr) {
  return exprList;
}
function _LValParser_toReferencedListDeep(exprList, isParenthesizedExpr) {
  _Parser_toReferencedList_dynamic(exprList, isParenthesizedExpr);
  for (const expr of exprList) {
    if ((expr == null ? void 0 : expr.type) === "ArrayExpression") {
      _LValParser_toReferencedListDeep(expr.elements);
    }
  }
}
function _LValParser_parseSpread(refExpressionErrors) {
  const node = _NodeUtils_startNode();
  _Tokenizer_next();
  node.argument = _ExpressionParser_parseMaybeAssignAllowIn(refExpressionErrors, undefined);
  return _Parser_finishNode_dynamic(node, "SpreadElement");
}
function _LValParser_parseRestBinding() {
  const node = _NodeUtils_startNode();
  _Tokenizer_next();
  node.argument = _Parser_parseBindingAtom_dynamic();
  return _Parser_finishNode_dynamic(node, "RestElement");
}
function _LValParser_parseBindingAtom() {
  switch (_Parser_this.state.type) {
    case 0:
      {
        const node = _NodeUtils_startNode();
        _Tokenizer_next();
        node.elements = _LValParser_parseBindingList(3, 93, 1);
        return _Parser_finishNode_dynamic(node, "ArrayPattern");
      }
    case 5:
      return _ExpressionParser_parseObjectLike(8, true);
  }
  return _Parser_parseIdentifier_dynamic();
}
function _LValParser_parseBindingList(close, closeCharCode, flags) {
  const allowEmpty = flags & 1;
  const elts = [];
  let first = true;
  while (!_Tokenizer_eat(close)) {
    if (first) {
      first = false;
    } else {
      _UtilParser_expect(12);
    }
    if (allowEmpty && _Tokenizer_match(12)) {
      elts.push(null);
    } else if (_Tokenizer_eat(close)) {
      break;
    } else if (_Tokenizer_match(21)) {
      let rest = _LValParser_parseRestBinding();
      if (_BaseParser_hasPlugin("flow") || flags & 2) {
        rest = _Parser_parseFunctionParamType_dynamic(rest);
      }
      elts.push(rest);
      if (!_Parser_checkCommaAfterRest_dynamic(closeCharCode)) {
        _UtilParser_expect(close);
        break;
      }
    } else {
      const decorators = [];
      if (flags & 2) {
        if (_Tokenizer_match(26) && _BaseParser_hasPlugin("decorators")) {
          _Tokenizer_raise(Errors.UnsupportedParameterDecorator, _Parser_this.state.startLoc);
        }
        while (_Tokenizer_match(26)) {
          decorators.push(_StatementParser_parseDecorator());
        }
      }
      elts.push(_Parser_parseBindingElement_dynamic(flags, decorators));
    }
  }
  return elts;
}
function _LValParser_parseBindingRestProperty(prop) {
  _Tokenizer_next();
  prop.argument = _Parser_parseIdentifier_dynamic();
  _Parser_checkCommaAfterRest_dynamic(125);
  return _Parser_finishNode_dynamic(prop, "RestElement");
}
function _LValParser_parseBindingProperty() {
  const {
    type,
    startLoc
  } = _Parser_this.state;
  if (type === 21) {
    return _LValParser_parseBindingRestProperty(_NodeUtils_startNode());
  }
  const prop = _NodeUtils_startNode();
  if (type === 139) {
    _Tokenizer_expectPlugin("destructuringPrivate", startLoc);
    _Parser_this.classScope.usePrivateName(_Parser_this.state.value, startLoc);
    prop.key = _Parser_parsePrivateName_dynamic();
  } else {
    _ExpressionParser_parsePropertyName(prop);
  }
  prop.method = false;
  return _Parser_parseObjPropValue_dynamic(prop, startLoc, false, false, true, false);
}
function _LValParser_parseBindingElement(flags, decorators) {
  const left = _Parser_parseMaybeDefault_dynamic();
  if (_BaseParser_hasPlugin("flow") || flags & 2) {
    _Parser_parseFunctionParamType_dynamic(left);
  }
  if (decorators.length) {
    left.decorators = decorators;
    _NodeUtils_resetStartLocationFromNode(left, decorators[0]);
  }
  const elt = _Parser_parseMaybeDefault_dynamic(left.loc.start, left);
  return elt;
}
function _LValParser_parseFunctionParamType(param) {
  return param;
}
function _LValParser_parseMaybeDefault(startLoc, left) {
  startLoc != null ? startLoc : startLoc = _Parser_this.state.startLoc;
  left = left != null ? left : _Parser_parseBindingAtom_dynamic();
  if (!_Tokenizer_eat(29)) return left;
  const node = _NodeUtils_startNodeAt(startLoc);
  node.left = left;
  node.right = _ExpressionParser_parseMaybeAssignAllowIn();
  return _Parser_finishNode_dynamic(node, "AssignmentPattern");
}
function _LValParser_isValidLVal(type, isUnparenthesizedInAssign, binding) {
  switch (type) {
    case "AssignmentPattern":
      return "left";
    case "RestElement":
      return "argument";
    case "ObjectProperty":
      return "value";
    case "ParenthesizedExpression":
      return "expression";
    case "ArrayPattern":
      return "elements";
    case "ObjectPattern":
      return "properties";
  }
  return false;
}
function _LValParser_isOptionalMemberExpression(expression) {
  return expression.type === "OptionalMemberExpression";
}
function _LValParser_checkLVal(expression, ancestor, binding = 64, checkClashes = false, strictModeChanged = false, hasParenthesizedAncestor = false) {
  var _expression$extra;
  const type = expression.type;
  if (_Parser_isObjectMethod_dynamic(expression)) return;
  const isOptionalMemberExpression = _Parser_isOptionalMemberExpression_dynamic(expression);
  if (isOptionalMemberExpression || type === "MemberExpression") {
    if (isOptionalMemberExpression) {
      _Tokenizer_expectPlugin("optionalChainingAssign", expression.loc.start);
      if (ancestor.type !== "AssignmentExpression") {
        _Tokenizer_raise(Errors.InvalidLhsOptionalChaining, expression, {
          ancestor
        });
      }
    }
    if (binding !== 64) {
      _Tokenizer_raise(Errors.InvalidPropertyBindingPattern, expression);
    }
    return;
  }
  if (type === "Identifier") {
    _LValParser_checkIdentifier(expression, binding, strictModeChanged);
    const {
      name
    } = expression;
    if (checkClashes) {
      if (checkClashes.has(name)) {
        _Tokenizer_raise(Errors.ParamDupe, expression);
      } else {
        checkClashes.add(name);
      }
    }
    return;
  }
  const validity = _Parser_isValidLVal_dynamic(type, !(hasParenthesizedAncestor || (_expression$extra = expression.extra) != null && _expression$extra.parenthesized) && ancestor.type === "AssignmentExpression", binding);
  if (validity === true) return;
  if (validity === false) {
    const ParseErrorClass = binding === 64 ? Errors.InvalidLhs : Errors.InvalidLhsBinding;
    _Tokenizer_raise(ParseErrorClass, expression, {
      ancestor
    });
    return;
  }
  let key, isParenthesizedExpression;
  if (typeof validity === "string") {
    key = validity;
    isParenthesizedExpression = type === "ParenthesizedExpression";
  } else {
    [key, isParenthesizedExpression] = validity;
  }
  const nextAncestor = type === "ArrayPattern" || type === "ObjectPattern" ? {
    type
  } : ancestor;
  const val = expression[key];
  if (Array.isArray(val)) {
    for (const child of val) {
      if (child) {
        _LValParser_checkLVal(child, nextAncestor, binding, checkClashes, strictModeChanged, isParenthesizedExpression);
      }
    }
  } else if (val) {
    _LValParser_checkLVal(val, nextAncestor, binding, checkClashes, strictModeChanged, isParenthesizedExpression);
  }
}
function _LValParser_checkIdentifier(at, bindingType, strictModeChanged = false) {
  if (_Parser_this.state.strict && (strictModeChanged ? isStrictBindReservedWord(at.name, _Parser_this.inModule) : isStrictBindOnlyReservedWord(at.name))) {
    if (bindingType === 64) {
      _Tokenizer_raise(Errors.StrictEvalArguments, at, {
        referenceName: at.name
      });
    } else {
      _Tokenizer_raise(Errors.StrictEvalArgumentsBinding, at, {
        bindingName: at.name
      });
    }
  }
  if (bindingType & 8192 && at.name === "let") {
    _Tokenizer_raise(Errors.LetInLexicalBinding, at);
  }
  if (!(bindingType & 64)) {
    _LValParser_declareNameFromIdentifier(at, bindingType);
  }
}
function _LValParser_declareNameFromIdentifier(identifier, binding) {
  _Parser_this.scope.declareName(identifier.name, binding, identifier.loc.start);
}
function _LValParser_checkToRestConversion(node, allowPattern) {
  switch (node.type) {
    case "ParenthesizedExpression":
      _Parser_checkToRestConversion_dynamic(node.expression, allowPattern);
      break;
    case "Identifier":
    case "MemberExpression":
      break;
    case "ArrayExpression":
    case "ObjectExpression":
      if (allowPattern) break;
    default:
      _Tokenizer_raise(Errors.InvalidRestAssignmentPattern, node);
  }
}
function _LValParser_checkCommaAfterRest(close) {
  if (!_Tokenizer_match(12)) {
    return false;
  }
  _Tokenizer_raise(_Tokenizer_lookaheadCharCode() === close ? Errors.RestTrailingComma : Errors.ElementAfterRest, _Parser_this.state.startLoc);
  return true;
}
function _ExpressionParser_checkProto(prop, isRecord, sawProto, refExpressionErrors) {
  if (prop.type === "SpreadElement" || _Parser_isObjectMethod_dynamic(prop) || prop.computed || prop.shorthand) {
    return sawProto;
  }
  const key = prop.key;
  const name = key.type === "Identifier" ? key.name : key.value;
  if (name === "__proto__") {
    if (isRecord) {
      _Tokenizer_raise(Errors.RecordNoProto, key);
      return true;
    }
    if (sawProto) {
      if (refExpressionErrors) {
        if (refExpressionErrors.doubleProtoLoc === null) {
          refExpressionErrors.doubleProtoLoc = key.loc.start;
        }
      } else {
        _Tokenizer_raise(Errors.DuplicateProto, key);
      }
    }
    return true;
  }
  return sawProto;
}
function _ExpressionParser_shouldExitDescending(expr, potentialArrowAt) {
  return expr.type === "ArrowFunctionExpression" && _BaseParser_offsetToSourcePos(expr.start) === potentialArrowAt;
}
function _ExpressionParser_getExpression() {
  _UtilParser_enterInitialScopes();
  _Tokenizer_nextToken();
  const expr = _ExpressionParser_parseExpression();
  if (!_Tokenizer_match(140)) {
    _Tokenizer_unexpected();
  }
  _CommentsParser_finalizeRemainingComments();
  expr.comments = _Parser_this.comments;
  expr.errors = _Parser_this.state.errors;
  if (_Parser_this.optionFlags & 256) {
    expr.tokens = _Parser_this.tokens;
  }
  return expr;
}
function _ExpressionParser_parseExpression(disallowIn, refExpressionErrors) {
  if (disallowIn) {
    return _ExpressionParser_disallowInAnd(() => _ExpressionParser_parseExpressionBase(refExpressionErrors));
  }
  return _ExpressionParser_allowInAnd(() => _ExpressionParser_parseExpressionBase(refExpressionErrors));
}
function _ExpressionParser_parseExpressionBase(refExpressionErrors) {
  const startLoc = _Parser_this.state.startLoc;
  const expr = _Parser_parseMaybeAssign_dynamic(refExpressionErrors);
  if (_Tokenizer_match(12)) {
    const node = _NodeUtils_startNodeAt(startLoc);
    node.expressions = [expr];
    while (_Tokenizer_eat(12)) {
      node.expressions.push(_Parser_parseMaybeAssign_dynamic(refExpressionErrors));
    }
    _Parser_toReferencedList_dynamic(node.expressions);
    return _Parser_finishNode_dynamic(node, "SequenceExpression");
  }
  return expr;
}
function _ExpressionParser_parseMaybeAssignDisallowIn(refExpressionErrors, afterLeftParse) {
  return _ExpressionParser_disallowInAnd(() => _Parser_parseMaybeAssign_dynamic(refExpressionErrors, afterLeftParse));
}
function _ExpressionParser_parseMaybeAssignAllowIn(refExpressionErrors, afterLeftParse) {
  return _ExpressionParser_allowInAnd(() => _Parser_parseMaybeAssign_dynamic(refExpressionErrors, afterLeftParse));
}
function _ExpressionParser_setOptionalParametersError(refExpressionErrors) {
  refExpressionErrors.optionalParametersLoc = _Parser_this.state.startLoc;
}
function _ExpressionParser_parseMaybeAssign(refExpressionErrors, afterLeftParse) {
  const startLoc = _Parser_this.state.startLoc;
  const isYield = _UtilParser_isContextual(108);
  if (isYield) {
    if (_Parser_this.prodParam.hasYield) {
      _Tokenizer_next();
      let left = _ExpressionParser_parseYield(startLoc);
      if (afterLeftParse) {
        left = afterLeftParse.call(_Parser_this, left, startLoc);
      }
      return left;
    }
  }
  let ownExpressionErrors;
  if (refExpressionErrors) {
    ownExpressionErrors = false;
  } else {
    refExpressionErrors = new ExpressionErrors();
    ownExpressionErrors = true;
  }
  const {
    type
  } = _Parser_this.state;
  if (type === 10 || tokenIsIdentifier(type)) {
    _Parser_this.state.potentialArrowAt = _Parser_this.state.start;
  }
  let left = _ExpressionParser_parseMaybeConditional(refExpressionErrors);
  if (afterLeftParse) {
    left = afterLeftParse.call(_Parser_this, left, startLoc);
  }
  if (tokenIsAssignment(_Parser_this.state.type)) {
    const node = _NodeUtils_startNodeAt(startLoc);
    const operator = _Parser_this.state.value;
    node.operator = operator;
    if (_Tokenizer_match(29)) {
      _Parser_toAssignable_dynamic(left, true);
      node.left = left;
      const startIndex = startLoc.index;
      if (refExpressionErrors.doubleProtoLoc != null && refExpressionErrors.doubleProtoLoc.index >= startIndex) {
        refExpressionErrors.doubleProtoLoc = null;
      }
      if (refExpressionErrors.shorthandAssignLoc != null && refExpressionErrors.shorthandAssignLoc.index >= startIndex) {
        refExpressionErrors.shorthandAssignLoc = null;
      }
      if (refExpressionErrors.privateKeyLoc != null && refExpressionErrors.privateKeyLoc.index >= startIndex) {
        _UtilParser_checkDestructuringPrivate(refExpressionErrors);
        refExpressionErrors.privateKeyLoc = null;
      }
    } else {
      node.left = left;
    }
    _Tokenizer_next();
    node.right = _Parser_parseMaybeAssign_dynamic();
    _LValParser_checkLVal(left, _Parser_finishNode_dynamic(node, "AssignmentExpression"));
    return node;
  } else if (ownExpressionErrors) {
    _UtilParser_checkExpressionErrors(refExpressionErrors, true);
  }
  if (isYield) {
    const {
      type
    } = _Parser_this.state;
    const startsExpr = _BaseParser_hasPlugin("v8intrinsic") ? tokenCanStartExpression(type) : tokenCanStartExpression(type) && !_Tokenizer_match(54);
    if (startsExpr && !_ExpressionParser_isAmbiguousPrefixOrIdentifier()) {
      _Tokenizer_raiseOverwrite(Errors.YieldNotInGeneratorFunction, startLoc);
      return _ExpressionParser_parseYield(startLoc);
    }
  }
  return left;
}
function _ExpressionParser_parseMaybeConditional(refExpressionErrors) {
  const startLoc = _Parser_this.state.startLoc;
  const potentialArrowAt = _Parser_this.state.potentialArrowAt;
  const expr = _ExpressionParser_parseExprOps(refExpressionErrors);
  if (_ExpressionParser_shouldExitDescending(expr, potentialArrowAt)) {
    return expr;
  }
  return _Parser_parseConditional_dynamic(expr, startLoc, refExpressionErrors);
}
function _ExpressionParser_parseConditional(expr, startLoc, refExpressionErrors) {
  if (_Tokenizer_eat(17)) {
    const node = _NodeUtils_startNodeAt(startLoc);
    node.test = expr;
    node.consequent = _ExpressionParser_parseMaybeAssignAllowIn();
    _UtilParser_expect(14);
    node.alternate = _Parser_parseMaybeAssign_dynamic();
    return _Parser_finishNode_dynamic(node, "ConditionalExpression");
  }
  return expr;
}
function _ExpressionParser_parseMaybeUnaryOrPrivate(refExpressionErrors) {
  return _Tokenizer_match(139) ? _Parser_parsePrivateName_dynamic() : _Parser_parseMaybeUnary_dynamic(refExpressionErrors);
}
function _ExpressionParser_parseExprOps(refExpressionErrors) {
  const startLoc = _Parser_this.state.startLoc;
  const potentialArrowAt = _Parser_this.state.potentialArrowAt;
  const expr = _ExpressionParser_parseMaybeUnaryOrPrivate(refExpressionErrors);
  if (_ExpressionParser_shouldExitDescending(expr, potentialArrowAt)) {
    return expr;
  }
  return _Parser_parseExprOp_dynamic(expr, startLoc, -1);
}
function _ExpressionParser_parseExprOp(left, leftStartLoc, minPrec) {
  if (_Parser_isPrivateName_dynamic(left)) {
    const value = _Parser_getPrivateNameSV_dynamic(left);
    if (minPrec >= tokenOperatorPrecedence(58) || !_Parser_this.prodParam.hasIn || !_Tokenizer_match(58)) {
      _Tokenizer_raise(Errors.PrivateInExpectedIn, left, {
        identifierName: value
      });
    }
    _Parser_this.classScope.usePrivateName(value, left.loc.start);
  }
  const op = _Parser_this.state.type;
  if (tokenIsOperator(op) && (_Parser_this.prodParam.hasIn || !_Tokenizer_match(58))) {
    let prec = tokenOperatorPrecedence(op);
    if (prec > minPrec) {
      if (op === 39) {
        _Tokenizer_expectPlugin("pipelineOperator");
        if (_Parser_this.state.inFSharpPipelineDirectBody) {
          return left;
        }
        _ExpressionParser_checkPipelineAtInfixOperator(left, leftStartLoc);
      }
      const node = _NodeUtils_startNodeAt(leftStartLoc);
      node.left = left;
      node.operator = _Parser_this.state.value;
      const logical = op === 41 || op === 42;
      const coalesce = op === 40;
      if (coalesce) {
        prec = tokenOperatorPrecedence(42);
      }
      _Tokenizer_next();
      if (op === 39 && _BaseParser_hasPlugin(["pipelineOperator", {
        proposal: "minimal"
      }])) {
        if (_Parser_this.state.type === 96 && _Parser_this.prodParam.hasAwait) {
          throw _Tokenizer_raise(Errors.UnexpectedAwaitAfterPipelineBody, _Parser_this.state.startLoc);
        }
      }
      node.right = _ExpressionParser_parseExprOpRightExpr(op, prec);
      const finishedNode = _Parser_finishNode_dynamic(node, logical || coalesce ? "LogicalExpression" : "BinaryExpression");
      const nextOp = _Parser_this.state.type;
      if (coalesce && (nextOp === 41 || nextOp === 42) || logical && nextOp === 40) {
        throw _Tokenizer_raise(Errors.MixingCoalesceWithLogical, _Parser_this.state.startLoc);
      }
      return _Parser_parseExprOp_dynamic(finishedNode, leftStartLoc, minPrec);
    }
  }
  return left;
}
function _ExpressionParser_parseExprOpRightExpr(op, prec) {
  const startLoc = _Parser_this.state.startLoc;
  switch (op) {
    case 39:
      switch (_BaseParser_getPluginOption("pipelineOperator", "proposal")) {
        case "hack":
          return _ExpressionParser_withTopicBindingContext(() => {
            return _ExpressionParser_parseHackPipeBody();
          });
        case "fsharp":
          return _ExpressionParser_withSoloAwaitPermittingContext(() => {
            return _ExpressionParser_parseFSharpPipelineBody(prec);
          });
      }
      if (_BaseParser_getPluginOption("pipelineOperator", "proposal") === "smart") {
        return _ExpressionParser_withTopicBindingContext(() => {
          if (_Parser_this.prodParam.hasYield && _UtilParser_isContextual(108)) {
            throw _Tokenizer_raise(Errors.PipeBodyIsTighter, _Parser_this.state.startLoc);
          }
          return _ExpressionParser_parseSmartPipelineBodyInStyle(_ExpressionParser_parseExprOpBaseRightExpr(op, prec), startLoc);
        });
      }
    default:
      return _ExpressionParser_parseExprOpBaseRightExpr(op, prec);
  }
}
function _ExpressionParser_parseExprOpBaseRightExpr(op, prec) {
  const startLoc = _Parser_this.state.startLoc;
  return _Parser_parseExprOp_dynamic(_ExpressionParser_parseMaybeUnaryOrPrivate(), startLoc, tokenIsRightAssociative(op) ? prec - 1 : prec);
}
function _ExpressionParser_parseHackPipeBody() {
  var _body$extra;
  const {
    startLoc
  } = _Parser_this.state;
  const body = _Parser_parseMaybeAssign_dynamic();
  const requiredParentheses = UnparenthesizedPipeBodyDescriptions.has(body.type);
  if (requiredParentheses && !((_body$extra = body.extra) != null && _body$extra.parenthesized)) {
    _Tokenizer_raise(Errors.PipeUnparenthesizedBody, startLoc, {
      type: body.type
    });
  }
  if (!_ExpressionParser_topicReferenceWasUsedInCurrentContext()) {
    _Tokenizer_raise(Errors.PipeTopicUnused, startLoc);
  }
  return body;
}
function _ExpressionParser_checkExponentialAfterUnary(node) {
  if (_Tokenizer_match(57)) {
    _Tokenizer_raise(Errors.UnexpectedTokenUnaryExponentiation, node.argument);
  }
}
function _ExpressionParser_parseMaybeUnary(refExpressionErrors, sawUnary) {
  const startLoc = _Parser_this.state.startLoc;
  const isAwait = _UtilParser_isContextual(96);
  if (isAwait && _ExpressionParser_recordAwaitIfAllowed()) {
    _Tokenizer_next();
    const expr = _ExpressionParser_parseAwait(startLoc);
    if (!sawUnary) _ExpressionParser_checkExponentialAfterUnary(expr);
    return expr;
  }
  const update = _Tokenizer_match(34);
  const node = _NodeUtils_startNode();
  if (tokenIsPrefix(_Parser_this.state.type)) {
    node.operator = _Parser_this.state.value;
    node.prefix = true;
    if (_Tokenizer_match(72)) {
      _Tokenizer_expectPlugin("throwExpressions");
    }
    const isDelete = _Tokenizer_match(89);
    _Tokenizer_next();
    node.argument = _Parser_parseMaybeUnary_dynamic(null, true);
    _UtilParser_checkExpressionErrors(refExpressionErrors, true);
    if (_Parser_this.state.strict && isDelete) {
      const arg = node.argument;
      if (arg.type === "Identifier") {
        _Tokenizer_raise(Errors.StrictDelete, node);
      } else if (_Parser_hasPropertyAsPrivateName_dynamic(arg)) {
        _Tokenizer_raise(Errors.DeletePrivateField, node);
      }
    }
    if (!update) {
      if (!sawUnary) {
        _ExpressionParser_checkExponentialAfterUnary(node);
      }
      return _Parser_finishNode_dynamic(node, "UnaryExpression");
    }
  }
  const expr = _ExpressionParser_parseUpdate(node, update, refExpressionErrors);
  if (isAwait) {
    const {
      type
    } = _Parser_this.state;
    const startsExpr = _BaseParser_hasPlugin("v8intrinsic") ? tokenCanStartExpression(type) : tokenCanStartExpression(type) && !_Tokenizer_match(54);
    if (startsExpr && !_ExpressionParser_isAmbiguousPrefixOrIdentifier()) {
      _Tokenizer_raiseOverwrite(Errors.AwaitNotInAsyncContext, startLoc);
      return _ExpressionParser_parseAwait(startLoc);
    }
  }
  return expr;
}
function _ExpressionParser_parseUpdate(node, update, refExpressionErrors) {
  if (update) {
    const updateExpressionNode = node;
    _LValParser_checkLVal(updateExpressionNode.argument, _Parser_finishNode_dynamic(updateExpressionNode, "UpdateExpression"));
    return node;
  }
  const startLoc = _Parser_this.state.startLoc;
  let expr = _ExpressionParser_parseExprSubscripts(refExpressionErrors);
  if (_UtilParser_checkExpressionErrors(refExpressionErrors, false)) return expr;
  while (tokenIsPostfix(_Parser_this.state.type) && !_UtilParser_canInsertSemicolon()) {
    const node = _NodeUtils_startNodeAt(startLoc);
    node.operator = _Parser_this.state.value;
    node.prefix = false;
    node.argument = expr;
    _Tokenizer_next();
    _LValParser_checkLVal(expr, expr = _Parser_finishNode_dynamic(node, "UpdateExpression"));
  }
  return expr;
}
function _ExpressionParser_parseExprSubscripts(refExpressionErrors) {
  const startLoc = _Parser_this.state.startLoc;
  const potentialArrowAt = _Parser_this.state.potentialArrowAt;
  const expr = _Parser_parseExprAtom_dynamic(refExpressionErrors);
  if (_ExpressionParser_shouldExitDescending(expr, potentialArrowAt)) {
    return expr;
  }
  return _Parser_parseSubscripts_dynamic(expr, startLoc);
}
function _ExpressionParser_parseSubscripts(base, startLoc, noCalls) {
  const state = {
    optionalChainMember: false,
    maybeAsyncArrow: _ExpressionParser_atPossibleAsyncArrow(base),
    stop: false
  };
  do {
    base = _Parser_parseSubscript_dynamic(base, startLoc, noCalls, state);
    state.maybeAsyncArrow = false;
  } while (!state.stop);
  return base;
}
function _ExpressionParser_parseSubscript(base, startLoc, noCalls, state) {
  const {
    type
  } = _Parser_this.state;
  if (!noCalls && type === 15) {
    return _ExpressionParser_parseBind(base, startLoc, noCalls, state);
  } else if (tokenIsTemplate(type)) {
    return _ExpressionParser_parseTaggedTemplateExpression(base, startLoc, state);
  }
  let optional = false;
  if (type === 18) {
    if (noCalls) {
      _Tokenizer_raise(Errors.OptionalChainingNoNew, _Parser_this.state.startLoc);
      if (_Tokenizer_lookaheadCharCode() === 40) {
        return _Parser_stopParseSubscript_dynamic(base, state);
      }
    }
    state.optionalChainMember = optional = true;
    _Tokenizer_next();
  }
  if (!noCalls && _Tokenizer_match(10)) {
    return _ExpressionParser_parseCoverCallAndAsyncArrowHead(base, startLoc, state, optional);
  } else {
    const computed = _Tokenizer_eat(0);
    if (computed || optional || _Tokenizer_eat(16)) {
      return _Parser_parseMember_dynamic(base, startLoc, state, computed, optional);
    } else {
      return _Parser_stopParseSubscript_dynamic(base, state);
    }
  }
}
function _ExpressionParser_stopParseSubscript(base, state) {
  state.stop = true;
  return base;
}
function _ExpressionParser_parseMember(base, startLoc, state, computed, optional) {
  const node = _NodeUtils_startNodeAt(startLoc);
  node.object = base;
  node.computed = computed;
  if (computed) {
    node.property = _ExpressionParser_parseExpression();
    _UtilParser_expect(3);
  } else if (_Tokenizer_match(139)) {
    if (base.type === "Super") {
      _Tokenizer_raise(Errors.SuperPrivateField, startLoc);
    }
    _Parser_this.classScope.usePrivateName(_Parser_this.state.value, _Parser_this.state.startLoc);
    node.property = _Parser_parsePrivateName_dynamic();
  } else {
    node.property = _Parser_parseIdentifier_dynamic(true);
  }
  if (state.optionalChainMember) {
    node.optional = optional;
    return _Parser_finishNode_dynamic(node, "OptionalMemberExpression");
  } else {
    return _Parser_finishNode_dynamic(node, "MemberExpression");
  }
}
function _ExpressionParser_parseBind(base, startLoc, noCalls, state) {
  const node = _NodeUtils_startNodeAt(startLoc);
  node.object = base;
  _Tokenizer_next();
  node.callee = _ExpressionParser_parseNoCallExpr();
  state.stop = true;
  return _Parser_parseSubscripts_dynamic(_Parser_finishNode_dynamic(node, "BindExpression"), startLoc, noCalls);
}
function _ExpressionParser_parseCoverCallAndAsyncArrowHead(base, startLoc, state, optional) {
  const oldMaybeInArrowParameters = _Parser_this.state.maybeInArrowParameters;
  let refExpressionErrors = null;
  _Parser_this.state.maybeInArrowParameters = true;
  _Tokenizer_next();
  const node = _NodeUtils_startNodeAt(startLoc);
  node.callee = base;
  const {
    maybeAsyncArrow,
    optionalChainMember
  } = state;
  if (maybeAsyncArrow) {
    _Parser_this.expressionScope.enter(newAsyncArrowScope());
    refExpressionErrors = new ExpressionErrors();
  }
  if (optionalChainMember) {
    node.optional = optional;
  }
  if (optional) {
    node.arguments = _ExpressionParser_parseCallExpressionArguments(11);
  } else {
    node.arguments = _ExpressionParser_parseCallExpressionArguments(11, base.type !== "Super", node, refExpressionErrors);
  }
  let finishedNode = _Parser_finishCallExpression_dynamic(node, optionalChainMember);
  if (maybeAsyncArrow && _Parser_shouldParseAsyncArrow_dynamic() && !optional) {
    state.stop = true;
    _UtilParser_checkDestructuringPrivate(refExpressionErrors);
    _Parser_this.expressionScope.validateAsPattern();
    _Parser_this.expressionScope.exit();
    finishedNode = _Parser_parseAsyncArrowFromCallExpression_dynamic(_NodeUtils_startNodeAt(startLoc), finishedNode);
  } else {
    if (maybeAsyncArrow) {
      _UtilParser_checkExpressionErrors(refExpressionErrors, true);
      _Parser_this.expressionScope.exit();
    }
    _Parser_toReferencedArguments_dynamic(finishedNode);
  }
  _Parser_this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
  return finishedNode;
}
function _ExpressionParser_toReferencedArguments(node, isParenthesizedExpr) {
  _LValParser_toReferencedListDeep(node.arguments, isParenthesizedExpr);
}
function _ExpressionParser_parseTaggedTemplateExpression(base, startLoc, state) {
  const node = _NodeUtils_startNodeAt(startLoc);
  node.tag = base;
  node.quasi = _ExpressionParser_parseTemplate(true);
  if (state.optionalChainMember) {
    _Tokenizer_raise(Errors.OptionalChainingNoTemplate, startLoc);
  }
  return _Parser_finishNode_dynamic(node, "TaggedTemplateExpression");
}
function _ExpressionParser_atPossibleAsyncArrow(base) {
  return base.type === "Identifier" && base.name === "async" && _Parser_this.state.lastTokEndLoc.index === base.end && !_UtilParser_canInsertSemicolon() && base.end - base.start === 5 && _BaseParser_offsetToSourcePos(base.start) === _Parser_this.state.potentialArrowAt;
}
function _ExpressionParser_finishCallExpression(node, optional) {
  if (node.callee.type === "Import") {
    if (node.arguments.length === 0 || node.arguments.length > 2) {
      _Tokenizer_raise(Errors.ImportCallArity, node);
    } else {
      for (const arg of node.arguments) {
        if (arg.type === "SpreadElement") {
          _Tokenizer_raise(Errors.ImportCallSpreadArgument, arg);
        }
      }
    }
  }
  return _Parser_finishNode_dynamic(node, optional ? "OptionalCallExpression" : "CallExpression");
}
function _ExpressionParser_parseCallExpressionArguments(close, allowPlaceholder, nodeForExtra, refExpressionErrors) {
  const elts = [];
  let first = true;
  const oldInFSharpPipelineDirectBody = _Parser_this.state.inFSharpPipelineDirectBody;
  _Parser_this.state.inFSharpPipelineDirectBody = false;
  while (!_Tokenizer_eat(close)) {
    if (first) {
      first = false;
    } else {
      _UtilParser_expect(12);
      if (_Tokenizer_match(close)) {
        if (nodeForExtra) {
          _ExpressionParser_addTrailingCommaExtraToNode(nodeForExtra);
        }
        _Tokenizer_next();
        break;
      }
    }
    elts.push(_ExpressionParser_parseExprListItem(false, refExpressionErrors, allowPlaceholder));
  }
  _Parser_this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
  return elts;
}
function _ExpressionParser_shouldParseAsyncArrow() {
  return _Tokenizer_match(19) && !_UtilParser_canInsertSemicolon();
}
function _ExpressionParser_parseAsyncArrowFromCallExpression(node, call) {
  var _call$extra;
  _CommentsParser_resetPreviousNodeTrailingComments(call);
  _UtilParser_expect(19);
  _ExpressionParser_parseArrowExpression(node, call.arguments, true, (_call$extra = call.extra) == null ? void 0 : _call$extra.trailingCommaLoc);
  if (call.innerComments) {
    setInnerComments(node, call.innerComments);
  }
  if (call.callee.trailingComments) {
    setInnerComments(node, call.callee.trailingComments);
  }
  return node;
}
function _ExpressionParser_parseNoCallExpr() {
  const startLoc = _Parser_this.state.startLoc;
  return _Parser_parseSubscripts_dynamic(_Parser_parseExprAtom_dynamic(), startLoc, true);
}
function _ExpressionParser_parseExprAtom(refExpressionErrors) {
  let node;
  let decorators = null;
  const {
    type
  } = _Parser_this.state;
  switch (type) {
    case 79:
      return _ExpressionParser_parseSuper();
    case 83:
      node = _NodeUtils_startNode();
      _Tokenizer_next();
      if (_Tokenizer_match(16)) {
        return _ExpressionParser_parseImportMetaPropertyOrPhaseCall(node);
      }
      if (_Tokenizer_match(10)) {
        if (_Parser_this.optionFlags & 512) {
          return _ExpressionParser_parseImportCall(node);
        } else {
          return _Parser_finishNode_dynamic(node, "Import");
        }
      } else {
        _Tokenizer_raise(Errors.UnsupportedImport, _Parser_this.state.lastTokStartLoc);
        return _Parser_finishNode_dynamic(node, "Import");
      }
    case 78:
      node = _NodeUtils_startNode();
      _Tokenizer_next();
      return _Parser_finishNode_dynamic(node, "ThisExpression");
    case 90:
      {
        return _ExpressionParser_parseDo(_NodeUtils_startNode(), false);
      }
    case 56:
    case 31:
      {
        _Tokenizer_readRegexp();
        return _Parser_parseRegExpLiteral_dynamic(_Parser_this.state.value);
      }
    case 135:
      return _Parser_parseNumericLiteral_dynamic(_Parser_this.state.value);
    case 136:
      return _Parser_parseBigIntLiteral_dynamic(_Parser_this.state.value);
    case 134:
      return _Parser_parseStringLiteral_dynamic(_Parser_this.state.value);
    case 84:
      return _Parser_parseNullLiteral_dynamic();
    case 85:
      return _Parser_parseBooleanLiteral_dynamic(true);
    case 86:
      return _Parser_parseBooleanLiteral_dynamic(false);
    case 10:
      {
        const canBeArrow = _Parser_this.state.potentialArrowAt === _Parser_this.state.start;
        return _Parser_parseParenAndDistinguishExpression_dynamic(canBeArrow);
      }
    case 0:
      {
        return _Parser_parseArrayLike_dynamic(3, true, false, refExpressionErrors);
      }
    case 5:
      {
        return _ExpressionParser_parseObjectLike(8, false, false, refExpressionErrors);
      }
    case 68:
      return _ExpressionParser_parseFunctionOrFunctionSent();
    case 26:
      decorators = _StatementParser_parseDecorators();
    case 80:
      return _Parser_parseClass_dynamic(_StatementParser_maybeTakeDecorators(decorators, _NodeUtils_startNode()), false);
    case 77:
      return _ExpressionParser_parseNewOrNewTarget();
    case 25:
    case 24:
      return _ExpressionParser_parseTemplate(false);
    case 15:
      {
        node = _NodeUtils_startNode();
        _Tokenizer_next();
        node.object = null;
        const callee = node.callee = _ExpressionParser_parseNoCallExpr();
        if (callee.type === "MemberExpression") {
          return _Parser_finishNode_dynamic(node, "BindExpression");
        } else {
          throw _Tokenizer_raise(Errors.UnsupportedBind, callee);
        }
      }
    case 139:
      {
        _Tokenizer_raise(Errors.PrivateInExpectedIn, _Parser_this.state.startLoc, {
          identifierName: _Parser_this.state.value
        });
        return _Parser_parsePrivateName_dynamic();
      }
    case 33:
      {
        return _ExpressionParser_parseTopicReferenceThenEqualsSign(54, "%");
      }
    case 32:
      {
        return _ExpressionParser_parseTopicReferenceThenEqualsSign(44, "^");
      }
    case 37:
    case 38:
      {
        return _ExpressionParser_parseTopicReference("hack");
      }
    case 44:
    case 54:
    case 27:
      {
        const pipeProposal = _BaseParser_getPluginOption("pipelineOperator", "proposal");
        if (pipeProposal) {
          return _ExpressionParser_parseTopicReference(pipeProposal);
        }
        _Tokenizer_unexpected();
        break;
      }
    case 47:
      {
        const lookaheadCh = _Parser_this.input.codePointAt(_Tokenizer_nextTokenStart());
        if (isIdentifierStart(lookaheadCh) || lookaheadCh === 62) {
          _Tokenizer_expectOnePlugin(["jsx", "flow", "typescript"]);
        } else {
          _Tokenizer_unexpected();
        }
        break;
      }
    default:
      {
        if (type === 137) {
          return _Parser_parseDecimalLiteral_dynamic(_Parser_this.state.value);
        } else if (type === 2 || type === 1) {
          return _Parser_parseArrayLike_dynamic(_Parser_this.state.type === 2 ? 4 : 3, false, true);
        } else if (type === 6 || type === 7) {
          return _ExpressionParser_parseObjectLike(_Parser_this.state.type === 6 ? 9 : 8, false, true);
        }
      }
      if (tokenIsIdentifier(type)) {
        if (_UtilParser_isContextual(127) && _Tokenizer_lookaheadInLineCharCode() === 123) {
          return _ExpressionParser_parseModuleExpression();
        }
        const canBeArrow = _Parser_this.state.potentialArrowAt === _Parser_this.state.start;
        const containsEsc = _Parser_this.state.containsEsc;
        const id = _Parser_parseIdentifier_dynamic();
        if (!containsEsc && id.name === "async" && !_UtilParser_canInsertSemicolon()) {
          const {
            type
          } = _Parser_this.state;
          if (type === 68) {
            _CommentsParser_resetPreviousNodeTrailingComments(id);
            _Tokenizer_next();
            return _StatementParser_parseAsyncFunctionExpression(_NodeUtils_startNodeAtNode(id));
          } else if (tokenIsIdentifier(type)) {
            if (_Tokenizer_lookaheadCharCode() === 61) {
              return _ExpressionParser_parseAsyncArrowUnaryFunction(_NodeUtils_startNodeAtNode(id));
            } else {
              return id;
            }
          } else if (type === 90) {
            _CommentsParser_resetPreviousNodeTrailingComments(id);
            return _ExpressionParser_parseDo(_NodeUtils_startNodeAtNode(id), true);
          }
        }
        if (canBeArrow && _Tokenizer_match(19) && !_UtilParser_canInsertSemicolon()) {
          _Tokenizer_next();
          return _ExpressionParser_parseArrowExpression(_NodeUtils_startNodeAtNode(id), [id], false);
        }
        return id;
      } else {
        _Tokenizer_unexpected();
      }
  }
}
function _ExpressionParser_parseTopicReferenceThenEqualsSign(topicTokenType, topicTokenValue) {
  const pipeProposal = _BaseParser_getPluginOption("pipelineOperator", "proposal");
  if (pipeProposal) {
    _Parser_this.state.type = topicTokenType;
    _Parser_this.state.value = topicTokenValue;
    _Parser_this.state.pos--;
    _Parser_this.state.end--;
    _Parser_this.state.endLoc = createPositionWithColumnOffset(_Parser_this.state.endLoc, -1);
    return _ExpressionParser_parseTopicReference(pipeProposal);
  } else {
    _Tokenizer_unexpected();
  }
}
function _ExpressionParser_parseTopicReference(pipeProposal) {
  const node = _NodeUtils_startNode();
  const startLoc = _Parser_this.state.startLoc;
  const tokenType = _Parser_this.state.type;
  _Tokenizer_next();
  return _ExpressionParser_finishTopicReference(node, startLoc, pipeProposal, tokenType);
}
function _ExpressionParser_finishTopicReference(node, startLoc, pipeProposal, tokenType) {
  if (_ExpressionParser_testTopicReferenceConfiguration(pipeProposal, startLoc, tokenType)) {
    if (pipeProposal === "hack") {
      if (!_ExpressionParser_topicReferenceIsAllowedInCurrentContext()) {
        _Tokenizer_raise(Errors.PipeTopicUnbound, startLoc);
      }
      _ExpressionParser_registerTopicReference();
      return _Parser_finishNode_dynamic(node, "TopicReference");
    } else {
      if (!_ExpressionParser_topicReferenceIsAllowedInCurrentContext()) {
        _Tokenizer_raise(Errors.PrimaryTopicNotAllowed, startLoc);
      }
      _ExpressionParser_registerTopicReference();
      return _Parser_finishNode_dynamic(node, "PipelinePrimaryTopicReference");
    }
  } else {
    throw _Tokenizer_raise(Errors.PipeTopicUnconfiguredToken, startLoc, {
      token: tokenLabelName(tokenType)
    });
  }
}
function _ExpressionParser_testTopicReferenceConfiguration(pipeProposal, startLoc, tokenType) {
  switch (pipeProposal) {
    case "hack":
      {
        return _BaseParser_hasPlugin(["pipelineOperator", {
          topicToken: tokenLabelName(tokenType)
        }]);
      }
    case "smart":
      return tokenType === 27;
    default:
      throw _Tokenizer_raise(Errors.PipeTopicRequiresHackPipes, startLoc);
  }
}
function _ExpressionParser_parseAsyncArrowUnaryFunction(node) {
  _Parser_this.prodParam.enter(functionFlags(true, _Parser_this.prodParam.hasYield));
  const params = [_Parser_parseIdentifier_dynamic()];
  _Parser_this.prodParam.exit();
  if (_UtilParser_hasPrecedingLineBreak()) {
    _Tokenizer_raise(Errors.LineTerminatorBeforeArrow, _Parser_this.state.curPosition());
  }
  _UtilParser_expect(19);
  return _ExpressionParser_parseArrowExpression(node, params, true);
}
function _ExpressionParser_parseDo(node, isAsync) {
  _Tokenizer_expectPlugin("doExpressions");
  if (isAsync) {
    _Tokenizer_expectPlugin("asyncDoExpressions");
  }
  node.async = isAsync;
  _Tokenizer_next();
  const oldLabels = _Parser_this.state.labels;
  _Parser_this.state.labels = [];
  if (isAsync) {
    _Parser_this.prodParam.enter(2);
    node.body = _Parser_parseBlock_dynamic();
    _Parser_this.prodParam.exit();
  } else {
    node.body = _Parser_parseBlock_dynamic();
  }
  _Parser_this.state.labels = oldLabels;
  return _Parser_finishNode_dynamic(node, "DoExpression");
}
function _ExpressionParser_parseSuper() {
  const node = _NodeUtils_startNode();
  _Tokenizer_next();
  if (_Tokenizer_match(10) && !_Parser_this.scope.allowDirectSuper && !(_Parser_this.optionFlags & 16)) {
    _Tokenizer_raise(Errors.SuperNotAllowed, node);
  } else if (!_Parser_this.scope.allowSuper && !(_Parser_this.optionFlags & 16)) {
    _Tokenizer_raise(Errors.UnexpectedSuper, node);
  }
  if (!_Tokenizer_match(10) && !_Tokenizer_match(0) && !_Tokenizer_match(16)) {
    _Tokenizer_raise(Errors.UnsupportedSuper, node);
  }
  return _Parser_finishNode_dynamic(node, "Super");
}
function _ExpressionParser_parsePrivateName() {
  const node = _NodeUtils_startNode();
  const id = _NodeUtils_startNodeAt(createPositionWithColumnOffset(_Parser_this.state.startLoc, 1));
  const name = _Parser_this.state.value;
  _Tokenizer_next();
  node.id = _ExpressionParser_createIdentifier(id, name);
  return _Parser_finishNode_dynamic(node, "PrivateName");
}
function _ExpressionParser_parseFunctionOrFunctionSent() {
  const node = _NodeUtils_startNode();
  _Tokenizer_next();
  if (_Parser_this.prodParam.hasYield && _Tokenizer_match(16)) {
    const meta = _ExpressionParser_createIdentifier(_NodeUtils_startNodeAtNode(node), "function");
    _Tokenizer_next();
    if (_Tokenizer_match(103)) {
      _Tokenizer_expectPlugin("functionSent");
    } else if (!_BaseParser_hasPlugin("functionSent")) {
      _Tokenizer_unexpected();
    }
    return _ExpressionParser_parseMetaProperty(node, meta, "sent");
  }
  return _StatementParser_parseFunction(node);
}
function _ExpressionParser_parseMetaProperty(node, meta, propertyName) {
  node.meta = meta;
  const containsEsc = _Parser_this.state.containsEsc;
  node.property = _Parser_parseIdentifier_dynamic(true);
  if (node.property.name !== propertyName || containsEsc) {
    _Tokenizer_raise(Errors.UnsupportedMetaProperty, node.property, {
      target: meta.name,
      onlyValidPropertyName: propertyName
    });
  }
  return _Parser_finishNode_dynamic(node, "MetaProperty");
}
function _ExpressionParser_parseImportMetaPropertyOrPhaseCall(node) {
  _Tokenizer_next();
  if (_UtilParser_isContextual(105) || _UtilParser_isContextual(97)) {
    const isSource = _UtilParser_isContextual(105);
    _Tokenizer_expectPlugin(isSource ? "sourcePhaseImports" : "deferredImportEvaluation");
    _Tokenizer_next();
    node.phase = isSource ? "source" : "defer";
    return _ExpressionParser_parseImportCall(node);
  } else {
    const id = _ExpressionParser_createIdentifierAt(_NodeUtils_startNodeAtNode(node), "import", _Parser_this.state.lastTokStartLoc);
    if (_UtilParser_isContextual(101)) {
      if (!_Parser_this.inModule) {
        _Tokenizer_raise(Errors.ImportMetaOutsideModule, id);
      }
      _Parser_this.sawUnambiguousESM = true;
    }
    return _ExpressionParser_parseMetaProperty(node, id, "meta");
  }
}
function _ExpressionParser_parseLiteralAtNode(value, type, node) {
  _UtilParser_addExtra(node, "rawValue", value);
  _UtilParser_addExtra(node, "raw", _Parser_this.input.slice(_BaseParser_offsetToSourcePos(node.start), _Parser_this.state.end));
  node.value = value;
  _Tokenizer_next();
  return _Parser_finishNode_dynamic(node, type);
}
function _ExpressionParser_parseLiteral(value, type) {
  const node = _NodeUtils_startNode();
  return _ExpressionParser_parseLiteralAtNode(value, type, node);
}
function _ExpressionParser_parseStringLiteral(value) {
  return _Parser_parseLiteral_dynamic(value, "StringLiteral");
}
function _ExpressionParser_parseNumericLiteral(value) {
  return _Parser_parseLiteral_dynamic(value, "NumericLiteral");
}
function _ExpressionParser_parseBigIntLiteral(value) {
  return _Parser_parseLiteral_dynamic(value, "BigIntLiteral");
}
function _ExpressionParser_parseDecimalLiteral(value) {
  return _Parser_parseLiteral_dynamic(value, "DecimalLiteral");
}
function _ExpressionParser_parseRegExpLiteral(value) {
  const node = _NodeUtils_startNode();
  _UtilParser_addExtra(node, "raw", _Parser_this.input.slice(_BaseParser_offsetToSourcePos(node.start), _Parser_this.state.end));
  node.pattern = value.pattern;
  node.flags = value.flags;
  _Tokenizer_next();
  return _Parser_finishNode_dynamic(node, "RegExpLiteral");
}
function _ExpressionParser_parseBooleanLiteral(value) {
  const node = _NodeUtils_startNode();
  node.value = value;
  _Tokenizer_next();
  return _Parser_finishNode_dynamic(node, "BooleanLiteral");
}
function _ExpressionParser_parseNullLiteral() {
  const node = _NodeUtils_startNode();
  _Tokenizer_next();
  return _Parser_finishNode_dynamic(node, "NullLiteral");
}
function _ExpressionParser_parseParenAndDistinguishExpression(canBeArrow) {
  const startLoc = _Parser_this.state.startLoc;
  let val;
  _Tokenizer_next();
  _Parser_this.expressionScope.enter(newArrowHeadScope());
  const oldMaybeInArrowParameters = _Parser_this.state.maybeInArrowParameters;
  const oldInFSharpPipelineDirectBody = _Parser_this.state.inFSharpPipelineDirectBody;
  _Parser_this.state.maybeInArrowParameters = true;
  _Parser_this.state.inFSharpPipelineDirectBody = false;
  const innerStartLoc = _Parser_this.state.startLoc;
  const exprList = [];
  const refExpressionErrors = new ExpressionErrors();
  let first = true;
  let spreadStartLoc;
  let optionalCommaStartLoc;
  while (!_Tokenizer_match(11)) {
    if (first) {
      first = false;
    } else {
      _UtilParser_expect(12, refExpressionErrors.optionalParametersLoc === null ? null : refExpressionErrors.optionalParametersLoc);
      if (_Tokenizer_match(11)) {
        optionalCommaStartLoc = _Parser_this.state.startLoc;
        break;
      }
    }
    if (_Tokenizer_match(21)) {
      const spreadNodeStartLoc = _Parser_this.state.startLoc;
      spreadStartLoc = _Parser_this.state.startLoc;
      exprList.push(_Parser_parseParenItem_dynamic(_LValParser_parseRestBinding(), spreadNodeStartLoc));
      if (!_Parser_checkCommaAfterRest_dynamic(41)) {
        break;
      }
    } else {
      exprList.push(_ExpressionParser_parseMaybeAssignAllowIn(refExpressionErrors, _Parser_parseParenItem_dynamic));
    }
  }
  const innerEndLoc = _Parser_this.state.lastTokEndLoc;
  _UtilParser_expect(11);
  _Parser_this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
  _Parser_this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
  let arrowNode = _NodeUtils_startNodeAt(startLoc);
  if (canBeArrow && _Parser_shouldParseArrow_dynamic(exprList) && (arrowNode = _Parser_parseArrow_dynamic(arrowNode))) {
    _UtilParser_checkDestructuringPrivate(refExpressionErrors);
    _Parser_this.expressionScope.validateAsPattern();
    _Parser_this.expressionScope.exit();
    _ExpressionParser_parseArrowExpression(arrowNode, exprList, false);
    return arrowNode;
  }
  _Parser_this.expressionScope.exit();
  if (!exprList.length) {
    _Tokenizer_unexpected(_Parser_this.state.lastTokStartLoc);
  }
  if (optionalCommaStartLoc) _Tokenizer_unexpected(optionalCommaStartLoc);
  if (spreadStartLoc) _Tokenizer_unexpected(spreadStartLoc);
  _UtilParser_checkExpressionErrors(refExpressionErrors, true);
  _LValParser_toReferencedListDeep(exprList, true);
  if (exprList.length > 1) {
    val = _NodeUtils_startNodeAt(innerStartLoc);
    val.expressions = exprList;
    _Parser_finishNode_dynamic(val, "SequenceExpression");
    _Parser_resetEndLocation_dynamic(val, innerEndLoc);
  } else {
    val = exprList[0];
  }
  return _ExpressionParser_wrapParenthesis(startLoc, val);
}
function _ExpressionParser_wrapParenthesis(startLoc, expression) {
  if (!(_Parser_this.optionFlags & 1024)) {
    _UtilParser_addExtra(expression, "parenthesized", true);
    _UtilParser_addExtra(expression, "parenStart", startLoc.index);
    _CommentsParser_takeSurroundingComments(expression, startLoc.index, _Parser_this.state.lastTokEndLoc.index);
    return expression;
  }
  const parenExpression = _NodeUtils_startNodeAt(startLoc);
  parenExpression.expression = expression;
  return _Parser_finishNode_dynamic(parenExpression, "ParenthesizedExpression");
}
function _ExpressionParser_shouldParseArrow(params) {
  return !_UtilParser_canInsertSemicolon();
}
function _ExpressionParser_parseArrow(node) {
  if (_Tokenizer_eat(19)) {
    return node;
  }
}
function _ExpressionParser_parseParenItem(node, startLoc) {
  return node;
}
function _ExpressionParser_parseNewOrNewTarget() {
  const node = _NodeUtils_startNode();
  _Tokenizer_next();
  if (_Tokenizer_match(16)) {
    const meta = _ExpressionParser_createIdentifier(_NodeUtils_startNodeAtNode(node), "new");
    _Tokenizer_next();
    const metaProp = _ExpressionParser_parseMetaProperty(node, meta, "target");
    if (!_Parser_this.scope.inNonArrowFunction && !_Parser_this.scope.inClass && !(_Parser_this.optionFlags & 4)) {
      _Tokenizer_raise(Errors.UnexpectedNewTarget, metaProp);
    }
    return metaProp;
  }
  return _ExpressionParser_parseNew(node);
}
function _ExpressionParser_parseNew(node) {
  _Parser_parseNewCallee_dynamic(node);
  if (_Tokenizer_eat(10)) {
    const args = _ExpressionParser_parseExprList(11);
    _Parser_toReferencedList_dynamic(args);
    node.arguments = args;
  } else {
    node.arguments = [];
  }
  return _Parser_finishNode_dynamic(node, "NewExpression");
}
function _ExpressionParser_parseNewCallee(node) {
  const isImport = _Tokenizer_match(83);
  const callee = _ExpressionParser_parseNoCallExpr();
  node.callee = callee;
  if (isImport && (callee.type === "Import" || callee.type === "ImportExpression")) {
    _Tokenizer_raise(Errors.ImportCallNotNewExpression, callee);
  }
}
function _ExpressionParser_parseTemplateElement(isTagged) {
  const {
    start,
    startLoc,
    end,
    value
  } = _Parser_this.state;
  const elemStart = start + 1;
  const elem = _NodeUtils_startNodeAt(createPositionWithColumnOffset(startLoc, 1));
  if (value === null) {
    if (!isTagged) {
      _Tokenizer_raise(Errors.InvalidEscapeSequenceTemplate, createPositionWithColumnOffset(_Parser_this.state.firstInvalidTemplateEscapePos, 1));
    }
  }
  const isTail = _Tokenizer_match(24);
  const endOffset = isTail ? -1 : -2;
  const elemEnd = end + endOffset;
  elem.value = {
    raw: _Parser_this.input.slice(elemStart, elemEnd).replace(/\r\n?/g, "\n"),
    cooked: value === null ? null : value.slice(1, endOffset)
  };
  elem.tail = isTail;
  _Tokenizer_next();
  const finishedNode = _Parser_finishNode_dynamic(elem, "TemplateElement");
  _Parser_resetEndLocation_dynamic(finishedNode, createPositionWithColumnOffset(_Parser_this.state.lastTokEndLoc, endOffset));
  return finishedNode;
}
function _ExpressionParser_parseTemplate(isTagged) {
  const node = _NodeUtils_startNode();
  let curElt = _ExpressionParser_parseTemplateElement(isTagged);
  const quasis = [curElt];
  const substitutions = [];
  while (!curElt.tail) {
    substitutions.push(_Parser_parseTemplateSubstitution_dynamic());
    _Tokenizer_readTemplateContinuation();
    quasis.push(curElt = _ExpressionParser_parseTemplateElement(isTagged));
  }
  node.expressions = substitutions;
  node.quasis = quasis;
  return _Parser_finishNode_dynamic(node, "TemplateLiteral");
}
function _ExpressionParser_parseTemplateSubstitution() {
  return _ExpressionParser_parseExpression();
}
function _ExpressionParser_parseObjectLike(close, isPattern, isRecord, refExpressionErrors) {
  if (isRecord) {
    _Tokenizer_expectPlugin("recordAndTuple");
  }
  const oldInFSharpPipelineDirectBody = _Parser_this.state.inFSharpPipelineDirectBody;
  _Parser_this.state.inFSharpPipelineDirectBody = false;
  let sawProto = false;
  let first = true;
  const node = _NodeUtils_startNode();
  node.properties = [];
  _Tokenizer_next();
  while (!_Tokenizer_match(close)) {
    if (first) {
      first = false;
    } else {
      _UtilParser_expect(12);
      if (_Tokenizer_match(close)) {
        _ExpressionParser_addTrailingCommaExtraToNode(node);
        break;
      }
    }
    let prop;
    if (isPattern) {
      prop = _LValParser_parseBindingProperty();
    } else {
      prop = _ExpressionParser_parsePropertyDefinition(refExpressionErrors);
      sawProto = _ExpressionParser_checkProto(prop, isRecord, sawProto, refExpressionErrors);
    }
    if (isRecord && !_Parser_isObjectProperty_dynamic(prop) && prop.type !== "SpreadElement") {
      _Tokenizer_raise(Errors.InvalidRecordProperty, prop);
    }
    {
      if (prop.shorthand) {
        _UtilParser_addExtra(prop, "shorthand", true);
      }
    }
    node.properties.push(prop);
  }
  _Tokenizer_next();
  _Parser_this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
  let type = "ObjectExpression";
  if (isPattern) {
    type = "ObjectPattern";
  } else if (isRecord) {
    type = "RecordExpression";
  }
  return _Parser_finishNode_dynamic(node, type);
}
function _ExpressionParser_addTrailingCommaExtraToNode(node) {
  _UtilParser_addExtra(node, "trailingComma", _Parser_this.state.lastTokStartLoc.index);
  _UtilParser_addExtra(node, "trailingCommaLoc", _Parser_this.state.lastTokStartLoc, false);
}
function _ExpressionParser_maybeAsyncOrAccessorProp(prop) {
  return !prop.computed && prop.key.type === "Identifier" && (_UtilParser_isLiteralPropertyName() || _Tokenizer_match(0) || _Tokenizer_match(55));
}
function _ExpressionParser_parsePropertyDefinition(refExpressionErrors) {
  let decorators = [];
  if (_Tokenizer_match(26)) {
    if (_BaseParser_hasPlugin("decorators")) {
      _Tokenizer_raise(Errors.UnsupportedPropertyDecorator, _Parser_this.state.startLoc);
    }
    while (_Tokenizer_match(26)) {
      decorators.push(_StatementParser_parseDecorator());
    }
  }
  const prop = _NodeUtils_startNode();
  let isAsync = false;
  let isAccessor = false;
  let startLoc;
  if (_Tokenizer_match(21)) {
    if (decorators.length) _Tokenizer_unexpected();
    return _LValParser_parseSpread();
  }
  if (decorators.length) {
    prop.decorators = decorators;
    decorators = [];
  }
  prop.method = false;
  if (refExpressionErrors) {
    startLoc = _Parser_this.state.startLoc;
  }
  let isGenerator = _Tokenizer_eat(55);
  _Parser_parsePropertyNamePrefixOperator_dynamic(prop);
  const containsEsc = _Parser_this.state.containsEsc;
  _ExpressionParser_parsePropertyName(prop, refExpressionErrors);
  if (!isGenerator && !containsEsc && _ExpressionParser_maybeAsyncOrAccessorProp(prop)) {
    const {
      key
    } = prop;
    const keyName = key.name;
    if (keyName === "async" && !_UtilParser_hasPrecedingLineBreak()) {
      isAsync = true;
      _CommentsParser_resetPreviousNodeTrailingComments(key);
      isGenerator = _Tokenizer_eat(55);
      _ExpressionParser_parsePropertyName(prop);
    }
    if (keyName === "get" || keyName === "set") {
      isAccessor = true;
      _CommentsParser_resetPreviousNodeTrailingComments(key);
      prop.kind = keyName;
      if (_Tokenizer_match(55)) {
        isGenerator = true;
        _Tokenizer_raise(Errors.AccessorIsGenerator, _Parser_this.state.curPosition(), {
          kind: keyName
        });
        _Tokenizer_next();
      }
      _ExpressionParser_parsePropertyName(prop);
    }
  }
  return _Parser_parseObjPropValue_dynamic(prop, startLoc, isGenerator, isAsync, false, isAccessor, refExpressionErrors);
}
function _ExpressionParser_getGetterSetterExpectedParamCount(method) {
  return method.kind === "get" ? 0 : 1;
}
function _ExpressionParser_getObjectOrClassMethodParams(method) {
  return method.params;
}
function _ExpressionParser_checkGetterSetterParams(method) {
  var _params;
  const paramCount = _Parser_getGetterSetterExpectedParamCount_dynamic(method);
  const params = _Parser_getObjectOrClassMethodParams_dynamic(method);
  if (params.length !== paramCount) {
    _Tokenizer_raise(method.kind === "get" ? Errors.BadGetterArity : Errors.BadSetterArity, method);
  }
  if (method.kind === "set" && ((_params = params[params.length - 1]) == null ? void 0 : _params.type) === "RestElement") {
    _Tokenizer_raise(Errors.BadSetterRestParameter, method);
  }
}
function _ExpressionParser_parseObjectMethod(prop, isGenerator, isAsync, isPattern, isAccessor) {
  if (isAccessor) {
    const finishedProp = _Parser_parseMethod_dynamic(prop, isGenerator, false, false, false, "ObjectMethod");
    _Parser_checkGetterSetterParams_dynamic(finishedProp);
    return finishedProp;
  }
  if (isAsync || isGenerator || _Tokenizer_match(10)) {
    if (isPattern) _Tokenizer_unexpected();
    prop.kind = "method";
    prop.method = true;
    return _Parser_parseMethod_dynamic(prop, isGenerator, isAsync, false, false, "ObjectMethod");
  }
}
function _ExpressionParser_parseObjectProperty(prop, startLoc, isPattern, refExpressionErrors) {
  prop.shorthand = false;
  if (_Tokenizer_eat(14)) {
    prop.value = isPattern ? _Parser_parseMaybeDefault_dynamic(_Parser_this.state.startLoc) : _ExpressionParser_parseMaybeAssignAllowIn(refExpressionErrors);
    return _Parser_finishObjectProperty_dynamic(prop);
  }
  if (!prop.computed && prop.key.type === "Identifier") {
    _Parser_checkReservedWord_dynamic(prop.key.name, prop.key.loc.start, true, false);
    if (isPattern) {
      prop.value = _Parser_parseMaybeDefault_dynamic(startLoc, _Parser_cloneIdentifier_dynamic(prop.key));
    } else if (_Tokenizer_match(29)) {
      const shorthandAssignLoc = _Parser_this.state.startLoc;
      if (refExpressionErrors != null) {
        if (refExpressionErrors.shorthandAssignLoc === null) {
          refExpressionErrors.shorthandAssignLoc = shorthandAssignLoc;
        }
      } else {
        _Tokenizer_raise(Errors.InvalidCoverInitializedName, shorthandAssignLoc);
      }
      prop.value = _Parser_parseMaybeDefault_dynamic(startLoc, _Parser_cloneIdentifier_dynamic(prop.key));
    } else {
      prop.value = _Parser_cloneIdentifier_dynamic(prop.key);
    }
    prop.shorthand = true;
    return _Parser_finishObjectProperty_dynamic(prop);
  }
}
function _ExpressionParser_finishObjectProperty(node) {
  return _Parser_finishNode_dynamic(node, "ObjectProperty");
}
function _ExpressionParser_parseObjPropValue(prop, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors) {
  const node = _ExpressionParser_parseObjectMethod(prop, isGenerator, isAsync, isPattern, isAccessor) || _Parser_parseObjectProperty_dynamic(prop, startLoc, isPattern, refExpressionErrors);
  if (!node) _Tokenizer_unexpected();
  return node;
}
function _ExpressionParser_parsePropertyName(prop, refExpressionErrors) {
  if (_Tokenizer_eat(0)) {
    prop.computed = true;
    prop.key = _ExpressionParser_parseMaybeAssignAllowIn();
    _UtilParser_expect(3);
  } else {
    const {
      type,
      value
    } = _Parser_this.state;
    let key;
    if (tokenIsKeywordOrIdentifier(type)) {
      key = _Parser_parseIdentifier_dynamic(true);
    } else {
      switch (type) {
        case 135:
          key = _Parser_parseNumericLiteral_dynamic(value);
          break;
        case 134:
          key = _Parser_parseStringLiteral_dynamic(value);
          break;
        case 136:
          key = _Parser_parseBigIntLiteral_dynamic(value);
          break;
        case 139:
          {
            const privateKeyLoc = _Parser_this.state.startLoc;
            if (refExpressionErrors != null) {
              if (refExpressionErrors.privateKeyLoc === null) {
                refExpressionErrors.privateKeyLoc = privateKeyLoc;
              }
            } else {
              _Tokenizer_raise(Errors.UnexpectedPrivateField, privateKeyLoc);
            }
            key = _Parser_parsePrivateName_dynamic();
            break;
          }
        default:
          if (type === 137) {
            key = _Parser_parseDecimalLiteral_dynamic(value);
            break;
          }
          _Tokenizer_unexpected();
      }
    }
    prop.key = key;
    if (type !== 139) {
      prop.computed = false;
    }
  }
}
function _ExpressionParser_initFunction(node, isAsync) {
  node.id = null;
  node.generator = false;
  node.async = isAsync;
}
function _ExpressionParser_parseMethod(node, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope = false) {
  _Parser_initFunction_dynamic(node, isAsync);
  node.generator = isGenerator;
  _Parser_this.scope.enter(2 | 16 | (inClassScope ? 64 : 0) | (allowDirectSuper ? 32 : 0));
  _Parser_this.prodParam.enter(functionFlags(isAsync, node.generator));
  _Parser_parseFunctionParams_dynamic(node, isConstructor);
  const finishedNode = _Parser_parseFunctionBodyAndFinish_dynamic(node, type, true);
  _Parser_this.prodParam.exit();
  _Parser_this.scope.exit();
  return finishedNode;
}
function _ExpressionParser_parseArrayLike(close, canBePattern, isTuple, refExpressionErrors) {
  if (isTuple) {
    _Tokenizer_expectPlugin("recordAndTuple");
  }
  const oldInFSharpPipelineDirectBody = _Parser_this.state.inFSharpPipelineDirectBody;
  _Parser_this.state.inFSharpPipelineDirectBody = false;
  const node = _NodeUtils_startNode();
  _Tokenizer_next();
  node.elements = _ExpressionParser_parseExprList(close, !isTuple, refExpressionErrors, node);
  _Parser_this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
  return _Parser_finishNode_dynamic(node, isTuple ? "TupleExpression" : "ArrayExpression");
}
function _ExpressionParser_parseArrowExpression(node, params, isAsync, trailingCommaLoc) {
  _Parser_this.scope.enter(2 | 4);
  let flags = functionFlags(isAsync, false);
  if (!_Tokenizer_match(5) && _Parser_this.prodParam.hasIn) {
    flags |= 8;
  }
  _Parser_this.prodParam.enter(flags);
  _Parser_initFunction_dynamic(node, isAsync);
  const oldMaybeInArrowParameters = _Parser_this.state.maybeInArrowParameters;
  if (params) {
    _Parser_this.state.maybeInArrowParameters = true;
    _Parser_setArrowFunctionParameters_dynamic(node, params, trailingCommaLoc);
  }
  _Parser_this.state.maybeInArrowParameters = false;
  _Parser_parseFunctionBody_dynamic(node, true);
  _Parser_this.prodParam.exit();
  _Parser_this.scope.exit();
  _Parser_this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
  return _Parser_finishNode_dynamic(node, "ArrowFunctionExpression");
}
function _ExpressionParser_setArrowFunctionParameters(node, params, trailingCommaLoc) {
  _Parser_toAssignableList_dynamic(params, trailingCommaLoc, false);
  node.params = params;
}
function _ExpressionParser_parseFunctionBodyAndFinish(node, type, isMethod = false) {
  _Parser_parseFunctionBody_dynamic(node, false, isMethod);
  return _Parser_finishNode_dynamic(node, type);
}
function _ExpressionParser_parseFunctionBody(node, allowExpression, isMethod = false) {
  const isExpression = allowExpression && !_Tokenizer_match(5);
  _Parser_this.expressionScope.enter(newExpressionScope());
  if (isExpression) {
    node.body = _Parser_parseMaybeAssign_dynamic();
    _Parser_checkParams_dynamic(node, false, allowExpression, false);
  } else {
    const oldStrict = _Parser_this.state.strict;
    const oldLabels = _Parser_this.state.labels;
    _Parser_this.state.labels = [];
    _Parser_this.prodParam.enter(_Parser_this.prodParam.currentFlags() | 4);
    node.body = _Parser_parseBlock_dynamic(true, false, hasStrictModeDirective => {
      const nonSimple = !_ExpressionParser_isSimpleParamList(node.params);
      if (hasStrictModeDirective && nonSimple) {
        _Tokenizer_raise(Errors.IllegalLanguageModeDirective, (node.kind === "method" || node.kind === "constructor") && !!node.key ? node.key.loc.end : node);
      }
      const strictModeChanged = !oldStrict && _Parser_this.state.strict;
      _Parser_checkParams_dynamic(node, !_Parser_this.state.strict && !allowExpression && !isMethod && !nonSimple, allowExpression, strictModeChanged);
      if (_Parser_this.state.strict && node.id) {
        _LValParser_checkIdentifier(node.id, 65, strictModeChanged);
      }
    });
    _Parser_this.prodParam.exit();
    _Parser_this.state.labels = oldLabels;
  }
  _Parser_this.expressionScope.exit();
}
function _ExpressionParser_isSimpleParameter(node) {
  return node.type === "Identifier";
}
function _ExpressionParser_isSimpleParamList(params) {
  for (let i = 0, len = params.length; i < len; i++) {
    if (!_Parser_isSimpleParameter_dynamic(params[i])) return false;
  }
  return true;
}
function _ExpressionParser_checkParams(node, allowDuplicates, isArrowFunction, strictModeChanged = true) {
  const checkClashes = !allowDuplicates && new Set();
  const formalParameters = {
    type: "FormalParameters"
  };
  for (const param of node.params) {
    _LValParser_checkLVal(param, formalParameters, 5, checkClashes, strictModeChanged);
  }
}
function _ExpressionParser_parseExprList(close, allowEmpty, refExpressionErrors, nodeForExtra) {
  const elts = [];
  let first = true;
  while (!_Tokenizer_eat(close)) {
    if (first) {
      first = false;
    } else {
      _UtilParser_expect(12);
      if (_Tokenizer_match(close)) {
        if (nodeForExtra) {
          _ExpressionParser_addTrailingCommaExtraToNode(nodeForExtra);
        }
        _Tokenizer_next();
        break;
      }
    }
    elts.push(_ExpressionParser_parseExprListItem(allowEmpty, refExpressionErrors));
  }
  return elts;
}
function _ExpressionParser_parseExprListItem(allowEmpty, refExpressionErrors, allowPlaceholder) {
  let elt;
  if (_Tokenizer_match(12)) {
    if (!allowEmpty) {
      _Tokenizer_raise(Errors.UnexpectedToken, _Parser_this.state.curPosition(), {
        unexpected: ","
      });
    }
    elt = null;
  } else if (_Tokenizer_match(21)) {
    const spreadNodeStartLoc = _Parser_this.state.startLoc;
    elt = _Parser_parseParenItem_dynamic(_LValParser_parseSpread(refExpressionErrors), spreadNodeStartLoc);
  } else if (_Tokenizer_match(17)) {
    _Tokenizer_expectPlugin("partialApplication");
    if (!allowPlaceholder) {
      _Tokenizer_raise(Errors.UnexpectedArgumentPlaceholder, _Parser_this.state.startLoc);
    }
    const node = _NodeUtils_startNode();
    _Tokenizer_next();
    elt = _Parser_finishNode_dynamic(node, "ArgumentPlaceholder");
  } else {
    elt = _ExpressionParser_parseMaybeAssignAllowIn(refExpressionErrors, _Parser_parseParenItem_dynamic);
  }
  return elt;
}
function _ExpressionParser_parseIdentifier(liberal) {
  const node = _NodeUtils_startNode();
  const name = _ExpressionParser_parseIdentifierName(liberal);
  return _ExpressionParser_createIdentifier(node, name);
}
function _ExpressionParser_createIdentifier(node, name) {
  node.name = name;
  node.loc.identifierName = name;
  return _Parser_finishNode_dynamic(node, "Identifier");
}
function _ExpressionParser_createIdentifierAt(node, name, endLoc) {
  node.name = name;
  node.loc.identifierName = name;
  return _Parser_finishNodeAt_dynamic(node, "Identifier", endLoc);
}
function _ExpressionParser_parseIdentifierName(liberal) {
  let name;
  const {
    startLoc,
    type
  } = _Parser_this.state;
  if (tokenIsKeywordOrIdentifier(type)) {
    name = _Parser_this.state.value;
  } else {
    _Tokenizer_unexpected();
  }
  const tokenIsKeyword = tokenKeywordOrIdentifierIsKeyword(type);
  if (liberal) {
    if (tokenIsKeyword) {
      _Tokenizer_replaceToken(132);
    }
  } else {
    _Parser_checkReservedWord_dynamic(name, startLoc, tokenIsKeyword, false);
  }
  _Tokenizer_next();
  return name;
}
function _ExpressionParser_checkReservedWord(word, startLoc, checkKeywords, isBinding) {
  if (word.length > 10) {
    return;
  }
  if (!canBeReservedWord(word)) {
    return;
  }
  if (checkKeywords && isKeyword(word)) {
    _Tokenizer_raise(Errors.UnexpectedKeyword, startLoc, {
      keyword: word
    });
    return;
  }
  const reservedTest = !_Parser_this.state.strict ? isReservedWord : isBinding ? isStrictBindReservedWord : isStrictReservedWord;
  if (reservedTest(word, _Parser_this.inModule)) {
    _Tokenizer_raise(Errors.UnexpectedReservedWord, startLoc, {
      reservedWord: word
    });
    return;
  } else if (word === "yield") {
    if (_Parser_this.prodParam.hasYield) {
      _Tokenizer_raise(Errors.YieldBindingIdentifier, startLoc);
      return;
    }
  } else if (word === "await") {
    if (_Parser_this.prodParam.hasAwait) {
      _Tokenizer_raise(Errors.AwaitBindingIdentifier, startLoc);
      return;
    }
    if (_Parser_this.scope.inStaticBlock) {
      _Tokenizer_raise(Errors.AwaitBindingIdentifierInStaticBlock, startLoc);
      return;
    }
    _Parser_this.expressionScope.recordAsyncArrowParametersError(startLoc);
  } else if (word === "arguments") {
    if (_Parser_this.scope.inClassAndNotInNonArrowFunction) {
      _Tokenizer_raise(Errors.ArgumentsInClass, startLoc);
      return;
    }
  }
}
function _ExpressionParser_recordAwaitIfAllowed() {
  const isAwaitAllowed = _Parser_this.prodParam.hasAwait || _Parser_this.optionFlags & 1 && !_Parser_this.scope.inFunction;
  if (isAwaitAllowed && !_Parser_this.scope.inFunction) {
    _Parser_this.state.hasTopLevelAwait = true;
  }
  return isAwaitAllowed;
}
function _ExpressionParser_parseAwait(startLoc) {
  const node = _NodeUtils_startNodeAt(startLoc);
  _Parser_this.expressionScope.recordParameterInitializerError(Errors.AwaitExpressionFormalParameter, node);
  if (_Tokenizer_eat(55)) {
    _Tokenizer_raise(Errors.ObsoleteAwaitStar, node);
  }
  if (!_Parser_this.scope.inFunction && !(_Parser_this.optionFlags & 1)) {
    if (_ExpressionParser_isAmbiguousPrefixOrIdentifier()) {
      _Parser_this.ambiguousScriptDifferentAst = true;
    } else {
      _Parser_this.sawUnambiguousESM = true;
    }
  }
  if (!_Parser_this.state.soloAwait) {
    node.argument = _Parser_parseMaybeUnary_dynamic(null, true);
  }
  return _Parser_finishNode_dynamic(node, "AwaitExpression");
}
function _ExpressionParser_isAmbiguousPrefixOrIdentifier() {
  if (_UtilParser_hasPrecedingLineBreak()) return true;
  const {
    type
  } = _Parser_this.state;
  return type === 53 || type === 10 || type === 0 || tokenIsTemplate(type) || type === 102 && !_Parser_this.state.containsEsc || type === 138 || type === 56 || _BaseParser_hasPlugin("v8intrinsic") && type === 54;
}
function _ExpressionParser_parseYield(startLoc) {
  const node = _NodeUtils_startNodeAt(startLoc);
  _Parser_this.expressionScope.recordParameterInitializerError(Errors.YieldInParameter, node);
  let delegating = false;
  let argument = null;
  if (!_UtilParser_hasPrecedingLineBreak()) {
    delegating = _Tokenizer_eat(55);
    switch (_Parser_this.state.type) {
      case 13:
      case 140:
      case 8:
      case 11:
      case 3:
      case 9:
      case 14:
      case 12:
        if (!delegating) break;
      default:
        argument = _Parser_parseMaybeAssign_dynamic();
    }
  }
  node.delegate = delegating;
  node.argument = argument;
  return _Parser_finishNode_dynamic(node, "YieldExpression");
}
function _ExpressionParser_parseImportCall(node) {
  _Tokenizer_next();
  node.source = _ExpressionParser_parseMaybeAssignAllowIn();
  node.options = null;
  if (_Tokenizer_eat(12)) {
    if (!_Tokenizer_match(11)) {
      node.options = _ExpressionParser_parseMaybeAssignAllowIn();
      if (_Tokenizer_eat(12)) {
        _ExpressionParser_addTrailingCommaExtraToNode(node.options);
        if (!_Tokenizer_match(11)) {
          do {
            _ExpressionParser_parseMaybeAssignAllowIn();
          } while (_Tokenizer_eat(12) && !_Tokenizer_match(11));
          _Tokenizer_raise(Errors.ImportCallArity, node);
        }
      }
    } else {
      _ExpressionParser_addTrailingCommaExtraToNode(node.source);
    }
  }
  _UtilParser_expect(11);
  return _Parser_finishNode_dynamic(node, "ImportExpression");
}
function _ExpressionParser_checkPipelineAtInfixOperator(left, leftStartLoc) {
  if (_BaseParser_hasPlugin(["pipelineOperator", {
    proposal: "smart"
  }])) {
    if (left.type === "SequenceExpression") {
      _Tokenizer_raise(Errors.PipelineHeadSequenceExpression, leftStartLoc);
    }
  }
}
function _ExpressionParser_parseSmartPipelineBodyInStyle(childExpr, startLoc) {
  if (_ExpressionParser_isSimpleReference(childExpr)) {
    const bodyNode = _NodeUtils_startNodeAt(startLoc);
    bodyNode.callee = childExpr;
    return _Parser_finishNode_dynamic(bodyNode, "PipelineBareFunction");
  } else {
    const bodyNode = _NodeUtils_startNodeAt(startLoc);
    _ExpressionParser_checkSmartPipeTopicBodyEarlyErrors(startLoc);
    bodyNode.expression = childExpr;
    return _Parser_finishNode_dynamic(bodyNode, "PipelineTopicExpression");
  }
}
function _ExpressionParser_isSimpleReference(expression) {
  switch (expression.type) {
    case "MemberExpression":
      return !expression.computed && _ExpressionParser_isSimpleReference(expression.object);
    case "Identifier":
      return true;
    default:
      return false;
  }
}
function _ExpressionParser_checkSmartPipeTopicBodyEarlyErrors(startLoc) {
  if (_Tokenizer_match(19)) {
    throw _Tokenizer_raise(Errors.PipelineBodyNoArrow, _Parser_this.state.startLoc);
  }
  if (!_ExpressionParser_topicReferenceWasUsedInCurrentContext()) {
    _Tokenizer_raise(Errors.PipelineTopicUnused, startLoc);
  }
}
function _ExpressionParser_withTopicBindingContext(callback) {
  const outerContextTopicState = _Parser_this.state.topicContext;
  _Parser_this.state.topicContext = {
    maxNumOfResolvableTopics: 1,
    maxTopicIndex: null
  };
  try {
    return callback();
  } finally {
    _Parser_this.state.topicContext = outerContextTopicState;
  }
}
function _ExpressionParser_withSmartMixTopicForbiddingContext(callback) {
  if (_BaseParser_hasPlugin(["pipelineOperator", {
    proposal: "smart"
  }])) {
    const outerContextTopicState = _Parser_this.state.topicContext;
    _Parser_this.state.topicContext = {
      maxNumOfResolvableTopics: 0,
      maxTopicIndex: null
    };
    try {
      return callback();
    } finally {
      _Parser_this.state.topicContext = outerContextTopicState;
    }
  } else {
    return callback();
  }
}
function _ExpressionParser_withSoloAwaitPermittingContext(callback) {
  const outerContextSoloAwaitState = _Parser_this.state.soloAwait;
  _Parser_this.state.soloAwait = true;
  try {
    return callback();
  } finally {
    _Parser_this.state.soloAwait = outerContextSoloAwaitState;
  }
}
function _ExpressionParser_allowInAnd(callback) {
  const flags = _Parser_this.prodParam.currentFlags();
  const prodParamToSet = 8 & ~flags;
  if (prodParamToSet) {
    _Parser_this.prodParam.enter(flags | 8);
    try {
      return callback();
    } finally {
      _Parser_this.prodParam.exit();
    }
  }
  return callback();
}
function _ExpressionParser_disallowInAnd(callback) {
  const flags = _Parser_this.prodParam.currentFlags();
  const prodParamToClear = 8 & flags;
  if (prodParamToClear) {
    _Parser_this.prodParam.enter(flags & ~8);
    try {
      return callback();
    } finally {
      _Parser_this.prodParam.exit();
    }
  }
  return callback();
}
function _ExpressionParser_registerTopicReference() {
  _Parser_this.state.topicContext.maxTopicIndex = 0;
}
function _ExpressionParser_topicReferenceIsAllowedInCurrentContext() {
  return _Parser_this.state.topicContext.maxNumOfResolvableTopics >= 1;
}
function _ExpressionParser_topicReferenceWasUsedInCurrentContext() {
  return _Parser_this.state.topicContext.maxTopicIndex != null && _Parser_this.state.topicContext.maxTopicIndex >= 0;
}
function _ExpressionParser_parseFSharpPipelineBody(prec) {
  const startLoc = _Parser_this.state.startLoc;
  _Parser_this.state.potentialArrowAt = _Parser_this.state.start;
  const oldInFSharpPipelineDirectBody = _Parser_this.state.inFSharpPipelineDirectBody;
  _Parser_this.state.inFSharpPipelineDirectBody = true;
  const ret = _Parser_parseExprOp_dynamic(_ExpressionParser_parseMaybeUnaryOrPrivate(), startLoc, prec);
  _Parser_this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
  return ret;
}
function _ExpressionParser_parseModuleExpression() {
  _Tokenizer_expectPlugin("moduleBlocks");
  const node = _NodeUtils_startNode();
  _Tokenizer_next();
  if (!_Tokenizer_match(5)) {
    _Tokenizer_unexpected(null, 5);
  }
  const program = _NodeUtils_startNodeAt(_Parser_this.state.endLoc);
  _Tokenizer_next();
  const revertScopes = _UtilParser_initializeScopes(true);
  _UtilParser_enterInitialScopes();
  try {
    node.body = _StatementParser_parseProgram(program, 8, "module");
  } finally {
    revertScopes();
  }
  return _Parser_finishNode_dynamic(node, "ModuleExpression");
}
function _ExpressionParser_parsePropertyNamePrefixOperator(prop) {}
function _StatementParser_parseTopLevel(file, program) {
  file.program = _StatementParser_parseProgram(program);
  file.comments = _Parser_this.comments;
  if (_Parser_this.optionFlags & 256) {
    file.tokens = babel7CompatTokens(_Parser_this.tokens, _Parser_this.input, _Parser_this.startIndex);
  }
  return _Parser_finishNode_dynamic(file, "File");
}
function _StatementParser_parseProgram(program, end = 140, sourceType = _Parser_this.options.sourceType) {
  program.sourceType = sourceType;
  program.interpreter = _StatementParser_parseInterpreterDirective();
  _Parser_parseBlockBody_dynamic(program, true, true, end);
  if (_Parser_this.inModule) {
    if (!(_Parser_this.optionFlags & 64) && _Parser_this.scope.undefinedExports.size > 0) {
      for (const [localName, at] of Array.from(_Parser_this.scope.undefinedExports)) {
        _Tokenizer_raise(Errors.ModuleExportUndefined, at, {
          localName
        });
      }
    }
    _UtilParser_addExtra(program, "topLevelAwait", _Parser_this.state.hasTopLevelAwait);
  }
  let finishedProgram;
  if (end === 140) {
    finishedProgram = _Parser_finishNode_dynamic(program, "Program");
  } else {
    finishedProgram = _Parser_finishNodeAt_dynamic(program, "Program", createPositionWithColumnOffset(_Parser_this.state.startLoc, -1));
  }
  return finishedProgram;
}
function _StatementParser_stmtToDirective(stmt) {
  const directive = _Parser_castNodeTo_dynamic(stmt, "Directive");
  const directiveLiteral = _Parser_castNodeTo_dynamic(stmt.expression, "DirectiveLiteral");
  const expressionValue = directiveLiteral.value;
  const raw = _Parser_this.input.slice(_BaseParser_offsetToSourcePos(directiveLiteral.start), _BaseParser_offsetToSourcePos(directiveLiteral.end));
  const val = directiveLiteral.value = raw.slice(1, -1);
  _UtilParser_addExtra(directiveLiteral, "raw", raw);
  _UtilParser_addExtra(directiveLiteral, "rawValue", val);
  _UtilParser_addExtra(directiveLiteral, "expressionValue", expressionValue);
  directive.value = directiveLiteral;
  delete stmt.expression;
  return directive;
}
function _StatementParser_parseInterpreterDirective() {
  if (!_Tokenizer_match(28)) {
    return null;
  }
  const node = _NodeUtils_startNode();
  node.value = _Parser_this.state.value;
  _Tokenizer_next();
  return _Parser_finishNode_dynamic(node, "InterpreterDirective");
}
function _StatementParser_isLet() {
  if (!_UtilParser_isContextual(100)) {
    return false;
  }
  return _StatementParser_hasFollowingBindingAtom();
}
function _StatementParser_chStartsBindingIdentifier(ch, pos) {
  if (isIdentifierStart(ch)) {
    keywordRelationalOperator.lastIndex = pos;
    if (keywordRelationalOperator.test(_Parser_this.input)) {
      const endCh = _Tokenizer_codePointAtPos(keywordRelationalOperator.lastIndex);
      if (!isIdentifierChar(endCh) && endCh !== 92) {
        return false;
      }
    }
    return true;
  } else if (ch === 92) {
    return true;
  } else {
    return false;
  }
}
function _StatementParser_chStartsBindingPattern(ch) {
  return ch === 91 || ch === 123;
}
function _StatementParser_hasFollowingBindingAtom() {
  const next = _Tokenizer_nextTokenStart();
  const nextCh = _Tokenizer_codePointAtPos(next);
  return _StatementParser_chStartsBindingPattern(nextCh) || _Parser_chStartsBindingIdentifier_dynamic(nextCh, next);
}
function _StatementParser_hasInLineFollowingBindingIdentifierOrBrace() {
  const next = _Tokenizer_nextTokenInLineStart();
  const nextCh = _Tokenizer_codePointAtPos(next);
  return nextCh === 123 || _Parser_chStartsBindingIdentifier_dynamic(nextCh, next);
}
function _StatementParser_allowsForUsing() {
  const {
    type,
    containsEsc,
    end
  } = _Tokenizer_lookahead();
  if (type === 102 && !containsEsc) {
    const nextCharAfterOf = _Tokenizer_lookaheadCharCodeSince(end);
    if (nextCharAfterOf !== 61 && nextCharAfterOf !== 58 && nextCharAfterOf !== 59) {
      return false;
    }
  }
  if (tokenIsIdentifier(type) && !_UtilParser_hasFollowingLineBreak()) {
    _Tokenizer_expectPlugin("explicitResourceManagement");
    return true;
  }
  return false;
}
function _StatementParser_startsAwaitUsing() {
  let next = _Tokenizer_nextTokenInLineStart();
  if (_UtilParser_isUnparsedContextual(next, "using")) {
    next = _Tokenizer_nextTokenInLineStartSince(next + 5);
    const nextCh = _Tokenizer_codePointAtPos(next);
    if (_Parser_chStartsBindingIdentifier_dynamic(nextCh, next)) {
      _Tokenizer_expectPlugin("explicitResourceManagement");
      return true;
    }
  }
  return false;
}
function _StatementParser_parseModuleItem() {
  return _Parser_parseStatementLike_dynamic(1 | 2 | 4 | 8);
}
function _StatementParser_parseStatementListItem() {
  return _Parser_parseStatementLike_dynamic(2 | 4 | (!_Parser_this.options.annexB || _Parser_this.state.strict ? 0 : 8));
}
function _StatementParser_parseStatementOrSloppyAnnexBFunctionDeclaration(allowLabeledFunction = false) {
  let flags = 0;
  if (_Parser_this.options.annexB && !_Parser_this.state.strict) {
    flags |= 4;
    if (allowLabeledFunction) {
      flags |= 8;
    }
  }
  return _Parser_parseStatementLike_dynamic(flags);
}
function _StatementParser_parseStatement() {
  return _Parser_parseStatementLike_dynamic(0);
}
function _StatementParser_parseStatementLike(flags) {
  let decorators = null;
  if (_Tokenizer_match(26)) {
    decorators = _StatementParser_parseDecorators(true);
  }
  return _Parser_parseStatementContent_dynamic(flags, decorators);
}
function _StatementParser_parseStatementContent(flags, decorators) {
  const startType = _Parser_this.state.type;
  const node = _NodeUtils_startNode();
  const allowDeclaration = !!(flags & 2);
  const allowFunctionDeclaration = !!(flags & 4);
  const topLevel = flags & 1;
  switch (startType) {
    case 60:
      return _StatementParser_parseBreakContinueStatement(node, true);
    case 63:
      return _StatementParser_parseBreakContinueStatement(node, false);
    case 64:
      return _StatementParser_parseDebuggerStatement(node);
    case 90:
      return _StatementParser_parseDoWhileStatement(node);
    case 91:
      return _StatementParser_parseForStatement(node);
    case 68:
      if (_Tokenizer_lookaheadCharCode() === 46) break;
      if (!allowFunctionDeclaration) {
        _Tokenizer_raise(_Parser_this.state.strict ? Errors.StrictFunction : _Parser_this.options.annexB ? Errors.SloppyFunctionAnnexB : Errors.SloppyFunction, _Parser_this.state.startLoc);
      }
      return _StatementParser_parseFunctionStatement(node, false, !allowDeclaration && allowFunctionDeclaration);
    case 80:
      if (!allowDeclaration) _Tokenizer_unexpected();
      return _Parser_parseClass_dynamic(_StatementParser_maybeTakeDecorators(decorators, node), true);
    case 69:
      return _StatementParser_parseIfStatement(node);
    case 70:
      return _StatementParser_parseReturnStatement(node);
    case 71:
      return _StatementParser_parseSwitchStatement(node);
    case 72:
      return _StatementParser_parseThrowStatement(node);
    case 73:
      return _StatementParser_parseTryStatement(node);
    case 96:
      if (!_Parser_this.state.containsEsc && _StatementParser_startsAwaitUsing()) {
        if (!_ExpressionParser_recordAwaitIfAllowed()) {
          _Tokenizer_raise(Errors.AwaitUsingNotInAsyncContext, node);
        } else if (!allowDeclaration) {
          _Tokenizer_raise(Errors.UnexpectedLexicalDeclaration, node);
        }
        _Tokenizer_next();
        return _Parser_parseVarStatement_dynamic(node, "await using");
      }
      break;
    case 107:
      if (_Parser_this.state.containsEsc || !_StatementParser_hasInLineFollowingBindingIdentifierOrBrace()) {
        break;
      }
      _Tokenizer_expectPlugin("explicitResourceManagement");
      if (!_Parser_this.scope.inModule && _Parser_this.scope.inTopLevel) {
        _Tokenizer_raise(Errors.UnexpectedUsingDeclaration, _Parser_this.state.startLoc);
      } else if (!allowDeclaration) {
        _Tokenizer_raise(Errors.UnexpectedLexicalDeclaration, _Parser_this.state.startLoc);
      }
      return _Parser_parseVarStatement_dynamic(node, "using");
    case 100:
      {
        if (_Parser_this.state.containsEsc) {
          break;
        }
        const next = _Tokenizer_nextTokenStart();
        const nextCh = _Tokenizer_codePointAtPos(next);
        if (nextCh !== 91) {
          if (!allowDeclaration && _UtilParser_hasFollowingLineBreak()) break;
          if (!_Parser_chStartsBindingIdentifier_dynamic(nextCh, next) && nextCh !== 123) {
            break;
          }
        }
      }
    case 75:
      {
        if (!allowDeclaration) {
          _Tokenizer_raise(Errors.UnexpectedLexicalDeclaration, _Parser_this.state.startLoc);
        }
      }
    case 74:
      {
        const kind = _Parser_this.state.value;
        return _Parser_parseVarStatement_dynamic(node, kind);
      }
    case 92:
      return _StatementParser_parseWhileStatement(node);
    case 76:
      return _StatementParser_parseWithStatement(node);
    case 5:
      return _Parser_parseBlock_dynamic();
    case 13:
      return _StatementParser_parseEmptyStatement(node);
    case 83:
      {
        const nextTokenCharCode = _Tokenizer_lookaheadCharCode();
        if (nextTokenCharCode === 40 || nextTokenCharCode === 46) {
          break;
        }
      }
    case 82:
      {
        if (!(_Parser_this.optionFlags & 8) && !topLevel) {
          _Tokenizer_raise(Errors.UnexpectedImportExport, _Parser_this.state.startLoc);
        }
        _Tokenizer_next();
        let result;
        if (startType === 83) {
          result = _Parser_parseImport_dynamic(node);
        } else {
          result = _Parser_parseExport_dynamic(node, decorators);
        }
        _Parser_assertModuleNodeAllowed_dynamic(result);
        return result;
      }
    default:
      {
        if (_StatementParser_isAsyncFunction()) {
          if (!allowDeclaration) {
            _Tokenizer_raise(Errors.AsyncFunctionInSingleStatementContext, _Parser_this.state.startLoc);
          }
          _Tokenizer_next();
          return _StatementParser_parseFunctionStatement(node, true, !allowDeclaration && allowFunctionDeclaration);
        }
      }
  }
  const maybeName = _Parser_this.state.value;
  const expr = _ExpressionParser_parseExpression();
  if (tokenIsIdentifier(startType) && expr.type === "Identifier" && _Tokenizer_eat(14)) {
    return _StatementParser_parseLabeledStatement(node, maybeName, expr, flags);
  } else {
    return _Parser_parseExpressionStatement_dynamic(node, expr, decorators);
  }
}
function _StatementParser_assertModuleNodeAllowed(node) {
  if (!(_Parser_this.optionFlags & 8) && !_Parser_this.inModule) {
    _Tokenizer_raise(Errors.ImportOutsideModule, node);
  }
}
function _StatementParser_decoratorsEnabledBeforeExport() {
  if (_BaseParser_hasPlugin("decorators-legacy")) return true;
  return _BaseParser_hasPlugin("decorators") && _BaseParser_getPluginOption("decorators", "decoratorsBeforeExport") !== false;
}
function _StatementParser_maybeTakeDecorators(maybeDecorators, classNode, exportNode) {
  if (maybeDecorators) {
    var _classNode$decorators;
    if ((_classNode$decorators = classNode.decorators) != null && _classNode$decorators.length) {
      if (typeof _BaseParser_getPluginOption("decorators", "decoratorsBeforeExport") !== "boolean") {
        _Tokenizer_raise(Errors.DecoratorsBeforeAfterExport, classNode.decorators[0]);
      }
      classNode.decorators.unshift(...maybeDecorators);
    } else {
      classNode.decorators = maybeDecorators;
    }
    _NodeUtils_resetStartLocationFromNode(classNode, maybeDecorators[0]);
    if (exportNode) _NodeUtils_resetStartLocationFromNode(exportNode, classNode);
  }
  return classNode;
}
function _StatementParser_canHaveLeadingDecorator() {
  return _Tokenizer_match(80);
}
function _StatementParser_parseDecorators(allowExport) {
  const decorators = [];
  do {
    decorators.push(_StatementParser_parseDecorator());
  } while (_Tokenizer_match(26));
  if (_Tokenizer_match(82)) {
    if (!allowExport) {
      _Tokenizer_unexpected();
    }
    if (!_StatementParser_decoratorsEnabledBeforeExport()) {
      _Tokenizer_raise(Errors.DecoratorExportClass, _Parser_this.state.startLoc);
    }
  } else if (!_Parser_canHaveLeadingDecorator_dynamic()) {
    throw _Tokenizer_raise(Errors.UnexpectedLeadingDecorator, _Parser_this.state.startLoc);
  }
  return decorators;
}
function _StatementParser_parseDecorator() {
  _Tokenizer_expectOnePlugin(["decorators", "decorators-legacy"]);
  const node = _NodeUtils_startNode();
  _Tokenizer_next();
  if (_BaseParser_hasPlugin("decorators")) {
    const startLoc = _Parser_this.state.startLoc;
    let expr;
    if (_Tokenizer_match(10)) {
      const startLoc = _Parser_this.state.startLoc;
      _Tokenizer_next();
      expr = _ExpressionParser_parseExpression();
      _UtilParser_expect(11);
      expr = _ExpressionParser_wrapParenthesis(startLoc, expr);
      const paramsStartLoc = _Parser_this.state.startLoc;
      node.expression = _Parser_parseMaybeDecoratorArguments_dynamic(expr, startLoc);
      if (_BaseParser_getPluginOption("decorators", "allowCallParenthesized") === false && node.expression !== expr) {
        _Tokenizer_raise(Errors.DecoratorArgumentsOutsideParentheses, paramsStartLoc);
      }
    } else {
      expr = _Parser_parseIdentifier_dynamic(false);
      while (_Tokenizer_eat(16)) {
        const node = _NodeUtils_startNodeAt(startLoc);
        node.object = expr;
        if (_Tokenizer_match(139)) {
          _Parser_this.classScope.usePrivateName(_Parser_this.state.value, _Parser_this.state.startLoc);
          node.property = _Parser_parsePrivateName_dynamic();
        } else {
          node.property = _Parser_parseIdentifier_dynamic(true);
        }
        node.computed = false;
        expr = _Parser_finishNode_dynamic(node, "MemberExpression");
      }
      node.expression = _Parser_parseMaybeDecoratorArguments_dynamic(expr, startLoc);
    }
  } else {
    node.expression = _ExpressionParser_parseExprSubscripts();
  }
  return _Parser_finishNode_dynamic(node, "Decorator");
}
function _StatementParser_parseMaybeDecoratorArguments(expr, startLoc) {
  if (_Tokenizer_eat(10)) {
    const node = _NodeUtils_startNodeAt(startLoc);
    node.callee = expr;
    node.arguments = _ExpressionParser_parseCallExpressionArguments(11);
    _Parser_toReferencedList_dynamic(node.arguments);
    return _Parser_finishNode_dynamic(node, "CallExpression");
  }
  return expr;
}
function _StatementParser_parseBreakContinueStatement(node, isBreak) {
  _Tokenizer_next();
  if (_UtilParser_isLineTerminator()) {
    node.label = null;
  } else {
    node.label = _Parser_parseIdentifier_dynamic();
    _UtilParser_semicolon();
  }
  _Parser_verifyBreakContinue_dynamic(node, isBreak);
  return _Parser_finishNode_dynamic(node, isBreak ? "BreakStatement" : "ContinueStatement");
}
function _StatementParser_verifyBreakContinue(node, isBreak) {
  let i;
  for (i = 0; i < _Parser_this.state.labels.length; ++i) {
    const lab = _Parser_this.state.labels[i];
    if (node.label == null || lab.name === node.label.name) {
      if (lab.kind != null && (isBreak || lab.kind === 1)) {
        break;
      }
      if (node.label && isBreak) break;
    }
  }
  if (i === _Parser_this.state.labels.length) {
    const type = isBreak ? "BreakStatement" : "ContinueStatement";
    _Tokenizer_raise(Errors.IllegalBreakContinue, node, {
      type
    });
  }
}
function _StatementParser_parseDebuggerStatement(node) {
  _Tokenizer_next();
  _UtilParser_semicolon();
  return _Parser_finishNode_dynamic(node, "DebuggerStatement");
}
function _StatementParser_parseHeaderExpression() {
  _UtilParser_expect(10);
  const val = _ExpressionParser_parseExpression();
  _UtilParser_expect(11);
  return val;
}
function _StatementParser_parseDoWhileStatement(node) {
  _Tokenizer_next();
  _Parser_this.state.labels.push(loopLabel);
  node.body = _ExpressionParser_withSmartMixTopicForbiddingContext(() => _StatementParser_parseStatement());
  _Parser_this.state.labels.pop();
  _UtilParser_expect(92);
  node.test = _StatementParser_parseHeaderExpression();
  _Tokenizer_eat(13);
  return _Parser_finishNode_dynamic(node, "DoWhileStatement");
}
function _StatementParser_parseForStatement(node) {
  _Tokenizer_next();
  _Parser_this.state.labels.push(loopLabel);
  let awaitAt = null;
  if (_UtilParser_isContextual(96) && _ExpressionParser_recordAwaitIfAllowed()) {
    awaitAt = _Parser_this.state.startLoc;
    _Tokenizer_next();
  }
  _Parser_this.scope.enter(0);
  _UtilParser_expect(10);
  if (_Tokenizer_match(13)) {
    if (awaitAt !== null) {
      _Tokenizer_unexpected(awaitAt);
    }
    return _StatementParser_parseFor(node, null);
  }
  const startsWithLet = _UtilParser_isContextual(100);
  {
    const startsWithAwaitUsing = _UtilParser_isContextual(96) && _StatementParser_startsAwaitUsing();
    const starsWithUsingDeclaration = startsWithAwaitUsing || _UtilParser_isContextual(107) && _StatementParser_allowsForUsing();
    const isLetOrUsing = startsWithLet && _StatementParser_hasFollowingBindingAtom() || starsWithUsingDeclaration;
    if (_Tokenizer_match(74) || _Tokenizer_match(75) || isLetOrUsing) {
      const initNode = _NodeUtils_startNode();
      let kind;
      if (startsWithAwaitUsing) {
        kind = "await using";
        if (!_ExpressionParser_recordAwaitIfAllowed()) {
          _Tokenizer_raise(Errors.AwaitUsingNotInAsyncContext, _Parser_this.state.startLoc);
        }
        _Tokenizer_next();
      } else {
        kind = _Parser_this.state.value;
      }
      _Tokenizer_next();
      _StatementParser_parseVar(initNode, true, kind);
      const init = _Parser_finishNode_dynamic(initNode, "VariableDeclaration");
      const isForIn = _Tokenizer_match(58);
      if (isForIn && starsWithUsingDeclaration) {
        _Tokenizer_raise(Errors.ForInUsing, init);
      }
      if ((isForIn || _UtilParser_isContextual(102)) && init.declarations.length === 1) {
        return _StatementParser_parseForIn(node, init, awaitAt);
      }
      if (awaitAt !== null) {
        _Tokenizer_unexpected(awaitAt);
      }
      return _StatementParser_parseFor(node, init);
    }
  }
  const startsWithAsync = _UtilParser_isContextual(95);
  const refExpressionErrors = new ExpressionErrors();
  const init = _ExpressionParser_parseExpression(true, refExpressionErrors);
  const isForOf = _UtilParser_isContextual(102);
  if (isForOf) {
    if (startsWithLet) {
      _Tokenizer_raise(Errors.ForOfLet, init);
    }
    if (awaitAt === null && startsWithAsync && init.type === "Identifier") {
      _Tokenizer_raise(Errors.ForOfAsync, init);
    }
  }
  if (isForOf || _Tokenizer_match(58)) {
    _UtilParser_checkDestructuringPrivate(refExpressionErrors);
    _Parser_toAssignable_dynamic(init, true);
    const type = isForOf ? "ForOfStatement" : "ForInStatement";
    _LValParser_checkLVal(init, {
      type
    });
    return _StatementParser_parseForIn(node, init, awaitAt);
  } else {
    _UtilParser_checkExpressionErrors(refExpressionErrors, true);
  }
  if (awaitAt !== null) {
    _Tokenizer_unexpected(awaitAt);
  }
  return _StatementParser_parseFor(node, init);
}
function _StatementParser_parseFunctionStatement(node, isAsync, isHangingDeclaration) {
  _Tokenizer_next();
  return _StatementParser_parseFunction(node, 1 | (isHangingDeclaration ? 2 : 0) | (isAsync ? 8 : 0));
}
function _StatementParser_parseIfStatement(node) {
  _Tokenizer_next();
  node.test = _StatementParser_parseHeaderExpression();
  node.consequent = _StatementParser_parseStatementOrSloppyAnnexBFunctionDeclaration();
  node.alternate = _Tokenizer_eat(66) ? _StatementParser_parseStatementOrSloppyAnnexBFunctionDeclaration() : null;
  return _Parser_finishNode_dynamic(node, "IfStatement");
}
function _StatementParser_parseReturnStatement(node) {
  if (!_Parser_this.prodParam.hasReturn && !(_Parser_this.optionFlags & 2)) {
    _Tokenizer_raise(Errors.IllegalReturn, _Parser_this.state.startLoc);
  }
  _Tokenizer_next();
  if (_UtilParser_isLineTerminator()) {
    node.argument = null;
  } else {
    node.argument = _ExpressionParser_parseExpression();
    _UtilParser_semicolon();
  }
  return _Parser_finishNode_dynamic(node, "ReturnStatement");
}
function _StatementParser_parseSwitchStatement(node) {
  _Tokenizer_next();
  node.discriminant = _StatementParser_parseHeaderExpression();
  const cases = node.cases = [];
  _UtilParser_expect(5);
  _Parser_this.state.labels.push(switchLabel);
  _Parser_this.scope.enter(0);
  let cur;
  for (let sawDefault; !_Tokenizer_match(8);) {
    if (_Tokenizer_match(61) || _Tokenizer_match(65)) {
      const isCase = _Tokenizer_match(61);
      if (cur) _Parser_finishNode_dynamic(cur, "SwitchCase");
      cases.push(cur = _NodeUtils_startNode());
      cur.consequent = [];
      _Tokenizer_next();
      if (isCase) {
        cur.test = _ExpressionParser_parseExpression();
      } else {
        if (sawDefault) {
          _Tokenizer_raise(Errors.MultipleDefaultsInSwitch, _Parser_this.state.lastTokStartLoc);
        }
        sawDefault = true;
        cur.test = null;
      }
      _UtilParser_expect(14);
    } else {
      if (cur) {
        cur.consequent.push(_StatementParser_parseStatementListItem());
      } else {
        _Tokenizer_unexpected();
      }
    }
  }
  _Parser_this.scope.exit();
  if (cur) _Parser_finishNode_dynamic(cur, "SwitchCase");
  _Tokenizer_next();
  _Parser_this.state.labels.pop();
  return _Parser_finishNode_dynamic(node, "SwitchStatement");
}
function _StatementParser_parseThrowStatement(node) {
  _Tokenizer_next();
  if (_UtilParser_hasPrecedingLineBreak()) {
    _Tokenizer_raise(Errors.NewlineAfterThrow, _Parser_this.state.lastTokEndLoc);
  }
  node.argument = _ExpressionParser_parseExpression();
  _UtilParser_semicolon();
  return _Parser_finishNode_dynamic(node, "ThrowStatement");
}
function _StatementParser_parseCatchClauseParam() {
  const param = _Parser_parseBindingAtom_dynamic();
  _Parser_this.scope.enter(_Parser_this.options.annexB && param.type === "Identifier" ? 8 : 0);
  _LValParser_checkLVal(param, {
    type: "CatchClause"
  }, 9);
  return param;
}
function _StatementParser_parseTryStatement(node) {
  _Tokenizer_next();
  node.block = _Parser_parseBlock_dynamic();
  node.handler = null;
  if (_Tokenizer_match(62)) {
    const clause = _NodeUtils_startNode();
    _Tokenizer_next();
    if (_Tokenizer_match(10)) {
      _UtilParser_expect(10);
      clause.param = _Parser_parseCatchClauseParam_dynamic();
      _UtilParser_expect(11);
    } else {
      clause.param = null;
      _Parser_this.scope.enter(0);
    }
    clause.body = _ExpressionParser_withSmartMixTopicForbiddingContext(() => _Parser_parseBlock_dynamic(false, false));
    _Parser_this.scope.exit();
    node.handler = _Parser_finishNode_dynamic(clause, "CatchClause");
  }
  node.finalizer = _Tokenizer_eat(67) ? _Parser_parseBlock_dynamic() : null;
  if (!node.handler && !node.finalizer) {
    _Tokenizer_raise(Errors.NoCatchOrFinally, node);
  }
  return _Parser_finishNode_dynamic(node, "TryStatement");
}
function _StatementParser_parseVarStatement(node, kind, allowMissingInitializer = false) {
  _Tokenizer_next();
  _StatementParser_parseVar(node, false, kind, allowMissingInitializer);
  _UtilParser_semicolon();
  return _Parser_finishNode_dynamic(node, "VariableDeclaration");
}
function _StatementParser_parseWhileStatement(node) {
  _Tokenizer_next();
  node.test = _StatementParser_parseHeaderExpression();
  _Parser_this.state.labels.push(loopLabel);
  node.body = _ExpressionParser_withSmartMixTopicForbiddingContext(() => _StatementParser_parseStatement());
  _Parser_this.state.labels.pop();
  return _Parser_finishNode_dynamic(node, "WhileStatement");
}
function _StatementParser_parseWithStatement(node) {
  if (_Parser_this.state.strict) {
    _Tokenizer_raise(Errors.StrictWith, _Parser_this.state.startLoc);
  }
  _Tokenizer_next();
  node.object = _StatementParser_parseHeaderExpression();
  node.body = _ExpressionParser_withSmartMixTopicForbiddingContext(() => _StatementParser_parseStatement());
  return _Parser_finishNode_dynamic(node, "WithStatement");
}
function _StatementParser_parseEmptyStatement(node) {
  _Tokenizer_next();
  return _Parser_finishNode_dynamic(node, "EmptyStatement");
}
function _StatementParser_parseLabeledStatement(node, maybeName, expr, flags) {
  for (const label of _Parser_this.state.labels) {
    if (label.name === maybeName) {
      _Tokenizer_raise(Errors.LabelRedeclaration, expr, {
        labelName: maybeName
      });
    }
  }
  const kind = tokenIsLoop(_Parser_this.state.type) ? 1 : _Tokenizer_match(71) ? 2 : null;
  for (let i = _Parser_this.state.labels.length - 1; i >= 0; i--) {
    const label = _Parser_this.state.labels[i];
    if (label.statementStart === node.start) {
      label.statementStart = _BaseParser_sourceToOffsetPos(_Parser_this.state.start);
      label.kind = kind;
    } else {
      break;
    }
  }
  _Parser_this.state.labels.push({
    name: maybeName,
    kind: kind,
    statementStart: _BaseParser_sourceToOffsetPos(_Parser_this.state.start)
  });
  node.body = flags & 8 ? _StatementParser_parseStatementOrSloppyAnnexBFunctionDeclaration(true) : _StatementParser_parseStatement();
  _Parser_this.state.labels.pop();
  node.label = expr;
  return _Parser_finishNode_dynamic(node, "LabeledStatement");
}
function _StatementParser_parseExpressionStatement(node, expr, decorators) {
  node.expression = expr;
  _UtilParser_semicolon();
  return _Parser_finishNode_dynamic(node, "ExpressionStatement");
}
function _StatementParser_parseBlock(allowDirectives = false, createNewLexicalScope = true, afterBlockParse) {
  const node = _NodeUtils_startNode();
  if (allowDirectives) {
    _Parser_this.state.strictErrors.clear();
  }
  _UtilParser_expect(5);
  if (createNewLexicalScope) {
    _Parser_this.scope.enter(0);
  }
  _Parser_parseBlockBody_dynamic(node, allowDirectives, false, 8, afterBlockParse);
  if (createNewLexicalScope) {
    _Parser_this.scope.exit();
  }
  return _Parser_finishNode_dynamic(node, "BlockStatement");
}
function _StatementParser_isValidDirective(stmt) {
  return stmt.type === "ExpressionStatement" && stmt.expression.type === "StringLiteral" && !stmt.expression.extra.parenthesized;
}
function _StatementParser_parseBlockBody(node, allowDirectives, topLevel, end, afterBlockParse) {
  const body = node.body = [];
  const directives = node.directives = [];
  _StatementParser_parseBlockOrModuleBlockBody(body, allowDirectives ? directives : undefined, topLevel, end, afterBlockParse);
}
function _StatementParser_parseBlockOrModuleBlockBody(body, directives, topLevel, end, afterBlockParse) {
  const oldStrict = _Parser_this.state.strict;
  let hasStrictModeDirective = false;
  let parsedNonDirective = false;
  while (!_Tokenizer_match(end)) {
    const stmt = topLevel ? _StatementParser_parseModuleItem() : _StatementParser_parseStatementListItem();
    if (directives && !parsedNonDirective) {
      if (_Parser_isValidDirective_dynamic(stmt)) {
        const directive = _StatementParser_stmtToDirective(stmt);
        directives.push(directive);
        if (!hasStrictModeDirective && directive.value.value === "use strict") {
          hasStrictModeDirective = true;
          _Tokenizer_setStrict(true);
        }
        continue;
      }
      parsedNonDirective = true;
      _Parser_this.state.strictErrors.clear();
    }
    body.push(stmt);
  }
  afterBlockParse == null || afterBlockParse.call(_Parser_this, hasStrictModeDirective);
  if (!oldStrict) {
    _Tokenizer_setStrict(false);
  }
  _Tokenizer_next();
}
function _StatementParser_parseFor(node, init) {
  node.init = init;
  _UtilParser_semicolon(false);
  node.test = _Tokenizer_match(13) ? null : _ExpressionParser_parseExpression();
  _UtilParser_semicolon(false);
  node.update = _Tokenizer_match(11) ? null : _ExpressionParser_parseExpression();
  _UtilParser_expect(11);
  node.body = _ExpressionParser_withSmartMixTopicForbiddingContext(() => _StatementParser_parseStatement());
  _Parser_this.scope.exit();
  _Parser_this.state.labels.pop();
  return _Parser_finishNode_dynamic(node, "ForStatement");
}
function _StatementParser_parseForIn(node, init, awaitAt) {
  const isForIn = _Tokenizer_match(58);
  _Tokenizer_next();
  if (isForIn) {
    if (awaitAt !== null) _Tokenizer_unexpected(awaitAt);
  } else {
    node.await = awaitAt !== null;
  }
  if (init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || !_Parser_this.options.annexB || _Parser_this.state.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier")) {
    _Tokenizer_raise(Errors.ForInOfLoopInitializer, init, {
      type: isForIn ? "ForInStatement" : "ForOfStatement"
    });
  }
  if (init.type === "AssignmentPattern") {
    _Tokenizer_raise(Errors.InvalidLhs, init, {
      ancestor: {
        type: "ForStatement"
      }
    });
  }
  node.left = init;
  node.right = isForIn ? _ExpressionParser_parseExpression() : _ExpressionParser_parseMaybeAssignAllowIn();
  _UtilParser_expect(11);
  node.body = _ExpressionParser_withSmartMixTopicForbiddingContext(() => _StatementParser_parseStatement());
  _Parser_this.scope.exit();
  _Parser_this.state.labels.pop();
  return _Parser_finishNode_dynamic(node, isForIn ? "ForInStatement" : "ForOfStatement");
}
function _StatementParser_parseVar(node, isFor, kind, allowMissingInitializer = false) {
  const declarations = node.declarations = [];
  node.kind = kind;
  for (;;) {
    const decl = _NodeUtils_startNode();
    _Parser_parseVarId_dynamic(decl, kind);
    decl.init = !_Tokenizer_eat(29) ? null : isFor ? _ExpressionParser_parseMaybeAssignDisallowIn() : _ExpressionParser_parseMaybeAssignAllowIn();
    if (decl.init === null && !allowMissingInitializer) {
      if (decl.id.type !== "Identifier" && !(isFor && (_Tokenizer_match(58) || _UtilParser_isContextual(102)))) {
        _Tokenizer_raise(Errors.DeclarationMissingInitializer, _Parser_this.state.lastTokEndLoc, {
          kind: "destructuring"
        });
      } else if ((kind === "const" || kind === "using" || kind === "await using") && !(_Tokenizer_match(58) || _UtilParser_isContextual(102))) {
        _Tokenizer_raise(Errors.DeclarationMissingInitializer, _Parser_this.state.lastTokEndLoc, {
          kind
        });
      }
    }
    declarations.push(_Parser_finishNode_dynamic(decl, "VariableDeclarator"));
    if (!_Tokenizer_eat(12)) break;
  }
  return node;
}
function _StatementParser_parseVarId(decl, kind) {
  const id = _Parser_parseBindingAtom_dynamic();
  if (kind === "using" || kind === "await using") {
    if (id.type === "ArrayPattern" || id.type === "ObjectPattern") {
      _Tokenizer_raise(Errors.UsingDeclarationHasBindingPattern, id.loc.start);
    }
  }
  _LValParser_checkLVal(id, {
    type: "VariableDeclarator"
  }, kind === "var" ? 5 : 8201);
  decl.id = id;
}
function _StatementParser_parseAsyncFunctionExpression(node) {
  return _StatementParser_parseFunction(node, 8);
}
function _StatementParser_parseFunction(node, flags = 0) {
  const hangingDeclaration = flags & 2;
  const isDeclaration = !!(flags & 1);
  const requireId = isDeclaration && !(flags & 4);
  const isAsync = !!(flags & 8);
  _Parser_initFunction_dynamic(node, isAsync);
  if (_Tokenizer_match(55)) {
    if (hangingDeclaration) {
      _Tokenizer_raise(Errors.GeneratorInSingleStatementContext, _Parser_this.state.startLoc);
    }
    _Tokenizer_next();
    node.generator = true;
  }
  if (isDeclaration) {
    node.id = _Parser_parseFunctionId_dynamic(requireId);
  }
  const oldMaybeInArrowParameters = _Parser_this.state.maybeInArrowParameters;
  _Parser_this.state.maybeInArrowParameters = false;
  _Parser_this.scope.enter(2);
  _Parser_this.prodParam.enter(functionFlags(isAsync, node.generator));
  if (!isDeclaration) {
    node.id = _Parser_parseFunctionId_dynamic();
  }
  _Parser_parseFunctionParams_dynamic(node, false);
  _ExpressionParser_withSmartMixTopicForbiddingContext(() => {
    _Parser_parseFunctionBodyAndFinish_dynamic(node, isDeclaration ? "FunctionDeclaration" : "FunctionExpression");
  });
  _Parser_this.prodParam.exit();
  _Parser_this.scope.exit();
  if (isDeclaration && !hangingDeclaration) {
    _Parser_registerFunctionStatementId_dynamic(node);
  }
  _Parser_this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
  return node;
}
function _StatementParser_parseFunctionId(requireId) {
  return requireId || tokenIsIdentifier(_Parser_this.state.type) ? _Parser_parseIdentifier_dynamic() : null;
}
function _StatementParser_parseFunctionParams(node, isConstructor) {
  _UtilParser_expect(10);
  _Parser_this.expressionScope.enter(newParameterDeclarationScope());
  node.params = _LValParser_parseBindingList(11, 41, 2 | (isConstructor ? 4 : 0));
  _Parser_this.expressionScope.exit();
}
function _StatementParser_registerFunctionStatementId(node) {
  if (!node.id) return;
  _Parser_this.scope.declareName(node.id.name, !_Parser_this.options.annexB || _Parser_this.state.strict || node.generator || node.async ? _Parser_this.scope.treatFunctionsAsVar ? 5 : 8201 : 17, node.id.loc.start);
}
function _StatementParser_parseClass(node, isStatement, optionalId) {
  _Tokenizer_next();
  const oldStrict = _Parser_this.state.strict;
  _Parser_this.state.strict = true;
  _Parser_parseClassId_dynamic(node, isStatement, optionalId);
  _Parser_parseClassSuper_dynamic(node);
  node.body = _StatementParser_parseClassBody(!!node.superClass, oldStrict);
  return _Parser_finishNode_dynamic(node, isStatement ? "ClassDeclaration" : "ClassExpression");
}
function _StatementParser_isClassProperty() {
  return _Tokenizer_match(29) || _Tokenizer_match(13) || _Tokenizer_match(8);
}
function _StatementParser_isClassMethod() {
  return _Tokenizer_match(10);
}
function _StatementParser_nameIsConstructor(key) {
  return key.type === "Identifier" && key.name === "constructor" || key.type === "StringLiteral" && key.value === "constructor";
}
function _StatementParser_isNonstaticConstructor(method) {
  return !method.computed && !method.static && _Parser_nameIsConstructor_dynamic(method.key);
}
function _StatementParser_parseClassBody(hadSuperClass, oldStrict) {
  _Parser_this.classScope.enter();
  const state = {
    hadConstructor: false,
    hadSuperClass
  };
  let decorators = [];
  const classBody = _NodeUtils_startNode();
  classBody.body = [];
  _UtilParser_expect(5);
  _ExpressionParser_withSmartMixTopicForbiddingContext(() => {
    while (!_Tokenizer_match(8)) {
      if (_Tokenizer_eat(13)) {
        if (decorators.length > 0) {
          throw _Tokenizer_raise(Errors.DecoratorSemicolon, _Parser_this.state.lastTokEndLoc);
        }
        continue;
      }
      if (_Tokenizer_match(26)) {
        decorators.push(_StatementParser_parseDecorator());
        continue;
      }
      const member = _NodeUtils_startNode();
      if (decorators.length) {
        member.decorators = decorators;
        _NodeUtils_resetStartLocationFromNode(member, decorators[0]);
        decorators = [];
      }
      _Parser_parseClassMember_dynamic(classBody, member, state);
      if (member.kind === "constructor" && member.decorators && member.decorators.length > 0) {
        _Tokenizer_raise(Errors.DecoratorConstructor, member);
      }
    }
  });
  _Parser_this.state.strict = oldStrict;
  _Tokenizer_next();
  if (decorators.length) {
    throw _Tokenizer_raise(Errors.TrailingDecorator, _Parser_this.state.startLoc);
  }
  _Parser_this.classScope.exit();
  return _Parser_finishNode_dynamic(classBody, "ClassBody");
}
function _StatementParser_parseClassMemberFromModifier(classBody, member) {
  const key = _Parser_parseIdentifier_dynamic(true);
  if (_Parser_isClassMethod_dynamic()) {
    const method = member;
    method.kind = "method";
    method.computed = false;
    method.key = key;
    method.static = false;
    _Parser_pushClassMethod_dynamic(classBody, method, false, false, false, false);
    return true;
  } else if (_Parser_isClassProperty_dynamic()) {
    const prop = member;
    prop.computed = false;
    prop.key = key;
    prop.static = false;
    classBody.body.push(_Parser_parseClassProperty_dynamic(prop));
    return true;
  }
  _CommentsParser_resetPreviousNodeTrailingComments(key);
  return false;
}
function _StatementParser_parseClassMember(classBody, member, state) {
  const isStatic = _UtilParser_isContextual(106);
  if (isStatic) {
    if (_StatementParser_parseClassMemberFromModifier(classBody, member)) {
      return;
    }
    if (_Tokenizer_eat(5)) {
      _StatementParser_parseClassStaticBlock(classBody, member);
      return;
    }
  }
  _Parser_parseClassMemberWithIsStatic_dynamic(classBody, member, state, isStatic);
}
function _StatementParser_parseClassMemberWithIsStatic(classBody, member, state, isStatic) {
  const publicMethod = member;
  const privateMethod = member;
  const publicProp = member;
  const privateProp = member;
  const accessorProp = member;
  const method = publicMethod;
  const publicMember = publicMethod;
  member.static = isStatic;
  _Parser_parsePropertyNamePrefixOperator_dynamic(member);
  if (_Tokenizer_eat(55)) {
    method.kind = "method";
    const isPrivateName = _Tokenizer_match(139);
    _StatementParser_parseClassElementName(method);
    _Parser_parsePostMemberNameModifiers_dynamic(method);
    if (isPrivateName) {
      _Parser_pushClassPrivateMethod_dynamic(classBody, privateMethod, true, false);
      return;
    }
    if (_Parser_isNonstaticConstructor_dynamic(publicMethod)) {
      _Tokenizer_raise(Errors.ConstructorIsGenerator, publicMethod.key);
    }
    _Parser_pushClassMethod_dynamic(classBody, publicMethod, true, false, false, false);
    return;
  }
  const isContextual = !_Parser_this.state.containsEsc && tokenIsIdentifier(_Parser_this.state.type);
  const key = _StatementParser_parseClassElementName(member);
  const maybeContextualKw = isContextual ? key.name : null;
  const isPrivate = _Parser_isPrivateName_dynamic(key);
  const maybeQuestionTokenStartLoc = _Parser_this.state.startLoc;
  _Parser_parsePostMemberNameModifiers_dynamic(publicMember);
  if (_Parser_isClassMethod_dynamic()) {
    method.kind = "method";
    if (isPrivate) {
      _Parser_pushClassPrivateMethod_dynamic(classBody, privateMethod, false, false);
      return;
    }
    const isConstructor = _Parser_isNonstaticConstructor_dynamic(publicMethod);
    let allowsDirectSuper = false;
    if (isConstructor) {
      publicMethod.kind = "constructor";
      if (state.hadConstructor && !_BaseParser_hasPlugin("typescript")) {
        _Tokenizer_raise(Errors.DuplicateConstructor, key);
      }
      if (isConstructor && _BaseParser_hasPlugin("typescript") && member.override) {
        _Tokenizer_raise(Errors.OverrideOnConstructor, key);
      }
      state.hadConstructor = true;
      allowsDirectSuper = state.hadSuperClass;
    }
    _Parser_pushClassMethod_dynamic(classBody, publicMethod, false, false, isConstructor, allowsDirectSuper);
  } else if (_Parser_isClassProperty_dynamic()) {
    if (isPrivate) {
      _StatementParser_pushClassPrivateProperty(classBody, privateProp);
    } else {
      _StatementParser_pushClassProperty(classBody, publicProp);
    }
  } else if (maybeContextualKw === "async" && !_UtilParser_isLineTerminator()) {
    _CommentsParser_resetPreviousNodeTrailingComments(key);
    const isGenerator = _Tokenizer_eat(55);
    if (publicMember.optional) {
      _Tokenizer_unexpected(maybeQuestionTokenStartLoc);
    }
    method.kind = "method";
    const isPrivate = _Tokenizer_match(139);
    _StatementParser_parseClassElementName(method);
    _Parser_parsePostMemberNameModifiers_dynamic(publicMember);
    if (isPrivate) {
      _Parser_pushClassPrivateMethod_dynamic(classBody, privateMethod, isGenerator, true);
    } else {
      if (_Parser_isNonstaticConstructor_dynamic(publicMethod)) {
        _Tokenizer_raise(Errors.ConstructorIsAsync, publicMethod.key);
      }
      _Parser_pushClassMethod_dynamic(classBody, publicMethod, isGenerator, true, false, false);
    }
  } else if ((maybeContextualKw === "get" || maybeContextualKw === "set") && !(_Tokenizer_match(55) && _UtilParser_isLineTerminator())) {
    _CommentsParser_resetPreviousNodeTrailingComments(key);
    method.kind = maybeContextualKw;
    const isPrivate = _Tokenizer_match(139);
    _StatementParser_parseClassElementName(publicMethod);
    if (isPrivate) {
      _Parser_pushClassPrivateMethod_dynamic(classBody, privateMethod, false, false);
    } else {
      if (_Parser_isNonstaticConstructor_dynamic(publicMethod)) {
        _Tokenizer_raise(Errors.ConstructorIsAccessor, publicMethod.key);
      }
      _Parser_pushClassMethod_dynamic(classBody, publicMethod, false, false, false, false);
    }
    _Parser_checkGetterSetterParams_dynamic(publicMethod);
  } else if (maybeContextualKw === "accessor" && !_UtilParser_isLineTerminator()) {
    _Tokenizer_expectPlugin("decoratorAutoAccessors");
    _CommentsParser_resetPreviousNodeTrailingComments(key);
    const isPrivate = _Tokenizer_match(139);
    _StatementParser_parseClassElementName(publicProp);
    _StatementParser_pushClassAccessorProperty(classBody, accessorProp, isPrivate);
  } else if (_UtilParser_isLineTerminator()) {
    if (isPrivate) {
      _StatementParser_pushClassPrivateProperty(classBody, privateProp);
    } else {
      _StatementParser_pushClassProperty(classBody, publicProp);
    }
  } else {
    _Tokenizer_unexpected();
  }
}
function _StatementParser_parseClassElementName(member) {
  const {
    type,
    value
  } = _Parser_this.state;
  if ((type === 132 || type === 134) && member.static && value === "prototype") {
    _Tokenizer_raise(Errors.StaticPrototype, _Parser_this.state.startLoc);
  }
  if (type === 139) {
    if (value === "constructor") {
      _Tokenizer_raise(Errors.ConstructorClassPrivateField, _Parser_this.state.startLoc);
    }
    const key = _Parser_parsePrivateName_dynamic();
    member.key = key;
    return key;
  }
  _ExpressionParser_parsePropertyName(member);
  return member.key;
}
function _StatementParser_parseClassStaticBlock(classBody, member) {
  var _member$decorators;
  _Parser_this.scope.enter(64 | 128 | 16);
  const oldLabels = _Parser_this.state.labels;
  _Parser_this.state.labels = [];
  _Parser_this.prodParam.enter(0);
  const body = member.body = [];
  _StatementParser_parseBlockOrModuleBlockBody(body, undefined, false, 8);
  _Parser_this.prodParam.exit();
  _Parser_this.scope.exit();
  _Parser_this.state.labels = oldLabels;
  classBody.body.push(_Parser_finishNode_dynamic(member, "StaticBlock"));
  if ((_member$decorators = member.decorators) != null && _member$decorators.length) {
    _Tokenizer_raise(Errors.DecoratorStaticBlock, member);
  }
}
function _StatementParser_pushClassProperty(classBody, prop) {
  if (!prop.computed && _Parser_nameIsConstructor_dynamic(prop.key)) {
    _Tokenizer_raise(Errors.ConstructorClassField, prop.key);
  }
  classBody.body.push(_Parser_parseClassProperty_dynamic(prop));
}
function _StatementParser_pushClassPrivateProperty(classBody, prop) {
  const node = _Parser_parseClassPrivateProperty_dynamic(prop);
  classBody.body.push(node);
  _Parser_this.classScope.declarePrivateName(_Parser_getPrivateNameSV_dynamic(node.key), 0, node.key.loc.start);
}
function _StatementParser_pushClassAccessorProperty(classBody, prop, isPrivate) {
  if (!isPrivate && !prop.computed && _Parser_nameIsConstructor_dynamic(prop.key)) {
    _Tokenizer_raise(Errors.ConstructorClassField, prop.key);
  }
  const node = _Parser_parseClassAccessorProperty_dynamic(prop);
  classBody.body.push(node);
  if (isPrivate) {
    _Parser_this.classScope.declarePrivateName(_Parser_getPrivateNameSV_dynamic(node.key), 0, node.key.loc.start);
  }
}
function _StatementParser_pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
  classBody.body.push(_Parser_parseMethod_dynamic(method, isGenerator, isAsync, isConstructor, allowsDirectSuper, "ClassMethod", true));
}
function _StatementParser_pushClassPrivateMethod(classBody, method, isGenerator, isAsync) {
  const node = _Parser_parseMethod_dynamic(method, isGenerator, isAsync, false, false, "ClassPrivateMethod", true);
  classBody.body.push(node);
  const kind = node.kind === "get" ? node.static ? 6 : 2 : node.kind === "set" ? node.static ? 5 : 1 : 0;
  _Parser_declareClassPrivateMethodInScope_dynamic(node, kind);
}
function _StatementParser_declareClassPrivateMethodInScope(node, kind) {
  _Parser_this.classScope.declarePrivateName(_Parser_getPrivateNameSV_dynamic(node.key), kind, node.key.loc.start);
}
function _StatementParser_parsePostMemberNameModifiers(methodOrProp) {}
function _StatementParser_parseClassPrivateProperty(node) {
  _StatementParser_parseInitializer(node);
  _UtilParser_semicolon();
  return _Parser_finishNode_dynamic(node, "ClassPrivateProperty");
}
function _StatementParser_parseClassProperty(node) {
  _StatementParser_parseInitializer(node);
  _UtilParser_semicolon();
  return _Parser_finishNode_dynamic(node, "ClassProperty");
}
function _StatementParser_parseClassAccessorProperty(node) {
  _StatementParser_parseInitializer(node);
  _UtilParser_semicolon();
  return _Parser_finishNode_dynamic(node, "ClassAccessorProperty");
}
function _StatementParser_parseInitializer(node) {
  _Parser_this.scope.enter(64 | 16);
  _Parser_this.expressionScope.enter(newExpressionScope());
  _Parser_this.prodParam.enter(0);
  node.value = _Tokenizer_eat(29) ? _ExpressionParser_parseMaybeAssignAllowIn() : null;
  _Parser_this.expressionScope.exit();
  _Parser_this.prodParam.exit();
  _Parser_this.scope.exit();
}
function _StatementParser_parseClassId(node, isStatement, optionalId, bindingType = 8331) {
  if (tokenIsIdentifier(_Parser_this.state.type)) {
    node.id = _Parser_parseIdentifier_dynamic();
    if (isStatement) {
      _LValParser_declareNameFromIdentifier(node.id, bindingType);
    }
  } else {
    if (optionalId || !isStatement) {
      node.id = null;
    } else {
      throw _Tokenizer_raise(Errors.MissingClassName, _Parser_this.state.startLoc);
    }
  }
}
function _StatementParser_parseClassSuper(node) {
  node.superClass = _Tokenizer_eat(81) ? _ExpressionParser_parseExprSubscripts() : null;
}
function _StatementParser_parseExport(node, decorators) {
  const maybeDefaultIdentifier = _StatementParser_parseMaybeImportPhase(node, true);
  const hasDefault = _Parser_maybeParseExportDefaultSpecifier_dynamic(node, maybeDefaultIdentifier);
  const parseAfterDefault = !hasDefault || _Tokenizer_eat(12);
  const hasStar = parseAfterDefault && _Parser_eatExportStar_dynamic(node);
  const hasNamespace = hasStar && _Parser_maybeParseExportNamespaceSpecifier_dynamic(node);
  const parseAfterNamespace = parseAfterDefault && (!hasNamespace || _Tokenizer_eat(12));
  const isFromRequired = hasDefault || hasStar;
  if (hasStar && !hasNamespace) {
    if (hasDefault) _Tokenizer_unexpected();
    if (decorators) {
      throw _Tokenizer_raise(Errors.UnsupportedDecoratorExport, node);
    }
    _StatementParser_parseExportFrom(node, true);
    _Parser_this.sawUnambiguousESM = true;
    return _Parser_finishNode_dynamic(node, "ExportAllDeclaration");
  }
  const hasSpecifiers = _StatementParser_maybeParseExportNamedSpecifiers(node);
  if (hasDefault && parseAfterDefault && !hasStar && !hasSpecifiers) {
    _Tokenizer_unexpected(null, 5);
  }
  if (hasNamespace && parseAfterNamespace) {
    _Tokenizer_unexpected(null, 98);
  }
  let hasDeclaration;
  if (isFromRequired || hasSpecifiers) {
    hasDeclaration = false;
    if (decorators) {
      throw _Tokenizer_raise(Errors.UnsupportedDecoratorExport, node);
    }
    _StatementParser_parseExportFrom(node, isFromRequired);
  } else {
    hasDeclaration = _StatementParser_maybeParseExportDeclaration(node);
  }
  if (isFromRequired || hasSpecifiers || hasDeclaration) {
    var _node2$declaration;
    const node2 = node;
    _Parser_checkExport_dynamic(node2, true, false, !!node2.source);
    if (((_node2$declaration = node2.declaration) == null ? void 0 : _node2$declaration.type) === "ClassDeclaration") {
      _StatementParser_maybeTakeDecorators(decorators, node2.declaration, node2);
    } else if (decorators) {
      throw _Tokenizer_raise(Errors.UnsupportedDecoratorExport, node);
    }
    _Parser_this.sawUnambiguousESM = true;
    return _Parser_finishNode_dynamic(node2, "ExportNamedDeclaration");
  }
  if (_Tokenizer_eat(65)) {
    const node2 = node;
    const decl = _Parser_parseExportDefaultExpression_dynamic();
    node2.declaration = decl;
    if (decl.type === "ClassDeclaration") {
      _StatementParser_maybeTakeDecorators(decorators, decl, node2);
    } else if (decorators) {
      throw _Tokenizer_raise(Errors.UnsupportedDecoratorExport, node);
    }
    _Parser_checkExport_dynamic(node2, true, true);
    _Parser_this.sawUnambiguousESM = true;
    return _Parser_finishNode_dynamic(node2, "ExportDefaultDeclaration");
  }
  _Tokenizer_unexpected(null, 5);
}
function _StatementParser_eatExportStar(node) {
  return _Tokenizer_eat(55);
}
function _StatementParser_maybeParseExportDefaultSpecifier(node, maybeDefaultIdentifier) {
  if (maybeDefaultIdentifier || _Parser_isExportDefaultSpecifier_dynamic()) {
    _Tokenizer_expectPlugin("exportDefaultFrom", maybeDefaultIdentifier == null ? void 0 : maybeDefaultIdentifier.loc.start);
    const id = maybeDefaultIdentifier || _Parser_parseIdentifier_dynamic(true);
    const specifier = _NodeUtils_startNodeAtNode(id);
    specifier.exported = id;
    node.specifiers = [_Parser_finishNode_dynamic(specifier, "ExportDefaultSpecifier")];
    return true;
  }
  return false;
}
function _StatementParser_maybeParseExportNamespaceSpecifier(node) {
  if (_UtilParser_isContextual(93)) {
    var _ref, _ref$specifiers;
    (_ref$specifiers = (_ref = node).specifiers) != null ? _ref$specifiers : _ref.specifiers = [];
    const specifier = _NodeUtils_startNodeAt(_Parser_this.state.lastTokStartLoc);
    _Tokenizer_next();
    specifier.exported = _StatementParser_parseModuleExportName();
    node.specifiers.push(_Parser_finishNode_dynamic(specifier, "ExportNamespaceSpecifier"));
    return true;
  }
  return false;
}
function _StatementParser_maybeParseExportNamedSpecifiers(node) {
  if (_Tokenizer_match(5)) {
    const node2 = node;
    if (!node2.specifiers) node2.specifiers = [];
    const isTypeExport = node2.exportKind === "type";
    node2.specifiers.push(..._StatementParser_parseExportSpecifiers(isTypeExport));
    node2.source = null;
    if (_BaseParser_hasPlugin("importAssertions")) {
      node2.assertions = [];
    } else {
      node2.attributes = [];
    }
    node2.declaration = null;
    return true;
  }
  return false;
}
function _StatementParser_maybeParseExportDeclaration(node) {
  if (_Parser_shouldParseExportDeclaration_dynamic()) {
    node.specifiers = [];
    node.source = null;
    if (_BaseParser_hasPlugin("importAssertions")) {
      node.assertions = [];
    } else {
      node.attributes = [];
    }
    node.declaration = _Parser_parseExportDeclaration_dynamic(node);
    return true;
  }
  return false;
}
function _StatementParser_isAsyncFunction() {
  if (!_UtilParser_isContextual(95)) return false;
  const next = _Tokenizer_nextTokenInLineStart();
  return _UtilParser_isUnparsedContextual(next, "function");
}
function _StatementParser_parseExportDefaultExpression() {
  const expr = _NodeUtils_startNode();
  if (_Tokenizer_match(68)) {
    _Tokenizer_next();
    return _StatementParser_parseFunction(expr, 1 | 4);
  } else if (_StatementParser_isAsyncFunction()) {
    _Tokenizer_next();
    _Tokenizer_next();
    return _StatementParser_parseFunction(expr, 1 | 4 | 8);
  }
  if (_Tokenizer_match(80)) {
    return _Parser_parseClass_dynamic(expr, true, true);
  }
  if (_Tokenizer_match(26)) {
    if (_BaseParser_hasPlugin("decorators") && _BaseParser_getPluginOption("decorators", "decoratorsBeforeExport") === true) {
      _Tokenizer_raise(Errors.DecoratorBeforeExport, _Parser_this.state.startLoc);
    }
    return _Parser_parseClass_dynamic(_StatementParser_maybeTakeDecorators(_StatementParser_parseDecorators(false), _NodeUtils_startNode()), true, true);
  }
  if (_Tokenizer_match(75) || _Tokenizer_match(74) || _StatementParser_isLet()) {
    throw _Tokenizer_raise(Errors.UnsupportedDefaultExport, _Parser_this.state.startLoc);
  }
  const res = _ExpressionParser_parseMaybeAssignAllowIn();
  _UtilParser_semicolon();
  return res;
}
function _StatementParser_parseExportDeclaration(node) {
  if (_Tokenizer_match(80)) {
    const node = _Parser_parseClass_dynamic(_NodeUtils_startNode(), true, false);
    return node;
  }
  return _StatementParser_parseStatementListItem();
}
function _StatementParser_isExportDefaultSpecifier() {
  const {
    type
  } = _Parser_this.state;
  if (tokenIsIdentifier(type)) {
    if (type === 95 && !_Parser_this.state.containsEsc || type === 100) {
      return false;
    }
    if ((type === 130 || type === 129) && !_Parser_this.state.containsEsc) {
      const {
        type: nextType
      } = _Tokenizer_lookahead();
      if (tokenIsIdentifier(nextType) && nextType !== 98 || nextType === 5) {
        _Tokenizer_expectOnePlugin(["flow", "typescript"]);
        return false;
      }
    }
  } else if (!_Tokenizer_match(65)) {
    return false;
  }
  const next = _Tokenizer_nextTokenStart();
  const hasFrom = _UtilParser_isUnparsedContextual(next, "from");
  if (_Parser_this.input.charCodeAt(next) === 44 || tokenIsIdentifier(_Parser_this.state.type) && hasFrom) {
    return true;
  }
  if (_Tokenizer_match(65) && hasFrom) {
    const nextAfterFrom = _Parser_this.input.charCodeAt(_Tokenizer_nextTokenStartSince(next + 4));
    return nextAfterFrom === 34 || nextAfterFrom === 39;
  }
  return false;
}
function _StatementParser_parseExportFrom(node, expect) {
  if (_UtilParser_eatContextual(98)) {
    node.source = _Parser_parseImportSource_dynamic();
    _Parser_checkExport_dynamic(node);
    _StatementParser_maybeParseImportAttributes(node);
    _StatementParser_checkJSONModuleImport(node);
  } else if (expect) {
    _Tokenizer_unexpected();
  }
  _UtilParser_semicolon();
}
function _StatementParser_shouldParseExportDeclaration() {
  const {
    type
  } = _Parser_this.state;
  if (type === 26) {
    _Tokenizer_expectOnePlugin(["decorators", "decorators-legacy"]);
    if (_BaseParser_hasPlugin("decorators")) {
      if (_BaseParser_getPluginOption("decorators", "decoratorsBeforeExport") === true) {
        _Tokenizer_raise(Errors.DecoratorBeforeExport, _Parser_this.state.startLoc);
      }
      return true;
    }
  }
  if (_UtilParser_isContextual(107)) {
    _Tokenizer_raise(Errors.UsingDeclarationExport, _Parser_this.state.startLoc);
    return true;
  }
  if (_UtilParser_isContextual(96) && _StatementParser_startsAwaitUsing()) {
    _Tokenizer_raise(Errors.UsingDeclarationExport, _Parser_this.state.startLoc);
    return true;
  }
  return type === 74 || type === 75 || type === 68 || type === 80 || _StatementParser_isLet() || _StatementParser_isAsyncFunction();
}
function _StatementParser_checkExport(node, checkNames, isDefault, isFrom) {
  if (checkNames) {
    var _node$specifiers;
    if (isDefault) {
      _Parser_checkDuplicateExports_dynamic(node, "default");
      if (_BaseParser_hasPlugin("exportDefaultFrom")) {
        var _declaration$extra;
        const declaration = node.declaration;
        if (declaration.type === "Identifier" && declaration.name === "from" && declaration.end - declaration.start === 4 && !((_declaration$extra = declaration.extra) != null && _declaration$extra.parenthesized)) {
          _Tokenizer_raise(Errors.ExportDefaultFromAsIdentifier, declaration);
        }
      }
    } else if ((_node$specifiers = node.specifiers) != null && _node$specifiers.length) {
      for (const specifier of node.specifiers) {
        const {
          exported
        } = specifier;
        const exportName = exported.type === "Identifier" ? exported.name : exported.value;
        _Parser_checkDuplicateExports_dynamic(specifier, exportName);
        if (!isFrom && specifier.local) {
          const {
            local
          } = specifier;
          if (local.type !== "Identifier") {
            _Tokenizer_raise(Errors.ExportBindingIsString, specifier, {
              localName: local.value,
              exportName
            });
          } else {
            _Parser_checkReservedWord_dynamic(local.name, local.loc.start, true, false);
            _Parser_this.scope.checkLocalExport(local);
          }
        }
      }
    } else if (node.declaration) {
      const decl = node.declaration;
      if (decl.type === "FunctionDeclaration" || decl.type === "ClassDeclaration") {
        const {
          id
        } = decl;
        if (!id) throw new Error("Assertion failure");
        _Parser_checkDuplicateExports_dynamic(node, id.name);
      } else if (decl.type === "VariableDeclaration") {
        for (const declaration of decl.declarations) {
          _Parser_checkDeclaration_dynamic(declaration.id);
        }
      }
    }
  }
}
function _StatementParser_checkDeclaration(node) {
  if (node.type === "Identifier") {
    _Parser_checkDuplicateExports_dynamic(node, node.name);
  } else if (node.type === "ObjectPattern") {
    for (const prop of node.properties) {
      _Parser_checkDeclaration_dynamic(prop);
    }
  } else if (node.type === "ArrayPattern") {
    for (const elem of node.elements) {
      if (elem) {
        _Parser_checkDeclaration_dynamic(elem);
      }
    }
  } else if (node.type === "ObjectProperty") {
    _Parser_checkDeclaration_dynamic(node.value);
  } else if (node.type === "RestElement") {
    _Parser_checkDeclaration_dynamic(node.argument);
  } else if (node.type === "AssignmentPattern") {
    _Parser_checkDeclaration_dynamic(node.left);
  }
}
function _StatementParser_checkDuplicateExports(node, exportName) {
  if (_Parser_this.exportedIdentifiers.has(exportName)) {
    if (exportName === "default") {
      _Tokenizer_raise(Errors.DuplicateDefaultExport, node);
    } else {
      _Tokenizer_raise(Errors.DuplicateExport, node, {
        exportName
      });
    }
  }
  _Parser_this.exportedIdentifiers.add(exportName);
}
function _StatementParser_parseExportSpecifiers(isInTypeExport) {
  const nodes = [];
  let first = true;
  _UtilParser_expect(5);
  while (!_Tokenizer_eat(8)) {
    if (first) {
      first = false;
    } else {
      _UtilParser_expect(12);
      if (_Tokenizer_eat(8)) break;
    }
    const isMaybeTypeOnly = _UtilParser_isContextual(130);
    const isString = _Tokenizer_match(134);
    const node = _NodeUtils_startNode();
    node.local = _StatementParser_parseModuleExportName();
    nodes.push(_Parser_parseExportSpecifier_dynamic(node, isString, isInTypeExport, isMaybeTypeOnly));
  }
  return nodes;
}
function _StatementParser_parseExportSpecifier(node, isString, isInTypeExport, isMaybeTypeOnly) {
  if (_UtilParser_eatContextual(93)) {
    node.exported = _StatementParser_parseModuleExportName();
  } else if (isString) {
    node.exported = _Parser_cloneStringLiteral_dynamic(node.local);
  } else if (!node.exported) {
    node.exported = _Parser_cloneIdentifier_dynamic(node.local);
  }
  return _Parser_finishNode_dynamic(node, "ExportSpecifier");
}
function _StatementParser_parseModuleExportName() {
  if (_Tokenizer_match(134)) {
    const result = _Parser_parseStringLiteral_dynamic(_Parser_this.state.value);
    const surrogate = loneSurrogate.exec(result.value);
    if (surrogate) {
      _Tokenizer_raise(Errors.ModuleExportNameHasLoneSurrogate, result, {
        surrogateCharCode: surrogate[0].charCodeAt(0)
      });
    }
    return result;
  }
  return _Parser_parseIdentifier_dynamic(true);
}
function _StatementParser_isJSONModuleImport(node) {
  if (node.assertions != null) {
    return node.assertions.some(({
      key,
      value
    }) => {
      return value.value === "json" && (key.type === "Identifier" ? key.name === "type" : key.value === "type");
    });
  }
  return false;
}
function _StatementParser_checkImportReflection(node) {
  const {
    specifiers
  } = node;
  const singleBindingType = specifiers.length === 1 ? specifiers[0].type : null;
  if (node.phase === "source") {
    if (singleBindingType !== "ImportDefaultSpecifier") {
      _Tokenizer_raise(Errors.SourcePhaseImportRequiresDefault, specifiers[0].loc.start);
    }
  } else if (node.phase === "defer") {
    if (singleBindingType !== "ImportNamespaceSpecifier") {
      _Tokenizer_raise(Errors.DeferImportRequiresNamespace, specifiers[0].loc.start);
    }
  } else if (node.module) {
    var _node$assertions;
    if (singleBindingType !== "ImportDefaultSpecifier") {
      _Tokenizer_raise(Errors.ImportReflectionNotBinding, specifiers[0].loc.start);
    }
    if (((_node$assertions = node.assertions) == null ? void 0 : _node$assertions.length) > 0) {
      _Tokenizer_raise(Errors.ImportReflectionHasAssertion, specifiers[0].loc.start);
    }
  }
}
function _StatementParser_checkJSONModuleImport(node) {
  if (_StatementParser_isJSONModuleImport(node) && node.type !== "ExportAllDeclaration") {
    const {
      specifiers
    } = node;
    if (specifiers != null) {
      const nonDefaultNamedSpecifier = specifiers.find(specifier => {
        let imported;
        if (specifier.type === "ExportSpecifier") {
          imported = specifier.local;
        } else if (specifier.type === "ImportSpecifier") {
          imported = specifier.imported;
        }
        if (imported !== undefined) {
          return imported.type === "Identifier" ? imported.name !== "default" : imported.value !== "default";
        }
      });
      if (nonDefaultNamedSpecifier !== undefined) {
        _Tokenizer_raise(Errors.ImportJSONBindingNotDefault, nonDefaultNamedSpecifier.loc.start);
      }
    }
  }
}
function _StatementParser_isPotentialImportPhase(isExport) {
  if (isExport) return false;
  return _UtilParser_isContextual(105) || _UtilParser_isContextual(97) || _UtilParser_isContextual(127);
}
function _StatementParser_applyImportPhase(node, isExport, phase, loc) {
  if (isExport) {
    {
      if (phase === "module" || phase === "source") {
        throw new Error(`Assertion failure: export declarations do not support the '${phase}' phase.`);
      }
    }
    return;
  }
  if (phase === "module") {
    _Tokenizer_expectPlugin("importReflection", loc);
    node.module = true;
  } else if (_BaseParser_hasPlugin("importReflection")) {
    node.module = false;
  }
  if (phase === "source") {
    _Tokenizer_expectPlugin("sourcePhaseImports", loc);
    node.phase = "source";
  } else if (phase === "defer") {
    _Tokenizer_expectPlugin("deferredImportEvaluation", loc);
    node.phase = "defer";
  } else if (_BaseParser_hasPlugin("sourcePhaseImports")) {
    node.phase = null;
  }
}
function _StatementParser_parseMaybeImportPhase(node, isExport) {
  if (!_Parser_isPotentialImportPhase_dynamic(isExport)) {
    _Parser_applyImportPhase_dynamic(node, isExport, null);
    return null;
  }
  const phaseIdentifier = _NodeUtils_startNode();
  const phaseIdentifierName = _ExpressionParser_parseIdentifierName(true);
  const {
    type
  } = _Parser_this.state;
  const isImportPhase = tokenIsKeywordOrIdentifier(type) ? type !== 98 || _Tokenizer_lookaheadCharCode() === 102 : type !== 12;
  if (isImportPhase) {
    _Parser_applyImportPhase_dynamic(node, isExport, phaseIdentifierName, phaseIdentifier.loc.start);
    return null;
  } else {
    _Parser_applyImportPhase_dynamic(node, isExport, null);
    return _ExpressionParser_createIdentifier(phaseIdentifier, phaseIdentifierName);
  }
}
function _StatementParser_isPrecedingIdImportPhase(phase) {
  const {
    type
  } = _Parser_this.state;
  return tokenIsIdentifier(type) ? type !== 98 || _Tokenizer_lookaheadCharCode() === 102 : type !== 12;
}
function _StatementParser_parseImport(node) {
  if (_Tokenizer_match(134)) {
    return _StatementParser_parseImportSourceAndAttributes(node);
  }
  return _StatementParser_parseImportSpecifiersAndAfter(node, _StatementParser_parseMaybeImportPhase(node, false));
}
function _StatementParser_parseImportSpecifiersAndAfter(node, maybeDefaultIdentifier) {
  node.specifiers = [];
  const hasDefault = _StatementParser_maybeParseDefaultImportSpecifier(node, maybeDefaultIdentifier);
  const parseNext = !hasDefault || _Tokenizer_eat(12);
  const hasStar = parseNext && _StatementParser_maybeParseStarImportSpecifier(node);
  if (parseNext && !hasStar) _StatementParser_parseNamedImportSpecifiers(node);
  _UtilParser_expectContextual(98);
  return _StatementParser_parseImportSourceAndAttributes(node);
}
function _StatementParser_parseImportSourceAndAttributes(node) {
  var _node$specifiers2;
  (_node$specifiers2 = node.specifiers) != null ? _node$specifiers2 : node.specifiers = [];
  node.source = _Parser_parseImportSource_dynamic();
  _StatementParser_maybeParseImportAttributes(node);
  _Parser_checkImportReflection_dynamic(node);
  _StatementParser_checkJSONModuleImport(node);
  _UtilParser_semicolon();
  _Parser_this.sawUnambiguousESM = true;
  return _Parser_finishNode_dynamic(node, "ImportDeclaration");
}
function _StatementParser_parseImportSource() {
  if (!_Tokenizer_match(134)) _Tokenizer_unexpected();
  return _Parser_parseExprAtom_dynamic();
}
function _StatementParser_parseImportSpecifierLocal(node, specifier, type) {
  specifier.local = _Parser_parseIdentifier_dynamic();
  node.specifiers.push(_StatementParser_finishImportSpecifier(specifier, type));
}
function _StatementParser_finishImportSpecifier(specifier, type, bindingType = 8201) {
  _LValParser_checkLVal(specifier.local, {
    type
  }, bindingType);
  return _Parser_finishNode_dynamic(specifier, type);
}
function _StatementParser_parseImportAttributes() {
  _UtilParser_expect(5);
  const attrs = [];
  const attrNames = new Set();
  do {
    if (_Tokenizer_match(8)) {
      break;
    }
    const node = _NodeUtils_startNode();
    const keyName = _Parser_this.state.value;
    if (attrNames.has(keyName)) {
      _Tokenizer_raise(Errors.ModuleAttributesWithDuplicateKeys, _Parser_this.state.startLoc, {
        key: keyName
      });
    }
    attrNames.add(keyName);
    if (_Tokenizer_match(134)) {
      node.key = _Parser_parseStringLiteral_dynamic(keyName);
    } else {
      node.key = _Parser_parseIdentifier_dynamic(true);
    }
    _UtilParser_expect(14);
    if (!_Tokenizer_match(134)) {
      throw _Tokenizer_raise(Errors.ModuleAttributeInvalidValue, _Parser_this.state.startLoc);
    }
    node.value = _Parser_parseStringLiteral_dynamic(_Parser_this.state.value);
    attrs.push(_Parser_finishNode_dynamic(node, "ImportAttribute"));
  } while (_Tokenizer_eat(12));
  _UtilParser_expect(8);
  return attrs;
}
function _StatementParser_parseModuleAttributes() {
  const attrs = [];
  const attributes = new Set();
  do {
    const node = _NodeUtils_startNode();
    node.key = _Parser_parseIdentifier_dynamic(true);
    if (node.key.name !== "type") {
      _Tokenizer_raise(Errors.ModuleAttributeDifferentFromType, node.key);
    }
    if (attributes.has(node.key.name)) {
      _Tokenizer_raise(Errors.ModuleAttributesWithDuplicateKeys, node.key, {
        key: node.key.name
      });
    }
    attributes.add(node.key.name);
    _UtilParser_expect(14);
    if (!_Tokenizer_match(134)) {
      throw _Tokenizer_raise(Errors.ModuleAttributeInvalidValue, _Parser_this.state.startLoc);
    }
    node.value = _Parser_parseStringLiteral_dynamic(_Parser_this.state.value);
    attrs.push(_Parser_finishNode_dynamic(node, "ImportAttribute"));
  } while (_Tokenizer_eat(12));
  return attrs;
}
function _StatementParser_maybeParseImportAttributes(node) {
  let attributes;
  {
    var useWith = false;
  }
  if (_Tokenizer_match(76)) {
    if (_UtilParser_hasPrecedingLineBreak() && _Tokenizer_lookaheadCharCode() === 40) {
      return;
    }
    _Tokenizer_next();
    if (_BaseParser_hasPlugin("moduleAttributes")) {
      attributes = _StatementParser_parseModuleAttributes();
      _UtilParser_addExtra(node, "deprecatedWithLegacySyntax", true);
    } else {
      attributes = _StatementParser_parseImportAttributes();
    }
    {
      useWith = true;
    }
  } else if (_UtilParser_isContextual(94) && !_UtilParser_hasPrecedingLineBreak()) {
    if (!_BaseParser_hasPlugin("deprecatedImportAssert") && !_BaseParser_hasPlugin("importAssertions")) {
      _Tokenizer_raise(Errors.ImportAttributesUseAssert, _Parser_this.state.startLoc);
    }
    if (!_BaseParser_hasPlugin("importAssertions")) {
      _UtilParser_addExtra(node, "deprecatedAssertSyntax", true);
    }
    _Tokenizer_next();
    attributes = _StatementParser_parseImportAttributes();
  } else {
    attributes = [];
  }
  if (!useWith && _BaseParser_hasPlugin("importAssertions")) {
    node.assertions = attributes;
  } else {
    node.attributes = attributes;
  }
}
function _StatementParser_maybeParseDefaultImportSpecifier(node, maybeDefaultIdentifier) {
  if (maybeDefaultIdentifier) {
    const specifier = _NodeUtils_startNodeAtNode(maybeDefaultIdentifier);
    specifier.local = maybeDefaultIdentifier;
    node.specifiers.push(_StatementParser_finishImportSpecifier(specifier, "ImportDefaultSpecifier"));
    return true;
  } else if (tokenIsKeywordOrIdentifier(_Parser_this.state.type)) {
    _Parser_parseImportSpecifierLocal_dynamic(node, _NodeUtils_startNode(), "ImportDefaultSpecifier");
    return true;
  }
  return false;
}
function _StatementParser_maybeParseStarImportSpecifier(node) {
  if (_Tokenizer_match(55)) {
    const specifier = _NodeUtils_startNode();
    _Tokenizer_next();
    _UtilParser_expectContextual(93);
    _Parser_parseImportSpecifierLocal_dynamic(node, specifier, "ImportNamespaceSpecifier");
    return true;
  }
  return false;
}
function _StatementParser_parseNamedImportSpecifiers(node) {
  let first = true;
  _UtilParser_expect(5);
  while (!_Tokenizer_eat(8)) {
    if (first) {
      first = false;
    } else {
      if (_Tokenizer_eat(14)) {
        throw _Tokenizer_raise(Errors.DestructureNamedImport, _Parser_this.state.startLoc);
      }
      _UtilParser_expect(12);
      if (_Tokenizer_eat(8)) break;
    }
    const specifier = _NodeUtils_startNode();
    const importedIsString = _Tokenizer_match(134);
    const isMaybeTypeOnly = _UtilParser_isContextual(130);
    specifier.imported = _StatementParser_parseModuleExportName();
    const importSpecifier = _Parser_parseImportSpecifier_dynamic(specifier, importedIsString, node.importKind === "type" || node.importKind === "typeof", isMaybeTypeOnly, undefined);
    node.specifiers.push(importSpecifier);
  }
}
function _StatementParser_parseImportSpecifier(specifier, importedIsString, isInTypeOnlyImport, isMaybeTypeOnly, bindingType) {
  if (_UtilParser_eatContextual(93)) {
    specifier.local = _Parser_parseIdentifier_dynamic();
  } else {
    const {
      imported
    } = specifier;
    if (importedIsString) {
      throw _Tokenizer_raise(Errors.ImportBindingIsString, specifier, {
        importName: imported.value
      });
    }
    _Parser_checkReservedWord_dynamic(imported.name, specifier.loc.start, true, true);
    if (!specifier.local) {
      specifier.local = _Parser_cloneIdentifier_dynamic(imported);
    }
  }
  return _StatementParser_finishImportSpecifier(specifier, "ImportSpecifier", bindingType);
}
function _StatementParser_isThisParam(param) {
  return param.type === "Identifier" && param.name === "this";
}
function _Parser_constructor(options, input, pluginsMap) {
  options = getOptions(options);
  _Tokenizer_constructor(options, input);
  _Parser_this.options = options;
  _UtilParser_initializeScopes();
  _Parser_this.plugins = pluginsMap;
  _Parser_this.filename = options.sourceFilename;
  _Parser_this.startIndex = options.startIndex;
  let optionFlags = 0;
  if (options.allowAwaitOutsideFunction) {
    optionFlags |= 1;
  }
  if (options.allowReturnOutsideFunction) {
    optionFlags |= 2;
  }
  if (options.allowImportExportEverywhere) {
    optionFlags |= 8;
  }
  if (options.allowSuperOutsideMethod) {
    optionFlags |= 16;
  }
  if (options.allowUndeclaredExports) {
    optionFlags |= 64;
  }
  if (options.allowNewTargetOutsideFunction) {
    optionFlags |= 4;
  }
  if (options.allowYieldOutsideFunction) {
    optionFlags |= 32;
  }
  if (options.ranges) {
    optionFlags |= 128;
  }
  if (options.tokens) {
    optionFlags |= 256;
  }
  if (options.createImportExpressions) {
    optionFlags |= 512;
  }
  if (options.createParenthesizedExpressions) {
    optionFlags |= 1024;
  }
  if (options.errorRecovery) {
    optionFlags |= 2048;
  }
  if (options.attachComment) {
    optionFlags |= 4096;
  }
  if (options.annexB) {
    optionFlags |= 8192;
  }
  _Parser_this.optionFlags = optionFlags;
}
function _Parser_getScopeHandler() {
  return ScopeHandler;
}
function _Parser_parse() {
  _UtilParser_enterInitialScopes();
  const file = _NodeUtils_startNode();
  const program = _NodeUtils_startNode();
  _Tokenizer_nextToken();
  file.errors = null;
  _Parser_parseTopLevel_dynamic(file, program);
  file.errors = _Parser_this.state.errors;
  file.comments.length = _Parser_this.state.commentsLen;
  return file;
}
function parse(input, options) {
  var _options;
  if (((_options = options) == null ? void 0 : _options.sourceType) === "unambiguous") {
    options = Object.assign({}, options);
    try {
      options.sourceType = "module";
      const parser = getParser(options, input);
      const ast = parser.parse();
      if (parser.sawUnambiguousESM) {
        return ast;
      }
      if (parser.ambiguousScriptDifferentAst) {
        try {
          options.sourceType = "script";
          return getParser(options, input).parse();
        } catch (_unused) {}
      } else {
        ast.program.sourceType = "script";
      }
      return ast;
    } catch (moduleError) {
      try {
        options.sourceType = "script";
        return getParser(options, input).parse();
      } catch (_unused2) {}
      throw moduleError;
    }
  } else {
    return getParser(options, input).parse();
  }
}
function parseExpression(input, options) {
  const parser = getParser(options, input);
  if (parser.options.strictMode) {
    parser.state.strict = true;
  }
  return parser.getExpression();
}
function generateExportedTokenTypes(internalTokenTypes) {
  const tokenTypes = {};
  for (const typeName of Object.keys(internalTokenTypes)) {
    tokenTypes[typeName] = getExportedToken(internalTokenTypes[typeName]);
  }
  return tokenTypes;
}
const tokTypes = generateExportedTokenTypes(tt);
function getParser(options, input) {
  let cls = Parser;
  const pluginsMap = new Map();
  if (options != null && options.plugins) {
    for (const plugin of options.plugins) {
      let name, opts;
      if (typeof plugin === "string") {
        name = plugin;
      } else {
        [name, opts] = plugin;
      }
      if (!pluginsMap.has(name)) {
        pluginsMap.set(name, opts || {});
      }
    }
    validatePlugins(pluginsMap);
    cls = getParserClass(pluginsMap);
  }
  return new cls(options, input, pluginsMap);
}
const parserClassCache = new Map();
function getParserClass(pluginsMap) {
  const pluginList = [];
  for (const name of mixinPluginNames) {
    if (pluginsMap.has(name)) {
      pluginList.push(name);
    }
  }
  const key = pluginList.join("|");
  let cls = parserClassCache.get(key);
  if (!cls) {
    cls = Parser;
    for (const plugin of pluginList) {
      cls = mixinPlugins[plugin](cls);
    }
    parserClassCache.set(key, cls);
  }
  return cls;
}
export { parse, parseExpression, tokTypes };
