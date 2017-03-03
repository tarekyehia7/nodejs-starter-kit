var express = require('express');
var path = require('path');

var homepage = require('./routes/home.js');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get('/home', homepage.home);

app.listen(app.get('port'), function(){    
      console.log('http Express server(worker) listening on port ' + app.get('port'));
});