// Options: --template-literals=false
// Error: :5:1: Unexpected token `
// Error: :9:5: Unexpected token `

`abc`;

function tag() {}

tag `def`;
