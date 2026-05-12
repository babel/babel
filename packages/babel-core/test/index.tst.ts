import { expect, it, describe } from "tstyche";
import { transformSync } from "../src/index.ts";
import type presetEnv from "@babel/preset-env";
import type presetReact from "@babel/preset-react";
import type presetTypescript from "@babel/preset-typescript";
import type presetFlow from "@babel/preset-flow";
import type pluginExternalHelpers from "@babel/plugin-external-helpers";
import type pluginProposalDecorators from "@babel/plugin-proposal-decorators";
import type pluginProposalDiscardBinding from "@babel/plugin-proposal-discard-binding";
import type pluginProposalPipelineOperator from "@babel/plugin-proposal-pipeline-operator";
import type pluginTransformArrowFunctions from "@babel/plugin-transform-arrow-functions";
import type pluginTransformAsyncToGenerator from "@babel/plugin-transform-async-to-generator";
import type pluginTransformBlockScoping from "@babel/plugin-transform-block-scoping";
import type pluginTransformClasses from "@babel/plugin-transform-classes";
import type pluginTransformComputedProperties from "@babel/plugin-transform-computed-properties";
import type pluginTransformDestructuring from "@babel/plugin-transform-destructuring";
import type pluginTransformDuplicateNamedCapturingGroupsRegex from "@babel/plugin-transform-duplicate-named-capturing-groups-regex";
import type pluginTransformFlowStripTypes from "@babel/plugin-transform-flow-strip-types";
import type pluginTransformForOf from "@babel/plugin-transform-for-of";
import type pluginTransformJsonModules from "@babel/plugin-transform-json-modules";
import type pluginTransformModulesAmd from "@babel/plugin-transform-modules-amd";
import type pluginTransformModulesCommonjs from "@babel/plugin-transform-modules-commonjs";
import type pluginTransformModulesSystemjs from "@babel/plugin-transform-modules-systemjs";
import type pluginTransformModulesUmd from "@babel/plugin-transform-modules-umd";
import type pluginTransformNamedCapturingGroupsRegex from "@babel/plugin-transform-named-capturing-groups-regex";
import type pluginTransformNullishCoalescingOperator from "@babel/plugin-transform-nullish-coalescing-operator";
import type pluginTransformObjectRestSpread from "@babel/plugin-transform-object-rest-spread";
import type pluginTransformOptionalChaining from "@babel/plugin-transform-optional-chaining";
import type pluginTransformParameters from "@babel/plugin-transform-parameters";
import type pluginTransformPrivateMethods from "@babel/plugin-transform-private-methods";
import type pluginTransformPrivatePropertyInObject from "@babel/plugin-transform-private-property-in-object";
import type pluginTransformReactConstantElements from "@babel/plugin-transform-react-constant-elements";
import type pluginTransformReactJsx from "@babel/plugin-transform-react-jsx";
import type pluginTransformReactJsxDevelopment from "@babel/plugin-transform-react-jsx-development";
import type pluginTransformRuntime from "@babel/plugin-transform-runtime";
import type pluginTransformSpread from "@babel/plugin-transform-spread";
import type pluginTransformTemplateLiterals from "@babel/plugin-transform-template-literals";
import type pluginTransformTypescript from "@babel/plugin-transform-typescript";
import type pluginTransformUnicodePropertyRegex from "@babel/plugin-transform-unicode-property-regex";

describe("core", () => {
  it("plugin api param", () => {
    transformSync("", {
      plugins: [
        function (api) {
          expect(api).type.toHaveProperty("types");
          return {};
        },
      ],
    });
  });
});

