// declare stuff
const express = require('express');
const subdomain = require('express-subdomain')
const session = require('express-session')
const ejs = require('ejs')
const router = express.Router()

require('dotenv').config({  
    path: "./env/.env"
})
const app = express();

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

app.use(router);
require('./subdomains.router')(app, subdomain, ejs)
require('./router')(app, subdomain, ejs)
app.use('/cdn', express.static(__dirname + '/static'));

app.use(subdomain('cdn', express.static(__dirname + '/static')))

//Start server
app.listen(80);
