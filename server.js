var path = require('path');
var express = require("express");
var app = express();
app.use(express.static(__dirname+'/dist/idac-frontend'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/idac-frontend/index.html'));
});

app.listen(process.env.PORT || 8080);
