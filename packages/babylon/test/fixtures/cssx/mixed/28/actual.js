var styles = (
  body {
    font-size: 20px;
    line-height: 40px;
  }
  body input[name="username"] {
    border-solid: 2px;
  }
  @media screen and (max-width: 1000px) and (min-width: 700px) {
    ul li a:before {
      content: "Email: ";
      font-style: italic;
      color: #666666;
    }
    body {
      font-size: 12px;
      line-height: 30px;
    }
    body input[name="username"] {
      padding-left: 20px;
    }
  }
);