"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = require("@favware/querystring");
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const cheerio = __importStar(require("cheerio"));
const lodash_1 = require("lodash");
const constants_1 = require("../constants");
const async_retry_1 = __importDefault(require("async-retry"));
/**
 * 获取美服商品列表。
 * 默认按发售时间从新到旧排序。
 * 每个筛选结果最多可获取前 1000 条数据，若要获取全部商品，请使用 getAllAmericaGoods
 *
 * @export
 * @param {number} [page=1]
 * @param {number} [limit=20] 上限200
 * @param {(string[][] | [])} [facetFilters=[]]
 * @returns {Promise<any>}
 */
async function getAmericaGoods(page = 1, limit = 20, facetFilters = []) {
    if (limit > 200)
        throw new Error('每页最多请求200条数据');
    const parseHit = (hit) => lodash_1.omit(hit, [
        'lastModified',
        'objectID',
        '_highlightResult',
        'gallery',
    ]);
    const { results: [{ hits, nbHits: total, }], } = await request_promise_native_1.default(constants_1.US.GOODS_LIST_URL, {
        method: 'POST',
        qs: constants_1.US.QUERY,
        headers: { 'Content-Type': 'application/json' },
        body: {
            requests: [
                {
                    indexName: constants_1.US.INDEX_NAME,
                    params: querystring_1.stringify({
                        facetFilters: JSON.stringify([
                            ['platform:Nintendo Switch'],
                            ['filterShops:On Nintendo.com'],
                        ].concat(facetFilters)),
                        hitsPerPage: limit,
                        page: page - 1,
                    }),
                },
            ],
        },
        json: true,
    });
    return {
        total,
        games: hits.map(parseHit),
    };
}
exports.getAmericaGoods = getAmericaGoods;
/**
 * 抓取美服商品详情，获取额外的补充信息。
 * 特别重要的是 productCode 信息，这个列表中拿不到。
 *
 * @export
 * @param {string} url 从列表那边获取
 * @returns
 */
async function getAmericaGoodsDetail(url) {
    const parseHtml = (html) => {
        const $ = cheerio.load(html);
        const productCodeNode = $.html().match(/(?<=productCode\:\ \")[A-Z\d]{9}/);
        return {
            title: $('.title h1').text(),
            // cover: $('span.boxart img').attr('src'),
            productCode: productCodeNode && productCodeNode[0] || 0,
            gallery: $('.item img').map(({}, el) => $(el).attr('data-src')).get(),
            size: $("[itemprop|='romSize']").text().replace(/\\n/, '').trim(),
        };
    };
    const targetUrl = constants_1.US.GOODS_DETAIL_DOMAIN + url;
    const html = await request_promise_native_1.default(targetUrl);
    return parseHtml(html);
}
exports.getAmericaGoodsDetail = getAmericaGoodsDetail;
/**
 * 抓取所有美服商品
 *
 * @export
 * @returns
 */
async function getAllAmericaGoods() {
    const facetFilters = constants_1.US.FACET_FILTERS.PRICE;
    const getFilterGames = async (facetFilter) => {
        let results = [];
        let page = 1;
        let currentData;
        const run = async () => {
            // 重试10次
            currentData = await async_retry_1.default(async () => await getAmericaGoods(page, 200, [[facetFilter]]));
            results = results.concat(currentData.games);
            while (currentData.games.length + ((page - 1) * 200) < currentData.total) {
                page = page + 1;
                await run();
            }
        };
        await run();
        return results;
    };
    const games = lodash_1.flatten(await Promise.all(facetFilters.map(getFilterGames)));
    return {
        games,
        total: games.length,
    };
}
exports.getAllAmericaGoods = getAllAmericaGoods;
