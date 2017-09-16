const discord = require("discord.js");
const bot = new discord.Client();
const client = bot
var config = require("./config.json")
var prefix = config.prefix;
var ownerID = config.ownerID;
let dBots = config.bots.botsd;
let msbots = config.bots.mbots;
var oliyBots = config.bots.oliy;
const snekfetch = require("snekfetch");
function serverCount() {
  client.shard.fetchClientValues("guilds.size").then(result => {
  const guildsizes = result.reduce((prev, val) => prev + val, 0)
      snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
          .set("Authorization", oliyBots)
          .send({"server_count": guildsizes})
          .then(console.log("[oliyBots] Post Stats!"))

  snekfetch.post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
      .set("Authorization", dBots)
      .send({"server_count": client.guilds.size})
      .then(console.log("[dBots] Post Stats!"))
   snekfetch.post(`https://novo.archbox.pro/api/bots/${client.user.id}`)
		        .set("Authorization", msbots)
		        .send({"server_count":guildsizes})
	          .then(console.log("[mbots] Post Stats!"));
 	})
}

bot.on('ready', () => {   
	bot.user.setPresence({ game: { name: `+-help|${bot.guilds.size} servers|${client.shard.count}/${client.shard.id}`, type: 0 } });
  serverCount();
  bot.channels.get(config.logger.shardchannel).send(`I'm Ready!`) 
})
bot.on('guildCreate', (guild) =>{
	bot.user.setPresence({ game: { name: `+-help|${bot.guilds.size} servers|${client.shard.count}/${client.shard.id}`, type: 0 } });
	serverCount();
  bot.channels.get(config.logger.createchannel).send(`Joined a new server! Guild Name: ${guild.name}`) 
});
bot.on('guildDelete', (guild) =>{
	bot.user.setPresence({ game: { name: `+-help|${bot.guilds.size} servers|${client.shard.count}/${client.shard.id}`, type: 0 } });
	serverCount();
  bot.channels.get(config.logger.deletechannel).send(`Lefted a server! Guild Name: ${guild.name}`)
});

bot.on('message', msg => {
  if (msg.author.bot || !msg.content.startsWith(prefix) || bot.user.id !== "327135412806221826" || prefix !== "+-" || config.ownerID !== "214382760826109953"){ 
		return;
	}
  const args = msg.content.split(" ").slice(1).join(" ")
  const command = msg.content.split(" ").shift().slice(prefix.length)
  var user = msg.mentions.users.first();
 console.log(command)
  try {
     let commandFile = require(`./commands/${command}.js`)
     commandFile.run(bot, msg, args, user)
    } catch (err) {
      console.error(err);
   }
});
bot.login(config.keys.token);