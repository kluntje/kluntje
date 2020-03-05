<h1 align="center">Welcome to @kluntje/core 👋</h1>
<p>
  <a href="LICENSE.md" target="_blank">
    <img alt="License: (Apache)" src="https://img.shields.io/badge/License-(Apache)-yellow.svg" />
  </a>
</p>

Kluntje is a javascript object that brings webcomponents to the next level. Take a look and make webcomponents development a breeze.

## 🚀 Why Kluntje?

Kluntje is the right tool if you want to use webcompoent with the feeling of a modern javascript framework. It suits good to CMS project and works with every JS framework.

*  It has states
*  It has lifecycle hooks
*  It has state reactions
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

### How our component looks like

In the constructor there is an object where you can define:

*  ui: selector for dom elements with every CSS selector
*  events: an array of objects where you can define the event, the target and the handler function.
*  initialStates: an object where we can define the states of out component
*  reactions: an array of callbacks that we can call when a state updates.

#### Example

```javascript
import { Component } from "@kluntje/core";

class IncrementInput extends Component {
    constructor() {
    super({
      ui: {
        input: ".input"
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
    <input type="number" class="input"/>
    <button class="handle-increment">Increment</button>
</increment-input>

```

# API

Since kluntje is based on the (Custom Elements)[https://developers.google.com/web/fundamentals/web-components/customelements] standard, our API extends the Custom Elements API.


## Contructor Object

One way to add functionality to your component is to add a configuration-object to the Component-constructor (see first example). It is possible to add the following keys:

### ui
Object containing key-value-string-pairs, mapping ui-elements from the component-dom to a key of the class property ui (e.g. this.ui.input)

```javascript
constructor() {
  super({
    ui: {
      inputs: "input", // all elements matching given selector
      button: ".submit-btn :-one", // first element matching given selector (.submit-btn)
    },
    // ...
  })
}
```

### events
Array of event-definition-objects, mapping events to class-methods  

```javascript
constructor() {
  super({
    events: [
      {
        event: "click",
        target: "button",
        handler: "onFormSubmit",
      },
      {
        event: "focusin",
        target: "inputs",
        handler: "handleFocusChange",
      },
    ],
    // ...
  })
}
```

### initialStates
Object to set initial values of states. States can later be changed via setState-method (e.g. this.setState({ value: 2 })). The current state can always be retrieved via this.state

```javascript
constructor() {
  super({
    initialStates: {
      isValid: false,
    },
    // ...
  })
}
```

### reactions
Object to define how to react to a state-change. The key defines the state to subscribe to, the value should be a string-array of class-methods to call on state-change  

```javascript
constructor() {
  super({
    reactions: {
      isValid: ["onValidChange"],
    },
    // ...
  })
}
```

### useShadowDOM
Boolean flag indicating, whether to use Shadow-DOM (defaults to false)

### asyncRendering
Boolean flag indicating, whether to use asyncRender method. Important for async ui-initialization


## Decorators
Another way to add functionality to your component is to use decorators (see second example).


### @uiElement
Binds first ui-element matching the given selector to the decorated property

```javascript
@uiElement(".handle-increment")
button: HTMLButtonElement;
```

### @uiElements
Binds all ui-elements matching the given selector to the decorated property

```javascript
@uiElements("input")
inputs: Array<HTMLInputElement>;
```

### @uiEvents
Binds given event of given uiElement(s) to the decorated method

```javascript
@uiEvent("button", "click")
handleClick() {
  console.log("button clicked!")
}
```

## Contributing

Please read [CONTRIBUTING.md](https://) for details on our code of conduct, and the process for submitting pull requests to us.

👤 **Frederik Riewerts <frederik.riewerts@gmail.com>**

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details
