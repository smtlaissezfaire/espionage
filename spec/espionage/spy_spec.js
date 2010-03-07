describe("Spy", function() {
  before_each(function() {
    obj = {};
  });

  describe("spyOn", function() {
    before_each(function() {
      spy.tearDown(obj);
      stubber.stub(obj, "foo");
    });

    it("should call the function given to spyOn", function() {
      var called = false;
      obj.foo = function() { called = true; };

      spy.spyOn(obj, function() {
        obj.foo();
      });

      expect(called).to(equal, true);
    });

    it("should throw a Espionage.MockExpectionError when receiving a message", function() {
      spy.spyOn(obj, function() {
        try {
          obj.received("foo");
        } catch (e) {
          e.name.should.equal("MockExpectationError");
          e.message.should.equal("expected foo but never got it");
        }
      });
    });

    it("should report true when receiving a message", function() {
      spy.spyOn(obj, function() {
        obj.foo();
        expect(obj.received("foo")).to(be_true);
      });
    });

    it("should be able to reset the received status", function() {
      spy.spyOn(obj, function() {
        obj.foo();
      });

      spy.tearDown(obj);

      spy.spyOn(obj, function() {
        try {
          obj.received("foo");
        } catch (e) {
          e.message.should.equal("expected foo but never got it");
          e.name.should.equal("MockExpectationError");
        }
      });
    });

    it("should report a positive message expectation on a different method", function() {
      stubber.stub(obj, "bar");

      spy.spyOn(obj, function() {
        obj.bar();
        expect(obj.received("bar")).to(be_true);
      });
    });

    it("should not redefine a property which is not a method", function() {
      obj.bar = 7;

      spy.spyOn(obj, function() {
        expect(obj.bar).to(equal, 7);
      });
    });

    it("should raise an error", function() {
      spy.spyOn(obj, function() {
        obj.foo();

        try {
          obj.received("bar");
        } catch (e) {
          e.name.should.equal("MockExpectationError");
        }
      });
    });

    it("should raise an error for a method which is not defined", function() {
      spy.spyOn(obj, function() {
        try {
          obj.received("baz");
        } catch (e) {
          e.name.should.equal("MockExpectationError");
        }
      });
    });

    it("should be true when called indirectly", function() {
      stubber.stub(obj, "bar");

      var other_obj = {
        foo: function(obj) {
          obj.bar();
        }
      };

      spy.spyOn(obj, function() {
        other_obj.foo(obj);
        expect(obj.received("bar")).to(be_true);
      });
    });
  });

  describe("arguments", function() {
    before_each(function() {
      spy.tearDown(obj);
      stubber.stub(obj, "foo");
    });

    it("should have an empty array of arguments when none are provided", function() {
      spy.spyOn(obj, function() {
        obj.foo();
        expect(obj.argumentsFor("foo").toString()).to(equal, [[]].toString());
      });
    });

    it("should have one argument when given", function() {
      spy.spyOn(obj, function() {
        obj.foo("bar");
        expect(obj.argumentsFor("foo").toString()).to(equal, [["bar"]].toString());
      });
    });

    it("should have two arguments when given", function() {
      spy.spyOn(obj, function() {
        obj.foo(1, 2);
        expect(obj.argumentsFor("foo").toString()).to(equal, [[1,2]].toString());
      });
    });

    it("should use the correct method", function() {
      stubber.stub(obj, "bar");

      spy.spyOn(obj, function() {
        obj.bar(1, 2);
        expect(obj.argumentsFor("bar").toString()).to(equal, [[1,2]].toString());
      });
    });

    it("should return undefined if the method was never called", function() {
      spy.spyOn(obj, function() {
        expect(obj.argumentsFor("bar")).to(equal, undefined);
      });
    });

    it("should return an array when passed an array", function() {
      var an_object = {};
      stubber.stub(an_object, "foo");

      spy.spyOn(an_object, function() {
        an_object.foo([]);
        expect(an_object.argumentsFor("foo").toString()).to(equal, [[[]]].toString());
      });
    });

    it("should return two pairs of arguments if called twice", function() {
      spy.spyOn(obj, function() {
        obj.foo();
        obj.foo();
        expect(obj.argumentsFor("foo").toString()).to(equal, [[], []].toString());
      });
    });
  });
});
