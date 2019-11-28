import assert from 'assert';
import { getJapanGoods, getJapanGoodsDetail, getAllJapanGoods } from  '../src/index';

describe('jp', () => {
  it.only('should get game list', async () => {
    const result = await getJapanGoods(1, 1);
    assert(result.games.length === 1);
    console.log(result.total);
  });
  it('should get game detail', async () => {
    const result = await getJapanGoodsDetail('70010000013977', 'HAC_DOWNLOADABLE');
    assert(result.title);
  });
  it('should get all games', async () => {
    const result = await getAllJapanGoods();
    assert(result.games.length > 1);
    console.log(result.total);
    console.log(result.games[0]);
  });
});
