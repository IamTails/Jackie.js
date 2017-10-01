snekfetch = require('snekfetch');
exports.run = async (bot, msg) => {
    await snekfetch.get('https://nekos.life/api/neko')
        .then(r => message.channel.send({
            embed: {
                color: bot.getRandomColor(),
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
