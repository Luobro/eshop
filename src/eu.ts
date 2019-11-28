import { default as request } from 'request-promise-native';
import * as cheerio from 'cheerio';
import { omit, flatten } from 'lodash';
import { JP } from './constants';
import { default as retry } from 'async-retry';

export async function getEuropeGoods(page: number = 1, limit: number = 20) {
  
}