import assert from 'assert';
import { getPrice } from  '../src/index';

describe('price', () => {
  it('should get single', async () => {
    const result = await getPrice('70010000000151', 'GB');
    assert(result);
  });

  it('should get multi', async () => {
    const result = await getPrice(['70010000000151', '70010000015958'], 'GB');
    assert(result.length === 2);
  });
});
