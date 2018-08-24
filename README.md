# Class References

[![CircleCI](https://img.shields.io/circleci/project/github/simon360/class-references.svg)](https://circleci.com/gh/simon360/class-references)
[![codecov](https://img.shields.io/codecov/c/github/simon360/class-references.svg)](https://codecov.io/gh/simon360/class-references)
![npm](https://img.shields.io/npm/v/class-references.svg)
![GitHub](https://img.shields.io/github/license/simon360/class-references.svg)

> Stop worrying about edge cases when you add and remove classes.

## Why?

Class names on global elements can come from a lot of places. Knowing when a class is actually _safe_ to remove can be tricky.

Say you have a modal dialog component. When that component is shown, you might want to stop the user from scrolling the content behind the dialog. To do that, you add a class called `u-preventScroll` (with corresponding CSS that sets `overflow: hidden;`) to the `body` element. When the dialog closes, you remove the class. Hey, that works great!

Except when it doesn't. What if you had two dialog components open at the same time? When the second one closes, it removes `u-preventScroll`, but the first dialog is still open. And now your users can scroll the page.

Enter `class-references`. Rather than adding a class name to an element directly, a component can exchange a request to add a class name for a token from `class-references`. When a component is ready to remove that class, the component can release the token. The class only gets removed when all tokens have been released.

Put more simply: you can stop worrying about edge cases when you're adding and removing class names to global elements.

## Usage

### Framework agnostic

See [`class-references`](packages/class-references/README.md).

### React

See [`react-class-references`](packages/react-class-references/README.md).
