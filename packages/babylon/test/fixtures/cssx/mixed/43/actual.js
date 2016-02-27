var getTitleStyle = function (type, size) {
  return cssx(
    .{{type}}-title {
      font-size: {{size}}px;
    }
  );
};

cssx(

@media screen and (min-width: {{ minWidthForMediaQuery }}px) {

{{a().reduce(b)}} {
  {{getProperty();}}: {{a + b / c}}%;
}

}

)

cssx(

@media screen and (min-width: {{minWidthForMediaQuery}}px) {

something else {{a().reduce(b)}} and here {
  weird-property-{{ getProperty();}}-here: and weird value {{a + b / c}}% here;
}

}

)