import { declare } from "@babel/helper-plugin-utils";
import proposalClassProperties from '@babel/plugin-proposal-class-properties';
import proposalDecorators from '@babel/plugin-proposal-decorators';
import transformRegenerator from '@babel/plugin-transform-regenerator';
import transformClasses from '@babel/plugin-transform-classes';


export default declare((api, opts) => {
  api.assertVersion(7);

  return {
    plugins: [
      transformClasses,
      [
        transformRegenerator,
        { asyncGenerators: false },
      ],
      [
        proposalClassProperties,
        { loose: true },
      ],
      [
        proposalDecorators,
        { legacy: true },
      ],
    ].filter(Boolean),
  };
});
