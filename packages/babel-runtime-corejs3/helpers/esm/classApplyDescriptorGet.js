export default function _classApplyDescriptorGet(e, t) {
  return t.get ? t.get.call(e) : t.value;
}