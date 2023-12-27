import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} from "discord.js";
import Attendance from "../models/attendance.js";
import dotenv from "dotenv";

dotenv.config();

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
  const channel = client.channels.cache.get(process.env.ATTENDANCE_CHANNEL_ID);
  if (!channel) {
    console.log("Attendance channel not found");
    process.exit(1);
  }

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
    content: `Please confirm your attendance for ${new Date().toLocaleDateString()}. Attendance will be closed after 15 Minute.`,
    components: [row],
  });

  if (response) {
    console.log(`Attendance message sent to: ${channel.name} channel`);
  }

  const collector = response.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 900_000, // 15 minute
  });

  collector.on("collect", async (i) => {
    await handleAttendance(i);
  });
}
