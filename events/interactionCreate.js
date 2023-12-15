import { Events, GuildScheduledEvent } from "discord.js";

export const name = Events.InteractionCreate;

export async function handler(interaction) {
  if (interaction.isChatInputCommand()) {
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
      console.error(`Error executing ${interaction.commandName}`);
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
  }
}
