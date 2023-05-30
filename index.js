// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:input", function(req, res) {
  let input = req.params.input;
  let date;
  let unixTimestamp;
  let utcDate;

  if (isNaN(input)) {
    date = new Date(input);
    unixTimestamp = Math.floor(date.getTime() / 1000);
    utcDate = date.toUTCString();
  } else {
    unixTimestamp = parseInt(input);
    date = new Date(unixTimestamp * 1000);
    utcDate = date.toUTCString();
  }

  if (isNaN(unixTimestamp) || isNaN(date.getTime())) {
    res.json({ error: "Invalid date" });
  } else {
    res.json({ unix: unixTimestamp, utc: utcDate });
  }
});



// listen for requests :)
var listener = app.listen(55885, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
