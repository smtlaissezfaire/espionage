describe("Espionage", function() {
  describe("global methods", function() {
    describe("stub", function() {
      before(function() {
        Espionage.Stub.teardown();
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
