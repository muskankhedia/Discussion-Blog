/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	JsonDB = require('node-json-db').JsonDB,
	Config = require('node-json-db/dist/lib/JsonDBConfig').Config,
	port = process.env.PORT || 5000,
	url = '0.0.0.0';

var db = new JsonDB(new Config('./datastore/comments-store', true, true, '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true,
}));

app.use((_,res,next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
console.log('Connected');

app.get('/', (_ ,res) => {
	res.send('this is working');
});

app.post('/addComment', (req, res) => {

	let name = req.body.name,
		comment = req.body.comment;
    
	var obj ={
		name: name,
		comment: comment
	};

	db.push('/comments/1', obj);
	res.send('Yes');
});

app.post('/upvoteComment', (_req, _res) => {

});

app.post('/downvoteComment', (_req, _res) => {

});

const server = app.listen(port, url, e => {
	if(e) throw e;
	else {
		console.warn('Running at \n'+server.address().address + '\t' +server.address().port);
        
	}
});