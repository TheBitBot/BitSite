module.exports = (express, app, subdomain, db, ejs) => {
    
    //Premium
    app.use(subdomain('guidelines.community', (req, res, next) => {
        res.send('api succefuly connected!')
    }));
    //ToS
    app.use(subdomain('tos', (req, res, next) => {
        res.render('tos', { 
            pageTitle: 'Bit', 
            language: req.session.language || "pt-br", 
            user: req.session.user || null})
        }));
    //app.use(subdomain('dashboard', (req, res, next) => {res.send('Hello World!')}))
    app.use(subdomain('dashboard', require('./routes/dashboard')))
    //Blog
    app.use(subdomain('blog', require('./routes/blog')))
    app.use('/blog', require('./routes/blog'))
    //Auth
    //app.use(subdomain('auth', require('./routes/auth')))
    app.use(subdomain('auth', require('./routes/auth')))
    //Auth
    //app.use(subdomain('cdn', require('./controllers/cdn')))
    

}

