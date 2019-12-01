# react2xml
Generate XML from React.Element

## Usage

Install react2xml using yarn or npm.

```sh
$ yarn add react2xml
```

Use in your project.

```js
import React from 'react'
import react2xml from 'react2xml'

const element = React.createElement('a:b', {c: 'aaa'},
  React.createElement('b:c', {d: 'ddd'})
)
const result = react2xml(element)

console.log(result)
// => <a:b c='aaa'><b:c d='ddd'/></a:b>
```

## Author

* [github/mottox2](https://github.com/mottox2)
* [twitter/mottox2](https://twitter.com/mottox2)

## License

Licensed under the [MIT License](blob/master/LICENSE).
