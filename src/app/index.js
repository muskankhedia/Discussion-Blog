const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      port = process.env.PORT || 5000,
      url = '0.0.0.0';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
console.log("Connected")
app.get('/', (req ,res) => {
    res.send('this is working');
    
})
 
app.listen(3000)