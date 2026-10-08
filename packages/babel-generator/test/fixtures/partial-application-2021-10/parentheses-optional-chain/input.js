// The following parentheses should be kept
(a?.b)~(?);
(a?.())~(?);
(a?.~())~(?);
(a?.b~())~(?);

(a?.~())();
(a?.~()).b;
(a?.~())[b];
(a?.~())`c`;
(a?.b~())`c`;

// The following parentheses can be removed
(a?.~())?.();
(a?.~())?.b;
(a?.~())?.~();
(a?.b)?.~();
