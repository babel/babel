/(?:[\0-JL-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF])/.test(string);
/(?:[\0-jl-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF])/.test(string);
/(?:[\0-\u2129\u212B-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF])/.test(string);
/(?:(?![K\u212A\uD800-\uDFFF])[\s\S]|[\uD800-\uDBFF][\uDC00-\uDFFF])/i.test(string);
/(?:(?![k\u212A\uD800-\uDFFF])[\s\S]|[\uD800-\uDBFF][\uDC00-\uDFFF])/i.test(string);
/(?:(?![K\u212A\uD800-\uDFFF])[\s\S]|[\uD800-\uDBFF][\uDC00-\uDFFF])/i.test(string);
