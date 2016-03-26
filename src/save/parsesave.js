import * as constants from './constants';


export default function parse(input) {
  console.log('\n\n\n#############################');

  const tags = parseTags(input);
  console.log('TAGS', tags);
  // validate
  const strings = parseStrings(input, tags);
  console.log('STRINGS', strings);
  const result = combineMatches(tags, strings);
  console.log('RESULT', result);

  return result;
}


function parseTags(input) {
  const tagRegex = /\{\{[ \t]*([a-zA-Z1-9\_\-]+\??)[ \t]*\}\}/g;
  const matches = execAll(tagRegex, input);
  const typedMatches = matches.map(match => ({
    type: tagType(match[1]),
    name: match[1],
    matchLength: match[0].length,
    index: match.index,
  }));
  return typedMatches;
}


function tagType(tagContent) {
  if (tagContent === 'else') return constants.ELSE_CONTROL_TYPE;
  if (tagContent === 'end') return constants.END_CONTROL_TYPE;
  if (tagContent.slice(-1) === '?') return constants.IF_CONTROL_TYPE;
  return constants.STRING_VARIABLE_TYPE;
}


function parseStrings(input, tags) {
  const strings = [];
  var index = 0;

  tags.forEach(tag => {
    const newIndex = tag.index + tag.matchLength;
    if (tag.index === 0) return index = newIndex;

    const string = input.slice(index, tag.index);
    if (string.length === 0) return index = newIndex;

    strings.push(makeStringMatch(string, index));
    index = newIndex;
  });

  if (index === 0 || input.length - index > 0) {
    strings.push(makeStringMatch(input.slice(index), index));
  }

  function makeStringMatch(string, index) {
    return {
      type: constants.STRING_TYPE,
      value: string,
      matchLength: string.length,
      index: index,
    };
  }

  return strings;
}


function combineMatches(...matches) {
  return []
    .concat(...matches)
    .sort((a, b) => {
      return a.index > b.index;
    });
}


function execAll(regex, input) {
  var matches = [];
  var match;
  while ((match = regex.exec(input)) !== null) {
    matches.push(match);
  }
  return matches;
}
