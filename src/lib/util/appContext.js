let context;

function readArgv(processArgv, name) {
    const arg = processArgv.find(a => a.includes(`--${name}=`));
    if (arg) {
        return arg.split('=')[1];
    }
    return null;
}

function initAppContextFromProcessArgv() {
    const processArgv = process.argv;

    context = {
        logLevel: readArgv(processArgv, 'logLevel'),
        stage: readArgv(processArgv, 'stage'),
    };
}

function initAppContext({ logLevel, stage }) {
    context = { logLevel, stage };
}

function getAppContext() {
    if (!context) {
        throw new Error('There is no initialized redis client.');
    }

    return context;
}

module.exports = {
    initAppContext,
    initAppContextFromProcessArgv,
    getAppContext,
};
