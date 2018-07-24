const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const fs = require('fs');
const enchant = require('../lib/enchant.js');

function Testbot(loginkey) {
  client.login(loginkey);

  client.on('ready', async () => {
    this.guild = client.guilds.find('name', 'ㄱㅂ');

    this.voiceChannel = this.guild.channels.last();
    this.textChannel = this.guild.channels.first();

    try {
      this.connection = await this.voiceChannel.join();
      console.log('connected');
    } catch (err) {
      console.log(err);
    }
  })

  client.on('message', (message) => {
    var text = message.content;
    console.log(text);

    if (text.charAt(0) === '/') {
      var command_param = text.split(' ');

      console.log(command_param);

      switch (command_param[0]) {
        case '/OPGG':
          this.textChannel.send('http://jp.op.gg/summoner/userName=' + command_param[1])
          return;
        case '/PLAY':
          if (command_param[1]) {
            this.playYoutube(command_param[1]);
          }
          return;
        case '/인챈':
          if (command_param[1]) {
            enchant.searchEnchant(command_param[1], (rtn) => {
              this.textChannel.send(rtn);
            });
          }
      }
    }
  })
}

Testbot.prototype.playYoutube = function (url) {
  var video = ytdl(url);
  video.pipe(fs.createWriteStream('magol.mp4'));
  video.on('end', () => {
    this.connection.playFile('magol.mp4');
  })
}

module.exports = Testbot;
