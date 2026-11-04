(<any>x) = y;
(<any>obj.value) += y;
(<any>values[index]) ??= y;
({ value: (<any>x) = y } = source);
[(<any>x) = y] = values;
x = <any>y;
({ value: x = <any>y } = source);
for (<any>x in source) {}
for (<any>x of values) {}
