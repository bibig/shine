module.exports = create;

var util = require('util');
var alert = require('./alert');
var alert_hold_seconds = 10;

function create (n) {

  if (n) { alert_hold_seconds = n; }

  return function (req, res, next) {

    if ( ! req.shine) { 
      req.shine = shine;
    }
    
    next();
  };
}

function shine (type, msg) {
  var msgs, pool;

  if (this.session === undefined) {
    throw new Error('shine need session support.');
  }

  this.session.shine = this.session.shine || {};

  if (arguments.length === 0) { // return all messages
    msgs = alert.renderAll(this.session.shine);
    this.session.shine = {};
    
    return msgs + alert.autoCloseScript(alert_hold_seconds);
  } else { 
    // set flash message(s)
    pool = this.session.shine[type] = this.session.shine[type] || [];

    // set flash message(s)
    if (type && msg) {
      
      if (arguments.length > 2) {
        msg = util.format.apply(util, Array.prototype.slice.call(arguments, 1));
      }

      // no duplicate msg
      if (pool.indexOf(msg) == -1) {
        pool.push(msg);
      }

    } else  { // return messages in type
      msgs = alert.render(type, pool) ;

      delete this.session.shine[type];

      return msgs + alert.autoCloseScript(alert_hold_seconds);

    }

  }

}