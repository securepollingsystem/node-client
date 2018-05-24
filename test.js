const assert = require('chai').assert,
  {User, blindKey} = require('./user');

describe('User', function() {
  beforeEach(function() {
    this.user = new User();
  });

  it("generates keys", function() {
    this.user.generateKeypair();
  });

  it('blindKey', function() {
  });
})

