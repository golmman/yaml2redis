const path = require('path');

const { getAppContext } = require('./appContext');

class Logger {
    constructor(label = 'label?') {
        const context = getAppContext();

        this.label = label;
        this.stage = context.stage || 'st?';
        this.logLevel = context.logLevel || 'debug';

        const levels = {
            error: 3,
            warn: 2,
            info: 1,
            debug: 0,
        };

        const logFunction = this.stage === 'dev'
            ? (lev, msg) => this.logPretty(lev, msg)
            : (lev, msg) => this.logJson(lev, msg);

        this.error = levels[this.logLevel] <= levels.error
            ? message => logFunction('error', message)
            : () => { };

        this.warn = levels[this.logLevel] <= levels.warn
            ? message => logFunction('warn', message)
            : () => { };

        this.info = levels[this.logLevel] <= levels.info
            ? message => logFunction('info', message)
            : () => { };

        this.debug = levels[this.logLevel] <= levels.debug
            ? message => logFunction('debug', message)
            : () => { };
    }

    createStatement(level, message) {
        return {
            timestamp: new Date().toISOString(),
            level,
            stage: this.stage,
            label: this.label,
            message,
        };
    }

    static prettyfy(statement) {
        const padding = {
            level: 5,
            stage: 3,
            basename: 15,
        };

        const padString = (string, length) => string.substring(0, length).padEnd(length);

        const basename = path.basename(statement.label);

        const parts = [];
        parts.push('>>>');
        parts.push(statement.timestamp);
        parts.push(padString(statement.level, padding.level));
        parts.push(padString(statement.stage, padding.stage));
        parts.push(padString(basename, padding.basename));
        parts.push(statement.message);

        return parts.join(' | ');
    }

    static stringify(statement) {
        return JSON.stringify(statement);
    }

    logJson(level, message) {
        const statement = this.createStatement(level, message);

        // eslint-disable-next-line no-console
        console.log(Logger.stringify(statement));
    }

    logPretty(level, message) {
        const statement = this.createStatement(level, message);

        // eslint-disable-next-line no-console
        console.log(Logger.prettyfy(statement));
    }
}

module.exports = Logger;
