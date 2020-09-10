const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const {prefix, bot_age, bot_info} = require('./config.json');
const fs = require('fs');
require('dotenv').config();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!')
});

client.login(process.env.TOKEN);

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    let embedb = new Discord.MessageEmbed()
        .setColor(0x4287f5)
        .setTitle(`I can't recognize this command!`)
        .setDescription(
        `Maybe a typo? Do \`${prefix}help\` for a list of available commands.`
        )
        .setThumbnail(message.guild.iconURL())
        .setFooter(client.user.username, client.user.avatarURL())
        .setTimestamp();
    if (!client.commands.has(commandName)) return message.channel.send(embedb);
    const command = client.commands.get(commandName);
    
    try {
        command.execute(message, args);
    } catch(error) {
        console.error(error);
        let embed = new Discord.MessageEmbed()
            .setColor(0x4287f5)
            .setTitle(`An error has occured while executing a command! Details are as follows:`)
            .setThumbnail(message.guild.iconURL())
            .addfields (
                { name: 'Error name:', value: '```\n${error.name}\n```', inline: true },
                { name: 'Error message:', value: '```\n${error.message}\n```', inline: true }
            )
            .setFooter(client.user.username, client.user.avatarURL())
            .addfieldssetTimestamp();
        return message.channel.send(embed);
    };
});