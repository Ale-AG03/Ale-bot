const invites = require("../utils/functions/invites");
const { ActivityType } = require("discord.js"); // Asegúrate de importar ActivityType

module.exports = async(client) => {
    console.log(`Conectado como ${client.user.username}!`);

    await invites.updateCache(client);


    // Configurar presencia del bot
    client.user.setPresence({
        activities: [
            {
                name: "Con Tu Hermana", // Cambia esto por algo personalizado
                type: ActivityType.Playing,
            },
        ],
        status: "online", // Cambiar a idle o dnd si es necesario
    });
}
