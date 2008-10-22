if(!typeof(Espionage) === "object") {
  Espionage = {};
}

Espionage = {};
Espionage.SpecHelpers = function() {
  function cold_start_load(jsFile) {
    document.write('<script type="text/javascript" src="' + jsFile + '"></script>');
  }
  
  var load_file = cold_start_load;

  function load_screw_unit() {
    var project_root = "..";
    var screw_unit_path = project_root + "/vendor/screw_unit/lib";

    load_file(screw_unit_path + "/jquery-1.2.3.js");
    load_file(screw_unit_path + "/jquery.fn.js");
    load_file(screw_unit_path + "/jquery.print.js");
    load_file(screw_unit_path + "/screw.builder.js");
    load_file(screw_unit_path + "/screw.matchers.js");
    load_file(screw_unit_path + "/screw.events.js");
    load_file(screw_unit_path + "/screw.behaviors.js");
  }

  function load_project() {
    var lib_path = "../lib";

    load_file(lib_path + "/espionage/helpers.js");
    load_file(lib_path + "/espionage/stub.js");
    load_file(lib_path + "/espionage/spy.js");
    load_file(lib_path + "/espionage/screw_unit/matchers.js");
  }

  function load_specs() {
    var spec_path = "espionage";

    load_file(spec_path + "/helpers_spec.js");
    load_file(spec_path + "/stub_spec.js");
    load_file(spec_path + "/spy_spec.js");
    load_file(spec_path + "/screw_unit_matchers_spec.js");
  }
  
  var loadProject = function() {
    load_screw_unit();
    load_project();
    load_specs();
  };
  
  return {
    loadProject: loadProject
  };
}();

Espionage.SpecHelpers.loadProject();
