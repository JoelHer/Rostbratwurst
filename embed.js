const Discord = require('discord.js');
//const fs      = require('fs');
//const client = new Discord.Client();
const { MessageEmbed } = require('discord.js')

const COLORS = {
    red: 0xe74c3c,
    green: 0x2ecc71,
    yellow: 0xf1c40f,
    blue: 0x3498db
}

module.exports = {

    /**
     * 
     * @param {Discord.Channel} chan 
     * @param {string} cont 
     * @param {string} title 
     */

    error (chan, cont, title, befmes) {
        var message
        var emb = new MessageEmbed()
            .setColor(COLORS.red)
            .setDescription(cont)

        if(title){
            emb.setTitle(title)
        }

        chan.send(befmes, emb).then((m)=> {
            message = m
        })
        return(message);
    },

    info (chan, cont, title, befmes) {
        var message
        var emb = new MessageEmbed()
            .setColor(COLORS.blue)
            .setDescription(cont)

        if(title){
            emb.setTitle(title)
        }

        chan.send(befmes, emb).then((m)=> {
            message = m
        })
        return(message);
    },

    white (chan, cont, title, befmes) {
        var message
        var emb = new MessageEmbed()
            .setColor(COLORS.white)
            .setDescription(cont)

        if(title){
            emb.setTitle(title)
        }

        chan.send(befmes, emb).then((m)=> {
            message = m
        })
        return(message);
    }




}

