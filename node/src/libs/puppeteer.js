/**
 * puppeteer封装
 */
const puppeteer = require('puppeteer');
let browser = null;
// 同时只开启10个线程跑
const Pool = require('@hudk/pool');
const p = new Pool(10);
const {
  isFunction
} = require('../libs/assert');

async function judgeBrowser () {
  if (!browser) {
    browser = await puppeteer.launch({ headless: false });
  }
}

// 进入页面，然后执行自定义操作，最后将url返回
// TODO operation中间件
module.exports = (url, operation, callback) => {
  p.add(async _ => {
    await judgeBrowser();
    let page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(2000);

    // 自定义操作
    isFunction(operation) && await operation(page);

    // 获取页面html并返回
    let content = await page.content();
    callback(content);

    await page.close();
  });
};
