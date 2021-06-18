const Discord = require('discord.js');


module.exports = {
    senden (msg, args, content) {
        msg.channel.send(content)
    }
}