if(!typeof(Espionage) === "object") {
  Espionage = {};
}

Espionage = {};
Espionage.SpecHelpers = {};
Espionage.SpecHelpers.Loader = function() {
  function coldStartLoad(jsFile) {
    document.write('<script type="text/javascript" src="' + jsFile + '"></script>');
  }
  
  var loadFile = coldStartLoad;

  function loadScrewUnit() {
    var project_root = "..";
    var screw_unit_path = project_root + "/vendor/screw_unit/lib";

    loadFile(screw_unit_path + "/jquery-1.2.3.js");
    loadFile(screw_unit_path + "/jquery.fn.js");
    loadFile(screw_unit_path + "/jquery.print.js");
    loadFile(screw_unit_path + "/screw.builder.js");
    loadFile(screw_unit_path + "/screw.matchers.js");
    loadFile(screw_unit_path + "/screw.events.js");
    loadFile(screw_unit_path + "/screw.behaviors.js");
  }

  function loadProject() {
    var lib_path = "../lib";

    loadFile(lib_path + "/espionage/helpers.js");
    loadFile(lib_path + "/espionage/stub.js");
    loadFile(lib_path + "/espionage/spy.js");
    loadFile(lib_path + "/espionage/screw_unit/matchers.js");
  }

  function loadSpecs() {
    var spec_path = "espionage";

    loadFile(spec_path + "/screw_unit_matchers_spec.js");
  }
  
  var load = function() {
    loadScrewUnit();
    loadProject();
    loadSpecs();
  };
  
  return {
    load: load
  };
}();

Espionage.SpecHelpers.Loader.load();
