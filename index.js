//Defining Packages
require('dotenv').config();
const Discord = require('discord.js');
const {promisify} = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');

//Creating Bot Client
const bot =  new Discord.Client({
	messageCacheMaxSize: 50,
	messageCacheLifetime: 300,
	messageSweepInterval: 300,
	ws: { intents: new Discord.Intents(Discord.Intents.ALL) }
});
bot.commands = new Discord.Collection();

//Defining Basic Constants
bot.owners = ['581442925611712513', '155707890328535040'];
bot.package = require('./package');

//Connecting to DB
bot.rooms = new Enmap({
	name: 'rooms',
	autoFetch: true,
	fetchAll: false
});


//Handling Discord Events
readdir('./events/', (err, files) => {
	if (err) return console.error(err);

	files.forEach(file => {
		if (!file.endsWith('.js')) return;

		let props = require(`./events/${file}`);

		const eventName = file.split('.')[0];

		bot.on(props.event.name, props.bind(null, bot));
		console.log(`🔧 Event [${eventName}] has been loaded.`);
		delete require.cache[require.resolve(`./events/${file}`)];
	});
});

//Handling Commands
readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(async file => {
		if (!file.endsWith('.js')) return;
		const props = require(`./commands/${file}`);
		const commandName = file.split('.')[0];
		bot.commands.set(commandName, props);
		console.log(`📝 Command [${commandName}] has been loaded.`);
	});
});

//Handling Eval Command
bot.on('message', async message => {
	if(message.content.startsWith('??eval')){
		if(!bot.owners.includes(message.author.id)) return;
		try {
			const code = message.content.slice(7);
			let evaled = eval(code);

			if (typeof evaled !== 'string')
				evaled = require('util').inspect(await evaled);

			message.channel.send(clean(evaled), {code:'xl'});
		} catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	} else return;
});

//Functions
function clean(text) {
	if (typeof text === 'string')
		return text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203));
	else return text;
}

//Logging in to the bot
bot.login(process.env.TOKEN).then(()=>{
	console.log('I am up!');
});
