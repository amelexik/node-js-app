require('dotenv').config({path: __dirname + '/.env'});

require('./src/db');
require('log-timestamp')

const fs = require('fs');
const path = require('path');
const DocumentModel = require('./src/models/DocumentModel')
const chokidar = require('chokidar');
const readdir = require('readdir-enhanced')
const dd = path.join(__dirname, process.env.SEARCH_DIR);


const SearchIndex = {

    /**
     * clear index
     */
    async clear() {
        DocumentModel.deleteMany();
        console.log('SEARCH-INDEX-CLEAR')
        return true
    },

    /**
     * re-generate Index
     */
    make() {
        for (let item of readdir.sync(dd, {deep: true, filter: "**/*.txt", basePath: dd})) {
            fs.readFile(item, 'utf8', function (err, content) {
                new DocumentModel({filename: item, content: content}).save(function (err, result) {
                    if (err) throw err;
                    if (result) {
                        console.log('SEARCH-INDEX-ADD: ' + item)
                    }
                })
            })
        }
        return true;
    }
}


// run
SearchIndex.clear().then(() => SearchIndex.make())


chokidar.watch(dd).on('change', (event, path) => {
    //console.log(event, path);
    SearchIndex.clear().then(() => SearchIndex.make())
});