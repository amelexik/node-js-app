require('dotenv').config({path: __dirname + '/.env'});
require('./src/db');
require('log-timestamp')
const path = require('path');
const fs = require('fs');
const dd = path.join(__dirname, process.env.SEARCH_DIR);
const DocumentModel = require('./src/models/DocumentModel')

// use lib chokidar - because fs.watch recursive error on my linux ubuntu
const chokidar = require('chokidar');


// before create index truncate collection
// run re-create index and file watcher
DocumentModel.collection.deleteMany().then(() =>

    chokidar.watch(dd)
        // ADD FILE
        .on('add', function (path) {
            fs.readFile(path, 'utf8', function (err, content) {
                new DocumentModel({filename: path, content: content}).save(function (err, result) {
                    if (result)
                        console.log('SEARCH-INDEX-WATCHER-ADD ' + path)
                })
            })
        })
        // CHANGE FILE
        .on('change', function (path) {
            fs.readFile(path, 'utf8', function (err, content) {
                DocumentModel.findOne({'filename': path}, 'filename content', function (err, document) {
                    if (err) return handleError(err);
                    document.content = content;
                    document.save();
                    console.log('SEARCH-INDEX-WATCHER-UPDATE ' + path)
                });
            })
        })
        // DELETE FILE
        .on('unlink', function (path) {
            DocumentModel.findOne({'filename': path}, 'filename content', function (err, document) {
                if (err) return handleError(err);
                document.delete();
                console.log('SEARCH-INDEX-WATCHER-DELETE ' + path)
            });
        })
)
