import test from 'tape';

import eztl from '../lib/index';


test('eztl empty string', t => {
  const string = '';
  const expected = '';
  t.equal(eztl(string), expected);
  t.end();
});


test('eztl string with variable', t => {
  const string = 'asdf{% yee %}fdsa';
  const variables = { yee: 'swag' };
  const expected = 'asdfswagfdsa';
  t.equal(eztl(string, variables), expected);
  t.end();
});


test('eztl should throw if string undefined', t => {
  const string = '{% yee %}';
  const expected = /String variable "yee" is undefined\./;
  t.throws(eztl.bind(null, string), expected);
  t.end();
});


test('eztl should throw if boolean undefined', t => {
  const string = '{% yee? %}asdf{% end %}';
  const expected = /Boolean variable "yee\?" is undefined\./;
  t.throws(eztl.bind(null, string), expected);
  t.end();
});


test('eztl should throw if string variable is not a string', t => {
  const string = '{% yee %}';
  const expected = /String variable "yee" is not a String\./;
  const nonStrings = [true, false, 0, 1, NaN, Infinity, /asdf/, function(){}, [], {}];
  nonStrings.forEach(nonString => {
    t.throws(eztl.bind(null, string, { yee: nonString }), expected);
  });
  t.end();
});


test('eztl should throw if boolean variable is not a boolean', t => {
  const string = '{% yee? %}asdf{% end %}';
  const expected = /Boolean variable "yee\?" is not a Boolean\./;
  const nonBooleans = ['', 'asdf', 0, 1, NaN, Infinity, /asdf/, function(){}, [], {}];
  nonBooleans.forEach(nonBoolean => {
    t.throws(eztl.bind(null, string, { 'yee?': nonBoolean }), expected);
  });
  t.end();
});
