function serviceWrapper(service){
  var self = this;
  var availableFunctions = Object.keys(service);

  availableFunctions.forEach(function (func){
    self[func] = function (req, res, next){
      if(!next && req.state && req.state.data){ res(); return; }
      var data = null;
      if(next) data = ((Object.keys(req.body).length) ? req.body : req.params.id);
      else data = req.state.data || req.params.id;
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
