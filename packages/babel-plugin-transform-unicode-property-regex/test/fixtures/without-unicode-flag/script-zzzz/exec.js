expect(/\p{Script=Zzzz}/u.test("\uD800")).toBe(true);

expect(/\p{Script_Extensions=Unknown}/u.test("\u{80000}")).toBe(true);
