exports.home = function(req, res){
//add your logic here
 res.render('home.jade', {
 	title: "home page",
 	message: 'Hello World'
 });

};