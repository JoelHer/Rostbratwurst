//This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. 
//To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.


//IMPORT LIBARYS
const http = require('https');
const Colors = require('colors')
console.log("Loading libaries...".red)
const Discord = require('discord.js');
const fs      = require('fs');
const dl      = require('./download.js')
const client = new Discord.Client();
const Embeds = require('./embed');
const Messages = require('./message');
const { Player } = require("discord-player")
const player = new Player(client)
client.player = player

//help
console.log("Loading Disse, Witze".red)
const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", " ", "?", ".", "!", "="]
const enchanting = ["ᔑ", "ʖ", "ᓵ", "↸", "ᒷ", "⎓", "⊣", "⍑", "╎", "⋮", "ꖌ", "ꖎ", "ᒲ", "リ", "𝙹", "!¡", "ᑑ", "∷", "ᓭ", "ℸ ̣", "⚍", "⍊", "∴", " ̇/", "||", "⨅", " ", "?", ".", "!", "="]

var swwitze = [
  "Jedes Mal wenn ein Vogel auf mein Auto kotet, gehe ich auf meine Terrasse und esse Rührei, einfach nur um zeigen, wer hier der Boss ist. ",
  "Die Nachbarskindern wollen, dass ich bei einer Wasserschlacht mitmache. Ich zieh mich nur noch schnell und um sobald das Wasser kocht, kann es losgehen.",
  "Ich war zum ersten Mal fischen. Dabei habe ich herausgefunden, dass Fische Brake-Dance können. \n Aber nur für ca. 1-2 Minuten.",
  "Patient: \"Doktor, wie lange habe ich noch zu leben?\" \nDoktor: \"Zehn.\" \nPatient: \"Wie zehn? Zehn Monate, Wochen, Tage?\" \nDoktor: \"Neun...\"",
  "Was steht auf dem Grabstein eines Mathelehrers? – Damit hat er nicht gerechnet!",
  "Wie nennt man einen fetten Schriftsteller? \n\nKugelschreiber ",
  "Achtung: Schwarzer Humor! \n Wie macht man einen router besser? \n man malt ihn schwarz an, dann läuft er besser"
]
console.log("Loading Vars".red)
//VARIABLES
var messages_sent = 0
console.log("Connecting Async to discord api...".blue)
console.log('Loading json files Sync'.red)
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var prefix = config.prefix

//download file from https://raw.githubusercontent.com/JoelHer/Rostbratwurst/main/disse.txt

var disse = []

try {
  disse = fs.readFileSync('disse.txt').toString().split("\n");
  if (disse.length <= 1) {
    console.log('[ERROR]: DISSE LIST EMPTY!'.red)
    console.log('Deleting files...')
    try {
      fs.unlinkSync('disse.txt')
      //file removed
    } catch(err) {
      console.error(err)
    }
    console.log('Killing process...')
    process.exit(0)
  }
  console.log('Disse loaded successfully: ')
} catch {
  console.log('Failed reading disse.txt, downloading latest...'.red)
  dl.downloadLatest()
}
  var pingArray = fs.readFileSync('ping.txt').toString().split("\n");
var witze = fs.readFileSync('witze.txt').toString().split("\n");

console.log('Loaded config.json successfully'.green)
console.log("Disse lenght: ".cyan + disse.length)
console.log("Witze lenght: ".cyan + witze.length)
console.log("Enchanting lenght: ".cyan + enchanting.length)
console.log("Schwarze Witze lenght: ".cyan + swwitze.length)

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const getApp = (guildId) => {
  const app = client.api.applications(client.user.id)
  if (guildId){
    app.guilds(guildId)
  }
  return app
}

