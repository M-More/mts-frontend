const path = require('path');
const ejs = require('ejs');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const request = require('request');

const appPackage = require(path.resolve(__dirname, '../package.json'));
const port = appPackage.port;

const app = express();
app.engine('html', ejs.__express);

app.set('views', path.join(__dirname, '../build'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/api', (req, res) => {
  const url = 'http://localhost:8082' + req.url;
  console.log(url);
  req.pipe(request(url)).pipe(res);
});

const pathList = ['/', '/home', '/search', '/login'];

app.get(['/', '/home', '/search', '/login'], (req, res) => { res.render('index.html'); });
app.get('/heart', (req, res) => { console.log(1); res.send('test ok'); });
app.get('*', (req, res) => {
  if (pathList.indexOf(req.url) === -1) {
    res.redirect('../home');
  }
})

app.all("*",function (req,res,next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","content-type");
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  next();
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
