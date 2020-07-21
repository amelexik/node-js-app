// wiki.js - Wiki route module.

const express = require('express');
const app = express();

//requiring path and fs modules
//joining path of directory

//passsing directoryPath and callback function


let files = new Object();


//https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search

let fs = require('fs');
let path = require('path');

const directoryPath = path.join(__dirname, 'storage');


let searchInFile = require("search-in-file");


app.get("/", (req, res, next) => {
    searchInFile.fileSearch([directoryPath], 'php', {recursive: true,searchResults:'lineNo'})
        .then(function (results) {
            res.json(results);
        });
});

app.get('/search/:term', function (req, res) {
    let term = req.params.term;
    let response = {
        'term' : term
    }
    res.json(response)
});


let port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});