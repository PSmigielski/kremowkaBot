
import {
    ChatInputCommandInteraction,
    GuildMember,
    GuildTextBasedChannel,
    PermissionsBitField,
    SlashCommandBuilder
} from "discord.js";
import {DiscordBot} from "../classes/DiscordBot";



module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('play something from yt, spotify etc')
        .addStringOption(option =>
            option
                .setName('option')
                .setDescription('seach option')
        ),
    async execute(interaction: ChatInputCommandInteraction , client: DiscordBot) {
        try {
            if (interaction.options.get("option")?.value) {
                await interaction.reply(`🔍 **Searching...** \`${interaction.options.get("option")?.value}\``);

                const member = interaction.member as GuildMember;
                const channel = member?.voice?.channel;
                if (!channel) return interaction.editReply("You need to be in voice channel.")
                if (!channel.permissionsFor(interaction.guild?.members.me as GuildMember, false).has(PermissionsBitField.Flags.Connect)) return interaction.editReply(`I don't have perm \`CONNECT\` in ${channel.name} to join voice!`);
                if (!channel.permissionsFor(interaction.guild?.members.me as GuildMember,false).has(PermissionsBitField.Flags.Speak)) return interaction.editReply(`I don't have perm \`SPEAK\` in ${channel.name} to join voice!`);

                try {
                    const options = {
                        member: interaction.member as GuildMember,
                        textChannel: interaction.channel as GuildTextBasedChannel,
                        interaction,
                    }
                    const string = interaction.options.get("option")?.value as string;
                    console.log(client.disTube.options.searchSongs);
                    await client.disTube.play(channel, string, options)
                } catch (e) {
                    console.log(e);
                }
            }
        } catch (e) {
            //
        }
    }
}