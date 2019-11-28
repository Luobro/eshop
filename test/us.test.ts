import assert from 'assert';
import { getAmericaGoods, getAmericaGoodsDetail, getAllAmericaGoods} from  '../src/index';

describe('us', () => {
  it.skip('should get game list', async () => {
    const result = await getAmericaGoods(1, 1);
    assert(result.games.length === 1);
  });
  it.skip('should get game detail', async () => {
    const result = await getAmericaGoodsDetail('/games/detail/resident-evil-5-switch');
    assert(result.title);
  });
  it.skip('should get all games', async () => {
    const result = await getAllAmericaGoods();
    assert(result.total > 0);
    console.log(`获得了${result.total}件商品`);
  });
});
