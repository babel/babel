expect("\u2029".length).toBe(1);
expect("\u2029").toBe("\u2029");


expect("before after".length).toBe(12);
expect("before after").toBe("before\u2029after");
//            ^ That's a U+2029 PARAGRAPH SEPARATOR UTF-16 char (between 'before' and 'after')

expect(" ".length).toBe(1);
expect(" ").toBe("\u2029");
//      ^ That's a U+2029 PARAGRAPH SEPARATOR UTF-16 char

expect("\ ".length).toBe(0);
expect("\ ").toBe("");
//       ^ That's a U+2029 PARAGRAPH SEPARATOR UTF-16 char

expect("\\ ".length).toBe(2);
expect("\\ ").toBe("\\\u2029");
//        ^ That's a U+2029 PARAGRAPH SEPARATOR UTF-16 char

expect("\\\ ".length).toBe(1);
expect("\\\ ").toBe("\\");
//         ^ That's a U+2029 PARAGRAPH SEPARATOR UTF-16 char

expect("\\\\ ".length).toBe(3);
expect("\\\\ ").toBe("\\\\\u2029");
//          ^ That's a U+2029 PARAGRAPH SEPARATOR UTF-16 char
