// declare stuff
const express = require('express');
const subdomain = require('express-subdomain')
const session = require('express-session')
const ejs = require('ejs')
const router = express.Router()

require('dotenv').config({  
    path: "./env/.env.testing"
})
const app = express();
const db = require('./controllers/firebase')
console.log(db)
//Define o EJS como view enggine padrão    
app.set('view engine', 'ejs');

//Cria a sessão do 'express-session'
app.use(session({
    //Secret Token da sessão
    secret: '48738924783748273742398747238',
    //Parâmetro 'resave'
    resave: false,
    //Parâmetro 'saveUninitialized'
    saveUninitialized: false,
    //Tempo para a sessão expirar
    expires: 604800000,
}));
app.use(subdomain('cdn', express.static('static')));
require('./controllers/cdn')(express, app, subdomain, db, ejs)
require('./subdomains.router')(express, app, subdomain, db, ejs)
require('./router')(express, app, subdomain, db, ejs)
app.use(router);
app.use(function(req, res, next){

    res.status(404);
    
    // respond with html page
    if (req.accepts('html')) {
      res.render('errors/404.html', { url: req.url });
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
  }); 

//Start server
app.listen(80);
 