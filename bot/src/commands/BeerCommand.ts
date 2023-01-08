
import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {DiscordBot} from "../classes/DiscordBot";
import axios from "axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('piwo')
        .setDescription('Woła na piwo(to moje paliwo)')
        .setDefaultMemberPermissions(0),
    async execute(interaction: ChatInputCommandInteraction, client: DiscordBot) {
        await interaction.deferReply();
        axios.get(`${process.env.API_URL as string}/v1/api/image`).then(async ({data})=>{
            const time = new Date();
            let hours: number | string = time.getHours()
            let minutes: number | string = time.getMinutes()
            if (hours < 10) {hours = "0" + hours};
            if (minutes < 10) {minutes = "0" + minutes};
            await interaction.editReply({content: `<@&1031508390079365120> zapraszamy na piwo ${hours}:${minutes}`, files: [data?.url]})
            return;
        }).catch(async err =>await interaction.editReply({content: "no beer? :cry:", files: ["https://images-ext-2.discordapp.net/external/3_ClMJoGTYnzZ_M2SuB_raydi_erW4qbEQdDSM4DG34/https/i.imgflip.com/663lli.jpg"]}));

    }
}