import { STRING, STRING_VARIABLE, IF_CONTROL, ELSE_CONTROL, END_CONTROL } from './constants';
import parse from './parse';


export default function render(parts, variables={}) {
  var results = [];

  for (var i=0; i<parts.length; i++) {
    const part = parts[i];
    const { type, name, value } = part;
    const varValue = variables[name];

    if (type === STRING) {
      results.push(value);
    }

    else if (type === STRING_VARIABLE) {
      if (varValue === undefined) throwStringUndefined(name);
      results.push(varValue);
    }

    else if (type === IF_CONTROL) {
      if (varValue === undefined) throwBooleanUndefined(name);
      if (varValue !== true && varValue !== false) throwBooleanWrongType(name);

      var ifIndex = i;
      var elseIndex = findElseIndex(parts, ifIndex);
      var endIndex = findEndIndex(parts, ifIndex);
      var stopIndex;

      if (varValue === true) {
        stopIndex = (elseIndex >= 0) ? elseIndex : endIndex;
        results = results.concat(render(parts.slice(ifIndex + 1, stopIndex), variables));
      }
      else {
        if (elseIndex >= 0) {
          results = results.concat(render(parts.slice(elseIndex + 1, endIndex), variables));
        }
      }

      i = endIndex;
    }
  }

  return results.join('');
}


function findElseIndex(parts, ifIndex) {
  var depth = 0;

  for (var i=ifIndex; i<parts.length; i++) {
    const part = parts[i];

    if (part.type === ELSE_CONTROL && depth === 1) return i;
    if (part.type === END_CONTROL && depth === 1) return undefined;
    if (part.type === IF_CONTROL) depth++;
    if (part.type === END_CONTROL) depth--;
  }
}


function findEndIndex(parts, ifIndex) {
  var depth = 0;

  for (var i=ifIndex; i<parts.length; i++) {
    const part = parts[i];

    if (part.type === END_CONTROL && depth === 1) return i;
    if (part.type === IF_CONTROL) depth++;
    if (part.type === END_CONTROL) depth--;
  }
}




function throwStringUndefined(name) {
  throw new Error(`String variable "${name}" is undefined.`);
}

function throwBooleanUndefined(name) {
  throw new Error(`Boolean variable "${name}" is undefined.`);
}

function throwBooleanWrongType(name) {
  throw new Error(`Boolean variable "${name}" is not a Boolean.`);
}
