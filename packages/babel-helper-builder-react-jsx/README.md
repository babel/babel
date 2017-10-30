# @babel/helper-builder-react-jsx

## Usage

```javascript
type ElementState = {
  tagExpr: Object; // tag node
  tagName: string; // raw string tag name
  args: Array<Object>; // array of call arguments
  call?: Object; // optional call property that can be set to override the call expression returned
};

require("@babel/helper-builder-react-jsx")({
  filter: function (element: JSXElement) {
    // if returns false, the element isn't transformed
  },

  pre: function (state: ElementState) {
    // function called with (state: ElementState) before building attribs
  },

  post: function (state: ElementState) {
    // function called with (state: ElementState) after building attribs
  },

  compat?: boolean // true if React is in compat mode
});
```
