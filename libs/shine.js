module.exports = create;

var util = require('util');
var alert = require('./alert');

function create () {
  return function (req, res, next) {

    if ( ! req.shine) { 
      req.shine = shine;
    }
    
    next();
  };
}

function shine (type, msg) {
  var msgs;

  if (this.session === undefined) {
    throw new Error('shine middleware need session support.');
  }

  this.session.shine = this.session.shine || {};

  // set flash message(s)
  if (type && msg) {
    
    if (arguments.length > 2) {
      msg = util.format.apply(util, Array.prototype.slice.call(arguments, 1));
    }

    if ( ! this.session.shine[type] ) { this.session.shine[type] = []; }

    this.session.shine[type].push(msg);

  } else if (type) { // return messages in type
    msgs = alert.render(type, this.session.shine[type] || []) ;

    delete this.session.shine[type];

    return msgs;

  } else { // return all messages
    msgs = alert.renderAll(this.session.shine);
    this.session.shine = {};
    return msgs;
  }

}