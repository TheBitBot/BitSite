module.exports = (app, subdomain, ejs) => {
    //Suporte
    app.use(subdomain('support', require('./routes/subdomain')));
    //Premium
    app.use(subdomain('guidelines.community', (req, res, next) => {
        res.send('api succefuly connected!')
    }));
    //ToS
    app.use(subdomain('tos', (req, res, next) => {
        res.render('tos', { pageTitle: 'Bit', language: req.session.language || "pt-br", user: req.session.user || null})
    }));
    //Blog
    app.use(subdomain('blog', require('./routes/blog')))

    

}

