import { SlashCommandBuilder } from "discord.js";
import Attendance from "../../models/attendance.js";
import ExcelJs from "exceljs";
import fs from "fs";

export const data = new SlashCommandBuilder()
  .setName("report")
  .setDescription("Get the attendance report of this month.");

export async function handler(interaction) {
  const { member } = interaction;
  if (!member || !member.roles) {
    return interaction.reply("This command is only available in guilds.");
  }

  const userRoles = member.roles.cache.map((role) => role.name);

  if (!userRoles.includes("BOARD-MEMBER")) {
    return interaction.reply("You don't have the permission to do this.");
  }

  const content = await Attendance.findAll({
    where: {
      date: {
        $between: [new Date().setDate(1), new Date()],
      },
    },
  });

  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet("Attendance");

  // Add header row
  worksheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Name", key: "name", width: 32 },
    { header: "Date", key: "date", width: 15 },
    { header: "Status", key: "status", width: 10 },
  ];

  // Add rows as Array values
  content.forEach((record) => {
    const { date, userId, username, status } = record.toJSON();
    const dataRow = worksheet.addRow([userId, username, date, status]);
    // Apply conditional formatting based on status
    if (status === "Present") {
      dataRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "00FF00" },
        }; // Green color
      });
    } else if (status === "Absent") {
      dataRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF0000" },
        }; // Red color
      });
    }
  });
  await workbook.xlsx.writeFile("./report.xlsx");

  await interaction.reply({
    content: "Here's your report!",
    files: [`./report.xlsx`],
  });

  fs.unlinkSync("./report.xlsx");
}
