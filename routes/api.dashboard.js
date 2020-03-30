const router = require('express').Router();

//Save
router.post('/save',function(req,res){
    var name = req.body.name
    var surname = req.body.surname
    //fs.writeFileSync('data.txt', req.body)
    console.log(`Name: ${name}\nSurname: ${surname}`)
    //console.log("User name = "+user_name+", password is "+password);
    res.send('Hello World!')
});

//Save Script
router.get('/scripts/save', (req, res) => {
    res.render('../routes/script')
})
//General
router.get('/general', require('../api/general.api'))

//Scripts
router.get('/scripts', require('../api/scripts.api'))
module.exports = router;