module.exports = function(app){
  app.restrict = function(req, res, next){
    res.formOrAjax(
      function(){
        if(!req.user) res.redirect('/');
        else next();
      },
      function(){
        if(!req.user) res.sendStatus(401);
        else next();
      }
    );
  }
}
