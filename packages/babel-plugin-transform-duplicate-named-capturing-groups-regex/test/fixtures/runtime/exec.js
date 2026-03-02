let regexp = /(?<named>a)|(?<named>b)|c/;

expect("a".match(regexp).groups).toEqual({ named: "a" });
expect("b".match(regexp).groups).toEqual({ named: "b" });
expect("c".match(regexp).groups).toEqual({ named: undefined });
