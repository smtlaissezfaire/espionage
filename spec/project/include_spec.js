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
    
    describe("load", function() {
      it("should insert the js file into the document", function() {
        helper.load("foo.js", mock_document);
        expect(args[0]).to(equal, '<script type="text/javascript" src="foo.js"></script>');
      });
      
      it("should insert the js file with the correct name", function() {
        helper.load("boo.js", mock_document);
        expect(args[0]).to(equal, '<script type="text/javascript" src="boo.js"></script>');
      });
      
      it("should use window.document when none is provided", function() {
        var message_received = false;
        
        helper.find_document = function() {
          message_received = true;
          return(mock_document);
        };
        
        helper.load("foo.js");
        expect(message_received).to(be_true);
      });
      
      it("should provide a js extension if none is given", function() {
        helper.load("foo", mock_document);
        expect(args[0]).to(equal, '<script type="text/javascript" src="foo.js"></script>');
      });
    });
    
    describe("find_document", function() {
      it("should return an empty object when the object passed is an empty object", function() {
        var obj = {};
        expect(helper.find_document(obj)).to(equal, obj);
      });

      it("should return the same object when the object passed in an empty object", function() {
        var obj = {
          foo: "bar"
        };
        expect(helper.find_document(obj)).to(equal, obj);
      });

      // pending: Why isn't this one passing?
      // it("should return window.document when no object is passed", function() {
      //   expect(helper.document()).to(equal, window.document);
      // });
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