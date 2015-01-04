// Options: --block-binding
// Error: :5:13: const variables must have an initializer

var i = 0;
for (const x; i < 3; i++) {

}
