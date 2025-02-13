const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hola') // Nombre del comando (en minúsculas)
        .setDescription('El bot te saluda!'), // Descripción del comando
    async execute(interaction) {
        // Respuesta del bot
        await interaction.reply('¡Hola! ¿Cómo estás? 😊');
    },
};



