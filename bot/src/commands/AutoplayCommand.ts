import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {DiscordBot} from "../classes/DiscordBot";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autoplay')
        .setDescription('set autoplay mode to on/off'),
    async execute(interaction: ChatInputCommandInteraction, client: DiscordBot) {
        const mode = client.disTube.toggleAutoplay(interaction);
        await interaction.reply("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    }
}