start
  = content

content
  = (text / tag)*



text
  = t:$(!("{{") .)+ {
    return { type: "text", value: t };
  }

tag
  = openBrackets e:(expression) closeBrackets {
    return e;
  }

expression
  = if / else / end / variable

if
  = e:$(variable "?") {
    return { type: "boolean", name: e };
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
    return { type: 'string', name: v };
  }



openBrackets "opening brackets"
  = "{{" space*

closeBrackets "closing brackets"
  = space* "}}"

space "whitespace"
  = [ \t]
