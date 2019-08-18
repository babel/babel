expect(/^\p{Unified_Ideograph}.$/u.test('中\n')).toBe(false);
expect(/^\p{Unified_Ideograph}.$/us.test('中\n')).toBe(true);
