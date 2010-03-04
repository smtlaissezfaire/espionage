describe("Espionage", function() {
  it("should be at version 0.2.0", function() {
    Espionage.version.should.equal("0.2.0");
  });

  describe("stub", function() {
    it("should be the same as Espionage.Stubber.stub", function() {
      Espionage.stub.should.equal(Espionage.Stub.stub);
    });
  });

  describe("spyOn", function() {
    it("should be the same as Espionage.Spy.spyOn", function() {
      Espionage.spyOn.should.equal(Espionage.Spy.spyOn);
    });
  });

  describe("tearDown", function() {
    before_each(function() {
      Espionage.Stub.tearDown();

      spy = Espionage.Helpers.clone(Espionage);
    });

    it("should call the stub's teardown function", function() {
      var received = false;

      spy.stub(Espionage.Stub, "tearDown", function() {
        received = true;
      });

      spy.tearDown();

      received.should.be(true);
    });

    it("should call the spy's teardown function", function() {
      var received = false;

      spy.stub(Espionage.Spy, "tearDown", function() {
        received = true;
      });

      spy.tearDown();

      received.should.be(true);
    });
  });
});