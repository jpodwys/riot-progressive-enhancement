var promise = require('zousan'),
  xhr = require('superagent-cache')();
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

exports.createEntry = function(text){
  return xhr.post('/entry')
    .accept('application/json')
    .send({text: text})
    .pruneOptions(['content-type'])
    .end();
}

exports.updateEntry = function(id, text){
  return xhr.put('/entry/' + id)
    .accept('application/json')
    .send({text: text})
    .pruneOptions(['content-type'])
    .end();
}

exports.deleteEntry = function(id){
  return xhr.del('/entry/' + id)
    .accept('application/json')
    .end();
}
