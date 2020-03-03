const router = require('express').Router()

router.get('/', (req, res) => {
    
        res.render('index', { 
            pageTitle: 'Bit', 
            user: req.session.user || null , 
            userGuilds: req.session.userGuilds || null,
            hostname: process.env.HOSTNAME
        })
    
})

module.exports = router