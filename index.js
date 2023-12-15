import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { Client, GatewayIntentBits, Collection } from "discord.js";
import cron from "node-cron";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const token = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const folderPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(folderPath);

for (let index in commandFolders) {
  const folder = commandFolders[index];
  const commandsPath = path.join(folderPath, folder);

  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const i in commandFiles) {
    const file = commandFiles[i];

    const filePath = path.join(commandsPath, file);

    const command = await import(filePath);

    if ("data" in command && "handler" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The commmand at ${filePath} is missing a require "data" or "handler" property.`
      );
    }
  }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const i in eventFiles) {
  const file = eventFiles[i];
  const filePath = path.join(eventsPath, file);
  const event = await import(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.handler(...args));
  } else {
    client.on(event.name, (...args) => event.handler(...args));
  }
}

cron.schedule(
  "* * * * *",
  () => {
    console.log("This task runs every minute");
    // client.channels.cache
    //   .get("889918528810541568")
    //   .send("Bom dia, pessoal! :sunrise:");
  },
  { timezone: "UTC+05:45" }
);

const channel = client.channels.cache.get("1150834404231495850");
console.log("🚀 ~ file: index.js:77 ~ channel:", channel);

client.login(token);
