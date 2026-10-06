// index.js

const express = require('express');
const app = express();

// تفعيل CORS لتمكين منصة freeCodeCamp من فحص الـ API
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// تقديم الملفات الثابتة (CSS, JS)
app.use(express.static('public'));

// الصفحة الرئيسية
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// 1. Endpoint عند عدم تمرير تاريخ (استرجاع الوقت الحالي)
app.get('/api', function (req, res) {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// 2. Endpoint مع تمرير تاريخ في الـ URL
app.get('/api/:date', function (req, res) {
  const dateParam = req.params.date;
  let date;

  // إذا كان المدخل عبارة عن أرقام فقط (Unix Timestamp)
  if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    // إذا كان المدخل نص تاريخ عادي (مثل "2015-12-25")
    date = new Date(dateParam);
  }

  // التحقق من صحة التاريخ
  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// تشغيل السيرفر
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});