const Logger = require('./util/Logger');
const { initAppContext } = require('./util/appContext');

function app() {
    initAppContext({ logLevel: 'debug', stage: 'dev' });
    const logger = new Logger(module.filename);

    logger.debug('Hi this is debug!');
    logger.info('Hi this is an info!');
    logger.warn('Hi this is a warning!');
    logger.error('Hi this is an error! BLA');
}

app();
