<h1 align="center">Welcome to kluntje👋</h1>
<p>
  <a href="LICENSE.md" target="_blank">
    <img alt="License: (Apache)" src="https://img.shields.io/badge/License-Apache_2.0-yellow.svg" />
  </a>
</p>

Kluntje is a javascript library that brings webcomponents to the next level. Take a look and make webcomponents development a breeze.

## 🚀 Why Kluntje?

Kluntje is the right tool if you want to use webcompoent with the feeling of a modern javascript framework. It suits good to CMS project and works with every JS framework.

*  It can hydrate existing (server-side rendered) markup and does not require to render client-side (although it can)
*  It does not force you to use shadow-dom (but you can)
*  It has states and customizable state-reactions
*  It adds helpful lifecycle hooks
*  It is < 3Kb

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes. 


## Install

Get the project up and running is pretty straight forward:

```sh
npm install @kluntje/core
```

And you are done.

## Usage

Import the Kluntje core component in your js file and you can start using it:

```javascript
import { Component } from "@kluntje/Core";

class MyAmazingComponent extends Component {
    
}

customElements.define("my-amazing-component", MyAmazingComponent);
```

And use it in your HTML file:

```html
<my-amazing-component></my-amazing-component>
```

### How our components looks like

Klutje-Components are defined as classes which extend from our core-component. Functionality can be in multiple ways:

*  of course you can always add properties and methods to your class 
*  you can also provide a constructor object to add all kinds features
*  additionally you can use a set of decorators to easily connect to DOM-Elements, attributes etc.

For further documentatation see [core](https://github.com/kluntje/kluntje/tree/master/packages/core), [services](https://github.com/kluntje/kluntje/tree/master/packages/services) and [js-utils](https://github.com/kluntje/kluntje/tree/master/packages/js-utils).

#### Example

```javascript
import { Component } from "@kluntje/core";

class IncrementInput extends Component {
  constructor() {
    super({
      ui: {
        input: "input",
        button: ".handle-increment",
      },
      events: [
        {
          event: "click",
          target: "button",
          handler: "handleClick",
        },
      ],
      initialStates: {
        value: 0,
      },
      reactions: {
        value: ["handleIncrement"],
      },
    });
  }

  afterComponentRender() {
    this.ui.input.value = this.state.value;
  }
  
  handleClick() {
    this.setState({ value: this.state.value + 1}); 
  }
  
  handleIncrement({value}) {
    this.ui.input.value = value;
  }
}

customElements.define("increment-input", IncrementInput);
```

You can also use decorators to query elements, define props and bind events. Using decorators, our increment-input component could look like this:

```javascript
import { Component, uiElement, uiEvent, prop } from "@kluntje/core";

class IncrementInput extends Component {

  @uiElement("input")
  input: HTMLInputElement;

  @uiElement(".handle-increment")
  button: HTMLButtonElement;

  @prop({ defaultValue: 0, reactions: ["handleIncrement"], reactOnInit: true })
  incrementValue: number;


  @uiEvent("button", "click")
  handleClick() {
    this.incrementValue += 1;
  }

  handleIncrement() {
    this.input.value = this.incrementValue.toString();
  }
}

customElements.define("increment-input", IncrementInput);
```


And our HTML will looks like:

```html
<increment-input>
    <input type="number" />
    <button class="handle-increment">Increment</button>
</increment-input>

```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/kluntje/kluntje/blob/master/.github/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

👤 **Frederik Riewerts <frederik.riewerts@gmail.com>**

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details
