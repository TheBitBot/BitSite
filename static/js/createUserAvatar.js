async function createUserAvatar(avatarURL) {
    const jimp = require('jimp')
    var avatar = await jimp.read(avatarURL)
    var mask = await jimp.read('static/img/jimp/templates/mascara.png')
    avatar.resize(128, 128)
    mask.resize(128, 128)
    avatar.mask(mask).write('beta.png')
    
}
module.exports = createUserAvatar()