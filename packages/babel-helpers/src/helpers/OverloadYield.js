/* @minVersion 7.18.14 */

/*
 * 'kind' is an enum:
 *   0 => This yield was an await expression
 *   1 => This yield comes from yield*
 */
export default function _OverloadYield(value, kind) {
  this.v = value;
  this.k = kind;
}
