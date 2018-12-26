/* ____ ____        _     ____            _     ____        _    _
  / ___| __ )  ___ | |_  | __ )  ___  ___| |_  | __ )  ___ | |_ | |
 | |   |  _ \ / _ \| __| |  _ \ / _ \/ __| __| |  _ \ / _ \| __ | |
 | |___| |_) | (_) | |_  | |_) |  __/\__ \ |_  | |_) | (_) | |_ |_|
  \____|____/ \___/ \__| |____/ \___||___/\__| |____/ \___/ \__ (_)
*/
const config = require("./config.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const fetch = require('node-fetch');
var fs = require('fs')
request = require('request');
const Kaori = require('kaori');
const moreSites = require('./moreSites');
const kaori = new Kaori(moreSites);


function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}


var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};


bot.on("ready", () => {
    console.log('CBot Online!');
});

bot.on("message", message => {

    var prefix = config.prefix;
    var messageArray = message.content.split(" ");
    var cmd = messageArray[0];
    var args = messageArray.slice(1);

    try {
        if (cmd === `${prefix}dog`) {
            fetch('https://dog.ceo/api/breeds/image/random')
                .then(response => response.json())
                .then(data => download(data.message, 'dog.png', function () {
                    console.log('done')
                    dog = "dog.png";
                    return message.channel.send({
                        files: [dog]
                    });
                }))

        }


        function trim(x) {
            let e = x.replace('[', '');
            let z = e.replace(']', '');
            let i = z.replace(' ', '');
            let k = i.replace(`"`, '');
            let j = k.replace(`"`, '');
            return j
        }
        function myFunction(x) {
            var str = trim(`${x}`);
          return(str)
          }

        if (cmd === `${prefix}cat`) {
            fetch('http://shibe.online/api/cats?count=1&urls=true')
            .then(response => response.json())
            .then(data => download(myFunction(data), 'cat.png', function () {
                console.log('done')
                cat = "cat.png";
                return message.channel.send({
                    files: [cat]
                });
            }))

        }


        
        if (cmd === `${prefix}bird`) {
            fetch('http://shibe.online/api/birds?count=1&urls=true')
            .then(response => response.json())
            .then(data => download(myFunction(data), 'bird.png', function () {
                console.log('done')
                bird = "bird.png";
                return message.channel.send({
                    files: [bird]
                });
            }))


        }

        if (cmd === `${prefix}r34`) {

            if (message.channel.nsfw === false) {
                return message.reply(":warning: This channel isn't marked as NSFW.");
              } else {

return kaori.search('r34', { tags: [args[0]], limit: 1, random: true })
    .then(images => download(images[0].common.fileURL, 'r34.png', function () {
        console.log("done")
        r34 = 'r34.png'
        return message.channel.send({
            files: [r34]
        })
    }))
    .catch(err => console.error(err));
        }
    }

    } catch (err) {
        console.log(err)
    }
});

bot.login(config
    .token);