import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("pokemon")
  .setDescription("Reply with pokemon selection menu");

export async function handler(interaction) {
  const select = new StringSelectMenuBuilder()
    .setCustomId("starter")
    .setPlaceholder("Make a selection")
    .addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel("Bulbasaur")
        .setDescription("The dual-type Grass/Poison Seed Pokémon.")
        .setValue("bulbasaur"),
      new StringSelectMenuOptionBuilder()
        .setLabel("Charmander")
        .setDescription("The Fire-type Lizard Pokémon.")
        .setValue("charmander"),
      new StringSelectMenuOptionBuilder()
        .setLabel("Squirtle")
        .setDescription("The Water-type Tiny Turtle Pokémon.")
        .setValue("squirtle")
    );

  const row = new ActionRowBuilder().addComponents(select);

  await interaction.reply({
    content: "Choose your starter Pokémon!",
    components: [row],
  });
}
