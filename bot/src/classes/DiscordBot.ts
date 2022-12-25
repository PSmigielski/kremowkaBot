import DisTube, {DisTubeOptions} from "distube";
import {Client, Collection, Events, GatewayIntentBits, REST, Routes} from "discord.js";
import {YtDlpPlugin} from "@distube/yt-dlp";
import { SoundCloudPlugin } from "@distube/soundcloud";
import { SpotifyPlugin } from "@distube/spotify";
import dotenv from "dotenv";
import {CommandType} from "../types/CommandType";
import path from "node:path";
import fs from "node:fs";
export class DiscordBot extends Client{
    public disTube: DisTube;
    public token: string;
    private commands: Collection<string, CommandType>
    private clientId: string;
    private guildIds: Array<string>;
    private disTubeOptions: DisTubeOptions = {
        nsfw: true,
        plugins: [new YtDlpPlugin({update: true}), new SoundCloudPlugin(), new SpotifyPlugin()],
        emitNewSongOnly: true,
        searchSongs: 10
    }
    constructor() {
        super({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
        dotenv.config();
        this.token = process.env.TOKEN as string;
        this.clientId = process.env.CLIENT_ID as string;
        this.disTube = new DisTube(this, this.disTubeOptions );
        this.guildIds = ["1055191971980902532"]
        this.commands = new Collection<string, CommandType>()
        this.init();
    }
    private async registerCommands(){
        const commandsPath = path.join(__dirname, '/../commands');
        const commandFiles = fs.readdirSync(commandsPath);
        const commands = [];
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                this.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
        const rest = new REST({ version: '10' }).setToken(this.token);
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            commands.push(command.data.toJSON());
        }
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
            for (const guildId of this.guildIds) {
                const data = await rest.put(
                    Routes.applicationGuildCommands(this.clientId, guildId),
                    {body: commands},
                );
                // @ts-ignore
                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            }
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    }
    private async init(){
        await this.registerCommands();
        this.login(this.token);
        this.once(Events.ClientReady, c => {
            console.log(`Ready! Logged in as ${c.user.tag}`);
        });
        this.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) return;

            const command = this.commands?.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction, this);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        });
    }
}