import test from 'tape';

import parse from '../parse.js';


test('parse empty string', t => {
  const str = '';
  const expected = [];
  t.deepEqual(parse(str), expected);
  t.end();
});


test('parse normal string', t => {
  const str = 'yee';
  const expected = [
    { type: 'String', value: 'yee', index: 0, matchLength: 3 },
  ];
  t.deepEqual(parse(str), expected);
  t.end();
});


test('parse string variable', t => {
  const str = '{% yee %}';
  const expected = [
    { type: 'StringVariable', name: 'yee', index: 0, matchLength: 9 },
  ];
  t.deepEqual(parse(str), expected);
  t.end();
});


test('parse string variable in middle', t => {
  const str = 'ez{% yee %}pz';
  const expected = [
    { type: 'String', value: 'ez', index: 0, matchLength: 2 },
    { type: 'StringVariable', name: 'yee', index: 2, matchLength: 9 },
    { type: 'String', value: 'pz', index: 11, matchLength: 2 },
  ];
  t.deepEqual(parse(str), expected);
  t.end();
});


test('parse string variables at beginning/end', t => {
  const str = '{% yee %}ezpz{% bee %}';
  const expected = [
    { type: 'StringVariable', name: 'yee', index: 0, matchLength: 9 },
    { type: 'String', value: 'ezpz', index: 9, matchLength: 4 },
    { type: 'StringVariable', name: 'bee', index: 13, matchLength: 9 },
  ];
  t.deepEqual(parse(str), expected);
  t.end();
});


test('parse if/end', t => {
  const str = '{% yee? %}asdf{% end %}';
  const expected = [
    { type: 'IfControl', name: 'yee?', index: 0, matchLength: 10 },
    { type: 'String', value: 'asdf', index: 10, matchLength: 4 },
    { type: 'EndControl', index: 14, matchLength: 9 },
  ];
  t.deepEqual(parse(str), expected);
  t.end();
});


test('parse if/else/end', t => {
  const str = '{% yee? %}asdf{% else %}fdsa{% end %}';
  const expected = [
    { type: 'IfControl', name: 'yee?', index: 0, matchLength: 10 },
    { type: 'String', value: 'asdf', index: 10, matchLength: 4 },
    { type: 'ElseControl', index: 14, matchLength: 10 },
    { type: 'String', value: 'fdsa', index: 24, matchLength: 4 },
    { type: 'EndControl', index: 28, matchLength: 9 },
  ];
  t.deepEqual(parse(str), expected);
  t.end();
});
