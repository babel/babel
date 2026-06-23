import type {
  buildExternalHelpers as buildExternalHelpers$1,
  PluginObject,
  PresetObject,
  InputOptions,
  transformFromAstSync,
  transformFromAstAsync as transformFromAstAsync$1,
  FileResult,
} from "@babel/core";
import * as generator from "@babel/generator";
import * as parser from "@babel/parser";
import * as template from "@babel/template";
import * as traverse from "@babel/traverse";
import * as types from "@babel/types";

declare namespace Babel {
  namespace packages {
    export { generator, parser, template, traverse, types };
  }
  const availablePlugins: Record<string, any>;
  const availablePresets: Record<
    | "env"
    | "es2015"
    | "es2016"
    | "es2017"
    | "react"
    | "stage-0"
    | "stage-1"
    | "stage-2"
    | "stage-3"
    | "es2015-loose"
    | "es2015-no-commonjs"
    | "typescript"
    | "flow",
    any
  >;
  function transform(code: string, options: InputOptions): FileResult | null;
  function transformAsync(
    code: string,
    options: InputOptions
  ): Promise<FileResult | null>;
  function transformFromAst(
    ast: Parameters<typeof transformFromAstSync>[0],
    code: string,
    options: InputOptions
  ): FileResult | null;
  function transformFromAstAsync(
    ast: Parameters<typeof transformFromAstAsync$1>[0],
    code: string,
    options: InputOptions
  ): Promise<FileResult | null>;
  const buildExternalHelpers: typeof buildExternalHelpers$1;
  /**
   * Registers a named plugin for use with Babel.
   */
  function registerPlugin(name: string, plugin: () => PluginObject): void;
  /**
   * Registers multiple plugins for use with Babel. `newPlugins` should be an object where the key
   * is the name of the plugin, and the value is the plugin itself.
   */
  function registerPlugins(
    newPlugins: Record<string, () => PluginObject>
  ): void;
  /**
   * Registers a named preset for use with Babel.
   */
  function registerPreset(name: string, preset: () => PresetObject): void;
  /**
   * Registers multiple presets for use with Babel. `newPresets` should be an object where the key
   * is the name of the preset, and the value is the preset itself.
   */
  function registerPresets(
    newPresets: Record<string, () => PresetObject>
  ): void;
  const version: string;
  /**
   * Transform <script> tags with "text/babel" type.
   * @param {Array} scriptTags specify script tags to transform, transform all in the <head> if not given
   */
  function transformScriptTags(
    scriptTags?: HTMLCollectionOf<HTMLScriptElement>
  ): void;
  /**
   * Disables automatic transformation of <script> tags with "text/babel" type.
   */
  function disableScriptTags(): void;
}

export = Babel;
