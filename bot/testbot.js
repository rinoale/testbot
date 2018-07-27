const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const fs = require('fs');
const enchant = require('../lib/enchant.js');
const gameAbout = require('../lib/game_about.js');

var test_data = {
  color: 3447003,
  author: {
    name: 'I am not a '
  },
  title: "This is an embed",
  url: "http://google.com",
  description: "This is a test embed to showcase what they look like and what they can do.",
  fields: [{
      name: "Fields",
      value: "They can have different fields with small headlines."
    },
    {
      name: "Masked links",
      value: "You can put [masked links](http://google.com) inside of rich embeds."
    },
    {
      name: "Markdown",
      value: "You can put all the *usual* **__Markdown__** inside of them."
    }
  ],
  timestamp: new Date(),
  footer: {
    text: "© Example"
  }
};

var richEmbed = new Discord.RichEmbed(test_data);

function Testbot(loginkey) {
  client.login(loginkey);

  client.on('ready', async () => {
    this.guild = client.guilds.find('name', 'ㄱㅂ');

    this.voiceChannel = this.guild.channels.find('type', 'voice');
    this.textChannel = this.guild.channels.find('type', 'text');

    try {
      this.connection = await this.voiceChannel.join();
      console.log('connected');
      this.textChannel.send(richEmbed);
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
          return;
        case '/투데':
          gameAbout.query((rtn) => {
            this.textChannel.send(rtn);
          })
          return;
      }
    }
  })
}

Testbot.prototype.playYoutube = function (url) {
  var video = ytdl(url);
  video.pipe(fs.createWriteStream('magol.mp4'));
  video.on('end', () => {
    var dispatcher = this.connection.playFile('magol.mp4');
    dispatcher.setVolume(0.1);
  })
}

module.exports = Testbot;
