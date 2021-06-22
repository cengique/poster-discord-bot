  
const { MessageEmbed } = require('discord.js');
module.exports = {
	async execute(bot, message, args, c) {
		if(!args.length) return message.channel.send(new MessageEmbed().setColor(c).setTitle('Correct Usage').setDescription('`!add <PosterName>`').setFooter('Exclude <> when using the command'));
		if(await bot.rooms.has(args[0])) return  message.channel.send(new MessageEmbed().setColor(c).setTitle('Already Exists').setDescription('The poster name already exists! '));
		let postercat = ['850197240667570206', '850197479764131872'];
		let cc;
		for(const data of postercat){
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
						id: '847150537774071848',  //Everyone Role
						deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
					},
					{
						id: '847489076469825549', // Server admin
						allow: [
							'SEND_MESSAGES',
							'VIEW_CHANNEL',
							'ATTACH_FILES',
							'READ_MESSAGE_HISTORY'
						]
					}, {
						id: role.id,
						allow: [
							'SEND_MESSAGES',
							'VIEW_CHANNEL',
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
						id: '847150537774071848',  //Everyone Role
						deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
					},
					{
						id: '847489076469825549', // Server admin
						allow: [
							'SEND_MESSAGES',
							'VIEW_CHANNEL',
							'ATTACH_FILES',
							'READ_MESSAGE_HISTORY'
						]
					}, {
						id: role.id,
						allow: [
							'SEND_MESSAGES',
							'VIEW_CHANNEL',
							'ATTACH_FILES',
							'READ_MESSAGE_HISTORY'
						]
					}
				]
			})
			.then(channel => {
				voice = channel.id;
			});

	        await bot.rooms.set(args[0].toLowerCase(), {text: text, voice: voice, role: role.id}); // add category here?
		return message.channel.send(new MessageEmbed().setColor(c).setTitle('Done!').setDescription('New role, text and voice channels are created for the mentioned PosterName'));

	}
};