describe("options of all packages", () => {
  type ExtractOptionsKeys<T extends (...args: any) => any> =
    keyof Parameters<T>[1];

  it("presets", () => {
    expect<ExtractOptionsKeys<typeof presetEnv>>().type.toBe<
      | "configPath"
      | "corejs"
      | "debug"
      | "exclude"
      | "forceAllTransforms"
      | "ignoreBrowserslistConfig"
      | "include"
      | "modules"
      | "shippedProposals"
      | "targets"
      | "useBuiltIns"
      | "browserslistEnv"
    >();
    expect<ExtractOptionsKeys<typeof presetReact>>().type.toBe<
      | "development"
      | "developmentSourceSelf"
      | "importSource"
      | "pragma"
      | "pragmaFrag"
      | "pure"
      | "runtime"
      | "throwIfNamespace"
    >();
    expect<ExtractOptionsKeys<typeof presetTypescript>>().type.toBe<
      | "ignoreExtensions"
      | "allowNamespaces"
      | "disallowAmbiguousJSXLike"
      | "jsxPragma"
      | "jsxPragmaFrag"
      | "onlyRemoveTypeImports"
      | "optimizeConstEnums"
      | "rewriteImportExtensions"
    >();
    expect<ExtractOptionsKeys<typeof presetFlow>>().type.toBe<
      "all" | "ignoreExtensions" | "experimental_useHermesParser"
    >();
  });

  it("plugins", () => {
    expect<ExtractOptionsKeys<typeof pluginExternalHelpers>>().type.toBe<
      "helperVersion" | "allowlist"
    >();
    expect<
      ExtractOptionsKeys<typeof pluginProposalDecorators>
    >().type.toBe<"version">();
    expect<
      ExtractOptionsKeys<typeof pluginProposalDiscardBinding>
    >().type.toBe<"syntaxType">();
    expect<
      ExtractOptionsKeys<typeof pluginProposalPipelineOperator>
    >().type.toBe<"proposal" | "topicToken">();
    expect<
      ExtractOptionsKeys<typeof pluginTransformArrowFunctions>
    >().type.toBe<"spec">();
    expect<
      ExtractOptionsKeys<typeof pluginTransformAsyncToGenerator>
    >().type.toBe<"method" | "module">();
    expect<ExtractOptionsKeys<typeof pluginTransformBlockScoping>>().type.toBe<
      "tdz" | "throwIfClosureRequired"
    >();
    expect<
      ExtractOptionsKeys<typeof pluginTransformClasses>
    >().type.toBe<"loose">();
    expect<
      ExtractOptionsKeys<typeof pluginTransformComputedProperties>
    >().type.toBe<"loose">();
    expect<ExtractOptionsKeys<typeof pluginTransformDestructuring>>().type.toBe<
      "allowArrayLike" | "loose" | "useBuiltIns"
    >();
    expect<
      ExtractOptionsKeys<
        typeof pluginTransformDuplicateNamedCapturingGroupsRegex
      >
    >().type.toBe<"runtime">();
    expect<
      ExtractOptionsKeys<typeof pluginTransformFlowStripTypes>
    >().type.toBe<"requireDirective">();
    expect<ExtractOptionsKeys<typeof pluginTransformForOf>>().type.toBe<
      "allowArrayLike" | "assumeArray" | "loose"
    >();
    expect<
      ExtractOptionsKeys<typeof pluginTransformJsonModules>
    >().type.toBe<"uncheckedRequire">();
    expect<ExtractOptionsKeys<typeof pluginTransformModulesAmd>>().type.toBe<
      | "allowTopLevelThis"
      | "importInterop"
      | "loose"
      | "noInterop"
      | "strict"
      | "strictMode"
      | "moduleId"
      | "moduleIds"
      | "getModuleId"
      | "moduleRoot"
    >();
    expect<
      ExtractOptionsKeys<typeof pluginTransformModulesCommonjs>
    >().type.toBe<
      | "strictMode"
      | "allowTopLevelThis"
      | "allowCommonJSExports"
      | "importInterop"
      | "lazy"
      | "loose"
      | "mjsStrictNamespace"
      | "noInterop"
      | "strict"
      | "strictNamespace"
      | "moduleId"
      | "moduleIds"
      | "getModuleId"
      | "moduleRoot"
    >();
    expect<
      ExtractOptionsKeys<typeof pluginTransformModulesSystemjs>
    >().type.toBe<
      | "allowTopLevelThis"
      | "systemGlobal"
      | "moduleId"
      | "moduleIds"
      | "getModuleId"
      | "moduleRoot"
    >();
    expect<ExtractOptionsKeys<typeof pluginTransformModulesUmd>>().type.toBe<
      | "allowTopLevelThis"
      | "exactGlobals"
      | "globals"
      | "importInterop"
      | "loose"
      | "noInterop"
      | "strict"
      | "strictMode"
      | "moduleId"
      | "moduleIds"
      | "getModuleId"
      | "moduleRoot"
    >();
    expect<
      ExtractOptionsKeys<typeof pluginTransformNamedCapturingGroupsRegex>
    >().type.toBe<"runtime">();
    expect<
      ExtractOptionsKeys<typeof pluginTransformNullishCoalescingOperator>
    >().type.toBe<"loose">();
    expect<
      ExtractOptionsKeys<typeof pluginTransformObjectRestSpread>
    >().type.toBe<"useBuiltIns" | "loose">();
    expect<
      ExtractOptionsKeys<typeof pluginTransformOptionalChaining>
    >().type.toBe<"loose">();
    expect<
      ExtractOptionsKeys<typeof pluginTransformParameters>
    >().type.toBe<"loose">();
    expect<
      ExtractOptionsKeys<typeof pluginTransformPrivateMethods>
    >().type.toBe<"loose">();
    expect<
      ExtractOptionsKeys<typeof pluginTransformPrivatePropertyInObject>
    >().type.toBe<"loose">();
    expect<
      ExtractOptionsKeys<typeof pluginTransformReactConstantElements>
    >().type.toBe<"allowMutablePropsOnTags">();
    expect<ExtractOptionsKeys<typeof pluginTransformReactJsx>>().type.toBe<
      | "filter"
      | "importSource"
      | "pragma"
      | "pragmaFrag"
      | "pure"
      | "runtime"
      | "throwIfNamespace"
    >();
    expect<
      ExtractOptionsKeys<typeof pluginTransformReactJsxDevelopment>
    >().type.toBe<
      | "filter"
      | "importSource"
      | "pragma"
      | "pragmaFrag"
      | "pure"
      | "runtime"
      | "sourceSelf"
      | "throwIfNamespace"
    >();
    expect<ExtractOptionsKeys<typeof pluginTransformRuntime>>().type.toBe<
      "absoluteRuntime" | "corejs" | "helpers" | "version" | "moduleName"
    >();
    expect<ExtractOptionsKeys<typeof pluginTransformSpread>>().type.toBe<
      "allowArrayLike" | "loose"
    >();
    expect<
      ExtractOptionsKeys<typeof pluginTransformTemplateLiterals>
    >().type.toBe<"loose">();
    expect<ExtractOptionsKeys<typeof pluginTransformTypescript>>().type.toBe<
      | "allowNamespaces"
      | "jsxPragma"
      | "jsxPragmaFrag"
      | "onlyRemoveTypeImports"
      | "optimizeConstEnums"
      | "disallowAmbiguousJSXLike"
      | "dts"
      | "isTSX"
    >();
    expect<
      ExtractOptionsKeys<typeof pluginTransformUnicodePropertyRegex>
    >().type.toBe<"useUnicodeFlag">();
  });
});
