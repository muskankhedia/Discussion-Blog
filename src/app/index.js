/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	JsonDB = require('node-json-db').JsonDB,
	Config = require('node-json-db/dist/lib/JsonDBConfig').Config,
	port = process.env.PORT || 5000,
	url = '0.0.0.0';

var db = new JsonDB(new Config('./datastore/data-store', true, true, '/'));

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
	var len = 0;
	var dataCheck = db.getData('/');
	if (Object.keys(dataCheck).length > 0) {
		var data = db.getData('/data');
		len = Object.keys(data).length;
	}
	var obj ={
		name: name,
		comment: comment,
		upvote: 0,
		downvote: 0,
		id: len
	};

	var addr = '/data/' + len;
	db.push(addr, obj);
	res.send('Yes');
});

app.post('/upvoteComment', (req, res) => {
	let id = req.body.id;
	let addr = '/data/'+id+'/upvote';
	var upvote = db.getData(addr);
	upvote++;
	db.push(addr, upvote);
	res.send('yes');
});

app.post('/downvoteComment', (req, res) => {
	let id = req.body.id;
	let addr = '/data/'+id+'/downvote';
	var downvote = db.getData(addr);
	downvote++;
	db.push(addr, downvote);
	res.send('yes');
});

app.get('/getComments', (_, res) => {
	var dataCheck = db.getData('/');
	if (Object.keys(dataCheck).length > 0) {
		var data = db.getData('/data');
		let arr = [];
		for (let inst in data) {
			arr.push(data[inst]);
		}
		res.send(arr);
	} else {
		res.send('Empty Dataset');
	}
	
});

const server = app.listen(port, url, e => {
	if(e) throw e;
	else {
		console.warn('Running at \n'+server.address().address + '\t' +server.address().port);
        
	}
});