'use strict';

var _superscript = require('superscript');

var _superscript2 = _interopRequireDefault(_superscript);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var ejs = require('ejs');

var server = (0, _express2.default)();
var PORT = process.env.PORT || 5000;

server.use(_bodyParser2.default.json());
server.set('view engine', 'ejs');

var bot = void 0;

server.get('/chat', function (req, res) {
  if (req.query.message) {
    return bot.reply('user1', req.query.message, function (err, reply) {
      res.render(path.join(__dirname + '/index.ejs'), {
        reply: reply.string
      });
    });
  }
  return 'error in server.get() in server-express.js in src folder!';
});

var options = {
  factSystem: {
    clean: true
  },
  importFile: './data.json'
};

_superscript2.default.setup(options, function (err, botInstance) {
  if (err) {
    console.error(err);
  }
  bot = botInstance;

  server.listen(PORT, function () {
    console.log('===> \uD83D\uDE80  Server is now running on port ' + PORT);
  });
});