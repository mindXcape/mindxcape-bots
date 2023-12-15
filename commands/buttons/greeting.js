import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  ComponentType,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("greeting")
  .setDescription("Reply with greeting button");

export async function handler(interaction) {
  const traget = interaction.options.getUser("target");
  const reason =
    interaction.options.getString("reason") ?? "No reason provided";

  const confirm = new ButtonBuilder()
    .setCustomId("confirm")
    .setLabel("Confirm greet")
    .setStyle(ButtonStyle.Primary);

  const cancel = new ButtonBuilder()
    .setCustomId("cancel")
    .setLabel("Cancel greet")
    .setStyle(ButtonStyle.Secondary);

  const row = new ActionRowBuilder().addComponents(confirm, cancel);

  const response = await interaction.reply({
    content: `Are you sure you want to greet ?`,
    components: [row],
    fetchReply: true,
  });

  const collector = response.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 3_600_000,
  });

  collector.on("collect", async (i) => {
    console.log("🚀 ~ file: greeting.js:40 ~ collector.on ~ i:", i);
    await i.reply(`Thanks for conformation ${i.user}`);
  });
}
