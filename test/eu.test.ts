import assert from 'assert';
import { getEuropeGoods, getAllEuropeGoods } from  '../src/index';

describe('eu', () => {
  it('should get game list', async () => {
    const result = await getEuropeGoods(1, 1);
    assert(result);
    console.log(result);
  });

  it.skip('should get all games', async () => {
    const result = await getAllEuropeGoods();
    assert(result);
    console.log(result.games.length);
  });
});
