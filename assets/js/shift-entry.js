function isEntryView(){
  return (window.entryIds.length && ~window.location.href.indexOf('/entry/') && !~window.location.href.indexOf('edit'));
}

function getCurrentIdIndex(){
  var id = window.location.pathname.substring(7);
  return window.entryIds.indexOf(parseInt(id, 10));
}

exports.left = function(){
  if(!isEntryView()) return;
  var curIdIndex = getCurrentIdIndex();
  if(curIdIndex > 0){
    window.page('/entry/' + window.entryIds[curIdIndex - 1]);
  }
}

exports.right = function(){
  if(!isEntryView()) return;
  var curIdIndex = getCurrentIdIndex();
  if(curIdIndex > -1 && (curIdIndex + 1) < window.entryIds.length){
    window.page('/entry/' + window.entryIds[curIdIndex + 1]);
  }
}
