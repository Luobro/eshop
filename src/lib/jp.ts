import { default as request } from 'request-promise-native';
import * as cheerio from 'cheerio';
import { omit, flatten } from 'lodash';
import { JP } from '../constants';
import { default as retry } from 'async-retry';

/**
 * 获取日服商品列表，按发售时间排序。
 *
 * @export
 * @param {number} [page=1]
 * @param {number} [limit=20]
 * @returns
 */
export async function getJapanGoods(
  page: number = 1,
  limit: number = 20,
): Promise<{ games: any[], total: number}> {
  if (limit > 300) throw new Error('每页最多请求300条数据');

  const queryStringify = (obj: any) => {
    const sep = '&';
    const eq = '=';
    return Object.keys(obj).map((k) => {

      if (Array.isArray(obj[k])) {
        const ks = `${encodeURIComponent(k)}[]${eq}`;
        return obj[k].map((v: any) => {
          return ks + encodeURIComponent(v);
        }).join(sep);
      }

      const ks = encodeURIComponent(k) + eq;
      return ks + encodeURIComponent(obj[k]);
    }).filter(Boolean).join(sep);
  };

  const query = queryStringify({
    limit,
    page,
    opt_hard: ['1_HAC'],
    opt_ssitu: ['onsale', 'preorder'],
    opt_sform: ['HAC_DOWNLOADABLE', 'DL_DLC', 'HAC_DL'],
  });

  const parseItem = (item: any) => omit(item, [
    'id', 'iurl', 'yomi', 'sicon', 'n3ds', 'cont', 'sprice', 'ssdate', 'sedate', 'sslurl', 'siurl',
  ]);

  const {
    result: {
      items,
      total,
    },
  } = await request(`${JP.GOODS_LIST_URL}?${query}`, { json: true });

  return {
    total,
    games: items.map(parseItem),
  };
}

/**
 * 获取日服商品详情，用于获取补充信息
 *
 * @export
 * @param {string} nsuid
 * @param {string} sform
 * @returns
 */
export async function getJapanGoodsDetail(nsuid: string, sform: string) {
  let type: string;
  const parseHtml = (html: string) => {
    if (!html) return {};
    const $ = cheerio.load(html);

    const jsonDataMatch = $.html().match(/(?<=NXSTORE\.titleDetail\.jsonData\s=\s)\{[.\s\S]*?\}(?=\;)/);
    if (!jsonDataMatch) throw new Error('找不到jsonData');
    const {
      formal_name,
      hero_banner_url,
      screenshots,
      total_rom_size,
      release_date_on_eshop,
    } = JSON.parse(jsonDataMatch && jsonDataMatch[0]) || {} as any;

    let gallery;
    try {
      gallery = screenshots && screenshots.map((item: any) => item.images[0].url);
    } catch (error) {
      console.log(error);
      gallery = [];
    }

    return {
      gallery,
      title: formal_name,
      cover: hero_banner_url,
      size: `${((total_rom_size || 0) / 1024 / 1024)}MB`,
      release_date: release_date_on_eshop,
    };
  };

  switch (sform) {
    case 'HAC_DL':
      type = 'titles';
      break;
    case 'HAC_DOWNLOADABLE':
      type = 'titles';
      break;
    case 'DL_DLC':
      type = 'bundles';
      break;
    default:
      throw new Error('item.sform 类型错误');
  }

  const html = await request(`${JP.GOODS_DETAIL_URL}/${type}/${nsuid}`);
  return parseHtml(html);
}

/**
 * 获取所有日服商品
 *
 * @export
 * @returns
 */
export async function getAllJapanGoods() {
  const getArray = (length: number): number[] => Array(length).fill(1).map(({}, i) => i + 1);
  let { games, total } = await getJapanGoods(1, 300);

  if (total <= 300) return { games, total };

  const remainPages = getArray(Math.ceil((total - 300) / 300)).map(x => x + 1);
  const rawGoods = await Promise.all(
    remainPages.map(page => retry(() => getJapanGoods(page, 300))),
  );

  games = games.concat(flatten(rawGoods.map(result => result.games)));
  total = games.length;

  return { games, total };
}
