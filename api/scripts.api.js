const router = require('express').Router();

router.get('/save', (req, res) => {
    res.send(`<script>// 1. Make the request// ================================ function saveChanges() { var url = 'http://api.thebitbot.xyz/save';var fetchOptions = {method: 'POST',body: JSON.stringify({name: 'Alex', surname: 'Moran'})};console.log('Hello World!')fetch(url, {method: 'POST',headers: {'content-type': 'application/json'},body: JSON.stringify({name: 'Alex', surname: 'Moran'})});}</script>`)
})

module.exports = router;