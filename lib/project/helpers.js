Project = {};
Project.Helpers = function() {
  return {
    load: function(filename, doc) {
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

    alias: function(obj, new_name, old_name) {
      obj[new_name] = obj[old_name];
    }
  };
}();

Project.Helpers.alias(Project.Helpers, "clone", "object");
