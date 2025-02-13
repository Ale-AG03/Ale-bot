const { REST, Routes } = require('discord.js');
const fs = require('fs');
const { clientId, guildId, token } = require('./config.json');

// Leer todos los comandos desde la carpeta "commands"
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Inicializar la API REST
const rest = new REST({ version: '10' }).setToken(token);

// Registrar los comandos
(async () => {
    try {
        console.log('Empezando a registrar los comandos...');

        // Comandos específicos para un servidor (Guild)
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('¡Comandos registrados con éxito!');
    } catch (error) {
        console.error(error);
    }
})();


