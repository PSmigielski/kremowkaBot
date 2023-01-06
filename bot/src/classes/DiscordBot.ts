import DisTube, {DisTubeOptions, Playlist} from "distube";
import {
    Client,
    Collection, EmbedBuilder,
    Events,
    GatewayIntentBits,
    GuildTextBasedChannel,
    IntentsBitField,
    Message,
    REST,
    Routes, SlashCommandBuilder
} from "discord.js";
import { YtDlpPlugin } from "@distube/yt-dlp";
import { SoundCloudPlugin } from "@distube/soundcloud";
import { SpotifyPlugin } from '@distube/spotify';
import {CommandType} from "../types/CommandType";
import path from "node:path";
import fs from "node:fs";
import { Queue,  Song} from "distube";
import DBService from "../services/DBService";
export class DiscordBot extends Client{
    public disTube: DisTube;
    public token: string;
    private commands: Collection<string, CommandType>
    private guildIds: Array<string> | undefined;
    private databaseService: DBService;
    private disTubeOptions: DisTubeOptions = {
        nsfw: true,
        leaveOnEmpty: true,
        emptyCooldown: 30,
        leaveOnFinish: false,
        emitNewSongOnly: true,
        plugins: [new YtDlpPlugin({update: true}), new SoundCloudPlugin(), new SpotifyPlugin()],
        searchSongs: 10,
        youtubeCookie: process.env.YOUTUBE_COOKIE as string
    }
    constructor() {
        super({ intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildVoiceStates,
            IntentsBitField.Flags.GuildMessages,
        ]});
        this.token = process.env.TOKEN as string;
        this.disTube = new DisTube(this, this.disTubeOptions );
        this.commands = new Collection<string, CommandType>()
        this.databaseService = new DBService(process.env.REDIS_HOST as string, process.env.REDIS_PORT as string);
        this.init();
    }
    public async loadCommands(){
        const commandsPath = path.join(__dirname, '/../commands');
        const commandFiles = fs.readdirSync(commandsPath);

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                this.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
    public static async sendCommandsToDisocrd(commands: Array<JSON>, guildId: string){
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string);
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID as string, guildId),
            {body: commands},
        );
        // @ts-ignore
        console.log(`Successfully reloaded ${data.length} application (/) commands for ${guildId}.`);
    }

    public static async getCommandDataFromFiles(){
        const commandsPath = path.join(__dirname, '/../commands');
        const commandFiles = fs.readdirSync(commandsPath);
        const commands = [];
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            commands.push(command.data.toJSON());
        }
        return commands;
    }
    public static async registerCommands(){
        const commands = await this.getCommandDataFromFiles();
        const databaseService = new DBService(process.env.REDIS_HOST as string, process.env.REDIS_PORT as string);
        const guildIds = await databaseService.getGuildIds()

        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
            for (const guildId of guildIds) await this.sendCommandsToDisocrd(commands, guildId);
        } catch (error) {
            console.error(error);
        }
    }
    private registerDisTubeEvents(){
        this.onError();
        this.onInitQueue();
        this.onPlaySong();
        this.onSearchCancel();
        this.onAddList();
        this.onAddSong()
    }
    private async init(){
        await this.loadCommands();
        await this.login(this.token);
        await this.registerEvents();
        this.registerDisTubeEvents();
    }

    private registerOnceEvent(){
        this.once(Events.ClientReady, async c => {
            this.guilds.cache.map(async guild => await this.databaseService.pushGuild(guild.id as string));
            this.guildIds = await this.databaseService.getGuildIds()
            console.log(`Ready! Logged in as ${c.user.tag}`);
        });
    }
    private registerOnEvents(){
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
    private async registerEvents(){
        this.registerOnceEvent();
        this.registerOnEvents();
        this.onGuildCreate();
        this.onGuildDelete();
    }
    private onGuildCreate() {
        this.on("guildCreate", async guild => {
            const commands = await DiscordBot.getCommandDataFromFiles();
            await DiscordBot.sendCommandsToDisocrd(commands, guild.id);
            await this.databaseService.pushGuild(guild.id);
        });
    }
    private onGuildDelete() {
        this.on("guildDelete", async guild => {
            await this.databaseService.removeGuild(guild.id);
        });
    }
    private onSearchCancel(): void {
        this.disTube.on('searchCancel', (message: Message) =>
            message.channel.send(`**Searching canceled**`)
        )
    }
    private status(queue: Queue): string {
        return `Volume: ${queue.volume}% | Filter: ${queue.filters || 'Off'
        } | Loop: ${queue.repeatMode
            ? queue.repeatMode == 2
                ? 'All Queue'
                : 'This Song'
            : 'Off'
        } | Autoplay: ${queue.autoplay ? 'On' : 'Off'}`;
    }
    private onAddList(): void {
        this.disTube.on('addList', (queue: Queue, playlist: Playlist) => {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(':musical_note: | Added List')
                .setDescription(`Added [${playlist.name}](${playlist.url}) playlist (${playlist.songs.length} songs) to queue`)
            queue.textChannel?.send({embeds: [embed]});
        })
    }
    private onAddSong(): void {
        this.disTube.on('addSong', (queue: Queue, song: Song) => {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(':musical_note: | Added Song')
                .setDescription(`Added [${song.name}](${song.url}) to queue`)
            queue.textChannel?.send({embeds: [embed]});
        })
    }
    private onInitQueue(): void {
        this.disTube.on('initQueue', (queue: Queue) => {
            queue.autoplay = false;
            queue.volume = 30;
        });
    }
    private onError(): void {
        this.disTube.on('error', (channel: GuildTextBasedChannel| undefined, e: Error) => {
            if (channel) channel.send(`An error encountered: ${e}`)
            else console.error(e)
        })
    }
    private onPlaySong(): void {
        this.disTube
            .on('playSong', (queue: Queue, song: Song) => {
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(':play_pause: | Started Playing')
                    .setDescription(` [${song.name}](${song.url}) - ${song.formattedDuration}\nRequested by: ${song.user}\n\n${this.status(queue)}`)
                queue.textChannel?.send({embeds: [embed] });
            })
    }
}