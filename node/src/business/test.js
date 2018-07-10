/**
 * test
 */
const puppteer = require('../libs/puppeteer');

puppteer('http://www.baidu.com', null, html => {
  console.log(html);
});

// TODO
module.exports = {};