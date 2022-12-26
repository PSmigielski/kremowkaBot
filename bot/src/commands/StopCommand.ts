import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {DiscordBot} from "../classes/DiscordBot";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('stop playing music'),
    async execute(interaction: ChatInputCommandInteraction, client: DiscordBot) {
        await client.disTube.stop(interaction);
        await interaction.reply("**dość** :stop_button:");
    }
}