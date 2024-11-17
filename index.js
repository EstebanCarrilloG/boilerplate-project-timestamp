// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api", function (req, res) {
  const currentDate = new Date()
  res.json({ unix: Date.parse(currentDate), utc: currentDate.toUTCString() })
})

app.get("/api/:date", function (req, res) {

  const date_string = req.params.date;

  let date = new Date(date_string)

  if (date_string.match(/^(\d+)$/)) {
    res.json({ unix: Number(date_string), utc: new Date(Number(date_string)).toUTCString() })
  } else {
    console.log(date)
    if (date == "Invalid Date") {
      return res.json({ error: "Invalid Date" })
    }
    res.json({ unix: Date.parse(date), utc: date.toUTCString() })
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
