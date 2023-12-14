# Mindxcape Discord Bot

Welcome to the Mindxcape Discord Bot repository! This Node.js-based project is designed to help you create and deploy a powerful Discord bot with ease. Below, you'll find information on the project structure, important files, and how to set up your environment.

## Project Structure

```plaintext
discord-bot/
    index.js            # Responsible for starting the server
    deploy-commands.js  # Responsible for deploying commands to the Discord server
    .env.example        # Example env file
    commands/           # Commands directory
    menus/              # Menu commands directory
    utils/              # Basic commands directory
```

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/mindXcape/mindxcape-bots
   cd discord-bot
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   - Copy `.env.example` to a new file named `.env`.
   - Open `.env` and fill in the necessary information.

4. **Configure Discord Application:**

   - Visit the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.
   - Copy the "Client ID" from the "General Information" section and replace `clientId` in `.env`.
   - Enable Developer Mode in Discord (`User Settings > Advanced > Developer Mode`), right-click your server, and copy its ID.

5. **Deploy the Bot:**

   ```bash
   npm run deploy
   ```

6. **Start the Bot:**
   ```bash
   npm start
   ```

## Useful Links

- [Discord.js Documentation](https://discord.js.org/docs/packages/discord.js/main)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [Find Your Guild ID](https://support.discord.com/hc/en-us/articles/206346498)

Feel free to explore the `commands`, `menus`, and `utils` directories to customize and expand the bot's functionality. If you have any questions or encounter issues, please refer to the Discord.js documentation or create an issue in this repository. Happy coding!
