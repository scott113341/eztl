Start
  = (Match)*



Match
  = m:(String / Tag) {
    var loc = location();
    return Object.assign({}, m, {
      index: loc.start.offset,
      matchLength: loc.end.offset - loc.start.offset,
    });
  }

String
  = s:$(!("{%").)+ {
    return { type: "String", value: s };
  }

Tag
  = OpenBrackets e:(Expression) CloseBrackets {
    return e;
  }

Expression
  = IfControl / ElseControl / EndControl / Variable

IfControl
  = e:$(Variable "?") {
    return { type: "IfControl", name: e };
  }

ElseControl
  = "else" {
  	return { type: "ElseControl" };
  }

EndControl
  = "end" {
  	return { type: "EndControl" };
  }

Variable
  = v:$([a-zA-Z0-9\_\-\.]+) {
    return { type: "StringVariable", name: v };
  }



OpenBrackets
  = "{%" Space*

CloseBrackets
  = Space* "%}"

Space
  = [ \t]
