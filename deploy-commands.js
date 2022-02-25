require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const gnome = require('./commands/gnome');
const gehweg = require('./commands/leaveGnome');
const makeGnomeWall = require('./commands/makeGnomeWall');

// const guildId = process.env.GUILD_ID;

const commands = [
  { name: gnome.data.name, description: gnome.data.description },
  { name: gehweg.data.name, description: gehweg.data.description },
  {
    name: makeGnomeWall.data.name,
    description: makeGnomeWall.data.description,
  },
];

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest
  .put(Routes.applicationCommands(process.env.CLIENT_ID), {
    body: commands,
  })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
