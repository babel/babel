var object = {
  list: [],

  append: function(...items) {
    this.list.push(...items);
  }
};

object.append(1, 2, ...[3, 4]);
expect(object.list).toEqual([1, 2, 3, 4]);
