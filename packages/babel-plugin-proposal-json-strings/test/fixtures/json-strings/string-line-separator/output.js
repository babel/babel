expect("\u2028".length).toBe(1);
expect("\u2028").toBe("\u2028");
expect("before\u2028after".length).toBe(12);
expect("before\u2028after").toBe("before\u2028after");
//            ^ That's a U+2028 LINE SEPARATOR UTF-16 char (between 'before' and 'after')
expect("\u2028".length).toBe(1);
expect("\u2028").toBe("\u2028");
//      ^ That's a U+2028 LINE SEPARATOR UTF-16 char
expect("\ ".length).toBe(0);
expect("\ ").toBe("");
//       ^ That's a U+2028 LINE SEPARATOR UTF-16 char
expect("\\\u2028".length).toBe(2);
expect("\\\u2028").toBe("\\\u2028");
//        ^ That's a U+2028 LINE SEPARATOR UTF-16 char
expect("\\\ ".length).toBe(1);
expect("\\\ ").toBe("\\");
//         ^ That's a U+2028 LINE SEPARATOR UTF-16 char
expect("\\\\\u2028".length).toBe(3);
expect("\\\\\u2028").toBe("\\\\\u2028"); //          ^ That's a U+2028 LINE SEPARATOR UTF-16 char
