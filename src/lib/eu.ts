import { default as request } from 'request-promise-native';
import { omit } from 'lodash';
import { EU } from '../constants';

/**
 * 获取欧服商品列表
 *
 * @export
 * @param {number} [page=1]
 * @param {number} [limit=20]
 * @returns {Promise<{ games: any[], total: number}>}
 */
export async function getEuropeGoods(
  page: number = 1,
  limit: number = 20,
): Promise<{ games: any[], total: number}> {
  if (limit > 9999) throw new Error('每页最多请求9999条数据');

  // 晚点再完善
  const parseDocs = (doc: any) => ({
    nsuid: doc.nsuid_txt && doc.nsuid_txt[0],
    product_code: doc.product_code_txt && (doc.product_code_txt[0]).trim(),
    ...omit(doc, [
      'fs_id', 'change_date', '_version_', 'wishlist_email_banner460w_image_url_s',
    ]),
  });

  const start = (page - 1) * limit;
  if (start < 0) throw new Error('page and limit must be greater than 0');

  const { response: { numFound: total, docs } } = await request(EU.GOODS_LIST_URL, {
    qs: {
      start,
      rows: limit,
      ...EU.GOODS_LIST_OPTIONS,
    },
    json: true,
  });

  return {
    total,
    games: docs.map(parseDocs),
  };
}

/**
 * 获取欧服全部商品
 * 此接口很有可能超时。若超时，请用 getEuropeGoods 遍历。
 *
 * @export
 * @returns
 */
export async function getAllEuropeGoods(): Promise<{ games: any[], total: number}> {
  return await getEuropeGoods(1, 9999);
}
