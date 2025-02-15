const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const generateImagen = require("../utils/canvas/welcomelmage");
const {idCanalpruduccion,idCanalpruevas } = require('./config.json');

module.exports = async (member) => {
    try {
        // Asegúrate de que `member.guild` exista y obtén el cliente
        if (!member.guild) {
            console.error("El miembro no pertenece a ningún servidor.");
            return;
        }
        const client = member.guild.client;
        if (!client) {
            console.error("El cliente no está definido.");
            return;
        }

        // Canal de pruebas
        // const welcomeChannelId = idCanalpruevas;

        // Canal de producción
        const welcomeChannelId = idCanalpruduccion;

        // Verifica que el canal exista
        const channel = await client.channels.fetch(welcomeChannelId);
        if (!channel) {
            console.error("No se encontró el canal de bienvenida.");
            return;
        }

        // Verifica si el bot tiene permisos para enviar mensajes en el canal
        const botPermissions = channel.permissionsFor(client.user);
        if (!botPermissions || !botPermissions.has("SEND_MESSAGES")) {
            console.error("El bot no tiene permisos para enviar mensajes en el canal.");
            return;
        }

        // Genera la imagen
        const buffer = await generateImagen(member);
        if (!buffer) {
            console.error("No se pudo generar la imagen.");
            return;
        }
        const attachment = new AttachmentBuilder(buffer, { name: "generated-image.png" });

        // Crea el embed
        const embed = new EmbedBuilder()
            .setTitle(`🌟 ${member.user.displayName} ¡Bienvenido a la comunidad! 🌟 `)
            .setColor("Blurple")
            .setDescription(`🎉 ¡Bienvenido a la comunidad! 🎉
Nos alegra muchísimo tenerte aquí. 🚀 No olvides echar un 👀 vistazo 👀 a los demás canales del servidor para descubrir todo lo que tenemos preparado para ti.

📜 Recuerda leer las [#reglas] 📜 para evitar cualquier infracción y disfrutar de una excelente experiencia en el servidor.

✨ ¡Diviértete y siéntete como en casa! ✨`)
            .setImage("attachment://generated-image.png")
            .setFooter({
                text: '❌ Invitado por un miembro desconocido. ❌ ',
            });

        // Envía el mensaje con el embed y la imagen
        await channel.send({
            content: `<@${member.user.id}>`,
            embeds: [embed],
            files: [attachment],
        });
    } catch (error) {
        console.error("Error en el evento guildMemberAdd:", error);
    }
};
