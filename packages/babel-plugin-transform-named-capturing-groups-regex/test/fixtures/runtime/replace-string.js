var re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

var result = "2015-10-31".replace(re, "$<day>/$<month>/$<year>")

expect(result).toBe("31/10/2015");
