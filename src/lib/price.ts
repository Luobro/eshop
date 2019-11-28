import { default as request } from 'request-promise-native';
import { PRICE } from '../constants';

/**
 * 根据 nsuid 和 region 获取商品价格
 *
 * @export
 * @param {(string | string[])} nsuid 可以传单个，也可以传数组
 * @param {string} region 商店地区。列表请见 ../constans.ts
 * @returns
 */
export async function getPrice(nsuid: string | string[], region: string) {
  const { prices } = await request(PRICE.URL, {
    qs: {
      country: region,
      lang: 'en',
      ids: nsuid,
    },
    json: true,
  });

  return prices;
}
