import events from "events";

class Template {
  events() {
    return events;
  }
}

console.log(new Template().events());
