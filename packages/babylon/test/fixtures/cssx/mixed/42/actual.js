var styles = cssx(
  {{
    sizes
      .filter(size => size !== false)
      .map(size => {
        return size !== false ? 's' + size : '';
      })
      .join('-');
  }} {
    some-property: " ";
    blah: ' ';
    size: 10px;
  }
);