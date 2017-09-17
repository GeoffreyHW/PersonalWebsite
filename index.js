// global constants
var API_KEY = "key-7a69d185f3415cee6a65c93413818997";
var DOMAIN = "sandboxb15c1ff447b849dea12e28ff4dcda26e.mailgun.org";

// dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set('view engine', 'html');

// mailgun initialization
var Mailgun = require('mailgun-js');
var mailgun = new Mailgun({apiKey: API_KEY, domain: DOMAIN});

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/views'));

// ================= ROUTES ======================

app.get('/home', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/about', function(req, res) {
    res.sendFile(__dirname + '/views/bio.html');
});

app.get('/resume', function(req, res) {
    res.sendFile(__dirname + '/views/resume.html');
});

app.get('/experience', function(req, res) {
    res.sendFile(__dirname + '/views/experience.html');
});

app.get('/contact', function(req, res) {
    res.sendFile(__dirname + '/views/contact.html');
});

app.post('/sendemail', function(req, res){

	res.send("request received");
	var data = JSON.parse(req.headers.data);

	var name = data.name;
	var email = data.email;
	var subject = data.subject;
	var message = data.message

	console.log(data);

	var data = {
	    //Specify email data
	      from: email,
	    //The email to contact
	      to: "wonggh97@gmail.com",
	    //Subject and text data  
	      subject:subject,
	      html: "<b><u>" + name + "</b></u>  visted your website. " + "<br><br>" + "This is the message: " + message
    }

	 mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            res.render('error', { error : err});
            console.log("got an error: ", err);
        }
        else {
            res.render('submitted', { email : req.params.mail });
            console.log(body);
        }
    });
});

// =============== SERVER INITIALIZATION ============

var port = (process.env.PORT || 8080);
app.listen(port);
