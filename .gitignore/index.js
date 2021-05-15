'use_strict';

const Discord = require('discord.js');
const client = new Discord.Client();

const moment = require('moment-timezone');

const settings = require('./settings.json');

client.commands = new Map();
client.aliases = new Map();
client.guildlist = new Map();

// Loader
require('./utils/commandLoader')(client);
require('./utils/guildLoader')(client);
require('./utils/eventLoader')(client);

/**
 * @param {string} type
 * @param {string} log
 */
client.sendLog = (type, log) => {

    const channelId = client.guildlist.get('bot_manager').channels.get(type).id;
    client.channels.fetch(channelId)
    .then(channel => {
        channel.send(`\`[${moment().tz("Europe/Paris").format('HH:mm:ss')}]\` | ${log}`);
    });

}

/**
 * @param {Message} message
 * @param {int} num
 * @return {boolean}
 */
client.hasPerm = (message, num) => {

    switch (num) {

        case 0:
            return true;
        case 1:
            return typeof message.member.roles.cache.find(role => role.name === settings.role.verified) !== 'undefined';
        default:
            return true;

    }

}

client.login(settings.token || process.env.TOKEN);
