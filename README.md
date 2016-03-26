# eztl – ez template language

[![npm-version][npm-version-badge]][npm-version-href]
[![build-status][build-status-badge]][build-status-href]
[![dependencies][dependencies-badge]][dependencies-href]
[![dev-dependencies][dev-dependencies-badge]][dev-dependencies-href]


## example
```javascript
import eztl from 'eztl';

const input = 'Hello, {% location %}{% shout? %}!{% else %}.{% end %}';
const variables = { location: 'world', 'shout?': false };
const output = eztl(input, variables);

console.log(output); // "Hello, world."
```


[npm-version-badge]: https://img.shields.io/npm/v/eztl.svg?label=version&style=flat-square
[npm-version-href]: https://www.npmjs.com/package/eztl

[build-status-badge]: https://img.shields.io/travis/scott113341/eztl.svg?style=flat-square
[build-status-href]: https://travis-ci.org/scott113341/eztl

[dependencies-badge]: https://img.shields.io/david/scott113341/eztl.svg?style=flat-square
[dependencies-href]: https://david-dm.org/scott113341/eztl#info=dependencies

[dev-dependencies-badge]: https://img.shields.io/david/dev/scott113341/eztl.svg?style=flat-square
[dev-dependencies-href]: https://david-dm.org/scott113341/eztl#info=devDependencies
