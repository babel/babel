cssx(.cards article::after, 
.cards article::before {
  content: " ";
  position: absolute;
  display: block;
  width: 1em;
  height: 1em;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
})