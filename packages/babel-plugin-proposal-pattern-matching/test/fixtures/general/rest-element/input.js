
case (input) {
  when [1, 2, ...rest] -> console.log('rest: ', rest);
  when [1, 2, 3, ...{ length }] -> console.log('length of rest', length);
  when [1, 2, 3, ...{ length: restLength }] -> console.log('length of rest', restLength);
}
