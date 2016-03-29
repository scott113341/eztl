import parse from './parse.js';
import render from './render.js';


export default function eztl(input, variables={}) {
  return render(parse(input), variables);
}
