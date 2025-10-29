import type * as ts from "typescript";

export namespace TestCaseParser {
  /** all the necessary information to set the right compiler settings */
  export interface CompilerSettings {
    [name: string]: string;
  }

  /** All the necessary information to turn a multi file test into useful units for later compilation */
  export interface TestUnitData {
    content: string;
    name: string;
    fileOptions: any;
    originalFilePath: string;
    references: string[];
  }

  export interface TestCaseContent {
    settings: CompilerSettings;
    testUnitData: TestUnitData[];
    tsConfig: ts.ParsedCommandLine | undefined;
    tsConfigFileUnitData: TestUnitData | undefined;
    symlinks?: any;
  }
  /** Given a test file containing // @FileName directives, return an array of named units of code to be added to an existing compiler instance */
  export function makeUnitsFromTest(
    code: string,
    fileName: string,
    settings?: CompilerSettings
  ): TestCaseContent;
}
