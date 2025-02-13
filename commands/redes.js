const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('redes') // Nombre del comando
        .setDescription('Muestra los enlaces a mis redes sociales'), // Descripción del comando
    async execute(interaction) {
        // URLs de tus redes sociales
        const redes = [
            { nombre: 'Twitch', url: 'https://twitch.tv/alegonzalez03' },
            { nombre: 'Tiktok', url: 'https://tiktok.com/@alegonzaf03' },
            { nombre: 'Facebook', url: 'https://facebook.com/AleGonzaf03' },
            // Agrega más redes según lo necesites
        ];

        // Crear el embed
        const embed = new EmbedBuilder()
            .setColor('#e906fa') // Color del borde del embed (puedes cambiar el código de color)
            .setTitle('¡Sígueme en mis redes sociales!') // Título del embed
            .setDescription('Aquí están los enlaces a mis redes sociales:') // Descripción
            .setTimestamp() // Muestra la hora del mensaje
            .setFooter({ text: '¡Gracias por seguirme!', iconURL: 'https://icons.veryicon.com/png/o/miscellaneous/logo-design-of-lingzhuyun/icon-correct-24-1.png' }); // Pie de página (opcional)

        // Agregar los enlaces de redes al embed
        redes.forEach(red => {
            embed.addFields({ name: red.nombre, value: red.url, inline: true });
        });

        // Enviar el embed como respuesta
        await interaction.reply({ embeds: [embed] });
    },
};
