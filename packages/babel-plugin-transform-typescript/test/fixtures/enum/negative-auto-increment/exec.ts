enum A { D = -4, B }
enum G { D = -4, B = G.D, C }
enum H { D = 1, B = H.D - 5, C }

expect(A.B).toBe(-3);
expect(G.C).toBe(-3);
expect(H.C).toBe(-3);
expect(H[-3]).toBe("C");
