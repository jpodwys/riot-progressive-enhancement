/* 
 * This module wraps services used with express.js and page.js
 * so that they don't need to know anything about being middleware.
 * It extracts the necessary data from req and res (or req and ctx)
 * and provides it to the service object to simplify the service.
 */

function serviceWrapper(service){
  var self = this;
  var entriesKeys = [];
  var availableFunctions = Object.keys(service);

  availableFunctions.forEach(function (func){
    self[func] = function (req, res, next){
      if(!next && req.state && req.state.data){ res(); return; }
      var data = null;
      if(next){ // Express middleware
        data = ((Object.keys(req.body).length) ? req.body : req.params.id || {});
        if(req.query && data) data.query = req.query;
      }
      else{ // Page middleware
        data = req.state.data || req.params.id || {};
        if(req.querystring && data) data.querystring = req.querystring;
      }
      if(req.params && data) data.params = req.params;
      service[func](data, req.user).then(function (response, key){
        if(func === 'getEntriesByOwnerId'){
          window.entriesKeys.push(key);
        }
        req.response = (response) ? response.body || response : false; // False here means form submisseion executed data but nothing was returned
        (next) ? next() : res();
      }, function (err){
        req.err = err;
        (next) ? next() : res();
      });
    }
  });
}

module.exports = serviceWrapper;
