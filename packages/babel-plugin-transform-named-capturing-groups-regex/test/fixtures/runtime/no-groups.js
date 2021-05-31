var re = /no-groups-\(?<looks-like-a-group>looks\)/;
var result = re.exec("no-groups-(<looks-like-a-group>looks)")

expect(result.groups).toBeUndefined();
