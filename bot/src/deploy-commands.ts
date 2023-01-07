import {DiscordBot} from "./classes/DiscordBot";
import dotenv from "dotenv";
dotenv.config({path:__dirname+'/../.env'});
DiscordBot.registerCommands();