let jimp = require("jimp")
exports.run = (bot, msg , args) =>{
  let url = args
	let user = msg.mentions.users.first();
	function stupuid(url) {
	let img =	jimp.read("https://www.api.jackiejs.xyz/imgen/stupid.png")
  let img2 = jimp.read(url).resize(150 , 150)
  img.composite(img2, 10 , 90);
  img.write("./stupid.jpg")
      msg.channel.send({
				files: [{
					attachment: "./stupid.jpg",
					name: 'stupid.jpg'
				}]
			});
		}

	if (!url.startsWith("http")) {
		if (!user) {
			url = msg.attachments.first().url
			stupuid(url)
		} else
			url = user.avatarURL
		stupuid(url)
	} else
		stupuid(url)
}
