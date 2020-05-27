"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const lodash_1 = require("lodash");
const constants_1 = require("../constants");
/**
 * 获取欧服商品列表
 *
 * @export
 * @param {number} [page=1]
 * @param {number} [limit=20]
 * @returns {Promise<{ games: any[], total: number}>}
 */
async function getEuropeGoods(page = 1, limit = 20) {
    if (limit > 9999)
        throw new Error('每页最多请求9999条数据');
    // 晚点再完善
    const parseDocs = (doc) => (Object.assign({ nsuid: doc.nsuid_txt && doc.nsuid_txt[0], product_code: doc.product_code_txt && (doc.product_code_txt[0]).trim() }, lodash_1.omit(doc, [
        'fs_id', 'change_date', '_version_', 'wishlist_email_banner460w_image_url_s',
    ])));
    const start = (page - 1) * limit;
    if (start < 0)
        throw new Error('page and limit must be greater than 0');
    const { response: { numFound: total, docs } } = await request_promise_native_1.default(constants_1.EU.GOODS_LIST_URL, {
        qs: Object.assign({ start, rows: limit }, constants_1.EU.GOODS_LIST_OPTIONS),
        json: true,
    });
    return {
        total,
        games: docs.map(parseDocs),
    };
}
exports.getEuropeGoods = getEuropeGoods;
/**
 * 获取欧服全部商品
 * 此接口很有可能超时。若超时，请用 getEuropeGoods 遍历。
 *
 * @export
 * @returns
 */
async function getAllEuropeGoods() {
    return await getEuropeGoods(1, 9999);
}
exports.getAllEuropeGoods = getAllEuropeGoods;
