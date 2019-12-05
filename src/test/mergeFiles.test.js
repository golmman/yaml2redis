const { expect } = require('chai');

const someFunction = require('../lib/someFunction');

describe('someFunction', function tests() {
    this.timeout(10000);

    it('returns 4', () => {
        expect(someFunction(context)).to.equal(4);
    });
});
