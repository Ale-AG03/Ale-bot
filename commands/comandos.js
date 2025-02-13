const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comandos') // Nombre del comando
        .setDescription('Muestra la lista de comandos disponibles'), // Descripción del comando
    async execute(interaction) {
        // Lista de comandos disponibles
        const comandos = [
            { nombre: '/redes', descripcion: 'Muestra los enlaces a mis redes sociales' },
            { nombre: '/hola', descripcion: 'El bot te saluda' },
            { nombre: '/comandos', descripcion: 'Muestra la lista de comandos disponibles' },
            { nombre: '/about', descripcion: 'Muestra información sobre el bot' },
            // Agrega más comandos según lo necesites
        ];

        // Crear el embed
        const embed = new EmbedBuilder()
            .setColor('#e906fa') // Color del borde del embed (puedes cambiar el código de color)
            .setTitle('Comandos disponibles') // Título del embed
            .setDescription('Aquí están los comandos que puedes utilizar:') // Descripción
            .setTimestamp() // Muestra la hora del mensaje
            .setFooter({ text: '¡Gracias por usar el bot!', iconURL: 'https://icons.veryicon.com/png/o/miscellaneous/logo-design-of-lingzhuyun/icon-correct-24-1.png' }); // Pie de página (opcional)

        // Agregar los comandos al embed
        comandos.forEach(comando => {
            embed.addFields({ name: comando.nombre, value: comando.descripcion, inline: false });
        });

        // Enviar el embed como respuesta
        await interaction.reply({ embeds: [embed] });
    },
};
