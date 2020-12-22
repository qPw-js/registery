const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
var oyun = [
        
        ".başvuru İle Yetkili Olabilirsiniz!!!",
         "Angel İyi Eğlenceler Diler",
         "qPw De Kim",
         "Yeni Versiyon Kayıt"

    ];
 

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setActivity(oyun[random], "https://discord.gg/FQGKHfUKqy" );
      }, 2 * 5000); //DEĞİŞME SÜRESİ

  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("dnd"); //Online ile ofline rahatsız etmeyin buradan ayarlıyoruz. //qPw
  client.user.setActivity(`${prefix}yardım + ${client.guilds.size} sunucu + ${client.users.size} kullanıcı`);
 
};



