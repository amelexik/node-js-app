const express = require('express')
const User = require('./models/User')
const router = express.Router()
const path = require('path')
const directoryPath = path.join(__dirname, '..', process.env.SEARCH_DIR);

router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    //Login a registered user
    try {
        const {email, password} = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/", (req, res, next) => {
    res.send('Go to <a href="/search/lorem">/search/:term</a>')
})

router.get("/search/:term", (req, res, next) => {

    /**
     * todo необходимо сделать авторизацию пользователя используя JWT
     */

    let term = req.params.term;
    let searchInFile = require("search-in-file");
    let responseObject = {'term':term,'result':null};
    searchInFile.fileSearch([directoryPath], term, {recursive: true, searchResults: 'lineNo'})
        .then(function (results) {
            responseObject.result = results;
            res.json(responseObject);
        });
})

module.exports = router