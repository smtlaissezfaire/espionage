Screw.Unit(function() {
  describe("Helpers", function() {
    var args = [];
    var mock_document = {
      write: function() {
        args = arguments;
      }
    };
    var helper = undefined;
    
    before(function() {
      var helper_prototype = Project.Helpers;
      helper = helper_prototype.clone(helper_prototype);
    });
    
    describe("object", function() {
      it("should return an object with it's prototype as the constructor", function() {
        var obj = {};
        var cloned_object = helper.object(obj);
        
        expect(cloned_object.__proto__).to(equal, obj);
      });
      
      it("should return an object which is not equal (it should not be the same object)", function() {
        var obj = {};
        expect(helper.object(obj) == obj).to(be_false);
      });
      
      it("should have the clone method as an alias for the object method", function() {
        expect(helper.object).to(equal, helper.clone);
      });
    });
    
    describe("alias", function() {
      it("should set one propery equal to another", function() {
        var obj = {
          original_property: 7
        };
        helper.alias(obj, "new_property", "original_property");
        expect(obj.new_property).to(equal, 7);
      });
      
      it("should set a different property", function() {
        obj = {
          original_property: 7
        };
        helper.alias(obj, "some_other_property", "original_property");
        expect(obj.some_other_property).to(equal, 7);
      });
      
      it("should set the property to the same value", function() {
        obj = {
          original_property: 8
        };
        helper.alias(obj, "new_property", "original_property");
        expect(obj.new_property).to(equal, 8);
      });
    });
  });
});