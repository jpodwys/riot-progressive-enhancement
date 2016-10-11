module.exports = require('superagent-cache')(null, null, {
  pruneOptions: ['content-type'],
  preventDuplicateCalls: true
});
