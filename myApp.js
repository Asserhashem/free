require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

// 1. تفعيل body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// 2. Logger Middleware
app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// 3. تقديم الملفات الثابتة
app.use('/public', express.static(__dirname + '/public'));

// 4. الصفحة الرئيسية HTML
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// 5. مسار /json مع .env
app.get('/json', function(req, res) {
  let responseMessage = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    responseMessage = responseMessage.toUpperCase();
  }
  res.json({ "message": responseMessage });
});

// 6. مسار /now
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ time: req.time });
});

// 7. Route Parameters
app.get('/:word/echo', function(req, res) {
  let word = req.params.word;
  res.json({ echo: word });
});

// 8. Query Parameters (GET /name)
app.get('/name', function(req, res) {
  let firstName = req.query.first;
  let lastName = req.query.last;
  res.json({ name: `${firstName} ${lastName}` });
});

// 9. الدرس الحالي: استقبال بيانات الـ POST (POST /name)
app.post('/name', function(req, res) {
  let firstName = req.body.first;
  let lastName = req.body.last;
  res.json({ name: `${firstName} ${lastName}` });
});

module.exports = app;