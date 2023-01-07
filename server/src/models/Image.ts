import Model from "./Model";

export class Image extends Model{
    public async getImage(){
        return this.prisma.$queryRawUnsafe("SELECT * FROM Image where context = \"beer\" order by rand() limit 1");
    }
    public async createImage(url: string, context: string){
        return this.prisma.image.create({ data: { context, url } })
    }
}