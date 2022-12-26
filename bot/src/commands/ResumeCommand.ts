import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {DiscordBot} from "../classes/DiscordBot";
import {inspect} from "util";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('resumes paused current song'),
    async execute(interaction: ChatInputCommandInteraction, client: DiscordBot) {
        await interaction.reply("**resume** :play_pause:");
        await client.disTube.resume(interaction);
    }
}