const { GuildMember } = require("discord.js");
const { createCanvas, registerFont, loadImage} = require("canvas");

const defaultIcon = "https://w7.pngwing.com/pngs/1023/637/png-transparent-discord-hd-logo-thumbnail.png"
const backgroundPath = "./assets/images/background.png";
const fontPath = "./assets/fonts/Quicksand_Bold.ttf";
const subtitle = "Bienvenid@ al servidor!"; 
const avatarRaduis = 150;

registerFont(fontPath, {family: "Quicksand"});
console.log("Fuente Quicksand registrada correctamente.");
/**
* @param {GuildMember} member
*/
module.exports = async (member) => {

    const username = member.user.username;
    const avatar = 
    member.user.avatarURL({size: 256, extension: "png"}) || defaultIcon;

    const canvas = createCanvas(1200, 600);
    const ctx = canvas.getContext("2d");
    //aplicart sobra
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;



    const margin = 20;
    const background = await loadImage(backgroundPath);

    ctx.drawImage(background, margin, margin, canvas.width - margin * 2, canvas.height- margin * 2);


    //dibujar nombre del user
    ctx.font = "80px Quicksand";
    ctx.fillStyle = "white";
    ctx.shadowColor = "rgba(0,0,0.8)";
    ctx.shadowBlur= 5;

    const usernameMetrics = ctx.measureText(username);

    ctx.fillText(username, canvas.width / 2 - usernameMetrics.width / 2, (canvas.height * 3) / 4);


    //DIBUJAR SUBTITULO
    ctx.font = "80px Quicksand";
    ctx.fillStyle = "white";

    const subtitleMetrics = ctx.measureText(subtitle);

    ctx.fillText(subtitle,
        canvas.width / 2 - subtitleMetrics.width / 2, 
        (canvas.height * 3) / 4 + 60);


    const avatarImage = await loadImage(avatar);
    //dujaremos el avatar del user
    ctx.shadowColor = "rgba(0,0,0.4)";
    ctx.shadowBlur= 15;

    //border
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 
        canvas.height / 3, 
        avatarRaduis, 0, 
        Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    //avatar del user
    ctx.shadowColor = "Transparent";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 
        canvas.height / 3, avatarRaduis - 5, 
        0, 
        Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(
        avatarImage,
        canvas.width / 2 - avatarRaduis -5,
        canvas.height / 3 - avatarRaduis - 5,
        avatarRaduis * 2,
        avatarRaduis * 2
    );

    return canvas.toBuffer();
};