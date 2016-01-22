var xhr = require('superagent');

exports.getAllEntries = function(){
  return xhr.get('/entries')
    .accept('application/json');
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
