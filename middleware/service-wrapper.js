// This module wraps services used with express.js and page.js
// so that they don't need to know anything about being middleware.
// It extracts the necessary data from req and res (or req and ctx)
// and provides it to the service object to simplify the service.

function serviceWrapper(service){
  var self = this;
  var availableFunctions = Object.keys(service);

  availableFunctions.forEach(function (func){
    self[func] = function (req, res, next){
      if(!next && req.state && req.state.data){ res(); return; }
      var data = null;
      if(next) data = ((Object.keys(req.body).length) ? req.body : req.params.id);
      else data = req.state.data || req.params.id || {};
      if(next){
        if(req.query) data.query = req.query;
        if(req.params) data.params = req.params;
      }
      else{
        if(req.querystring) data.querystring = req.querystring;
        if(req.params) data.params = req.params;
      }
      service[func](data, req.user).then(function (response){
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
