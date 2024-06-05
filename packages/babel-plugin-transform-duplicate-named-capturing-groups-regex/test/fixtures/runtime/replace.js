let regexp = /(?<named>a)|(?<named>b)|c/;

expect("a".replace(regexp, "[$<named>]")).toEqual("[a]");
expect("b".replace(regexp, "[$<named>]")).toEqual("[b]");
expect("c".replace(regexp, "[$<named>]")).toEqual("[]");
