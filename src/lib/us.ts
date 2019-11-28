import { stringify } from '@favware/querystring';
import { default as request } from 'request-promise-native';
import * as cheerio from 'cheerio';
import { omit, flatten } from 'lodash';
import { US } from '../constants';
import { default as retry } from 'async-retry';

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
export async function getAmericaGoods(
  page: number = 1,
  limit: number = 20,
  facetFilters: string[][] | [] = [],
): Promise<{ games: any[], total: number}> {

  if (limit > 200) throw new Error('每页最多请求200条数据');

  const parseHits = (hits: any) => omit(hits, [
    'lastModified',
    'objectID',
    '_highlightResult',
    'gallery',
  ]);

  const {
    results: [{
      hits,
      nbHits: total,
    }],
  } = await request(US.GOODS_LIST_URL, {
    method: 'POST',
    qs: US.QUERY,
    headers: { 'Content-Type': 'application/json' },
    body: {
      requests: [
        {
          indexName: US.INDEX_NAME,
          params: stringify({
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
    games: hits.map(parseHits),
  };
}

/**
 * 抓取美服商品详情，获取额外的补充信息。
 * 特别重要的是 productCode 信息，这个列表中拿不到。
 *
 * @export
 * @param {string} url 从列表那边获取
 * @returns
 */
export async function getAmericaGoodsDetail(url: string) {
  const parseHtml = (html: string) => {
    const $ = cheerio.load(html);
    const productCodeNode = $.html().match(/(?<=productCode\:\ \")[A-Z\d]{9}/);
    return {
      title: $('.title h1').text(),
      // cover: $('span.boxart img').attr('src'),
      productCode: productCodeNode && productCodeNode[0] || 0,
      gallery: $('.item img').map(({ }, el) => $(el).attr('data-src')).get(),
      size: $("[itemprop|='romSize']").text().replace(/\\n/, '').trim(),
    };
  };

  const targetUrl = US.GOODS_DETAIL_DOMAIN + url;
  const html = await request(targetUrl);

  return parseHtml(html);
}

/**
 * 抓取所有美服商品
 *
 * @export
 * @returns
 */
export async function getAllAmericaGoods(): Promise<{ games: any[], total: number}> {
  const facetFilters: string[] = US.FACET_FILTERS.PRICE;
  const getFilterGames = async (facetFilter: string) => {
    let results: any[] = [];
    let page = 1;
    let currentData: { games: any[], total: number };

    const run = async (): Promise<void> => {
      // 重试10次
      currentData = await retry(async() => await getAmericaGoods(page, 200, [[facetFilter]]));
      results = results.concat(currentData.games);
      while (currentData.games.length + ((page - 1) * 200) < currentData.total) {
        page = page + 1;
        await run();
      }
    };

    await run();
    return results;
  };

  const games: any[] = flatten(await Promise.all(facetFilters.map(getFilterGames)));
  return {
    games,
    total: games.length,
  };
}
