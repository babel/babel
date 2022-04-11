type BabelFileModulesMetadata = {
  imports: Array<Object>,
  exports: {
    exported: Array<Object>,
    specifiers: Array<Object>
  }
};

type BabelFileMetadata = {
  usedHelpers: Array<string>;

  marked: Array<{
    type: string;
    message: string;
    loc: Object;
  }>;

  modules: BabelFileModulesMetadata
};

type BabelFileResult = {
  ast?: ?Object;
  code?: ?string;
  map?: ?Object;
  ignored?: ?boolean;
  metadata?: ?BabelFileMetadata;
};
