const router = require('express').Router();
const path = require('path')
var rootFolder = path.dirname(require.main.filename)
//Quando a pessoa usa "link.com.br/dashboard"
/*router.get('/dashboard', (req, res) => {
    res.render('dashboard', { pageTitle: 'Dashboard', user: req.session.user || null, userGuilds: req.session.userGuilds || null});
});*/

//Quando a pessoa usa "link.com.br/"
router.get('/', (req, res) => {
    res.render('index', { 
        pageTitle: 'Bit', 
        user: req.session.user || null , 
        userGuilds: req.session.userGuilds || null,
        hostname: "thebitbot.xyz"
    })
})

router.get('/dashboard', (req, res) => {
    
    res.render('dashboard', { pageTitle: 'Dashboard', user: req.session.user || null, userGuilds: req.session.userGuilds || null});
})

router.get('/legal/br/privacyPolicy', (req, res) => {
    res.render('legal/privacyPolicyBR', { pageTitle: 'Privacy Policy - Bit', user: req.session.user || null, userGuilds: req.session.userGuilds || null})
})

//router.use('/dashboard/configure', require('./dashboard'))
//router.use('/store', require('./store'));

router.get(`/favicon`, (req, res) => {
    res.sendFile(rootFolder + '/assets/img/bitLogo - 24px.png')
})
module.exports = router;