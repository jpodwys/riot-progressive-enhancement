var shiftEntry = require('./shift-entry');

var LEFT = 37;
var RIGHT = 39;

function handleArrowKey(direction){
  if(direction === LEFT){
    shiftEntry.left();
  } else {
    shiftEntry.right();
  }
}

function cb(e){
  if(!e || !e.keyCode || (e.keyCode !== LEFT && e.keyCode !== RIGHT)) return;
  handleArrowKey(e.keyCode);
}

exports.registerArrowListeners = function(el){
  el.addEventListener('keydown', cb, false);
}
