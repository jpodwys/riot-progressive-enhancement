var riot = require('riot'),
  loginPage = require('../assets/tags/login-page.tag'),
  entryList = require('../assets/tags/entry-list.tag'),
  pagination = require('../assets/tags/pagination.tag'),
  entryView = require('../assets/tags/entry-view.tag'),
  newEntry = require('../assets/tags/new-entry.tag'),
  editEntry = require('../assets/tags/edit-entry.tag');

var tagData = {
  'login-page': {},
  'entry-list': {
    ids: [1,2,3,4],
    offset: 10,
    query: {},
    entries: [{
      id: 1234,
      date: '2016-05-14',
      isPublic: 0,
      text: 'Testing'
    }]
  },
  'entry-view': {
    entry: {
      id: 1234,
      date: '2016-05-14',
      isOwner: true,
      isPublic: 0,
      text: 'Testing'
    }
  },
  'edit-entry': {
    id: 1234,
    date: '2016-05-14',
    isOwner: true,
    isPublic: 0,
    text: 'Testing'
  }
}

module.exports = function(tagName){
  return function (req, res){
    var tag;

    switch(tagName){
      case 'login-page': tag = loginPage; break;
      case 'entry-list': tag = entryList; break;
      case 'entry-view': tag = entryView; break;
      case 'edit-entry': tag = editEntry; break;
      case 'new-entry' : tag = newEntry;  break;
    }

    res.render('wrapper', {
      view: tagName,
      jsPath: false,
      stylesLoaded: true,
      loggedIn: (tagName != 'login-page'),
      tag: riot.render(tag, tagData[tagName] || {})
    });
  }
}
