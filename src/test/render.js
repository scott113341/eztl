import test from 'tape';

import parse from '../parse.js';
import render from '../render.js';


test('render empty string', t => {
  const str = '';
  const expected = '';
  t.equal(render(parse(str)), expected);
  t.end();
});


test('render normal string', t => {
  const str = 'yee';
  const expected = 'yee';
  t.equal(render(parse(str)), expected);
  t.end();
});


test('render string variable', t => {
  const str = 'ez{% yee %}pz';
  const vars = { yee: 'swag' };
  const expected = 'ezswagpz';
  t.equal(render(parse(str), vars), expected);
  t.end();
});


test('render if/end true', t => {
  const str = '{% yee? %}asdf{% end %}';
  const vars = { 'yee?': true };
  const expected = 'asdf';
  t.equal(render(parse(str), vars), expected);
  t.end();
});


test('render if/end false', t => {
  const str = '{% yee? %}asdf{% end %}';
  const vars = { 'yee?': false };
  const expected = '';
  t.equal(render(parse(str), vars), expected);
  t.end();
});


test('render if=true/var/end', t => {
  const str = '{% yee? %}{% yee %}{% end %}';
  const vars = { 'yee?': true, yee: 'swag' };
  const expected = 'swag';
  t.equal(render(parse(str), vars), expected);
  t.end();
});


test('render if=false/var/end', t => {
  const str = '{% yee? %}{% yee %}{% end %}';
  const vars = { 'yee?': false, yee: 'swag' };
  const expected = '';
  t.equal(render(parse(str), vars), expected);
  t.end();
});


test('render if=false/var=undefined/end', t => {
  const str = '{% yee? %}{% yee %}{% end %}';
  const vars = { 'yee?': false };
  const expected = '';
  t.equal(render(parse(str), vars), expected);
  t.end();
});


test('render if=true/else/end', t => {
  const str = '{% yee? %}asdf{% else %}fdsa{% end %}';
  const vars = { 'yee?': true };
  const expected = 'asdf';
  t.equal(render(parse(str), vars), expected);
  t.end();
});


test('render if=false/else/end', t => {
  const str = '{% yee? %}asdf{% else %}fdsa{% end %}';
  const vars = { 'yee?': false };
  const expected = 'fdsa';
  t.equal(render(parse(str), vars), expected);
  t.end();
});


test('render if=true/var/else/var/end', t => {
  const str = '{% yee? %}{% yes_yee %}{% else %}{% no_yee %}{% end %}';
  const vars = { 'yee?': true, yes_yee: 'asdf' };
  const expected = 'asdf';
  t.equal(render(parse(str), vars), expected);
  t.end();
});


test('render if=false/var/else/var/end', t => {
  const str = '{% yee? %}{% yes_yee %}{% else %}{% no_yee %}{% end %}';
  const vars = { 'yee?': false, no_yee: 'fdsa' };
  const expected = 'fdsa';
  t.equal(render(parse(str), vars), expected);
  t.end();
});


test('render nested if', t => {
  const str = '{%a?%}{%b?%}{%c%}{%end%}{%end%}';
  const vars = { 'a?': true, 'b?': true, c: 'ccc' };
  const expected = 'ccc';
  t.equal(render(parse(str), vars), expected);
  t.end();
});


test('render nested if/else', t => {
  const str = '{%a?%}{%b?%}{%c%}{%else%}{%d%}{%end%}{%end%}';
  const vars = { 'a?': true, 'b?': false, d: 'ddd' };
  const expected = 'ddd';
  t.equal(render(parse(str), vars), expected);
  t.end();
});


test('render nested if/else', t => {
  const str = 'ez{%a?%}aa{%b?%}bb{%else%}cc{%end%}dd{%else%}ee{%end%}ff';
  const vars = { 'a?': false };
  const expected = 'ezeeff';
  t.equal(render(parse(str), vars), expected);
  t.end();
});


const exampleInput = `
    {
      "name": "{% namespace? %}@{% namespace %}/{% end %}{% name %}",
      "private": {% private? %}true{% else %}false{% end %},
      "dependencies": {{% default_dependencies? %}
        "babel": "6.5.2"{% tape? %},
        "tape": "1.3.0"{% else %},
        "mocha": "2.4.5"{% end %}
      }{% else %}}{% end %}
    }
  `;


test('render example 1', t => {
  const vars = {
    'namespace?': true,
    'namespace': 'swag',
    'name': 'yee',
    'private?': true,
    'default_dependencies?': true,
    'tape?': true,
  };
  const expected = `
    {
      "name": "@swag/yee",
      "private": true,
      "dependencies": {
        "babel": "6.5.2",
        "tape": "1.3.0"
      }
    }
  `;
  t.equal(render(parse(exampleInput), vars), expected);
  t.end();
});


test('render example 2', t => {
  const vars = {
    'namespace?': false,
    'name': 'yee',
    'private?': false,
    'default_dependencies?': true,
    'tape?': false,
  };
  const expected = `
    {
      "name": "yee",
      "private": false,
      "dependencies": {
        "babel": "6.5.2",
        "mocha": "2.4.5"
      }
    }
  `;
  t.equal(render(parse(exampleInput), vars), expected);
  t.end();
});


test('render example 3', t => {
  const vars = {
    'namespace?': false,
    'name': 'yee',
    'private?': false,
    'default_dependencies?': false,
  };
  const expected = `
    {
      "name": "yee",
      "private": false,
      "dependencies": {}
    }
  `;
  t.equal(render(parse(exampleInput), vars), expected);
  t.end();
});
