require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const {
  getVoiceConnection,
  VoiceConnectionStatus,
} = require('@discordjs/voice');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

// creating a collection of commands on our cliet object
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => {
  return file.endsWith('.js');
});

// setting the commands into the collection
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// listening to "on" event
client.on('ready', () => {
  console.log('Bot is ready');
});

// listening to "interactionCreate" event
client.on('interactionCreate', (interaction) => {
  if (!interaction.isCommand()) return;

  const commandName = interaction.commandName;
  const command = client.commands.get(commandName);

  try {
    command.execute(interaction);
  } catch (error) {
    console.error(error);
    interaction.reply('⛔ Sorry, there must have been an error ⛔');
  }

  const connection = getVoiceConnection(interaction.guildId);

  if (connection) {
    connection.on('stateChange', (oldState, newState) => {
      console.log(
        `Connection transitioned from ${oldState.status} to ${newState.status}`
      );
    });
    connection.on(VoiceConnectionStatus.Disconnected, () => {
      if (!connection) return;
      connection.destroy();
    });
  }
});

client.login(process.env.TOKEN);
