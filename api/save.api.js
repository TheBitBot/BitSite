const router = require('express').Router();
const firebase = require('firebase-admin')
const formData = require('form-data')
router.post('/',function(req,res){
    var name = req.body.name
    var surname = req.body.surname
    //fs.writeFileSync('data.txt', req.body)
    console.log(`Name: ${name}\nSurname: ${surname}`)
    //console.log("User name = "+user_name+", password is "+password);
    res.send('Hello World!')
});

module.exports = router;