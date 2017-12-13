import superscript from 'superscript';
import express from 'express';
import bodyParser from 'body-parser';

var path = require('path');
var ejs = require('ejs');

const server = express();
const PORT = process.env.PORT || 5000;

// server.use(server.router);
server.set('views', __dirname + '/views');
server.use(express.static(path.join(__dirname, 'public')));

server.use(bodyParser.json());
server.set('view engine', 'ejs');

let bot;

server.get('/chat', (req, res) => {
  if (req.query.message) {
    return bot.reply('user1', req.query.message, (err, reply) => {
       res.render(path.join(__dirname + '/index.ejs'), {
           reply: reply.string
       });
    });
  }
  return 'error in server.get() in server-express.js in src folder!';
});

server.get('/home', (req, res) => {
   return 'Welcome to the landing page!'            
});

const options = {
  factSystem: {
    clean: true,
  },
  importFile: './data.json',
};

superscript.setup(options, (err, botInstance) => {
  if (err) {
    console.error(err);
  }
  bot = botInstance;

  server.listen(PORT, () => {
    console.log(`===> 🚀  Server is now running on port ${PORT}`);
  });
});
