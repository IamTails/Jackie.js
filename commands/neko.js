snekfetch = require('snekfetch');
exports.run = async (bot, msg) => {
    await snekfetch.get('https://nekos.life/api/neko')
        .then(r => msg.channel.send({
            embed: {
                color: bot.getRandomColor(),
                author: {
                    name: "here's a random neko",
                    icon_url: bot.user.avatarURL
                },
                image: {
                    url: r.body.neko
                }
            }
        }).catch(e => console.warn('wew tf happened here ' + e)));

};
