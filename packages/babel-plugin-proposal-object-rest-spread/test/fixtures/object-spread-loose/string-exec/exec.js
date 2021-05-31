expect([...'']).toHaveLength(0);
expect([...'abc']).toHaveLength(3);
expect([...'def']).toMatchObject(['d','e','f']);
