var express = require('express');
var app = express();

app.use(express.static("public"));
console.log("xD");

app.listen(3000);

