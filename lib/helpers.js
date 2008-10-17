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
};

Screw.Unit.Extensions.Helpers.clone = Screw.Unit.Extensions.Helpers.object