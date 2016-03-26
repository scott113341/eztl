start
  = content

content
  = (text / tag)*



text
  = $(!("{{") .)+

tag
  = openBrackets e:(expression) closeBrackets {
    return e;
  }

expression
  = if / else / end / variable

if
  = e:$(variable "?") {
    return { type: "boolean", name: e, value: undefined };
  }

else
  = "else" {
  	return { type: "else" };
  }

end
  = "end" {
  	return { type: "end" };
  }

variable
  = v:$([a-zA-Z0-9\_\-\.]+) {
    return { type: 'string', name: v, value: undefined };
  }



openBrackets "opening brackets"
  = "{{" space*

closeBrackets "closing brackets"
  = space* "}}"

space "whitespace"
  = [ \t]
