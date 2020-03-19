module.exports = (express, app, subdomain, db, ejs) => {
    
      
    app.use('/404', (req, res, next) => {
        console.log(req.session)
        res.status(200).send('Something broke!')
    })
    //Suporte
    app.use('/support', (req, res, next) => {
        res.render('support',  {
            user: req.session.user,
            pageTitle: 'Suporte - Bit'
        })
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
        console.log('user:' + req.session.userGuilds)
        res.render('index', { 
            pageTitle: 'Bit', 
            language: "pt-br", 
            user: req.session.user
            })
    })
    
       
    
}