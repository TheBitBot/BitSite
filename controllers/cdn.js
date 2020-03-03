module.exports = (express, app, subdomain, db, ejs) => {
    
    app.use('/cdn', (req, res, next) => {
        res.redirect('http://cdn.thebitbot.xyz' + req.path)
    })
}