var promise = require('zousan'),
  xhr = require('superagent-cache')(null, null, {responseProp: 'body'});
// require('superagent-promise')(xhr, promise);

exports.getAllEntries = function(){
  // return new promise(function (resolve, reject){
  //   xhr.get('/')
  //     .accept('application/json')
  //     ._end(function (err, response){
  //       (err) ? reject(err) : resolve(response.body);
  //     }
  //   );
  // });
  return xhr.get('/')
    .accept('application/json');
}

exports.getEntryById = function(id){
  return xhr.get('/entry/' + id)
    .accept('application/json');
}

exports.createEntry = function(entry){
  return xhr.post('/entry')
    .accept('application/json')
    .send(entry)
    .pruneOptions(['content-type']);
}

exports.updateEntry = function(entry){
  return xhr.put('/entry/' + entry.id)
    .accept('application/json')
    .send(entry)
    .pruneOptions(['content-type']);
}

exports.deleteEntry = function(id){
  return xhr.del('/entry/' + id)
    .accept('application/json');
}
