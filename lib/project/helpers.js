Project = {};
Project.Helpers = function() {
  return {
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
