import React from "react";
import {getForm} from "./store";

export default class Login extends React.Component {
  getForm() {
    return getForm().toJS()
  }
}
