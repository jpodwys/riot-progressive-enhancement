module.exports = require('superagent-cache')(null, null, {pruneParams: ['_method'], pruneOptions: ['content-type']});
