module.exports = (app, subdomain, ejs) => {
    
    app.use('/', require('./routes/index'))
    app.use('/a', (req, res, next) => {
        res.status(200).send('Something broke!')
        
    })
   
}