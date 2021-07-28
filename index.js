const discord = require("discord.js");
const commando = require("discord.js-commando");
const path = require("path");
const fs = require("fs");
const ms = require("ms");
const config = require("./config.json");
const prefix = config.prefix;
const client = new commando.Client ({
    disableMentions: 'everyone',
    unknownCommandResponse: false,
    commandPrefix: prefix,
    owner: config.owner,
});
const Token = config.Token;
client.login(Token);
client.registry
        .registerDefaultTypes()// ide NE tegyél ilyent --> ; 
        .registerDefaultGroups()// ide NE tegyél ilyent --> ; 
        .registerDefaultCommands({
            unknownCommand: false,
            ping: false,
        })// ide NE tegyél ilyent --> ; 
        .registerGroups([
            ["parancsok", "Parancsok"],
        ])// ide NE tegyél ilyent --> ; 
        //.registerDefaults()// ide NE tegyél ilyent --> ; 
        .registerCommandsIn(path.join(__dirname, "commands"));

client.on("ready", async()=>{
    console.log(`${client.user.tag} online lett! :D`)
})

client.on("message", message=>{
    if(!message.content.startsWith(prefix))return;
    const messageArray = message.content.slice(prefix.length).split(" ");  // feldarabolod ezzel az üzenetet
    const cmd = messageArray[0]; // ezt fogjuk használni arra, hogy a cmd-t megadjuk vele --> ping parancs erre a példa
    const args = messageArray.slice(1); // példa rá --> mely parancs
    if(message.content === `${prefix}szia`){
        message.channel.send(`Szia!`);
    };
    if(cmd === `ping`){
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
    if(cmd === `mely`){
        if(!args[0])return message.channel.send(`__Így használd:__ ${prefix}mely <érték1> <érték2>`)
        if(!args[1])return message.channel.send(`__Így használd:__ ${prefix}mely <érték1> <érték2>`)
        const ertek_1 = args[0];
        const ertek_2 = args[1];
        const ertekek = [ertek_1, ertek_2];
        const sorsolas = ertekek[Math.floor(Math.random()*ertekek.length)];
        message.channel.send(`__A választott érték:__ \`${sorsolas}\``)
    }
    if(cmd === `bot`){
        message.channel.send(`${client.user.username}`)
    }
});

client.on("message", message=>{
    if(message.content.startsWith(prefix))return;
    if(message.content === `Itt vagy bot?`){
        message.channel.send(`Igen, itt vagyok!`)
    }
})

// ======================== DATE ELEM GYAKORLÁS ===========================
let d = new Date()
const year = d.getFullYear()
const month = d.getMonth()
const day = d.getDate()
const hour = d.getHours()
const min = d.getMinutes()
console.log(`Elindult ekkor: ${year}.${month}.${day} - ${hour}:${min}`)
