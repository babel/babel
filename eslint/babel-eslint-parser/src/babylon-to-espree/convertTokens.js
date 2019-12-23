import convertTemplateType from "./convertTemplateType";
import convertToken from "./convertToken";

export default function(tokens, code) {
  return convertTemplateType(tokens)
    .filter(t => t.type !== "CommentLine" && t.type !== "CommentBlock")
    .map(t => convertToken(t, code));
}
