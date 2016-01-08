function entry(entryService){
  var self = this;
  var availableFunctions = [
    'getAllEntries',
    'getEntryById',
    'createEntry',
    'updateEntry',
    'deleteEntry'
  ];

  availableFunctions.forEach(function (func){
    self[func] = function (req, res, next){
      var data = (Object.keys(req.body).length) ? req.body : req.params.id;
      entryService[func](data).then(function (response){
        req.response = response;
        (next) ? next() : res();
      });
    }
  });
}

module.exports = entry;
