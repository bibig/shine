var should = require('should');
var shine = require('../index');

describe('shine unit test', function () {

  var req = {
    session: {}
  };
  var res = {};
  var NEXT_DONE;
  var next = function () { NEXT_DONE = true; };
  var middleware;

  it('basic', function () {
    middleware = shine();

    should(typeof middleware == 'function').be.ok;
    middleware(req, res, next);
    should(NEXT_DONE).be.true;

  });

  it('need session middleware', function () {

    (function () {
      middleware({});
    }).should.throw();

  });

  it('make a message', function () {
    var type = 'info';
    var msg = 'this is an info';
    var html;

    should(req.session.shine).not.ok;
    req.shine(type, msg);
    should(req.session.shine[type]).eql([msg]);

    html = req.shine();
    html.should.match(/alert alert-info/);
    should(req.session.shine[type]).not.ok;

  });

  it('make a message with variables', function () {
    var html;
    var type = 'success';

    req.shine('info', 'have an info');
    req.shine('warning', 'have an warning');
    
    req.shine(type, '%s works', 'it');
    should(req.session.shine[type]).eql(['it works']);
    html = req.shine(type);
    html.should.match(/it works/);

    should(req.session.shine.warning).be.ok;
    should(req.session.shine.info).be.ok;
    should(req.session.shine[type]).not.ok;

    html = req.shine();
    html.should.match(/have an info/);
    html.should.match(/have an warning/);

    should(req.session.shine).eql({});

  });





});