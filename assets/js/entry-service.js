var xhr = require('superagent-cache')(null, {storage: 'session'});

exports.getAllEntries = function(q){
  return xhr.get('/entries')
    .accept('application/json')
    .query(q.querystring)
}

exports.getEntryById = function(id){
  return xhr.get('/entry/' + id)
    .accept('application/json');
}

exports.createEntry = function(entry){
  return xhr.post('/entry')
    .accept('application/json')
    .send(entry);
}

exports.updateEntry = function(entry){
  return xhr.put('/entry/' + entry.id)
    .accept('application/json')
    .send(entry);
}

exports.deleteEntry = function(id){
  return xhr.post('/entry/' + id)
    .accept('application/json')
    .query({'_method': 'DELETE'}); // Fixes xmlhttprequest's failure here
}
