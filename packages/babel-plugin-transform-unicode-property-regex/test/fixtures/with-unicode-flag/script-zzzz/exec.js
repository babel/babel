// Surrogate code points
expect(/\p{Script=Zzzz}/u.test("\uD800")).toBe(true);

// Unassigned code points
expect(/\p{Script_Extensions=Unknown}/u.test("\u{80000}")).toBe(true);

// Private Use Area code points
expect(/\p{Script_Extensions=Zzzz}/u.test("\uE800")).toBe(true);
