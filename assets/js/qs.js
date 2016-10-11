exports.parse = function(params) {
  var ret = {};

  if (!params){
    return {};
  }

  var params = params.split('&');
  for(var i=0; i<params.length; i++) {
    var param = params[i].split('=', 2);
    if (param.length == 1) {
      ret[param[0]] = true;
    } else if (param.length == 2) {
      ret[param[0]] = decodeURIComponent(param[1]);
    }
  }
  return ret;
}
