
var should = require('should');
var alerts = require('../libs/alert');

describe('alerts unit test', function () {

  it('alert single', function () {
    var html = alerts.render('info', 'this is info');
    html.should.match(/this is info/);
    html.should.match(/alert alert\-info/);
  });

  it('alert list', function () {
    var html = alerts.render('info', ['this is info', 'this is info too']);
    // console.log(html);
    html.should.match(/this is info/);
    html.should.match(/this is info too/);
    html.should.match(/alert alert\-info/);
  });

  it('alert list with empty args', function () {
    var html = alerts.render('info', []);
    
    html.should.eql('');
  });

  it('alert all', function () {
    var html = alerts.renderAll({'info': ['this is info', 'this is info too'], 'warning': 'this is warning!'});

    // console.log(html);

    html.should.match(/this is info/);
    html.should.match(/this is info too/);
    html.should.match(/alert alert\-info/);
    html.should.match(/this is warning/);
    html.should.match(/alert alert\-warning/);
  });

  it('alert all with empty args', function () {
    var html = alerts.renderAll({});    

    html.should.eql('');
  });

});