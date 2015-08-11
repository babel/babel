// Error: :9:5: Switch statements may have at most one 'default' clause

(function() {
  switch (42) {
    case 1:
      return;
    default:
      return;
    default:
      return;
  }
});