const guildId = '699986991705620481'

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`.blue);
  getDate();
  client.user.setActivity(prefix + "help")

  const commands = await getApp(guildId).commands.get()
  console.log(commands)

  await getApp(guildId).commands.post({
    data:{
      name: 'ping',
      description: 'Oh yeah ping pong pp yk??'
    }
  })

  client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const command = interaction.data.name.toLowerCase()

    if (command === 'ping'){
      reply(interaction, pingArray[getRandomInt(pingArray.length)])
    }
  })
});

const reply = (interaction, response) => {
  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data: {
        content: response,
      },
    },
  })
}

var cmdmap = {
  say: cmd_say,
  food: cmd_food,
  super: cmd_super,
  help: cmd_help,
  stats: cmd_stats,
  invite: cmd_invite,
  diss: cmd_diss,
  dissN: cmd_dissN,
  info: cmd_info,
  witz: cmd_witz,
  tempprefix: cmd_tempprefix,
  messages: cmd_messagessent,
  alarm: cmd_alarm,
  enchant: cmd_enchant,
  work: cmd_job,
  balance: cmd_getmoney,
  schwarzerhumor: cmd_sw,
  sw: cmd_sw,
  sh: cmd_sw,
  submit: cmd_submit,
  vbucks: cmd_vbucks,
  monte: cmd_monte
}

function myFunc(arg) {
  console.log(`arg was => ${arg}`);
}

setTimeout(myFunc, 0, 'funky');


var helpmap = {
  fun: help_fun,
  stats: help_stats
}

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    console.log(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}



student = {
  "a":true
}

studentA = {
  "a":true
}

let amount = 0;
let errAcc




//MONEY SYTEM ###############################################

function cmd_job (msg, args) {
  numbe=getRandomInt(300)
  msg.channel.send(`You worked and got ${numbe} coins`)
  cmd_addmoney(msg, args, numbe)
}


function cmd_monte (msg, args) {
  msg.channel.send('Hiiieeer kommmt monte!!')
  msg.channel.send({
    message: "Hier kommt monte",
    files: [{
      attachment: 'monte.png',
      name: 'werDasLießtIstDummDuHund.jpg'
    }]
  })
}



function cmd_addmoney (msg, args, amm) {
  errAcc=false
  const User = client.users.cache.get(msg.author.id);
  if(amm != null) {
    try {
      amount = parseInt(amm)
    } catch(error) {
      Embeds.error(msg.channel, "An error accured..", "❌ Error ❌")
      errAcc = true
    }
    
    try{
      let rawdata = fs.readFileSync('./users/'+ msg.author.id +'.json');
      student = JSON.parse(rawdata);
  } catch(error) {
      fs.appendFile('./users/'+ msg.author.id +'.json','', function (err) {
        if (err) throw err;
        console.log('New User Saved! Id: ' + msg.author.id + 'Username: ' + User.tag);
      });

      prepareTemplate = {
        "name": User.tag,
        "money": amount,
      }

      let data = JSON.stringify(prepareTemplate, null, 2);
      fs.writeFileSync('./users/'+ msg.author.id +'.json', data);
    }


    prepareTemplate = {
      "name": User.tag,
      "money": student.money + amount
    }
    if (errAcc == false) {
      let data = JSON.stringify(prepareTemplate, null, 2);
      fs.writeFileSync('./users/'+ msg.author.id +'.json', data);

      let rawdata = fs.readFileSync('./users/'+ msg.author.id +'.json');
      studentA = JSON.parse(rawdata);

    }
  } else {
    Embeds.error(msg.channel,  "❌ tell me a amount u dummkopf")
  }

}


function cmd_takemoney (msg, args) {
  errAcc=false
  const User = client.users.cache.get(msg.author.id);
  if(args[0] != null) {
    try {
      amount = parseInt(args[0])
    } catch(error) {
      Embeds.error(msg.channel, "An error accured.. Maybe the amount isn't a number?", "❌ Error ❌")
      errAcc = true
    }
    
    try{
      let rawdata = fs.readFileSync('./users/'+ msg.author.id +'.json');
      student = JSON.parse(rawdata);
  } catch(error) {
      fs.appendFile('./users/'+ msg.author.id +'.json','', function (err) {
        if (err) throw err;
        console.log('New User Saved! Id: ' + msg.author.id + 'Username: ' + User.tag);
      });

      prepareTemplate = {
        "name": User.tag,
        "money": amount,
      }

      let data = JSON.stringify(prepareTemplate, null, 2);
      fs.writeFileSync('./users/'+ msg.author.id +'.json', data);
    }


    prepareTemplate = {
      "name": User.tag,
      "money": student.money - amount
    }
    if (errAcc == false) {
      let data = JSON.stringify(prepareTemplate, null, 2);
      fs.writeFileSync('./users/'+ msg.author.id +'.json', data);

      let rawdata = fs.readFileSync('./users/'+ msg.author.id +'.json');
      studentA = JSON.parse(rawdata);

      msg.channel.send("ok :( dein Kontostand ist: " + studentA.money)
    }
  } else {
    Embeds.error(msg.channel,  "❌ tell me a amount u dummkopf")
  }

}



function cmd_getmoney (msg, args, amm) {
  errAcc=false
  amm = 0
  const User = client.users.cache.get(msg.author.id);
  if(amm != null) {
    try {
      amount = parseInt(amm)
    } catch(error) {
      Embeds.error(msg.channel, "An error accured..", "❌ Error ❌")
      errAcc = true
    }
    
    try{
      let rawdata = fs.readFileSync('./users/'+ msg.author.id +'.json');
      student = JSON.parse(rawdata);
  } catch(error) {
      fs.appendFile('./users/'+ msg.author.id +'.json','', function (err) {
        if (err) throw err;
        console.log('New User Saved! Id: ' + msg.author.id + 'Username: ' + User.tag);
      });

      prepareTemplate = {
        "name": User.tag,
        "money": amount,
      }

      let data = JSON.stringify(prepareTemplate, null, 2);
      fs.writeFileSync('./users/'+ msg.author.id +'.json', data);
    }


    prepareTemplate = {
      "name": User.tag,
      "money": student.money + amount
    }
    if (errAcc == false) {
      let data = JSON.stringify(prepareTemplate, null, 2);
      fs.writeFileSync('./users/'+ msg.author.id +'.json', data);

      let rawdata = fs.readFileSync('./users/'+ msg.author.id +'.json');
      studentA = JSON.parse(rawdata);
      msg.channel.send("Dein Kontostand ist: " + studentA.money)
    }
  } else {
    Embeds.error(msg.channel,  "❌ tell me a amount u dummkopf")
  }

}


//MESSAGE COUNTING _____________________________________________
//MESSAGE COUNTING _____________________________________________
//MESSAGE COUNTING _____________________________________________
//MESSAGE COUNTING _____________________________________________
//MESSAGE COUNTING _____________________________________________
//MESSAGE COUNTING _____________________________________________
//MESSAGE COUNTING _____________________________________________
datanum = 0

function messagessent (amount) {
  try {
    var datanum = fs.readFileSync('./data/data.txt', 'utf8');
    fs.writeFileSync('./data/data.txt', (parseInt(datanum) + 1).toString());
    
  
  } catch(e) {
    console.log('Error:', e.stack);
  }
}
function cmd_messagessent (msg, args) {
  try {
    var datanum = fs.readFileSync('./data/data.txt', 'utf8');
    Embeds.info(msg.channel, datanum+" messages set since start. (GLOBAL)", "messages since start")
} catch(e) {
    console.log('Error:', e.stack);
}

}



//MESSAGE COUNTING _____________________________________________
//MESSAGE COUNTING _____________________________________________
//MESSAGE COUNTING _____________________________________________
//MESSAGE COUNTING _____________________________________________
//MESSAGE COUNTING _____________________________________________
//MESSAGE COUNTING _____________________________________________
//MESSAGE COUNTING _____________________________________________











function cmd_diss (msg, args) {
  if (args[0] != null) {
    var randInt = getRandomInt(disse.length)
    msg.channel.send("no front ")
    msg.channel.send("Hey " + args[0] + ", " + disse[randInt])
    if (args[1] != null) {
      if (args[1] == "advancedInfo") {
        msg.channel.send("rand int: " + randInt + ", max int: " + disse.length -1)
      }
    }
  } else {
    Embeds.error(msg.channel,  "❌ tell me a pörsen u dummkopf")
  } 
}



function cmd_witz (msg, args) {
  if (true) {
    var randInt = getRandomInt(witze.length)

    Embeds.white(msg.channel, witze[randInt], "Witz #" + randInt)
    if (args[1] != null) {
      if (args[1] == "advancedInfo") {
        msg.channel.send("rand int: " + randInt + ", max int: " + witze.length -1)
      }
    }
  } 
}

function cmd_sw (msg, args) {
  if (true) {
    msg.channel.send(swwitze[getRandomInt(swwitze.length)])
  }
}

function cmd_dissN (msg, args) {
  if (args[0] != null) {
    const User = client.users.cache.get(msg.author.id);
    msg.delete()
    msg.channel.send("" + msg.author.toString() + " dissed " + args[0])
    msg.channel.send("no front")
    msg.channel.send("Hey, " + args[0] + ", " + disse[parseInt(args[1])])
  } else {
    Embeds.error(msg.channel,  "❌ tell me a pörsen u dummkopf")
  }
  
}

function cmd_tempprefix (msg, args) {
  if (args[0] != null) {
    prefix = args[0]
    Embeds.info(msg.channel, "Set the prefix to: `" + prefix + "`", "New kuhle täporäre präfix")
    client.user.setActivity(prefix + "help")
  } else {
    Embeds.error(msg.channel,  "❌ tell me a prefix u dummkopf")
  }
}



function cmd_say (msg, args) {
  msg.channel.send(args.join(' '))
}

function cmd_tts (msg, args) {
  msg.channel.send("/tts ich bin kras lol lol lol lol lol lol lol")
}

function cmd_info (msg, args) {
  Embeds.info(msg.channel, "This hier ist the typische german ROSTBRATWURST. Der coolest bot on den discord land!", "Kuhle INFORMATIONS")
}

function cmd_enchant (msg, args) {
  sentence = args.join("");
  splilletet = sentence.split("")
  console.log(splilletet)
  for (i in splilletet) {
    if (splilletet[i] in alphabet) {
      console.log(alphabet.find(splilletet[i]))
    }
  }
}

function cmd_invite (msg, args) {
  Embeds.info(msg.channel, "https://discord.com/oauth2/authorize?client_id=796309199155363851&scope=bot", "Here is my invite link :)")
}

function cmd_super (msg, args) {
  setTimeout(sendSuperTimeout, 0, msg);
}

function cmd_countHun (msg, args) {
  setTimeout(sendHundredTimeout, 0, msg);
}

function cmd_vbucks (msg, args) {
  setTimeout(sendVbucksTimeout, 0, msg);
}





//**********************************************
//HELP DIALOG

function cmd_help (msg, args) {
  
  fsarg = args[0]

  if (args[0] in helpmap) {
    helpmap[fsarg](msg, args)
  } else {
    if (args[0] != undefined) {
      Embeds.error(msg.channel,  "❌ \"" + args[0] + "\" is not a valid argument, type " + prefix + "help to see valid arguments")
    } else {
      Embeds.info(msg.channel, "`"+prefix+"help fun` \n `"+ prefix + "help stats`", "❓"+"Here, Take some Help")
    }
  
  }
}

function help_fun (msg, args) {
  Embeds.info(msg.channel, "Some Fun Commands :) \n `don't laugh at my message` \n `don't react to my message` \n `" 
  + prefix + "super`  \n`" 
  + prefix + "diss <name>` \n`"
  + prefix + "dissN <name> <number 0-" + (disse.length-1) + ">`", "**Fun Commands**")
}
function help_stats (msg, args) {
  Embeds.info(msg.channel, "Some commands for stats:) \n `"+ prefix +"stats`", "Stats")
}
//HELP DIALOG
//**********************************************

