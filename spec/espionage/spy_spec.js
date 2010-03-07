describe("Spy", function() {
  before_each(function() {
    obj = {};
  });

  describe("spyOn", function() {
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
          spy.received(obj, "foo");
        } catch (e) {
          e.name.should.equal("MockExpectationError");
          e.message.should.equal("expected foo but never got it");
        }
      });
    });

    it("should use the correct function name", function() {
      spy.spyOn(obj, function() {
        try {
          spy.received(obj, "bar");
        } catch (e) {
          e.name.should.equal("MockExpectationError");
          e.message.should.equal("expected bar but never got it");
        }
      });
    });

    it("should report true when receiving a message", function() {
      spy.stub(obj, "foo");

      spy.spyOn(obj, function() {
        obj.foo();
        expect(spy.received(obj, "foo")).to(be_true);
      });
    });

    it("should be able to reset the received status", function() {
      spy.stub(obj, "foo");

      spy.spyOn(obj, function() {
        obj.foo();
      });

      spy.Spy.tearDown(obj);

      spy.spyOn(obj, function() {
        try {
          spy.received(obj, "foo");
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
        expect(spy.received(obj, "bar")).to(be_true);
      });
    });

    it("should not redefine a property which is not a method", function() {
      obj.bar = 7;

      spy.spyOn(obj, function() {
        expect(obj.bar).to(equal, 7);
      });
    });

    it("should raise an error", function() {
      spy.stub(obj, "foo");

      spy.spyOn(obj, function() {
        obj.foo();

        try {
          spy.received(obj, "bar");
        } catch (e) {
          e.name.should.equal("MockExpectationError");
        }
      });
    });

    it("should raise an error for a method which is not defined", function() {
      spy.spyOn(obj, function() {
        try {
          spy.received(obj, "baz");
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
        expect(spy.received(obj, "bar")).to(be_true);
      });
    });

    it("should not add an function onto the object executing", function() {
      var obj = {};

      spy.spyOn(obj, function() {
        obj.hasOwnProperty("received").should.be(false);
      });
    });
  });
});
