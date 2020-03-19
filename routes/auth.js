//Importa o roteador
const router = require('express').Router();

//Importa algumas configurações
require('dotenv/config');
//const { clientId, clientSecret, scopes, redirectUri } = require('../config.json');
const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const scopes = JSON.parse(process.env.SCOPES)
const redirectURI = process.env.REDIRECT_URI
//Importa alguns módulos do Node
const fetch = require('node-fetch');
const FormData = require('form-data');
const forceAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect(`auth.${req.hostname}`)
    else return next();
}

//Caso a pessoa use link.com.br/authorize
//Ele redireciona o usuário para a página de autorização
router.get('/', (req, res) => {
    //if (req.session.user) return res.redirect(`http://thebitbot.xyz/dashboard`);

    const authorizeUrl = `https://discordapp.com/api/oauth2/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectURI)}&response_type=code&scope=${scopes.join('%20')}`;
    //const authorizeUrl = 'https://discordapp.com/oauth2/authorize?client_id=618202633907208192&redirect_uri=http%3A%2F%2Fthebitbot.xyz%2Fauth%2Fcallback&response_type=code&scope=identify%20email%20guilds'
    res.redirect(authorizeUrl); 
});

//Caso a pessoa use link.com.br/authorize/callback
//Ele autentica e importa 
router.get('/callback', (req, res) => {
    //Se o usuário estiver logado ele redireciona para a home
    //if (req.session.user) return res.redirect('/');
    
    //Acess code retornado pelo Discord em caso de sucesso na autenticação
    const accessCode = req.query.code;
    //Se nenhum acess code for retornado
    if (!accessCode) return res.status(401).send(`Nenhum Acess Code foi retornado pelo Discord`);

    //Novo form para as informações usadas no POST para receber a resposta do Discord com as tokens para GET de informações do usuário
    const data = new FormData();
    data.append('client_id', clientID);
    data.append('client_secret', clientSecret);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', redirectURI);
    data.append('scope', scopes.join(' '));
    data.append('code', accessCode);
    //POST para retornar a resposta do Discord (tokens para GET de informações do usuário)
	fetch('https://discordapp.com/api/oauth2/token', {
		method: 'POST',
		body: data,
    })
    //Resposta em JSON
    .then(discordRes => discordRes.json())
    //Chama as funções de GET de informações do usuário e dos seus servidores
	.then(response => {
            fetchUserInfo(response)
            fetchUserGuilds(response)
    })
		
	//GET: User Info
    function fetchUserInfo(info) {
       fetch('https://discordapp.com/api/users/@me', {
			headers: {
				authorization: `${info.token_type} ${info.access_token}`,
        	},
        })
        .then(userRes => userRes.json())
        .then(userResponse => {
            userResponse.tag = `${userResponse.username}#${userResponse.discriminator}`;
            userResponse.avatarURL = userResponse.avatar ? `https://cdn.discordapp.com/avatars/${userResponse.id}/${userResponse.avatar}.png?size=1024` : null;
            //const jimp = require('jimp')
            //const fs = require('fs')
            /*
            async function createUserAvatarIcon() {
                var avatar = await jimp.read(userResponse.avatarURL)
                var mask = await jimp.read('static/img/jimp/templates/mascara.png')
                avatar.resize(128, 128)
                mask.resize(128, 128)
                avatar.mask(mask).write('./routes/avatar.png')
            }
            */
            //createUserAvatarIcon()
            //userResponse.avatarIcon = 'Hello World!'
            //fs.unlinkSync('avatar.png')
            req.session.user = userResponse;   
	    });
    }

	//GET: User Guilds
    function fetchUserGuilds(info) {
        fetch('https://discordapp.com/api/users/@me/guilds', {
			headers: {
				authorization: `${info.token_type} ${info.access_token}`,
            },
        })
        .then(userGuilds => userGuilds.json())
        .then(userGuilds => {
            /*
            for(var i = 0; i < userGuilds.length; i) {
                var guild = userGuilds[i]
				if(guild === undefined) return
                i++
                
				if(guild.owner === true)  {
                    console.log('------------------------------------------------')
                }
                
                
                   
                    
               
            }*/
            /*if(userGuilds[i].owner === true) {
                console.log(userGuilds[i])
            }*/
            
            const guildsArray = []
            for(var i = 0; i < userGuilds.length;) {
                function getGuildIcon() {
                    if(userGuilds[i].icon !== null) {
                        return `https://cdn.discordapp.com/icons/${userGuilds[i].id}/${userGuilds[i].icon}`
                    } else if(userGuilds[i].icon === null) {
                        return `https://discordapp.com/assets/41484d92c876f76b20c7f746221e8151.svg`
                    }
                }
                userGuilds[i].iconURL = getGuildIcon()
                try {
                    if(userGuilds[i].owner === true) {
                        guildsArray.push(userGuilds[i])
                    }
                    /*if(userGuilds[i].permissions & 0x00000008 === 8) {
                        //console.log(userGuilds[i].permissions & 0x00000008 == true)
                        guildsArray.push(userGuilds[i])
                    }
                    if(userGuilds[i].permissions & 0x00000008 === 0) {
                        guildsArray.splice(i)
                    }*/
                } catch {

                } 
                i++
            }
            
            req.session.userGuilds = guildsArray
            
            //console.log(req.session.userGuilds)
            //res.cookie('user', req.session.user)
            res.redirect('http://thebitbot.xyz')
            
            
            
            
           
		});
	}
});

//Logout
router.get('/logout', (req, res) => {
    //Finaliza a sessão
    req.session.destroy();
    //Redireciona para a home
    res.redirect('http://thebitbot.xyz')
});

module.exports = router;