require('dotenv').config({path: __dirname + '/.env'});

require('./src/db');

require('./src/models/DocumentModel')

let m = new DocumentModel({'filename':'dsadsadas','content':'fdsfdsf'});
console.log(m.save());