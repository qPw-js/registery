 const Discord = require(`discord.js`)

exports.run = async (client, message, args) => {


let kanal = "779427355360755782"

let isim = args.slice(0).join(' ')

let yaş = args[1]

let aktif = args[2]



if(!isim) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`İsim Nedir.`)).then(a => a.delete({timeout:3000}))

if(isNaN(yaş)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Yaşını Yazmalısın.`)).then(a => a.delete({timeout:3000}))

if(!aktif) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Aktiflik saatin Nedir (sayı ile)`)).then(a => a.delete({timeout:3000}))


message.channel.send("Başvuru Başarıyla Gönderilmiştir.").then(a => a.delete({timeout:30000}))

let emebed = new Discord.MessageEmbed()
.setColor("RANDOM")
.addField(`Başvuru Yapan Üye`,`${message.author} (${message.author.id})`)
.addField(`İsim`,`${isim} `)
.addField(`Yaş`,yaş)
.addField(`Aktif`,aktif)
client.channels.cache.get(kanal).send(emebed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'başvuru',
};

  


