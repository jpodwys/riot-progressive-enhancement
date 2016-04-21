exports.vary = function(req, res, next){
  res.set({'Vary': 'Accept'});
  next();
}

exports.formOrAjax = function(req, res, next){
  res.formOrAjax = function(form, ajax){
    var fn = (req.xhr || req.headers.accept.indexOf('json') > -1) ? ajax : form;
    fn(req, res);
  }
  next();
}

exports.addQueryAndParams = function(req, res, next){
  if(req.body && req.query) req.body.query = req.query;
  if(req.body && req.params) req.body.params = req.params;
  next();
}
