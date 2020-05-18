/**
 * 获取日服商品列表，按发售时间排序。
 *
 * @export
 * @param {number} [page=1]
 * @param {number} [limit=20]
 * @returns
 */
export declare function getJapanGoods(page?: number, limit?: number): Promise<{
    games: any[];
    total: number;
}>;
/**
 * 获取日服商品详情，用于获取补充信息
 *
 * @export
 * @param {string} nsuid
 * @param {string} sform
 * @returns
 */
export declare function getJapanGoodsDetail(nsuid: string, sform: string): Promise<{
    gallery?: undefined;
    title?: undefined;
    cover?: undefined;
    size?: undefined;
    release_date?: undefined;
} | {
    gallery: any;
    title: any;
    cover: any;
    size: string;
    release_date: any;
}>;
/**
 * 获取所有日服商品
 *
 * @export
 * @returns
 */
export declare function getAllJapanGoods(): Promise<{
    games: any[];
    total: number;
}>;
