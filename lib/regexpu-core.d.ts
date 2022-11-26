declare module "regexpu-core" {
  type RegexpuOptions = {
    unicodeFlag?: "transform" | false;
    unicodeSetsFlag?: "transform" | "parse" | false;
    dotAllFlag?: "transform" | false;
    unicodePropertyEscapes?: "transform" | false;
    namedGroups?: "transform" | false;
    onNamedGroup?: (name: string, index: number) => void;
    modifiers?: "transform" | false;
    onNewFlags?: (name: string) => void;
  };
  function rewritePattern(
    pattern: string,
    flags: string,
    options: RegexpuOptions
  ): string;
  export default rewritePattern;
  export { RegexpuOptions };
}
