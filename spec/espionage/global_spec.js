describe("Espionage", function() {
  describe("global methods", function() {
    describe("stub", function() {
      before(function() {
        Espionage.Stub.teardown();
      });

      it("should stub a value on an object", function() {
        var obj = {};
        obj.stub("foo", 1);
        obj.foo().should.equal(1);
      });

      it("should stub a value on an object as undefined if not given", function() {
        var obj = {};
        obj.stub("foo");
        obj.foo().should.equal(undefined);
      });

      it("should delete the property of an object which wasn't defined after teardown", function() {
        var obj = {};

        obj.stub("foo");
        Espionage.Stub.teardown();
        obj.hasOwnProperty("foo").should.be(false);
      });

      it("should not delete the property if set to undefined before stubbing", function() {
        var obj = {};

        obj.foo = undefined;
        obj.stub("foo");
        Espionage.Stub.teardown();

        obj.hasOwnProperty("foo").should.be(true);
      });

      it("should restore a prototype property appropriately", function() {
        // pending:
        // var proto = {
        //   foo: "bar"
        // };
        //
        // var obj = Espionage.Helpers.clone(proto);
        // obj.stub("foo");
        //
        // Espionage.Stub.teardown();
        //
        // obj.foo.should.equal("bar");
      });
    });
  });
});
