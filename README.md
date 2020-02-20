# `Kluntje`

Kluntje is a javascript object that brings webcomponents to the next level. Take a look and make webcomponents development a breeze.

## Why Kluntje?

Kluntje is the right tool if you want to use webcompoent with the feeling of a modern javascript framework. It suits good to CMS project and works with every JS framework.

*  It has states
*  It has lifecycle hooks
*  It has state reactions
*  It is just XX.XX Kb

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes. 

### Prerequisites

```
node v *.*.*
```

```
npm v *.*.*
```

### Installing

Get the project up and running is pretty straight forward:

```
npm install kluntje
```

And you are done.

## Usage

Import the Kluntje core component in your js file and you can start using it:

```
import { Component } from "@kluntje/Core";

class MyAmazingComponent extends Component {
    
}

customElements.define("my-amazing-component", MyAmazingComponent);
```

And use it in your HTML file:

```
<my-amazing-component></my-amazing-component>
```

### How our component looks like

In the constructor there is an object where you can define:

*  ui: selector for dom elements with every CSS selector
*  events: an array of objects where you can define the event, the target and the handler function.
*  initialStates: an object where we can define the states of out component
*  reactions: an array of callbacks that we can call when a state updates.

#### Example

```
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

And our HTML will looks like:

```
<increment-input>
    <input type="number" class="input"/>
    <button class="handle-increment">Increment</button>
</increment-input>

```

## Contributing

Please read [CONTRIBUTING.md](https://) for details on our code of conduct, and the process for submitting pull requests to us.


## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details
