const { expect } = require('chai');
const { initAppContext } = require('../lib/util/appContext');
const { getRedis, initRedis, quitRedis } = require('../lib/util/redisClient');

const jsonMapToRedis = require('../lib/jsonMapToRedis');

const executedExample = {
    ignoredKeys: [
        'key0',
        'key2',
    ],
    entries: [
        ['key1', 'new1'],
        ['key2', 'new2'],
        ['key4', 'new4'],
    ],
};

const redisIs = [
    ['key0', 'old0'],
    ['key1', 'old1'],
    ['key2', 'old2'],
    ['key3', 'old3'],
    ['key4', 'old4'],
    ['key5', 'old5'],
];

const redisShould = [
    ['key0', 'old0'],
    ['key1', 'new1'],
    ['key2', 'old2'],
    ['key4', 'new4'],
];

async function initTestRedis() {
    const redis = getRedis();

    await redis.flushall();
    await redis.mset(new Map(redisIs));
}

async function getRedisEntries() {
    const redis = getRedis();

    const keys = await redis.keys('*');
    const values = await redis.mget(keys);

    const entries = keys.map((key, i) => [key, values[i]]);
    return entries;
}

async function backupRedis() {
    const entries = await getRedisEntries();
    return new Map(entries);
}

async function restoreRedis(map) {
    const redis = getRedis();

    await redis.flushall();
    await redis.mset(map);
}


async function prepare() {
    const redisAsMap = await backupRedis();
    await initTestRedis();

    return {
        redisAsMap,
    };
}

async function execute(testContext) {
    const redis = getRedis();
    const dbSizeBefore = await redis.dbsize();
    await jsonMapToRedis(executedExample);
    const dbSizeAfter = await redis.dbsize();
    const redisEntriesAfter = await getRedisEntries();

    return {
        ...testContext,
        dbSizeBefore,
        dbSizeAfter,
        redisEntriesAfter,
    };
}

async function expectTest(testContext) {
    await restoreRedis(testContext.redisAsMap);

    expect(testContext.dbSizeBefore).to.equal(6);
    expect(testContext.dbSizeAfter).to.equal(4);
    expect(new Map(testContext.redisEntriesAfter)).to.deep.equal(new Map(redisShould));
}

describe.only(module.filename, () => {
    before(async () => {
        initAppContext({ logLevel: 'debug', stage: 'dev' });
        await initRedis();
    });

    after(async () => {
        await quitRedis();
    });

    it('test',
        () => Promise.resolve()
            .then(prepare)
            .then(execute)
            .then(expectTest));
});
