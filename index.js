const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, bot_age, bot_info} = require('./config.json');
require('dotenv').config();

client.once('ready', () => {
    console.log('Ready!')
});

client.login(process.env.TOKEN);

client.on('message', message => {
    console.log(message.content)
});