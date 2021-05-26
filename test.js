const expect = require('chai').expect;
const myapp = require(".");

describe('Testing printMsg function, should return "Hello World!" ', () => {
	it('Should Return Hello World!', () => {
         	expect(myapp.printMsg()).to.equal("Hello World!");
	});
});
