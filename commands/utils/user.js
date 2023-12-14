import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("user")
  .setDescription("Provide information about a user");

export async function handler(interaction) {
  const joinedAt = new Date(
    interaction.member.joinedTimestamp
  ).toLocaleDateString("en-US");
  await interaction.reply(
    `This command was run by: ${interaction.user.username}, who joined on ${joinedAt}.`
  );
}