client.on('message', msg => {
  var cont = msg.content,
    author = msg.author,
    chan = msg.channel,
    guild = msg.guild
    //server = client.guilds.get(msg.guild.id).id;
  messages_sent++
  messagessent(1)
  
  if (author.id != client.user.id && cont.startsWith(prefix)) {
    var invoke = cont.split(' ')[0].substr(prefix.length)
    var args = cont.split(' ').slice(1)
    invoke = invoke.toLowerCase()

    if (invoke in cmdmap) {
      cmdmap[invoke](msg, args)
    }
  }

  cont = cont.toLowerCase()
  
  if(cont == "don't react to my message"){
    msg.react('😋')
    .catch(console.error);
  }

  if(cont == "deine mutter"){
    msg.channel.send("du gehst auf mutter du ehrenloser hund")
    .catch(console.error);
  }
  if(cont == "lieblingslied"){
    msg.channel.send("https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLj1tSxNb7AbklL7GQzOMMLjGTGtdRRjSP&index=168")
  }

  if(cont == "!luca"){
    setTimeout(function() {msg.channel.send("ich stimme zu :)")}, 1000)
  }

  if(cont == "don't delete my message"){
    msg.delete()
    msg.reply("HAHA i deleted ur message")
    .catch();
  }

  if(cont == "rostbratwurst"){
    msg.reply("mooooooooiiiiin")
    .catch();
  }

  if(cont == "hey rostbratwurst gibts dich auch als guter bot?"){
    msg.reply("nö")
    .catch();
  }

  if(cont == "rostbratwurst magst du knekebrod ?"){
    msg.reply("ja")
    .catch();
  }

  if(msg.content == "don't laugh at my message"){
    msg.react('😂')
    .catch(console.error);
  }
});


