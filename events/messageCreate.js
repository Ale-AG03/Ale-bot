module.exports = async (message) => {
    // Verificar si el mensaje y su autor están definidos
    if (!message || !message.author) return;

    // Ignorar mensajes de bots
    if (message.author.bot) return;

    // Solo procesar mensajes que comienzan con '/'
    if (!message.content.startsWith('/')) return;

    const args = message.content.slice(1).split(' ')[0]; // Obtener el nombre del comando

    try {
        // Intentar cargar el comando
        const command = require(`../commands/${args}`);
        
        if (command && typeof command.execute === 'function') {
            // Ejecutar el comando
            await command.execute(message);
        } else {
            console.log(`Comando no válido: ${args}`);
        }
    } catch (error) {
        console.log(`Error al ejecutar el comando - ${args}:`, error.message);
    }
};
