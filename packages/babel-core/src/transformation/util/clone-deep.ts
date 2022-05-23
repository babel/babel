import v8 from "v8";
import cloneDeep from "lodash.clonedeep";
import semver from "semver";

export default function (value) {
  if (
    v8.deserialize &&
    v8.serialize &&
    semver.satisfies(process.versions.node, ">=18.2.0")
  ) {
    return v8.deserialize(v8.serialize(value));
  }
  return cloneDeep(value);
}
