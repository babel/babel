import convertTemplateType from "./convertTemplateType";
import convertToken from "./convertToken";

export default function(tokens, tt, code) {
  return convertTemplateType(tokens, tt)
    .filter(t => t.type !== "CommentLine" && t.type !== "CommentBlock")
    .map(t => convertToken(t, tt, code));
}
