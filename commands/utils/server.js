import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Provide information about the server");

export async function handler(interaction) {
  await interaction.reply(
    `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`
  );
}
