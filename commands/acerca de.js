const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("about")
        .setDescription("Muestra información sobre el bot"),
    async execute(interaction) {
        await interaction.reply({
            content: `
**¡Hola! Soy Ale-Bot** 🤖
- 🌟 **Características:** Comandos interactivos, aun en desarrollo.
- 🛠️ **Versión:** 1.0.0 || 24.11.2024
- 🚀 **Desarrollador:** AleGonzaF03

        `,
            ephemeral: true, // Solo visible para el usuario
        });
    },
};
// - 📜 **Repositorio:** [GitHub](https://github.com/tu-repositorio)

