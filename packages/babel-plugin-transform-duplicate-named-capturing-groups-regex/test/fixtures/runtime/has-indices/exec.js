let regexp = /(?<named>a)|(?<named>b)|c/d;

expect("a".match(regexp).indices.groups).toEqual({ named: [0, 1] });
expect("b".match(regexp).indices.groups).toEqual({ named: [0, 1] });
expect("c".match(regexp).indices.groups).toEqual({ named: undefined });
