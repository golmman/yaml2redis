const { getRedis } = require('./util/redisClient');
const Logger = require('./util/Logger');

function removeElements(array, elementsToRemove) {
    return array.filter(element => !elementsToRemove.includes(element));
}

module.exports = async ({ ignoredKeys, entries }) => {
    const logger = new Logger(module.filename);

    logger.info('TEST');

    const redis = getRedis();

    const entryMap = new Map(entries);

    const allNewKeys = [...entryMap.keys()];
    const allOldKeys = await redis.keys('*');

    const newKeys = removeElements(allNewKeys, ignoredKeys);
    const oldKeys = removeElements(allOldKeys, [...newKeys, ...ignoredKeys]);

    const newEntryMap = new Map(newKeys.map(key => [key, entryMap.get(key)]));

    redis.mset(newEntryMap);
    redis.del(...oldKeys);
};
