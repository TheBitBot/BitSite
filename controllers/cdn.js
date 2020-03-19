module.exports = (express, app, subdomain, db, ejs) => {
    
    app.use('/cdn', (req, res, next) => {
        res.redirect('https://cdn.thebitbot.website' + req.path)
    })
}