function render({ text, className, id, ...props }) {
  return () => (<Component text={text} className={className} id={id} {...props} />);
}
