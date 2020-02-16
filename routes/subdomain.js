const express = require('express')
const router = express.Router()
const app = express()
router.get('/', function (req, res) {
    console.log(req.hostname)
    res.send('root');
});

module.exports = router;