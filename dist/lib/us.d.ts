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
export declare function getAmericaGoods(page?: number, limit?: number, facetFilters?: string[][] | []): Promise<{
    games: any[];
    total: number;
}>;
/**
 * 抓取美服商品详情，获取额外的补充信息。
 * 特别重要的是 productCode 信息，这个列表中拿不到。
 *
 * @export
 * @param {string} url 从列表那边获取
 * @returns
 */
export declare function getAmericaGoodsDetail(url: string): Promise<{
    title: string;
    productCode: string | number;
    gallery: any[];
    size: string;
}>;
/**
 * 抓取所有美服商品
 *
 * @export
 * @returns
 */
export declare function getAllAmericaGoods(): Promise<{
    games: any[];
    total: number;
}>;
