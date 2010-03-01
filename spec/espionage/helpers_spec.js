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

  describe("numberToWord", function() {
    it("should covert 0 to 'zero'", function() {
      expect(helper.numberToWord(0)).to(equal, "zero");
    });

    it("should convert 1 to 'one'", function() {
      expect(helper.numberToWord(1)).to(equal, "one");
    });

    it("should convert 2 to 'two'", function() {
      expect(helper.numberToWord(2)).to(equal, "two");
    });

    it("should convert 3 to 'three'", function() {
      expect(helper.numberToWord(3)).to(equal, "three");
    });

    var numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

    // jQuery.each(numbers, function(number_index, number_string) {
    //   var description = "should convert " + number_index + " to " + number_string;
    //
    //   it(description, function() {
    //     expect(helper.numberToWord(number_index)).to(equal, number_string);
    //   });
    // });
    //
    it("should convert 10 to '10'", function() {
      expect(helper.numberToWord(10)).to(equal, "10");
    });

    it("should return a string", function() {
      expect(helper.numberToWord(10) === "10").to(be_true);
    });

    it("should convert 11 to '11'", function() {
      expect(helper.numberToWord(11)).to(equal, "11");
    });

    it("should raise a type error when given a negative number", function() {
      var error = false;
      try {
        helper.numberToWord(-1);
      } catch (e) {
        error = e;
      }

      expect(error.name).to(equal, "TypeError");
      expect(error.message).to(equal, "Invalid number. numberToWord only accepts positive integers");
    });

    it("should convert a float to it's positive integer", function() {
      expect(helper.numberToWord(23.6)).to(equal, "23");
    });

    it("should raise a type error when given an object", function() {
      var error = false;
      try {
        helper.numberToWord(new Object);
      } catch (e) {
        error = e;
      }

      expect(error.name).to(equal, "TypeError");
      expect(error.message).to(equal, "Invalid number. numberToWord only accepts positive integers");
    });
  });

  describe("number of times in words", function() {
    it("should have '1' as 'once'", function() {
      expect(helper.numberOfTimesInWords(1)).to(equal, "once");
    });

    it("should have '2' as 'twice'", function() {
      expect(helper.numberOfTimesInWords(2)).to(equal, "twice");
    });

    it("should have '3' as 'three times'", function() {
      expect(helper.numberOfTimesInWords(3)).to(equal, "three times");
    });

    it("should have '4' as 'four times'", function() {
      expect(helper.numberOfTimesInWords(4)).to(equal, "four times");
    });

    it("should have '0' as 'zero times'", function() {
      expect(helper.numberOfTimesInWords(0)).to(equal, "zero times");
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
