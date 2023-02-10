const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('playlist')
    .setDescription('Ouça a melhor playlist já criada'),

    async execulte (interaction) {
        await interaction.reply('https://open.spotify.com/playlist/6iNoWeAKiXRYd2Ggqf790k?si=d37383c6398e4cfa')
    }
}