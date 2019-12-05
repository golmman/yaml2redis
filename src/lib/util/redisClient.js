const IORedis = require('ioredis');

let redis;

/**
 * @returns {IORedis.Redis}
 */
function getRedis() {
    if (!redis) {
        throw new Error('There is no initialized redis client.');
    }

    return redis;
}

async function initRedis({ host = 'localhost', port = 6379 } = { host: 'localhost', port: 6379 }) {
    if (redis) {
        await redis.quit();
    }
    redis = new IORedis({ host, port });
}

async function quitRedis() {
    if (!redis) {
        throw new Error('There is no initialized redis client.');
    }

    await redis.quit();
    redis = undefined;
}

module.exports = {
    getRedis,
    initRedis,
    quitRedis,
};
