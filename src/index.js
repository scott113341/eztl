import parse from './parse';
import render from './render';


export default function eztl(input, variables={}) {
  return render(parse(input), variables);
}
