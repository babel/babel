// Skip. Not implemented.
// Only in browser.

class CustomButton extends HTMLButtonElement {
  constructor() {
    this.value = 'Custom Button';
  }
}

class CustomSelect extends HTMLSelectElement {}
class CustomInput extends HTMLInputElement {}
class CustomDiv extends HTMLDivElement {}
class CustomUIEvent extends UIEvent {}
// class CustomSpan extends HTMLSpanElement {}
class CustomTableRow extends HTMLTableRowElement {}
class CustomHeading extends HTMLHeadingElement {}
class CustomElement extends HTMLElement {}
class CustomUList extends HTMLUListElement {}
class CustomLI extends HTMLLIElement {}
class CustomMenu extends HTMLMenuElement {}
class CustomTextArea extends HTMLTextAreaElement {}

// ----------------------------------------------------------------------------

var button = new CustomButton();
document.body.appendChild(button);
document.body.appendChild(new CustomSelect());
document.body.appendChild(new CustomInput());
document.body.appendChild(new CustomDiv());
// document.body.appendChild(new CustomSpan());
document.body.appendChild(new CustomTableRow());
document.body.appendChild(new CustomHeading());
document.body.appendChild(new CustomElement());
document.body.appendChild(new CustomUList());
document.body.appendChild(new CustomLI());
document.body.appendChild(new CustomMenu());
document.body.appendChild(new CustomTextArea());

// TODO(rnystrom): Test these.
