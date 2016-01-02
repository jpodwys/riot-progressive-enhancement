exports.vary = function(req, res, next){
  res.set({'Vary': 'Accept'});
  next();
}

exports.formOrAjax = function(req, res, next){
  res.formOrAjax = function(form, ajax, data){
    var fn = (req.xhr || req.headers.accept.indexOf('json') > -1) ? ajax : form;
    fn(req, res, data);
  }
  next();
}
