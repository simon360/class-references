# class-references

This project has not been released yet, and is in a WIP state.

> Wrangle class names on HTML elements with reference counting.

Manage the classes you add on external elements more effectively.

## Problem

Sometimes, you need to add a class to `<body>`, in order to display your component correctly. Maybe you have a utility class `u-preventScroll` that sets `overflow: hidden;`, so that the content you're showing prevents scrolling on what's behind it.

You can call `document.body.classList.add("u-preventScroll)`, but what if multiple components try to add that class at the same time, but Component 1 removes the class before Component 2 is ready for the class to go away?

## Solution

Reference counting offers a solution to this problem. Component 1 and Component 2 can each request that the class be added, and receive a unique receipt, or a token, that represents their request. When Component 1 is finished with the class, it releases its token. Since Component 2 still holds a token, the class isn't removed until Component 2 also releases it.

## Usage

### Without a framework

#### Installation

Installation is not yet available.

#### Example

```js
import { claimForClass, release } from "class-references";

const className = "u-preventScroll";
const element = document.body;

const token1 = claimForClass(element, className); // Class is added
const token2 = claimForClass(element, className); // Class was already added, but token reserves it.

release(element, token1); // token1 is released; token2 not released, class remains
release(element, token2); // both tokens are released, class removed
```

### React

#### Overview

Use a `<ClassReference />` component any time you're showing content that requires a class be added to an external (ie. non-React) element.

#### Installation

Installation is not yet available.

#### Example

```js
import React, { Component } from "react";
import ReactDOM from "react-dom";
import ClassReference from "react-class-references";
import Modal from "./components/Modal"; // a modal dialog that you defined

class MyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  render() {
    const { modalOpen } = this.state;

    return (
      <React.Fragment>
        <button onClick={() => this.setState({ modalOpen: !modalOpen })}>
          Toggle modal
        </button>

        {/* u-preventScroll will only exist on document.body if modalOpen is truthy. */}
        {modalOpen ? (
          <ClassReference element={document.body} classToAdd="u-preventScroll">
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
