const { Collection } = require("discord.js");

const inviteCache = new Collection();

/**
 * @param {Client} client
 */

async function updateCache(client) {
    const guilds = client.guilds.cache;

    for (const guild of guilds.values()) { // Asegúrate de usar .values() para iterar sobre la colección.
        try {
            const invites = await guild.invites.fetch(); // Obtener todas las invitaciones del servidor.
            inviteCache.set(guild.id, invites); // Guardar las invitaciones en la caché.
        } catch (error) {
            console.error(`Error al obtener las invitaciones del servidor ${guild.id}:`, error.message);
        }
    }
}

/**
 * Obtener la última invitación utilizada.
 * @param {Guild} guild
 * @returns {Promise<Invite | undefined>}
 */
async function getLastUsed(guild) {
    const cachedInvites = inviteCache.get(guild.id); // Obtener invitaciones en caché.
    let updatedInvites;

    try {
        updatedInvites = await guild.invites.fetch(); // Obtener las invitaciones actualizadas.
    } catch (error) {
        console.error(`Error al actualizar las invitaciones del servidor ${guild.id}:`, error.message);
        return;
    }

    if (!cachedInvites) {
        console.warn("No se encontraron invitaciones en la caché. Actualizando...");
        await updateCache(guild.client); // Si no hay caché, actualizar.
        return;
    }

    let usedInvite;
    for (const cachedInvite of cachedInvites.values()) {
        const updatedInvite = updatedInvites.get(cachedInvite.code);

        // Compara el número de usos para determinar la última usada.
        if (updatedInvite && updatedInvite.uses !== cachedInvite.uses) {
            usedInvite = updatedInvite;
            break;
        }
    }

    await updateCache(guild.client); // Actualiza la caché después de verificar.
    return usedInvite;
}

module.exports = { updateCache, getLastUsed };
