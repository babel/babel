import v8 from "v8";

export default function cloneDeep(value) {
  return v8.deserialize(v8.serialize(value));
}
