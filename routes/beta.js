const router = require('express').Router()

router.get('/dashboard/guildSelection', (req, res) => {
    res.render(`dashboard/guildSelection`, {
        pageTitle: 'Dashboard - Bit',
        user: req.session.user,
        userGuilds: req.session.userGuilds,
        guild: getGuildInfo(),
        guildInfo: guildInfo
    })
})

router.get('/dashboard/general', (req, res) => {
    res.render(`dashboard/general`, {
        pageTitle: 'Dashboard - Bit',
        user: req.session.user,
        userGuilds: req.session.userGuilds,
        guild: getGuildInfo(),
        guildInfo: guildInfo
    })
})

module.exports = router;