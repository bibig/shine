# Shine
+ a rich flash message middleware for connect.
+ flash messages will be wrapped in bootstrap alert box.


### install
npm install shine

### usage

```javascript
  
  var shine = require('shine');
  var app   = express();
  ...
  app.use(session()); // need session middleware.
  app.use(shine(10)); // 10 is timeout settings, means the messages will show for 10 seconds

  // in routes
  // make a message
  req.shine('info', 'this is an info');
  req.shine('info', 'this is another info: %s', detail);

  // render a kind of messages
  var messages = req.shine('info');

  // render all msssages
  var messages = req.shine();

```