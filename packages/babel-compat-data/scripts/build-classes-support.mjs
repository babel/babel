import browserCompatData from "@mdn/browser-compat-data" with { type: "json" };
import { generateModuleSupport } from "./build-modules-support.mjs";
import { writeFile } from "./utils-build-data.mjs";

const publicClassFields = generateModuleSupport(
  browserCompatData.javascript.classes.public_class_fields,
  false
);
// todo: restore deno support when browserslist recognizes deno
delete publicClassFields.deno;

writeFile(
  { public_class_fields: publicClassFields },
  new URL(
    "../../babel-helper-create-class-features-plugin/data/compat.json",
    import.meta.url
  ),
  "public class fields"
);
