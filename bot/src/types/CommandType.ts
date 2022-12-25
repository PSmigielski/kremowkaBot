import {OptionType} from "./OptionType";
import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {DiscordBot} from "../classes/DiscordBot";

type executonCommand = (interaction: ChatInputCommandInteraction, client:DiscordBot) => void;
export interface CommandType{
    data: SlashCommandBuilder
    execute: executonCommand
}