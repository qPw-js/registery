const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
if(!["788016832288260115"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send(`Bu Komutu Kullanabilmek İçin Yetkin Bulunmuyor.`)
  
const erkek = message.guild.roles.cache.find(r => r.id === "789947914435821618")



const genelchat = message.guild.channels.cache.find(g => g.id === "774265309233152021")

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(`Bir Kullanıcı Belirt.`)
if(!member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu Kullanıcı Sizle Üst/Aynı Pozisyondadır.`)
const x = message.guild.member(member)






let bilgi = db.get(`yetkili.${member.id}`);  
db.add(`yetkili.${message.author.id}.erkek`,1 )
db.add(`yetkili.${message.author.id}.toplam`, 1)  
let toplami = db.fetch(`yetkili.${message.author.id}.toplam`)  

message.react('✅')

x.roles.add(erkek)


//

x.roles.add(erkek)




genelchat.send(`<@${member.id}>, Ekibe  Hoş Geldin `)

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ekip", "p",],
    permLevel: 0
};

exports.help = {
    name: "ekip"
}

