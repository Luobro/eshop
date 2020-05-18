/**
 * 根据 nsuid 和 region 获取商品价格
 *
 * @export
 * @param {(string | string[])} nsuid 可以传单个，也可以传数组
 * @param {string} region 商店地区。列表请见 ../constans.ts
 * @returns
 */
export declare function getPrice(nsuid: string | string[], region: string): Promise<any>;
