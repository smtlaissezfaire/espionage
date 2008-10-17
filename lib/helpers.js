Screw.Unit.Extensions = {};
Screw.Unit.Extensions.Helpers = {
  include: function(filename, doc) {
    doc = this.find_document(doc);
    doc.write('<script type="text/javascript" src="' + filename + '"></script>')
  },
  find_document: function(obj) {
    return obj ? obj : window.document;
  }
};