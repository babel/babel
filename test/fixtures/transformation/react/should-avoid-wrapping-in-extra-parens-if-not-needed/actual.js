var x = <div>
  <Component />
</div>;

var x = <div>
  {this.props.children}
</div>;

var x = <Composite>
  {this.props.children}
</Composite>;

var x = <Composite>
  <Composite2 />
</Composite>;
