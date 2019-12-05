const { expect } = require('chai');

const Logger = require('../lib/util/Logger');

describe('Logger', function tests() {
    this.timeout(10000);

    it('constructs, creates and processes logging statements', () => {
        const logger = new Logger({ logLevel: 'debug', stage: 'dev' }, module.filename);

        const message = 'test-message';
        const statement = logger.createStatement('info', message);

        const stringified = Logger.stringify(statement);
        expect(stringified).to.include(message);

        const prettyfied = Logger.prettyfy(statement);
        expect(prettyfied).to.include(message);
    });
});
