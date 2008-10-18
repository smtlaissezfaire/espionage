function cold_start_load(jsFile) {
  document.write('<script type="text/javascript" src="' + jsFile + '"></script>');
}

load = cold_start_load;

function load_screw_unit() {
  var project_root = "..";
  var screw_unit_path = project_root + "/vendor/screw_unit/lib";
  
  load(screw_unit_path + "/jquery-1.2.3.js");
  load(screw_unit_path + "/jquery.fn.js");
  load(screw_unit_path + "/jquery.print.js");
  load(screw_unit_path + "/screw.builder.js");
  load(screw_unit_path + "/screw.matchers.js");
  load(screw_unit_path + "/screw.events.js");
  load(screw_unit_path + "/screw.behaviors.js");
}

function load_project() {
  load("include_spec.js");
  load("stub_spec.js");
}

function load_specs() {
  load("../lib/helpers.js");
  load("../lib/stub.js");
}