const { SlashCommandBuilder } = require('@discordjs/builders');
const path = require('path');
const {
  joinVoiceChannel,
  VoiceConnectionStatus,
  createAudioPlayer,
  createAudioResource,
} = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gnome')
    .setDescription(
      'Gnome is going to join your voice chat and play "hooooh" sounds at random intervals.'
    ),
  async execute(interaction) {
    const { voice } = interaction.member;
    const { client } = interaction;
    const channel = voice.channel;

    if (!voice.channel) {
      await interaction.reply(
        `🔊 <@${interaction.user.id}> You have to be in a voice channel 🔊`
      );
      return;
    }

    // setting up connection to the voice channel from which the command was created
    let connection = joinVoiceChannel({
      channelId: voice.channelId,
      guildId: voice.guild.id,
      adapterCreator: voice.guild.voiceAdapterCreator,
    });

    await interaction.reply(`<@${interaction.user.id}> has summoned Gnome`);

    // creating audioplayer and subscribing the connection to it
    // also setting loop for random gnome sounds
    connection.on(VoiceConnectionStatus.Ready, () => {
      console.log(
        'The connection has entered the Ready state - ready to play audio!'
      );

      const player = createAudioPlayer();
      connection.subscribe(player);

      // utility delay function
      const delay = (ms) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, ms);
        });
      };

      let random = 0;

      // loop for random gnome sounds
      const playAudio = async () => {
        for (let i = 0; i < 500; i++) {
          const resource = createAudioResource(
            path.join(__dirname, '../audio/gnome-short.mp3')
          );

          function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
          }
          // change these values to alter the intervals between "hooooh"
          random = randomIntFromInterval(30000, 300000);

          player.play(resource);
          await delay(random);
        }
      };

      playAudio();
    });

    // checking if any members are in a voice chat where the connection is
    // if there isn't then the bot is going to leave the voice channel
    client.on('voiceStateUpdate', (oldState, newState) => {
      const members = channel.members;

      const membersArray = members.map((member) => {
        return member;
      });

      if (membersArray === undefined) return;

      if (membersArray.length === 1 && membersArray[0].user.bot === true) {
        connection.disconnect();
      }
    });
  },
};
