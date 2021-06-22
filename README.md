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

**Author:** @ImmortalEvil

**Maintained by:** @cengique

**Inspired by:** [Room Bot](https://milotrince.github.io/discord-roombot/)

**Warning:** Hard-coded owners, roles, and categories. Cannot be used
in arbitrary servers without modification.

## Usage:

- `!add pYYY` to add a new text+voice channel pair to posters category
  (e.g. `!add p12`). Channels will initially be hidden.
- `!see pYYY` to make the poster channels visible to user (e.g. `!see
  p12`). User will be added to role.

See under the [Github Issues](issues/) for outstanding problems. Requires an
`.env` file to hold the bot token as explained in 
[here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#setting-up-a-bot-application).
