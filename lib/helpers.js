Screw.Unit.Extensions = {};
Screw.Unit.Extensions.Helpers = {
  include: function(filename, doc) {
    doc = this.find_document(doc);
    filename = filename.match(/js/) ? filename : filename + ".js"
    doc.write('<script type="text/javascript" src="' + filename + '"></script>')
  },
  
  find_document: function(obj) {
    return obj ? obj : window.document;
  },
  
  object: function(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  },
  
  alias_property: function(obj, old_name, new_name) {
    obj[new_name] = obj[old_name];
  }
};

var obj = Screw.Unit.Extensions.Helpers;

obj.alias_method = obj.alias_property;
obj.clone = obj.object;
