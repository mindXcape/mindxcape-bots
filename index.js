import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { Client, GatewayIntentBits, Collection, Events } from "discord.js";

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

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isCommand()) return;
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.log(
      `[WARNING] The command ${interaction.commandName} does not exist!`
    );
    return;
  }

  try {
    await command.handler(interaction);
    console.log(`[INFO] Executed ${interaction.commandName} command!`);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const { content, author } = message;
  const { username, globalName: name } = author;

  console.log(`[${name}]: ${content}`);
  message.reply({
    content: `Hello ${username}!`,
  });
});

client.login(token);
