const a = (x: mixed): boolean // 1
%checks => !!x;

const b = (x: mixed): boolean /* 2
*/ %checks => !!x;
