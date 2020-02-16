const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('./blog/home')
})
router.get('/updates/:date', (req, res) => {
    var date = req.params.date.split('-')
    var day = date[0]
    var month = date[1]
    var year = date[2]
    var fileName = `${day}${month}${year}`
    console.log(fileName)
    res.render(`./blog/updates/${fileName}`)
    //res.send('blog ok!')
})
module.exports = router;