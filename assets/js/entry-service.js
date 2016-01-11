var promise = require('zousan'),
  xhr = require('superagent-cache')(null, null, {responseProp: 'body'});
require('superagent-promise')(xhr, promise);

exports.getAllEntries = function(){
  return xhr.get('/')
    .accept('application/json')
    ._end();
}

exports.getEntryById = function(id){
  return xhr.get('/entry/' + id)
    .accept('application/json')
    .end();
}

exports.createEntry = function(entry){
  return xhr.post('/entry')
    .accept('application/json')
    .send(entry)
    .pruneOptions(['content-type'])
    .end();
}

exports.updateEntry = function(entry){
  return xhr.put('/entry/' + entry.id)
    .accept('application/json')
    .send(entry)
    .pruneOptions(['content-type'])
    .end();
}

exports.deleteEntry = function(id){
  return xhr.del('/entry/' + id)
    .accept('application/json')
    .end();
}
