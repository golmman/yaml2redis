const Logger = require('./util/Logger');

/**
 * Performs tasks.
 * @param {object} context The apps context.
 * @returns {number} Returns 4.
 */
module.exports = (context) => {
    const logger = new Logger(context, module.filename);
    logger.warn('Hello from someFunction!');

    return 4;
};
