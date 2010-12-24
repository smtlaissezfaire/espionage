describe("Espionage", function() {
  describe("global methods", function() {
    describe("stub", function() {
      it("should restore a prototype property appropriately", function() {
        var proto = {
          foo: "bar"
        };

        var obj = Espionage.Helpers.clone(proto);
        spy.stub("foo");

        spy.tearDown();

        obj.foo.should.equal("bar");
      });
    });

    describe("spy", function() {
      it("should restore a property appropriately", function() {
        // pending:
        var fun = function() { return "original"; };

        var obj = {
          foo: fun
        };

        obj.foo.should.equal(fun);

        spy.spyOn(obj, function() {});
        spy.tearDown();

        obj.foo.should.equal(fun);
      });
    });
  });

  describe("extending the object namespace", function() {
    it("should add stub", function() {
      Espionage.dirty();

      var obj = {};
      obj.stub("foo");
      obj.foo().should.equal(undefined);

      Espionage.clean();
    });

    it("should restore the old stub method after calling clean", function() {
      var obj = {};

      Espionage.dirty();
      Espionage.clean();

      obj.stub.should.be(undefined);
    });

    it("should really restore it to it's old value", function() {
      Espionage.stub(Object.prototype, "stub", "something");

      Espionage.dirty();
      Espionage.clean();

      Object.stub().should.equal("something");
    });

    it("should add spyOn and clean it up when done", function() {
      Espionage.dirty();

      var obj = {};
      typeof(obj.spyOn).should.equal("function");

      Espionage.clean();

      typeof(obj.spyOn).should.equal("undefined");
    });

    it("should add intercepted and clean it up when done", function() {
      Espionage.dirty();

      var obj = {};
      typeof(obj.intercepted).should.equal("function");

      Espionage.clean();

      typeof(obj.intercepted).should.equal("undefined");
    });

    it("should keep the arguments the same for spyOn", function() {
      Espionage.dirty();

      var obj = {};
      obj.stub("foo");

      spyOn(obj, function() {
        obj.foo();

        obj.intercepted("foo").should.equal(true);
      });

      Espionage.clean();
    });
  });
});
