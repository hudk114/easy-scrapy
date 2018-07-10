/**
 * 定时任务封装
 */
const schedule = require('node-schedule');

function isObj (obj) {
  return obj !== null && typeof obj === 'object';
}

module.exports = (rules, callback) => {
  let rule = null;

  if (!isObj(rules)) {
    rule = rules;
  } else {
    rule = new schedule.RecurrenceRule();
  
    for (const key in rules) {
      if (rules.hasOwnProperty(key)) {
        rule[key] = rules[key];
      }
    }
  }

  let job = schedule.scheduleJob(rule, callback);

  return job;
};
