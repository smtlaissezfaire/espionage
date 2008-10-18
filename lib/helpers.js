Screw.Unit.Extensions = {};
Screw.Unit.Extensions.Helpers = {
  include: function(filename, doc) {
    doc = this.find_document(doc);
    filename = filename.match(/js/) ? filename : filename + ".js";
    doc.write('<script type="text/javascript" src="' + filename + '"></script>');
  },
  
  find_document: function(obj) {
    return obj ? obj : window.document;
  },
  
  object: function(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  },
  
  alias_property: function(obj, new_name, old_name) {
    obj[new_name] = obj[old_name];
  }
};

var obj = Screw.Unit.Extensions.Helpers;
obj.alias_property(obj, "alias_method", "alias_property");
obj.alias_method(obj, "clone", "object");

