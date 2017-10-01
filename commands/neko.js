snekfetch = require('snekfetch');
exports.run = async (client, message) => {
    await snekfetch.get('https://nekos.life/api/neko')
        .then(r => message.channel.send({
            embed: {
                author: {
                    name: "Nekos \\o/",
                    icon_url: client.user.avatarURL
                },
                image: {
                    url: r.body.neko
                }
            }
        }).catch(e => console.warn('wew tf happened here ' + e)));

};
