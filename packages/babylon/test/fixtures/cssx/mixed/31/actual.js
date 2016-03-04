var MyStyles = function () {
  return {
    header: cssx(
      .header {
        margin-top: 20px;
        padding: .1em;
      }
    ),
    footer: cssx(
      .footer {
        font-size: 10px;
        transform: scaleY(.5);
      }
      @media screen and (min-width: 400px) {
        .footer {
          font-size: 12px;
        }
      }
      .footer small {
        font-size: 8px;
      }
    )
  }
};

console.log(MyStyles().header);