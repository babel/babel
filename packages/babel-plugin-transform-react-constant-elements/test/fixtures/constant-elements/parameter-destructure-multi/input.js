function render({ text, className, id }) {
  return () => (<Component text={text} className={className} id={id} />);
}
