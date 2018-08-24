# `react-class-references`

> A React component for managing multiple references to class names on non-React elements.

For more details, see the [main README file](https://github.com/simon360/class-references/blob/master/README.md).

## Installation

Using npm:

```
npm install --save react-class-references
```

Using yarn:

```
yarn add react-class-references
```

## Usage

Any time you want to add a class (eg. `MyClassName`) to an element (eg. `document.body`), use:

```js
import { ClassReference } from "react-class-references";

<ClassReference element={document.body} classNameToAdd="MyClassName">
  {/* children */}
</ClassReference>;
```

Any time `<ClassReference />` is mounted, it holds a token for its class name. As soon as it's unmounted, it releases the token.

### Advanced examples

```js
import React, { Component } from "react";
import ReactDOM from "react-dom";
import ClassReference from "react-class-references";
import Modal from "./components/Modal"; // a modal dialog that you defined

class MyPage extends Component {
  state = {
    modalOpen: false
  };

  render() {
    const { modalOpen } = this.state;

    return (
      <React.Fragment>
        <button onClick={() => this.setState({ modalOpen: !modalOpen })}>
          Toggle modal
        </button>

        {/* u-preventScroll will only exist on document.body if modalOpen is truthy. */}
        {modalOpen ? (
          <ClassReference
            element={document.body}
            classNameToAdd="u-preventScroll"
          >
            <Modal>Hello, world!</Modal>
          </ClassReference>
        ) : null}
      </React.Fragment>
    );
  }
}

// Class is added to `document.body` when `ClassReference` mounts
ReactDOM.render(<MyPage />, document.getElementById("root"));
```
