## API

1. getAmericaGoods
2. getAmericaGoodsDetail
3. getAllAmericaGoods
4. getEuropeGoods
5. getAllEuropeGoods
6. getJapanGoods
7. getJapanGoodsDetail
8. getAllJapanGoods
9. getPrice

## 使用方法

``` typescript
import {getAmericaGoods} from 'eshop';

async function run() {
  const res = await getAmericaGoods(1,20);
  console.log(res);
}
```

## 未决问题

* [ ] 美服、欧服 DLC 商品
* [ ] 统一商品数据返回格式
* [ ] 港、台、韩服的抓取