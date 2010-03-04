describe("Helpers", function() {
  before_each(function() {
    helper_prototype = Espionage.Helpers;
    helper = helper_prototype.clone(helper_prototype);
  });

  describe("object", function() {
    it("should return an object with it's prototype as the constructor", function() {
      var obj = {};
      var cloned_object = helper.object(obj);

      cloned_object.__proto__.should.equal(obj);
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

  describe("hasProperty", function() {
    it("should be true for an object which has defined the property", function() {
      var obj = {};
      obj.foo = "bar";

      helper.hasProperty(obj, "foo").should.be(true);
    });

    it("should be false for an object which hasn't", function() {
      var obj = {};

      helper.hasProperty(obj, "foo").should.be(false);
    });

    it("should be true for an object which has defined it, but it is set to undefined", function() {
      var obj = {};
      obj.foo = undefined;

      helper.hasProperty(obj, "foo").should.be(true);
    });

    it("should be true for an object which has inherited the property", function() {
      var prototype = {
        foo: "bar"
      };

      clone = helper.clone(prototype);

      helper.hasProperty(clone, "foo").should.be(true);
    });
  });
});
