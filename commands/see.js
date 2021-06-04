  
const { MessageEmbed } = require('discord.js');
module.exports = {
	async execute(bot, message, args, c) {

		if(!args.length) return message.channel.send(new MessageEmbed().setColor(c).setTitle('Correct Usage').setDescription('`!see <PosterName>`').setFooter('Exclude <> when using the command'));

		let room = await bot.rooms.get(args[0].toLowerCase());
		if(!room) return message.channel.send(new MessageEmbed().setColor(c).setTitle('Invalid Room').setDescription('you provided an invalid room!'));
        
		let role = await message.guild.roles.cache.get(room.role);
		if(!role) return message.channel.send(new MessageEmbed().setColor(c).setTitle('Invalid Room').setDescription('The role doesn\'t exist'));

		await message.member.roles.add(role);
        
		return message.channel.send(new MessageEmbed().setColor(c).setTitle('Done!').setDescription('The role is added to the user! You can now see the channels'));
	}
};