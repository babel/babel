// See https://github.com/babel/babel/pull/14025#issuecomment-986296424
// for the reason behind using setTimeout.
setTimeout(() => console.log("foo"), 50);
