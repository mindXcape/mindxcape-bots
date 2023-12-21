import { Events } from "discord.js";
import { scheduleAttendanceEvent } from "../jobs/attendance.js";
import { scheduleEvent } from "../utils/cron.js";
import Attendance from "../models/attendance.js";

export const name = Events.ClientReady;

export const once = true;

export async function handler(client) {
  Attendance.sync();
  console.log(`Ready! Logged in as ${client.user.tag}`);
  await scheduleEvent(scheduleAttendanceEvent(client));
}
