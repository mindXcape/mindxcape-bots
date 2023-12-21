import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} from "discord.js";
import Attendance from "../models/attendance.js";

async function handleAttendance(i) {
  if (i.user.bot || i.user.system) return;
  const { id, username, globalName } = i.user;

  try {
    const isPresent = await Attendance.findOne({
      where: {
        userId: id,
        date: new Date(),
      },
    });

    if (isPresent) {
      await i.reply(`${i.user} is already present`);
      return;
    }

    await Attendance.create({
      userId: id,
      username,
      globalName,
      status: i.customId,
      date: new Date(),
    });

    await i.reply(`${i.user} is present`);
  } catch (error) {
    await i.reply(`${i.user} Something went wrong. Try again`);

    console.log(
      "🚀 ~ file: attendance.js:24 ~ handleAttendance ~ error",
      error.message
    );
  }
}

export async function scheduleAttendanceEvent(client) {
  const channel = client.channels.cache.get("1184903965960306808");

  const confirm = new ButtonBuilder()
    .setCustomId("Present")
    .setLabel("Present")
    .setStyle(ButtonStyle.Primary);

  const cancel = new ButtonBuilder()
    .setCustomId("Leave")
    .setLabel("On Leave")
    .setStyle(ButtonStyle.Secondary);

  const row = new ActionRowBuilder().addComponents(confirm, cancel);

  const response = await channel.send({
    content: `Please confirm your attendance for ${new Date().toLocaleDateString()}. Attendance will be closed after 1 hour.`,
    components: [row],
  });

  if (response) {
    console.log(`Attendance message sent to: ${channel.name} channel`);
  }

  const collector = response.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 3_600_000,
  });

  collector.on("collect", async (i) => {
    await handleAttendance(i);
  });
}
