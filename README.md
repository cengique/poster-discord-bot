# Poster Bot

Discord bot authored with [Discord.js](https://discord.js.org/#/) to
facilitate online conference organization. Bot allows adding and
visiting poster presentations when the list of posters is
large. Instead of pre-adding all poster channels to Discord, admins or
presenters can add the channels they want. Attendees then can select which
posters they want to visit and make them visible to themselves such
that they don't have a crowded channel list.

Bot has a distinctive feature to work around the 50 channels per
category limit imposed by Discord. If a category already has too many
channels, it will select another category from a given list.

Uses [EnMap](https://enmap.evie.dev/) as local database.

**Authors:** [@ImmortalEvil](https://github.com/ImmortalEvil), [@cengique](https://github.com/cengique)

**Inspired by:** [Room Bot](https://milotrince.github.io/discord-roombot/)

**License:** [ISC](https://opensource.org/licenses/ISC)

## Installation

- Create an `.env` file to hold the bot token as explained in 
  [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#setting-up-a-bot-application).
- Create a `config.json` file with the following information for your server:
  ```json
  {
  "owners": ["xxx", "yyy"],
  "postercat": ["xxx", "yyy"],
  "role_everyone": "xxx",
  "role_admin": "xxx"
  }
  ```
  where
  - `owners` are IDs of users who can use the `??eval` debugging command
  - `postercat` are IDs of server categories that will hold the poster channels created
  - `role_everyone` is the ID of the everyone role on the server
  - `role_admin` is the ID of server admin role
  
  _Hint_: To get the IDs, enable _Developer Mode_ under settings and then find in right-click menu.
- Run `npm install` to install dependencies
- Run `node index.js` to run the bot
- Add your bot to your servers by following [these instructions](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)

## Usage:

- `!add pYYY` to add a new text+voice channel pair to posters category
  (e.g. `!add p12`). Channels will initially be hidden.
- `!see pYYY` to make the poster channels visible to user (e.g. `!see
  p12`). User will be added to role.

See under the [Github Issues](issues/) for outstanding problems. 
