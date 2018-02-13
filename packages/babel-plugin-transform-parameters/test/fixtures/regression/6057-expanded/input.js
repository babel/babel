import { Component } from "react";
import args from "utils/url/args";

export default class App extends Component {
  exportType = ""

  componentDidMount() {
    this.exportType = args.get("type", window.location.href);
  }
}
