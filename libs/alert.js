exports.render          = render;
exports.renderAll       = renderAll;
exports.autoCloseScript = autoCloseScript;

var yi       = require('yi');
var Html     = require('htmler');
var div      = Html.div;
var closeBtn = Html.button({
  'class'        : 'close', 
  'type'         : 'button',
  'data-dismiss' : 'alert',
  'aria-hidden'  : 'true'
}).html('&times;');

function render (type, msgs) {
  var html = '';

  if (Array.isArray(msgs)) {
    msgs.forEach(function (msg) {
      html += box(type, msg);
    });
  } else {
    html = box(type, msgs);
  }

  return html;
}

function renderAll (map) {
  var html = '';

  yi.forEach(map, function (type, msgs) {
    html += render(type, msgs);
  });

  return html;
}

function autoCloseScript (s) {
  if ( !s || s < 0 ) { return '';}
  
  return Html.script().html('$(document).ready(function () {  setTimeout( function () {$(".shine-alert").fadeOut();}, ' + s * 1000 + '); });');
}

function box (type, msg) {
  return div('shine-alert alert alert-' + className(type)).html(
    closeBtn,
    sign(type),
    ' ',
    msg
  );
}

function className (type) {

  switch (type) {
    case 'warning':
    case 'warn':
      return 'warning';

    case 'success':
    case 'ok':
    case 'yes':
      return 'success';

    case 'error':
    case 'danger':
    case 'fail':
    case 'no':
      return 'danger';

    default:
      return 'info';
  }
}

function sign (type) {
  var cls;

  switch (type) {
    case 'warning':
    case 'warn':
      cls = 'glyphicon-warning-sign';
      break;
    case 'success':
    case 'ok':
    case 'yes':
      cls = 'glyphicon-ok-sign';
      break;
    case 'error':
    case 'danger':
    case 'fail':
      cls = 'glyphicon-exclamation-sign';
      break;
    default:
      cls = 'glyphicon-info-sign';
      break;
  }

  cls = 'glyphicon ' + cls;

  return Html.span(cls).html();

}