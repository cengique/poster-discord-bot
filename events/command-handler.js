module.exports = async (bot, message) => {
	if (message.author.bot) return;
	if (message.channel.type !== 'text') return;
	let prefix = '!';
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();
	const c = '#FFFF00';
	const command =
    bot.commands.get(commandName) ||
    bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if(!command) return;
	try {
		command.execute(bot, message, args, c);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
};

module.exports.event = {
	name: 'message'
};