const discord = require("discord.js");
const bot = new discord.Client();
const client = bot
const fs = require("fs");
var config = require("./config.json")
var prefix = config.prefix;
var ownerID = config.ownerID;
var logger = require("./logger.js")
let dBots = config.bots.botsd;
let msbots = config.bots.mbots;
let games = require("./games.json");
var oliyBots = config.bots.oliy;
const snekfetch = require("snekfetch");
/*
@author : Hansen
      _            _    _
     | | __ _  ___| | _(_) ___
  _  | |/ _` |/ __| |/ / |/ _ \
 | |_| | (_| | (__|   <| |  __/
  \___/ \__,_|\___|_|\_\_|\___|

Big Help: August!
Thanks to august for command handler and logger. <3
*/

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

function setgame(){
	let gamesnum = Math.floor(Math.random() * games.length)
bot.user.setPresence({ game: { name: games[gamesnum] + " |+-help", type: 0 } });
	}

bot.on('ready', () => {
  serverCount();
	setgame();
  bot.channels.get(config.logger.shardchannel).send(`I'm Ready!`)
})

bot.on('guildCreate', (guild) =>{
	setgame();
	serverCount();
  bot.channels.get(config.logger.createchannel).send(`Joined a new server! Guild Name: ${guild.name}`)
});

bot.on('guildDelete', (guild) =>{
		setgame();
	serverCount();
  bot.channels.get(config.logger.deletechannel).send(`Lefted a server! Guild Name: ${guild.name}`)
});

bot.on('message', msg => {
	if (msg.author.bot || !msg.content.startsWith(prefix)){
		return;
	} else
	if(bot.user.id !== "327135412806221826" || prefix !== "+-" || config.ownerID !== "214382760826109953"){
		return msg.reply("This is a stolen bot.")
	}else
  setgame();
	const args = msg.content.split(" ").slice(1).join(" ")
  const command = msg.content.split(" ").shift().slice(prefix.length)
  var user = msg.mentions.users.first();
  try {
     let commandFile = require(`./commands/${command}.js`)
     commandFile.run(bot, msg, args, user)
    } catch (err) {
      logger.warn(err);
   }
});
bot.login(config.keys.token);
