import {
    ActionRowBuilder,
    ButtonBuilder,
    ChatInputCommandInteraction, EmbedBuilder,
    GuildMember, PermissionsBitField,
    SlashCommandBuilder
} from "discord.js";
import {DiscordBot} from "../classes/DiscordBot";
import ytsr from "@distube/ytsr";
import {PlayOptions} from "distube";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('search song with given string')
        .addStringOption(option =>
            option
                .setName('option')
                .setDescription('search option')
        ),
    async execute(interaction: ChatInputCommandInteraction, client: DiscordBot) {
        const string = interaction.options.get("option")?.value as string;

        await interaction.reply(`🔍 **Searching...** \`${string}\``);

        const message = await interaction.fetchReply();

        const member = interaction.member as GuildMember;
        const channel = member?.voice?.channel;
        if (!channel) return interaction.editReply("You need to be in voice channel.")
        if (!channel.permissionsFor(interaction.guild?.members.me as GuildMember, false).has(PermissionsBitField.Flags.Connect)) return interaction.editReply(`I don't have perm \`CONNECT\` in ${channel.name} to join voice!`);
        if (!channel.permissionsFor(interaction.guild?.members.me as GuildMember,false).has(PermissionsBitField.Flags.Speak)) return interaction.editReply(`I don't have perm \`SPEAK\` in ${channel.name} to join voice!`);

        const row = new  ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("one")
                    .setLabel("1")
                    .setStyle(2)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("two")
                    .setLabel("2")
                    .setStyle(2)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("three")
                    .setLabel("3")
                    .setStyle(2)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("four")
                    .setLabel("4")
                    .setStyle(2)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("five")
                    .setLabel("5")
                    .setStyle(2)
            );

        const options = {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction,
        } as PlayOptions

        const res = await ytsr(string, { safeSearch: true, limit: 5 });

        let index = 1;
        const result = res.items.slice(0, 5).map(x => `**(${index++}.) [${x.name}](${x.url})** Author: \`${x.author}\``).join("\n")

        const embed = new EmbedBuilder()
            .setAuthor({ name: `Song Selection...`, iconURL: interaction.guild?.iconURL({ forceStatic: false }) as string | undefined })
            .setColor(0x0099FF)
            .setDescription(result)
            .setFooter({ text: `Please response in 30s` })

        await message.edit({ content: " ", embeds: [embed], components: [row] });

        const collector = interaction.channel?.createMessageComponentCollector({ filter: (m) => m.user.id === interaction.user.id, time: 30000, max: 1 });

        collector?.on('collect', async (interaction) => {
            const id = interaction.customId;
            const loader = new EmbedBuilder()
                .setDescription("**Loading please wait....**")


            if(id === "one") {
                await message.edit({ embeds: [loader], components: [] });
                await client.disTube.play(channel, res.items[0].url, options);
            } else if(id === "two") {
                await message.edit({ embeds: [loader], components: [] });
                await client.disTube.play(channel, res.items[1].url, options);
            } else if(id === "three") {
                await message.edit({ embeds: [loader], components: [] });
                await client.disTube.play(channel, res.items[2].url, options);
            } else if(id === "four") {
                await message.edit({ embeds: [loader], components: [] });
                await client.disTube.play(channel, res.items[3].url, options);
            } else if(id === "five") {
                await message.edit({ embeds: [loader], components: [] });
                await client.disTube.play(channel, res.items[4].url, options);
            }
        });

        collector?.on('end', async (collected, reason) => {
            if(reason === "time") {
                await message.edit({ content: `No Response`, embeds: [], components: [] });
            }
        });
    }
}