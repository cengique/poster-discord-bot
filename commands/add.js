  
const { MessageEmbed } = require('discord.js');
module.exports = {
  async execute(bot, message, args, c) {
    if(!args.length) {
      await message.channel.send(new MessageEmbed().setColor(c).setTitle('Correct Usage').setDescription('`!add <PosterName>`').setFooter('Exclude <> when using the command'));
      return;
    }
    if(bot.rooms.has(args[0])) {
      await message.channel.send(new MessageEmbed().setColor(c).setTitle('Already Exists').setDescription('The poster name already exists! '));
      return;
    }
    let cc;
    
    for(const data of bot.config.postercat){
      if(cc) continue;
      let cc1 = await message.guild.channels.cache.get(data);
      if(!cc1) continue;
      if(cc1.children.size >= 49) continue;
      cc = cc1;
    }
    let role = await message.guild.roles.create({
      data: {
	name: args[0]
      },
      reason: 'Poster Creation',
    });


    let text;
    let voice;
    await message.guild.channels
      .create(args[0], {
	type: 'text',
	parent: cc,
	permissionOverwrites: [
	  {
	    id: bot.config.role_everyone,
	    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
	  },
	  {
	    id: bot.config.role_admin,
	    allow: [
	      'SEND_MESSAGES',
	      'VIEW_CHANNEL',
              'ADD_REACTIONS',
	      'ATTACH_FILES',
	      'READ_MESSAGE_HISTORY'
	    ]
	  }, {
	    id: role.id,
	    allow: [
	      'SEND_MESSAGES',
	      'VIEW_CHANNEL',
              'ADD_REACTIONS',
	      'ATTACH_FILES',
	      'READ_MESSAGE_HISTORY'
	    ]
	  }
	]
      })
      .then(channel => {
	text = channel.id;
      });

    await message.guild.channels
      .create(args[0], {
	type: 'voice',
	parent: cc,
	permissionOverwrites: [
	  {
	    id: bot.config.role_everyone, 
	    deny: ['VIEW_CHANNEL', 'SPEAK', 'CONNECT']
	  },
	  {
	    id: bot.config.role_admin, 
	    allow: [
	      'VIEW_CHANNEL',
              'SPEAK',
              'CONNECT',
              'STREAM'
	    ]
	  }, {
	    id: role.id,
	    allow: [
	      'VIEW_CHANNEL',
              'SPEAK',
              'CONNECT',
              'STREAM'
	    ]
	  }
	]
      })
      .then(channel => {
	voice = channel.id;
      });

    bot.rooms.set(args[0].toLowerCase(), {text: text, voice: voice, role: role.id}); // add category here?
    await message.channel.send(new MessageEmbed().setColor(c).setTitle('Done!').setDescription('New role, text and voice channels are created for the mentioned PosterName'));
    return;

  }
};
