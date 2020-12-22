const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//

//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);


//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add('774179011889987624'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG


//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG

client.on("guildMemberAdd", member => {  
    const kanal = member.guild.channels.cache.find(r => r.id === "774185934153187338");
    const register = "<@&774176334032797706>"    
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir Gözüküyor'
    moment.locale("tr");
      const strigalog = new Discord.MessageEmbed()
      .setAuthor(member.guild.name)
  .setDescription("**Hoşgeldin! <@" + member + "> Seninle \`" + member.guild.memberCount + "\` Kişiyiz.\n\nMüsait olduğunda Register Odalarından Birine Geçip Kaydını Yaptırabilirsin. \n\n<@&774176334032797706> seninle ilgilenicektir. \n\nHesabın Oluşturulma Tarihi: " + moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +  "\n\n"  + kontrol + "\n\nTagımızı alarak ` ༫ ` bize destek olabilirsin.**\n")
   .setImage("https://cdn.glitch.com/27f16598-c7f3-4836-bd62-89154d4041f9%2F36524ba103c5812a53e8c37f7ed22179.gif?v=1607179511123")
   kanal.send(strigalog)   
   kanal.send(register) 
  
}); 
//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG




// OTO MESAJ
client.on('message', lrowstagmesaj => {
  if (lrowstagmesaj.content.toLowerCase() === '!tag') {
    lrowstagmesaj.channel.send('༫ ');//TAG
  }
});

client.on('message', lrowstagmesaj => {
  if (lrowstagmesaj.content.toLowerCase() === 'tag') {//TAG
    lrowstagmesaj.channel.send('༫');
  }
});

client.on('message', lrowsserverlinkmesaj => {
  if (lrowsserverlinkmesaj.content.toLowerCase() === '!link') {
    lrowsserverlinkmesaj.channel.send('**İşte Sunucumuzun Davet Linki! :** `https://discord.gg/Bcmy3zXkKP`');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!davet') {
    msg.channel.send('**İşte Sunucumuzun Davet Linki! :** `https://discord.gg/Bcmy3zXkKP`');
  }
});

client.on("ready", () => {
  console.log(`Bot aktif!`);
  setInterval(function() {
    let lrowskanal = client.channels.cache.get("x");//kanal id girmeniz yeterli olacaktır
    if (lrowskanal) {
      lrowskanal.send(
        "Kanala atacak mesajınızı giriniz"
      );
    }
  }, 7200000);


});


//günaydın-iyigeceler//

client.on('message', msg => {   if (msg.author.bot) return;
  if   (msg.content.toLowerCase().includes('merhaba')) msg.reply(' :full_moon: Sana da Merhaba');  if   (msg.content.toLowerCase().includes('günaydın')) msg.reply(' :full_moon: Sana da Günaydın');   if  (msg.content.toLowerCase().includes('herkese günaydın'))msg.reply(':sun_with_face: Günaydın :)');   if (msg.content.toLowerCase().includes('iyi geceler')) msg.reply(' :crescent_moon: Sana da iyi geceler');   if (msg.content.toLowerCase().includes('iyi akşamlar')) msg.reply(':first_quarter_moon: sana da iyi akşamlar'); if (msg.content.toLowerCase().includes('hayırlı sahurlar')) msg.reply(':cooking: Hayırlı Sahurlar');if (msg.content.toLowerCase().includes('Hayırlı Sahurlar')) msg.reply(':cooking: Hayırlı Sahurlar'); if (msg.content.toLowerCase().includes('hayırlı iftarlar')) msg.reply(':hamburger: :fries: Hayırlı İftarlar'); if (msg.content.toLowerCase().includes('ne zaman çıkıcak')) msg.reply('Belli bir tarihi yok mayısın sonu diye söylenti var');
});



  //sete tut//
client.on("ready", () => {
client.channels.cache.get("775292548380885022").join()
})




//tag alana rol

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = '༫'
  const sunucu = '773271952752115723'
  const kanal = '775040864833110037'
  const rol = '774044369950343170'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});