// These parentheses should be reserved
(a?.b()!)`foo`;
(a?.b<c>)`foo`;

// These parentheses can be stripped
a.b()!`foo`;
a.b<c>`foo`;