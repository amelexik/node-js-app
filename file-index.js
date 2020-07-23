require('dotenv').config({path: __dirname + '/.env'});

require('./src/db');
require('log-timestamp')

const DocumentModel = require('./src/models/DocumentModel')

let m = new DocumentModel({
    'filename': 'file.txt',
    'content': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentiall'
}).save(function (err, result) {
    if (err) throw err;
    if (result) {
        //console.log(result)
    }
})

var fs = require('fs');
var path = require('path');
// var walk = function (dir, done) {
//     var results = [];
//     fs.readdir(dir, function (err, list) {
//         if (err) return done(err);
//         var pending = list.length;
//         if (!pending) return done(null, results);
//         list.forEach(function (file) {
//             file = path.resolve(dir, file);
//             fs.stat(file, function (err, stat) {
//                 if (stat && stat.isDirectory()) {
//                     walk(file, function (err, res) {
//                         results = results.concat(res);
//                         if (!--pending) done(null, results);
//                     });
//                 } else {
//                     results.push(file);
//                     if (!--pending) done(null, results);
//                 }
//             });
//         });
//     });
// };

var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
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
};

const readdir = require('readdir-enhanced')
const SearchIndex = {

        /**
         * clear index
         */
        async clear() {
            await DocumentModel.deleteMany();
            console.log('clear')
            return true
        },
        /**
         * re-generate Index
         */
        async make() {
            console.log('start');
            const dd = await path.join(__dirname, process.env.SEARCH_DIR);

            async function pushObject(path) {
                try {
                    console.log(path)
                    fs.readSync(path, 'utf8', async function (err, content) {
                        console.log(content)
                    })
                } catch (err) {
                }
            }

            // Async Iterator API
            let data = [];
            for await (let item of readdir.iterator(dd, {deep: true, basePath: dd})) {
                let obj = {}
                fs.readSync(item, 'utf8', async function (err, content) {
                    obj.filename = content
                })
                data.push(obj)
            }


            console.log(data)
            console.log('finish')
        }
    }
;


SearchIndex.clear().then(
    () => SearchIndex.make()
)