# `class-references`

> A framework-agnostic library for managing multiple references to class names.

For more details, see the [main README file](https://github.com/simon360/class-references/blob/master/README.md).

## Installation

Using npm:

```
npm install --save class-references
```

Using yarn:

```
yarn add class-references
```

## Usage

Any time you want to add a class (eg. `MyClassName`) to an element (eg. `document.body`), use:

```js
import { requestTokenForClass } from "class-references";

const token = requestTokenForClass(document.body, "MyClassName");
```

When you're ready to remove the class, make sure you can recall the token, and use:

```js
import { releaseToken } from "class-references";

releaseToken(document.body, token);
```

### Advanced examples

```js
import { releaseToken, requestTokenForClass } from "class-references";

const className = "u-preventScroll";
const element = document.body;

const token1 = requestTokenForClass(element, className); // Class is added
const token2 = requestTokenForClass(element, className); // Class was already added, but another token reserves it.

releaseToken(element, token1); // token1 is released; token2 not released, class remains
releaseToken(element, token2); // both tokens are released, class removed
```