var date;
var month;
var year;
var hours;
var minutes;
var seconds;


function getDate() {
  date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  year = date_ob.getFullYear();

  // current hours
  hours = date_ob.getHours();

  // current minutes
  minutes = date_ob.getMinutes();

  // current seconds
  seconds = date_ob.getSeconds();
}


//ASYNC FUNCTIONS //ASYNC FUNCTIONS //ASYNC FUNCTIONS //ASYNC FUNCTIONS //ASYNC FUNCTIONS //ASYNC FUNCTIONS
//ASYNC FUNCTIONS //ASYNC FUNCTIONS //ASYNC FUNCTIONS //ASYNC FUNCTIONS //ASYNC FUNCTIONS //ASYNC FUNCTIONS
//ASYNC FUNCTIONS //ASYNC FUNCTIONS //ASYNC FUNCTIONS //ASYNC FUNCTIONS //ASYNC FUNCTIONS //ASYNC FUNCTIONS


function sendHundredTimeout(msg) {
  
  var i;
  for (i = 0; i < 101; i++) {
    msg.channel.send(i)
  }
}


function sendSuperTimeout(msg) {
  msg.channel.send("schmuiz ist subbbaa")
  msg.channel.send("joniii ist subbbaa")
  msg.channel.send("jojiii ist subbbaa")
  msg.channel.send("(Adri natürlich auch)")
}

