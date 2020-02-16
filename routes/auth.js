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
    if (req.session.user) return res.redirect(`https://${req.hostname.replace('auth.', '')}/dashboard`);

    const authorizeUrl = `https://discordapp.com/api/oauth2/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectURI)}&response_type=code&scope=${scopes.join('%20')}`;
    res.redirect(authorizeUrl);
});

//Caso a pessoa use link.com.br/authorize/callback
//Ele autentica e importa 
router.get('/callback', (req, res) => {
    if (req.session.user) return res.redirect('/');
    
    const accessCode = req.query.code;
    if (!accessCode) return res.status(401).send(`Nenhum Acess Code foi retornado pelo Discord`)

    const data = new FormData();
    data.append('client_id', clientID);
    data.append('client_secret', clientSecret);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', redirectURI);
    data.append('scope', scopes.join(' '));
    data.append('code', accessCode);
		fetch('https://discordapp.com/api/oauth2/token', {
			method: 'POST',
			body: data,
		})
		.then(discordRes => discordRes.json())
		.then(response => {
                fetchUserInfo(response)
                fetchUserGuilds(response)
        })
		
		//Procura as informações do usuário
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
                req.session.user = userResponse;   
		});
    	}

		//Procura os servidores dos usuários
        function fetchUserGuilds(info) {
            fetch('https://discordapp.com/api/users/@me/guilds', {
				headers: {
					authorization: `${info.token_type} ${info.access_token}`,
                },
            })
            .then(userGuilds => userGuilds.json())
            .then(
				userGuilds => {
                    req.session.userGuilds = userGuilds;
                    res.redirect('/');      
			});
		}
});

router.get('/logout', forceAuth, (req, res) => {
    req.session.destroy();
    res.redirect('/')
});

module.exports = router;