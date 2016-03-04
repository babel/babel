var body = cssx(
  @media print and (max-width: 200px) {
  body { 
    margin: 30px;
  }
);
body.nested('p', { a: 1 });