function sendVbucksTimeout(msg) {
  console.log("jemand wollte vbucks :)")
  msg.channel.send("Getting IP...")
  msg.channel.send("Getting Email...")
  msg.channel.send("Email Fetched...")
  msg.channel.send("Getting Epic games Acc. ...")
  msg.channel.send("http://bit.ly/FreevBUCKs")
  
}

// COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS
// COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS
// COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS

function cmd_food (msg, args) {
  Embeds.info(msg.channel, "Here, take some food 🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🥬🥒🌶🌽🥕🧄🧅🥔🍠🥐🥯🍞🥖🥨🧀🥚🍳🧈🥞🧇🥓🥩🍗🍖🦴🌭🍔🍟🍕🥪🥙🧆🌮", "Here, some food!")
}
function cmd_witz (msg, args) {
  if (true) {
    var randInt = getRandomInt(witze.length)

    Embeds.white(msg.channel, witze[randInt], "Witz #" + randInt)
    if (args[1] != null) {
      if (args[1] == "advancedInfo") {
        msg.channel.send("rand int: " + randInt + ", max int: " + witze.length -1)
      }
    }
  }
  
}

function cmd_sw (msg, args) {
  if (true) {
    msg.channel.send(swwitze[getRandomInt(swwitze.length)])
  }
}

function cmd_dissN (msg, args) {
  if (args[0] != null) {
    const User = client.users.cache.get(msg.author.id);
    msg.delete()
    msg.channel.send("" + msg.author.toString() + " dissed " + args[0])
    msg.channel.send("no front")
    msg.channel.send("Hey, " + args[0] + ", " + disse[parseInt(args[1])])
  } else {
    Embeds.error(msg.channel,  "❌ tell me a pörsen u dummkopf")
  }
  
}

function cmd_tempprefix (msg, args) {
  if (args[0] != null) {
    prefix = args[0]
    Embeds.info(msg.channel, "Set the prefix to: `" + prefix + "`", "New kuhle täporäre präfix")
    client.user.setActivity(prefix + "help")
  } else {
    Embeds.error(msg.channel,  "❌ tell me a prefix u dummkopf")
  }
}
function cmd_say (msg, args) {
  msg.channel.send(args.join(' '))
}

function cmd_stats (msg, args) {
  Embeds.white(msg.channel,"**Bot started:** \n" + "Date: " 
    + date +"."+ month + "." + year + "\n Time: " + hours + ":" + minutes + ";" + seconds 
    + "\n\n**Messages:** \n Messages sent since start: " + fs.readFileSync('./data/data.txt', 'utf8'),"Stats")
}
function cmd_alphabet (msg, args) {
  for (i in alphabet) {
    msg.channel.send(alphabet[i])
    setTimeout(cmd_alphabettwo, 100, msg, args, alphabet[i])
  }
}
function cmd_alphabettwo (msg, args, letter) {
  msg.channel.send(letter)
}

function cmd_prealphabet (msg, args) {
  setTimeout(cmd_alphabet, 0, msg, args)
}

function cmd_alarm (msg, args) {
  if (args[0] != 0)
  {
    num = parseInt(args[0])
    setTimeout(function() {msg.channel.send("Alarm")}, num)
  }
  
}
function cmd_submit (msg, args) {
  if (args[0] != null)
  {
    fs.writeFileSync('submit.txt', "\n" + args.toString(), function (err) {
      if (err) throw err;
      console.log('New Submit');
    });
  }
  
}
function cmd_eval (msg, args) {
  if (args[0] != null) {
    
  }
}
// COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS
// COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS
// COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS COMANDS
function help_fun (msg, args) {
  Embeds.info(msg.channel, "Some Fun Commands :) \n `don't laugh at my message` \n `don't react to my message` \n `" 
  + prefix + "super`  \n`" 
  + prefix + "diss <name>` \n`"
  + prefix + "dissN <name> <number 0-" + (disse.length-1) + ">`", "**Fun Commands**")
}
function help_stats (msg, args) {
  Embeds.info(msg.channel, "Some commands for stats:) \n `"+ prefix +"stats`", "Stats")
}
//Help Commands End
client.login(config.token);