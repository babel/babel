class ListBuffer extends ArrayBuffer {}

expect(new ListBuffer).toBeInstanceOf(ListBuffer);
expect(new ListBuffer).toBeInstanceOf(ArrayBuffer);
