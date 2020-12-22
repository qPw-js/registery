const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
if(!["774176334032797706"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send(`Bu Komutu Kullanabilmek İçin Yetkin Bulunmuyor.`)
  
const kadin = message.guild.roles.cache.find(r => r.id === "774179781461671966")

const kayıtsız = message.guild.roles.cache.find(r => r.id === "774179011889987624")
const reglog = message.guild.channels.cache.find(c => c.id === "789013456187031582")
const genelchat = message.guild.channels.cache.find(g => g.id === "774265309233152021")

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(`Bir Kullanıcı Belirt.`)
if(!member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu Kullanıcı Sizle Üst/Aynı Pozisyondadır.`)
const x = message.guild.member(member)

let tag = "༫"
let isim = args[1]
let yas = Number(args[2])
if(!isim) return message.channel.send(`Bir İsim Belirt`)
if(!yas) return message.channel.send(`Bir Yaş Belirt`)

let bilgi = db.get(`yetkili.${member.id}`);  
db.add(`yetkili.${message.author.id}.kadin`,1 )
db.add(`yetkili.${message.author.id}.toplam`, 1)  
let toplami = db.fetch(`yetkili.${message.author.id}.toplam`)  

message.react('✅')
x.setNickname(`${tag} ${isim} | ${yas}`)
x.roles.add(kadin)

x.roles.remove(kayıtsız)
//
x.setNickname(`${tag} ${isim} | ${yas}`)
x.roles.add(kadin)

x.roles.remove(kayıtsız)


genelchat.send(`<@${member.id}>, Aramıza Hoş Geldin ! Umarım Keyifli Vakitler Geçirirsin.`)

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kadın", "k", "woman", "girl", "kız"],
    permLevel: 0
};

exports.help = {
    name: "kadın"
}

