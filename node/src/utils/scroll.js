/**
 * the scroll function of the page
 */
const { isFunction } = require('../libs/assert');

// 判断滚动结束的回调函数
function scrollEnd (p, { height, times, judgeEnd }) {
  if (isFunction(judgeEnd)) {
    return async (page = p) => {
      return await judgeEnd(page);
    };
  }

  if (isValidNum(times)) {
    let t = times;
    return async (page = p) => {
      return t-- <= 0;
    };
  }

  if (isValidNum(height)) {
    let h = height;
    return async (page = p) => {
      let clientHeight = await page.evaluate(() => document.body.clientHeight);
      return clientHeight >= height;
    };
  }

  // 三者都没传的情况下，滑到底
  let cH = await p.evaluate(() => document.body.clientHeight);
  let sY = await p.evaluate(() => window.scrollY);

  return async (page = p) => {
    let clientHeight = await page.evaluate(() => document.body.clientHeight);
    let scrollY = await page.evaluate(() => window.scrollY);

    if (cH === clientHeight && sY === scrollY) {
      // both not change, means to the end of page
      return true;
    } else {
      cH = clientHeight;
      sY = scrollY;
      return false;
    }
  };
}

/** 
 * @param {Object} page the page instance
 * @param {Object} options the callback for each scroll
 */
module.exports = async (page, options) => {
  let judgeEndCallback = scrollEnd(page, options);

  do {
    await page.evaluate(() => {
      window.scrollBy(0, 500);
    });
    await page.waitFor(2000);
  } while (await judgeEndCallback(page));

  return page;
};