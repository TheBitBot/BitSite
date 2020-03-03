const { exec } = require("child_process");
const http = require('http')
exec("node .", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

const axios = require('axios');

axios.get('http://cdn.thebitbot.xyz/css/blog.css')
  .then(response => {
    console.log('A CDN está funcionando corretamente!')
  })
  .catch(error => {
    console.log(error);
});