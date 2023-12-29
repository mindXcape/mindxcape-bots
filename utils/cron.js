import cron from "node-cron";

export async function scheduleEvent(callback, time) {
  cron.schedule(
    // Schedule the function to run at 10 AM from Sunday to Friday
    "45 9 * * 0-5",
    () => {
      callback();
    },
    { timezone: "Asia/Kathmandu" }
  );
}
