import {createClient, RedisClientType} from "redis";

class DBService{
    private client: RedisClientType;
    constructor(host: string, port: string) {
        this.client = createClient({url: `${host}:${port}`});
        this.client.on('error', (err) => console.log('Redis Client Error', err));
        this.init();

    }
    public async init(){
        await this.client.connect();
        this.client.del("guilds");
    }
    public async getGuildIds(){
        return await this.client.sMembers("guilds");
    }
    public async pushGuild(guildId: string){
        await this.client.sAdd("guilds", guildId);
    }
    public async removeGuild(guildId: string){
        await this.client.sRem("guilds", guildId);
    }
    public async destroy(){
        await this.client.disconnect();
    }
}

export default DBService;