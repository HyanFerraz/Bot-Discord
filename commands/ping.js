const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde com "Pong!"'),

    async execulte (interaction) {
        await interaction.reply('Pong!')
    }
}