function include(jsFile) {
  document.write('<script type="text/javascript" src="' + jsFile + '"></script>');
}

function include_screw_unit() {
  var project_root = ".."
  var screw_unit_path = project_root + "/vendor/screw_unit/lib"
  
  include(screw_unit_path + "/jquery-1.2.3.js");
  include(screw_unit_path + "/jquery.fn.js");
  include(screw_unit_path + "/jquery.print.js");
  include(screw_unit_path + "/screw.builder.js");
  include(screw_unit_path + "/screw.matchers.js");
  include(screw_unit_path + "/screw.events.js");
  include(screw_unit_path + "/screw.behaviors.js");
}