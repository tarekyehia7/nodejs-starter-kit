# nodejs-starter-kit

This project is made to help most of the developers to get started with node.js.

The first thing we would do is to download node.js from here

After completing the installation, we will have to open node.js command prompt.
Creating our first app.js file

app.js file is the main file that serves the whole application, So we will create this file and put some code to it to start the server as bellow

		var express = require('express');
		var app = express();
		app.set('port', process.env.PORT || 3000);

		app.get('/', function (req, res) {
  		res.send('Hello World')
		});

		app.listen(app.get('port'), function(){    
    		  console.log('http Express server(worker) listening on port ' + app.get('port'));
		});

As the above code We created our server and now I will explain things in details

    1. We have created a variable called express which require the express module
    2. We have assigned app variable to the express module.
    3. Node should work on a specific port so we will need to tell him what port to run the server on.
    4. app.get will create a new request for url / to view the res.send
    5. app.listen tells express to listen on port 3000.

So, how do we actually run the server and what is node_modules

First we will have to go back to node.js command prompt, this node js cmd will allow us to download every module we would want, Check below how we will download:

    open cmd.
    type: npm install.

After that your will find a new folder created named node_modules, again what is node_modules, It is folder that store libraries you will need to use for your application.

After installing, you are good to go, run your sever with node.js cmd:

		Type: npm start

You will see the following message

		http Express server(worker) listening on port 3000

You can open your browser now and navigate to http://localhost:3000/

This will print Hello World to your browser.
Using html files and css

In this example we will use express and jade.

First thing to do is to add two new folders one for the views and the other for the css and will be named public folder.

So, we will add these few lines of code

		var path = require('path');
		app.use(express.static(path.join(__dirname, 'public')));
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');

1. express.static tells express to load files on this folder as static files ( this line is extremely important, If you didn’t do it, all css files will not be read )
2. setting the views to express in views folder
3. setting view engine as jade, we will use it instead of html

Now create folder named assets and inside it create another one for css and create file named main.css and write down the following:

		h1{
			color: black;
		}
		body{
			background-color: white;
		}

and then go to the views folder and create a jade file called home.jade and write down the following

		doctype html
		html(lang='en')
  		head
    		title Home page
  		body
    		h1 Hello world

Then go back to app.js and make your file like this

		var express = require('express');
		var path = require('path');
		var app = express();

		app.set('port', process.env.PORT || 3000);
		
		app.use(express.static(path.join(__dirname, 'public')));
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		
		app.get('/', function (req, res) {
  		res.send('Hello World')
		});

		app.get('/home', function(req, res){
  		res.render('home.jade');
		});

		app.listen(app.get('port'), function(){    
		      console.log('http Express server(worker) listening on port ' + app.get('port'));
		});

# Making our routes folder

This time we will have to create a new routes folder, which will have all the page logic instead of writing all down to app.js

We will make a new folder named routes, Then create a file name home.js which will be javascript file called at the server and it is not client side

After creating the file write the following code

		exports.home = function(req, res){
		//add your logic here
 		res.render('home.jade', {
		     title: "home page",
		     message: 'Hello World'
 		});
		};

1. exports will export our function to be able to call it from other files when we require this file.
2. JSON object passed in the res.render beside home.jade which we will use in the jade file

In app.js we will make a small modification to use our home.js file in routes

# OLD ONE

		app.get('/home', function(req, res){
  		res.render('home.jade');
		});

# New ONE

		var homepage = require('./routes/home.js');
		app.get('/home', homepage.home);

# All files with the latest code is below

app.js

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

/views/home.jade

		doctype html
		html(lang='en')
  		head
    		title=title
    		link(rel='stylesheet', href='assets/css/main.css')
  		body
    		h1=message
		
/routes/home.js

		exports.home = function(req, res){
		//add your logic here
 		res.render('home.jade', {
		     title: "home page",
		     message: 'Hello World'
 		});
		};
	
/public/assets/css/main.css

		h1{
		     color: black;
		}
		body{
		     background-color: white;
		}
