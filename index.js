const { Client, GatewayIntentBits, Collection, REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { clientId, guildId, token } = require("./config.json");

// Crear nuevo cliente de Discord
const client = new Client({
    intents: 53608447 // Todos los intents habilitados
});

// Configurar una colección para los comandos
client.commands = new Collection();

// Cargar los comandos desde la carpeta "commands"
fs.readdirSync("./commands")
    .filter(filename => filename.endsWith(".js"))
    .forEach((filename) => {
        try {
            const command = require(`./commands/${filename}`);
            client.commands.set(command.data.name, command); // Registrar el comando por su nombre
        } catch (err) {
            console.log("[err] Ha ocurrido un error al cargar un comando", err);
        }
    });

// Registrar los comandos en Discord
const commands = [];
fs.readdirSync("./commands")
    .filter(filename => filename.endsWith(".js"))
    .forEach((filename) => {
        const command = require(`./commands/${filename}`);
        commands.push(command.data.toJSON());
    });

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
    try {
        console.log("Empezando a registrar los comandos...");
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });
        console.log("¡Comandos registrados con éxito!");
    } catch (err) {
        console.log("[err] Error al registrar comandos", err);
    }
})();

// Cargar los eventos desde la carpeta "events"
fs.readdirSync("./events")
    .filter(filename => filename.endsWith(".js"))
    .forEach((filename) => {
        try {
            const listener = require(`./events/${filename}`);
            const eventName = path.basename(filename, ".js");
            // client.on(eventName, listener.bind(null, client)); // Asociar el evento
            client.on(eventName, listener);
        } catch (err) {
            console.log("[err] Ha ocurrido un error al cargar un evento", err);
        }
    });

// Manejo de interacciones (comandos)
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return; // Verificar si es un comando

    const command = client.commands.get(interaction.commandName); // Obtener el comando

    if (!command) return; // Verificar si el comando existe

    try {
        await command.execute(interaction); // Ejecutar el comando
    } catch (err) {
        console.error("[err] Ha ocurrido un error al ejecutar el comando", err);
        await interaction.reply("Hubo un error al ejecutar este comando.");
    }
});

//conctar cliente con la aplicacion de discord
client.login(token);