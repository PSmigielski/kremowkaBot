import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {DiscordBot} from "../classes/DiscordBot";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('skips one song in the queue'),
    async execute(interaction: ChatInputCommandInteraction, client: DiscordBot) {
        const queue = client.disTube.getQueue(interaction);
        if (!queue?.autoplay && queue?.songs?.length as number <= 1){
            await client.disTube.stop(interaction);
            await interaction.reply("**dość** :stop_button:");
            return;
        }
        await interaction.reply("**skip** :track_next:");
        await client.disTube.skip(interaction);
    }
}