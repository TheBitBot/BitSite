const express = require('express')
const subdomain = require('express-subdomain')
const session = require('express-session')
const bodyParser = require('body-parser')
const firebase = require('firebase-admin')
const ejs = require('ejs')
const router = express.Router()

require('dotenv').config({  
    path: "./env/.env.testing"
})
var app = express();

//Define o EJS como view enggine padrão    
app.set('view engine', 'ejs');

//Configura o BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Incia o Firebase
var serviceAccount = require('./env/firebase.json')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://bit-db.firebaseio.com"
})

const db = firebase.database()

app.use(session({
   //Secret Token da sessão
    secret: 'token-super-secreto',
    //Parâmetro 'resave'
    resave: false,
    //Parâmetro 'saveUninitialized'
    saveUninitialized: false,
    //Tempo para a sessão expirar
    expires: 604800000,
    //Configura o cookie da sessão
    cookie: {domain: '.thebitbot.xyz'}
}));

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

app.use('/cdn', express.static('static'))
require('./subdomains.router')(express, app, subdomain, db, ejs)
require('./router')(express, app, subdomain, db, ejs)
app.use(router);
app.use(function(req, res, next){

    res.status(404);
    
    // respond with html page
    res.render('errors/404', { url: req.url });

  /*
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  
    
    // default to plain-text. send()
    res.type('txt').send('Not found');
  */
}); 


app.listen(80)