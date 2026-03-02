import props from "props";

console.log(props);

(function(){
  const { ...props } = this.props;

  console.log(props);
})();
