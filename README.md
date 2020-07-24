# Digicode test app

- requirements: latest nodejs version, npn, mongodb


1) Clone this repository https://github.com/amelexik/node-js-app.git

2) Run 
```sh
$ cd node-js-app
$ npm install 
```

3) Copy .env.dist => .env and configure you app:
    - MONGODB_URL
    - JWT_KEY
    - PORT=3000
    - SEARCH_DIR=storage

# Run

```sh
$ node file-index.js
$ node index.js
```

 - POST /users - register new user - body json fields {name,email,password}
 - POST /user/login - auth user -  body json fields {email,password}
 - GET /search/:text - find files by content
