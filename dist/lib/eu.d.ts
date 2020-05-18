/**
 * 获取欧服商品列表
 *
 * @export
 * @param {number} [page=1]
 * @param {number} [limit=20]
 * @returns {Promise<{ games: any[], total: number}>}
 */
export declare function getEuropeGoods(page?: number, limit?: number): Promise<{
    games: any[];
    total: number;
}>;
/**
 * 获取欧服全部商品
 * 此接口很有可能超时。若超时，请用 getEuropeGoods 遍历。
 *
 * @export
 * @returns
 */
export declare function getAllEuropeGoods(): Promise<{
    games: any[];
    total: number;
}>;
