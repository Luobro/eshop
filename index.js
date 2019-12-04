const eshop = require('.');
(async () => {
  const games = await eshop.getAmericaGoods(1, 1);
  console.log(games);
})() 