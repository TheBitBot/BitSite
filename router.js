module.exports = (express, app, subdomain, db, ejs) => {
    
      
    app.use('/404', (req, res, next) => {
        res.status(200).send('Something broke!')
    })
    app.get('/about', (req, res, next) => {
        res.send('Hello World!')
    })
    app.get('/login/teste', (req, res, next) => {
        console.log(req)
    })
    app.get('/a', (req, res, next) => {
        res.render('blog/updates/page', {user: null})
    })
    app.get('/', (req, res, next) => {
        res.render('index', { 
            pageTitle: 'Bit', 
            language: req.session.language || "pt-br", 
            user: req.session.user || null
            })
    })
    
       
    
}