let log = [];
log.push("start");
case ((log.push("top"), 1)) {
  when 0 -> log.push(0);
  when 1 -> log.push(1);
  when 2 -> log.push(2);
}
log.push("end");
expect(log).toEqual(["start", "top", 1, "end"]);
