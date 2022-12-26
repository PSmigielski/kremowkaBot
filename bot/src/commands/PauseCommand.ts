import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {DiscordBot} from "../classes/DiscordBot";
import {inspect} from "util";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('pauses current song'),
    async execute(interaction: ChatInputCommandInteraction, client: DiscordBot) {
        await interaction.reply("**pause** :pause_button:");
        await client.disTube.pause(interaction);
    }
}