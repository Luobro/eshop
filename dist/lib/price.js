"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const constants_1 = require("../constants");
/**
 * 根据 nsuid 和 region 获取商品价格
 *
 * @export
 * @param {(string | string[])} nsuid 可以传单个，也可以传数组
 * @param {string} region 商店地区。列表请见 ../constans.ts
 * @returns
 */
async function getPrice(nsuid, region) {
    const { prices } = await request_promise_native_1.default(constants_1.PRICE.URL, {
        qs: {
            country: region,
            lang: 'en',
            ids: nsuid,
        },
        json: true,
    });
    return prices;
}
exports.getPrice = getPrice;
