const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('makegnomewall')
    .setDescription('Makes a gnome wall'),
  async execute(interaction) {
    await interaction.reply({
      content: `🧱 ${interaction.user.username} has created a Gnome Wall 🧱`,
      files: [
        'https://i.kym-cdn.com/entries/icons/mobile/000/025/526/gnome.jpg',
        'https://i.kym-cdn.com/entries/icons/mobile/000/025/526/gnome.jpg',
        'https://i.kym-cdn.com/entries/icons/mobile/000/025/526/gnome.jpg',
        'https://i.kym-cdn.com/entries/icons/mobile/000/025/526/gnome.jpg',
        'https://i.kym-cdn.com/entries/icons/mobile/000/025/526/gnome.jpg',
      ],
    });
  },
};
