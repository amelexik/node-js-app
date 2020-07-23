require('dotenv').config({path: __dirname + '/.env'});

require('./src/db');

const chokidar = require('chokidar');

// One-liner for current directory
chokidar.watch('./storage').on('all', (event, path) => {
    console.log(event, path);
});

