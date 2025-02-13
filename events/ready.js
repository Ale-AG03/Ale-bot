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


// const {Client, Events} = require("discord.js");

// const fs = require("fs");
// const path = require("path");

// //crear nuevo cliente de discord
// const client = new Client({
//     intents: 53608447
// });

// fs.readdirSync("./events")
// .filter((filename) => filename.endsWith(".js"))
// .forEach((filename) => {
//     try{
//         const listener = require(`./events/${filename}`);
//         const eventName = path.basename(filename, ".js");

//         client.on(eventName, listener);
//     }catch (err){
//         console.log("[err] Ha ocurrido un error al cargar un evento", err)
//     }
// });

// //conctar cliente con la aplicacion de discord
// client.login(
//     "MTMwNDgzODI1MjYxNTgyNzU4Ng.G6Mnvv.EUN1hgqiDCw1OqGWuewVpgaek_WWtOLwAUzcAs"
// );