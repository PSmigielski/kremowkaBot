import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {DiscordBot} from "../classes/DiscordBot";
import {inspect} from "util";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('set autoplay mode to on/off')
        .addIntegerOption( option =>
            option
                .setName('volume')
                .setDescription('volume value')
        ),
    async execute(interaction: ChatInputCommandInteraction, client: DiscordBot) {
        const volume = interaction.options.get("volume")?.value as number;
        if (volume < 0) {
            await interaction.reply(`**volume argument must be greater than 0**`);
            return;
        }
        if (volume > 400) {
            await interaction.reply(`**volume argument must be less than 400**`);
            return;
        } else {
            client.disTube.setVolume(interaction, volume);
            await interaction.reply(`**volume set to ${volume}% **`);
        }
    }
}