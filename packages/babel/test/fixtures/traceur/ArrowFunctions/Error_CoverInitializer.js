// Error: :4:16: Unexpected token =

function f() {
  ({a = (0, {a = 0})} = {})
}
