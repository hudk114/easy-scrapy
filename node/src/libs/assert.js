module.exports = {
  isFunction (fun) {
    return typeof fun === 'function';
  },
  isNum (obj) {
    return typeof obj === 'number';
  },
  isValidNum (obj) {
    return typeof obj === 'number' && obj !== NaN;
  }
}