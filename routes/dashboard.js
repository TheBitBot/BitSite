const router = require('express').Router();
const firebase = require('firebase-admin')

router.get('/', (req, res) => {
    res.render(`dashboard/guildSelection`, {
        pageTitle: 'Dashboard - Bit',
        user: req.session.user,
        userGuilds: req.session.userGuilds,
        firebase: firebase
    })
})

router.get('/configure/:guildID/:page', (req, res) => {
    var guildID = req.params.guildID
    var page = req.params.page
    //function getGuildInfo() {
        firebase.database().ref(`Servidores/${guildID}`).once('value').then(function(snapshot) {
            var guildInfo = snapshot.val() || null
            
            function getGuildInfo() {
                try {
                    guild = req.session.userGuilds.find(guild => guild.id === guildID)
                }
                catch {}
                return guild
            }
            res.render(`dashboard/${page}`, {
                pageTitle: 'Dashboard - Bit',
                user: req.session.user,
                userGuilds: req.session.userGuilds,
                guild: getGuildInfo(),
                guildInfo: guildInfo
            })
        });
    //}

    
})

router.get('/save', (req, res, next) => {
    console.log(req.query)
    console.log(guild)
    firebase.database().ref(`Servidores/${guild.id}`).once('value').then(function(snapshot) {
        guildInfo = snapshot.val() || null
        console.log(guildInfo.find(req.query))
        var newGuildInfo = guildInfo + req.query
        console.log(newGuildInfo)
        
    });
    
    res.send('Hello World!')
})

module.exports = router;