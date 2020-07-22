require('dotenv').config({path: __dirname + '/.env'});
const express = require('express')
const port = process.env.PORT || 5000;
const userRouter = require('./src/routes')

require('./src/db')

const app = express()

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


/*
const fs = require('fs');
//require('log-timestamp');

const path = require('path')
let buttonPressesLogFile = path.join(__dirname, process.env.SEARCH_DIR,'log.txt');

fs.watchFile(buttonPressesLogFile, { interval: 1000 }, (curr, prev) => {
    console.log(`${buttonPressesLogFile} file Changed`);
});

*/


var fs = require('fs');
var path = require('path');
var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};


let dd = path.join(__dirname, process.env.SEARCH_DIR);

walk(dd, function (err, results) {
    if (err) throw err;
    console.log(results);
    if (results) {
        results.forEach(function (key,val) {
            fs.watchFile(key, (curr, prev) => {
                console.log(`${key} file Changed`);
            });
        })

        // results.each(function (key,value) {
        //     console.log(value);
        // });
    }
});

/*
var fs = require('fs');
var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};*/