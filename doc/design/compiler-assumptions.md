# Compiler assumptions

Babel and its associated official transforms make some assumptions about your code. These
assumptions are only made as they're either **impossible** to take into consideration or
are extremely exotic.

 - `undefined`, `NaN` and `Infinity` have not been externally redefined.
 - Built-in objects such as `Object`, `Array`, `String`, `Number`, `Boolean` etc have not been redefined.
 - Standard methods on built-ins have not been redefined in a way that breaks the original contract.
