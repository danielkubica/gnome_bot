const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gehweg')
    .setDescription('Gnome is going to leave the chat'),
  async execute(interaction) {
    const connection = getVoiceConnection(interaction.guildId);

    if (!connection) {
      await interaction.reply(
        `<@${interaction.user.id}> I cannot leave when I am not in a voice channel`
      );
      return;
    }

    connection.disconnect();
    await interaction.reply('Gnome disappeared');
  },
};
