const regex = /<(?<tag>\d)+>.*?<\/\k<tag>>/su;

const result = regex.exec('<0>xxx\nyyy</0>');

expect(result.groups).toEqual({
  tag: "0"
});
