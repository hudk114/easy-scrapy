/**
 * 抓小说的！
 */
const puppteer = require('../../libs/puppeteer');
// const files = require('./files');

puppteer('https://www.booktxt.net/0_362/', async page => {
  let content = await page.evaluate(_ => {
    let content = $('#list dd').html();
    return content;
  });

  console.log(content);
  // TODO 正则匹配
}, html => {
  // console.log(html);
});

module.exports = {};
