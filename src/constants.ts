export const B_REGION = {
  US: [
    'US',
    'CA',
    'MX',
    'BR',
    'CO',
    'AR',
    'CL',
    'PE',
  ],
  EU: [
    'AU',
    'NZ',
    'AT',
    'NL',
    'BE',
    'CZ',
    'DK',
    'DE',
    'ES',
    'FI',
    'FR',
    'GR',
    'HU',
    'IL',
    'IT',
    'NO',
    'PL',
    'PT',
    'RU',
    'ZA',
    'SE',
    'CH',
    'GB',
    'IE',
  ],
  JP: [
    'JP',
  ],
};

export const REGIONS_CN = {
  JP: '日本',
  KR: '韩国',
  TW: '中国台湾',
  HK: '中国香港',
  AU: '澳大利亚',
  NZ: '新西兰',
  AT: '奥地利',
  NL: '荷兰',
  BE: '比利时',
  CZ: '捷克',
  DK: '丹麦',
  DE: '德国',
  ES: '西班牙',
  FI: '芬兰',
  FR: '法国',
  GR: '希腊',
  HU: '匈牙利',
  IL: '以色列',
  IT: '意大利',
  NO: '挪威',
  PL: '波兰',
  PT: '葡萄牙',
  RU: '俄罗斯',
  ZA: '南非',
  SE: '瑞典',
  CH: '瑞士',
  GB: '英国',
  IE: '爱尔兰',
  US: '美国',
  CA: '加拿大',
  MX: '墨西哥',
  BR: '巴西',
  CO: '哥伦比亚',
  AR: '阿根廷',
  CL: '智利',
  PE: '秘鲁',
};

export const CURRENCY_CN = {
  EUR: '欧元',
  CAD: '加拿大元',
  USD: '美元',
  MXN: '墨西哥比索',
  GBP: '英镑',
  PLN: '波兰兹罗提',
  CZK: '捷克克朗',
  CHF: '瑞士法郎',
  DKK: '丹麦克朗',
  NOK: '挪威克朗',
  SEK: '瑞典克朗',
  JPY: '日圆',
  RUB: '俄罗斯卢布',
  ZAR: '南非兰特',
  COP: '哥伦比亚比索',
  CLP: '智利比索',
  BRL: '巴西雷亚尔',
  ARS: '阿根廷比索',
  PEN: '秘鲁索尔',
  AUD: '澳大利亚元',
  NZD: '新西兰元',
  HKD: '港币',
  KRW: '韩圆',
  ILS: '以色列新谢克尔',
};

export const GENRES_CN = {
  action: '动作',
  adventure: '冒险',
  application: '应用',
  education: '教育',
  fitness: '健身',
  music: '音乐',
  party: '派对',
  puzzle: '解谜',
  racing: '竞速',
  'role-playing': '角色扮演',
  rpg: '角色扮演',
  simulation: '模拟',
  sports: '运动',
  strategy: '策略',
  platformer: '平台',
  multiplayer: '多人',
  other: '其他',
  arcade: '街机',
  fighting: '格斗',
  traning: '训练',
};

export const US = {
  GOODS_LIST_URL: 'https://U3B6GR4UA3-dsn.algolia.net/1/indexes/*/queries',
  QUERY: {
    'x-algolia-api-key': '9a20c93440cf63cf1a7008d75f7438bf',
    'x-algolia-application-id': 'U3B6GR4UA3',
  },
  FACET_FILTERS: {
    GENERAL_FILTERS: [
      'generalFilters:Deals',
      'generalFilters:DLC available',
      'generalFilters:Demo available',
      'generalFilters:Online Play via Nintendo Switch Online',
      'generalFilters:Nintendo Switch Game Voucher',
    ],
    AVAILABILITY: [
      'availability:New releases',
      'availability:Available now',
      'availability:Pre-purchase',
      'availability:Coming soon',
    ],
    PLATFORM: [
      'platform:Nintendo Switch',
      'platform:Nintendo 3DS',
      'platform:Wii U',
    ],
    FILTER_SHOPS: [
      'filterShops:At retail',
      'filterShops:On Nintendo.com',
    ],
    PRICE: [
      'priceRange:Free to start',
      'priceRange:$0 - $4.99',
      'priceRange:$5 - $9.99',
      'priceRange:$10 - $19.99',
      'priceRange:$20 - $39.99',
      'priceRange:$40+',
    ],
  },
  GOODS_DETAIL_DOMAIN: 'https://www.nintendo.com',
  INDEX_NAME: 'noa_aem_game_en_us_release_des', // 按发售时间倒序排列
};

export const JP = {
  GOODS_LIST_URL: 'https://search.nintendo.jp/nintendo_soft/search.json',
  GOODS_DETAIL_URL: 'https://ec.nintendo.com/JP/ja',
};

export const EU = {
  GOODS_LIST_URL: 'https://searching.nintendo-europe.com/en/select',
  GOODS_LIST_OPTIONS: {
    fq: 'type:GAME AND system_type:nintendoswitch* AND product_code_txt:*',
    q: '*',
    sort: 'change_date desc',
    wt: 'json',
  },
};

export const PRICE = {
  URL: 'https://api.ec.nintendo.com/v1/price',
};
