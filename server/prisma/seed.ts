import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.$queryRawUnsafe(`
    INSERT INTO Image (context, url, id) values
  ("beer","https://preview.redd.it/34ishqv4py941.jpg?width=640&crop=smart&auto=webp&s=f5e118ae21a84ece1c5a74630e5db095e575c72e",uuid()),
  ("beer","https://www.wykop.pl/cdn/c3201142/comment_CLMTTxxlAam06SXvDArAnYapzXUD4zif.jpg",uuid()),
  ("beer","https://www.wykop.pl/cdn/c3201142/comment_WyERUmCOQWjdSm4txt7KApouZMPl9xTM.jpg",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061262580640919642/artworks-nal28iO1wKnjyZRK-kB3CNA-t500x500.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061262748148830218/comment_YeinMroWuVuDToSPpYmjylPbaAW6XG3x.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061262801378738246/comment_1647986690RkoQxX86oW9xZXqs1mD5Zi.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061262879694798868/2Q.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061262920299847730/images.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061262973395550238/images.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061266319279931422/9k.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061263015573454868/2Q.png",uuid()),
  ("beer","https://i1.jbzd.com.pl/contents/2019/10/normal/PR3x7qRcYhL6YsegRxWBTnUK9byyyEgR.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061263265474281492/images.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061263307094368277/images.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061263411331219607/images.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061263861577162832/images.png",uuid()),
  ("beer","https://www.wykop.pl/cdn/c3201142/comment_1604596272KOYGnAR90fwxnOF7ImwBUS,w400.jpg",uuid()),
  ("beer","https://www.wykop.pl/cdn/c3201142/comment_1598187429ai2m6ChNmT1R87QkUFARmd,w1200h627f.jpg",uuid()),
  ("beer","https://www.wykop.pl/cdn/c3201142/comment_1641591117UDec7k9XcWfwwLn67J6EvC.jpg",uuid()),
  ("beer","https://pbs.twimg.com/media/EpiKsVzXYAIptdW.jpg",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061264742339063868/comment_15984297519mStQcuGBvPXaZtyLsQgfA.png",uuid()),
  ("beer","https://pbs.twimg.com/media/EWzOrZKXQAI43UL.jpg",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061264421097320488/kuflowe_1.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061264384774656020/images.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061264323512643684/images.png",uuid()),
  ("beer","https://www.wykop.pl/cdn/c3201142/comment_8ZThFefcD8bwz5pqSrJS0japLfggRPq8.jpg",uuid()),
  ("beer","https://www.wykop.pl/cdn/c3201142/comment_1598466526uwPjqJDcw2VsJR37dqZXmk.jpg",uuid()),
  ("beer","https://www.wykop.pl/cdn/c3201142/comment_EmadxHwQdKm9jDB4LudsV7xfuw6S2v3c.jpg",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061264911214313522/3eb3c374b3df55c74b131e4d6e7cabdf.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061264861314678855/images.png",uuid()),
  ("beer","https://www.wykop.pl/cdn/c3201142/comment_1581190859AJvJklw1C481YEYzI9JabQ.jpg",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061265032370991114/aR1p03M_460s.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061265106492731422/artworks-4zQb2nr9i5QOPXEt-A50XIA-t500x500.png",uuid()),
  ("beer","https://i1.kwejk.pl/k/obrazki/2019/04/dUCatBHqCiR900LO.jpg",uuid()),
  ("beer","https://scontent.fpoz5-1.fna.fbcdn.net/v/t39.30808-6/274554351_495834575522444_7732211722957777714_n.jpg?stp=dst-jpg_p180x540&_nc_cat=105&ccb=1-7&_nc_sid=e3f864&_nc_ohc=iXZuaCMDg-0AX8il6bX&_nc_ht=scontent.fpoz5-1.fna&oh=00_AfAZU6kL5g5n8t4fxt-jentG54TXAPerprybt6s4y3YWgg&oe=63BE945D",uuid()),
  ("beer","https://scontent.fpoz5-1.fna.fbcdn.net/v/t39.30808-6/277705989_518672336572001_8085681148744783929_n.jpg?stp=dst-jpg_p526x296&_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=sUoWutX90IkAX-Qhaah&_nc_ht=scontent.fpoz5-1.fna&oh=00_AfDxpBZnXn2muJPoRmpMFUHrFMsh2O7eVx1xsP-G11eARg&oe=63BDF4F9",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061265465898434560/images.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061265579236937768/images.png",uuid()),
  ("beer","https://scontent.fpoz5-1.fna.fbcdn.net/v/t39.30808-6/214835465_337018311404072_8516050672413158988_n.jpg?stp=dst-jpg_p526x296&_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=gCvAVTR0OtwAX9Q9LD8&_nc_ht=scontent.fpoz5-1.fna&oh=00_AfDhwJREFY-mz8zcr4BPPVdlOhj5Z7wsh2Fh3_cW1WNYig&oe=63BE5B09",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061266260203155537/images.png",uuid()),
  ("beer","https://scontent.fpoz5-1.fna.fbcdn.net/v/t1.6435-9/123908789_170041674768404_9221971013958893279_n.png?stp=dst-png_p526x296&_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=fKPkOaGWeKgAX8cfrz3&_nc_ht=scontent.fpoz5-1.fna&oh=00_AfC8I3OYlq1bpKcZbXeLVnH5Z_hK7PX7ST0kb5PPojdtHg&oe=63E0E188",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061267734488424458/images.png",uuid()),
  ("beer","https://pbs.twimg.com/media/E8oEsa7XoAIri7X.jpg",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061277130903781456/misato-NGE-beer1.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061275876471361536/Screenshot-Cyberpunkt-Edgerunners-Rebecca-1-pc-games-piwo.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061297041977913404/image.png",uuid()),
  ("beer","https://cdn.discordapp.com/attachments/1043871085235536002/1061303722262679674/togame_piwo_2.gif",uuid());
    `);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });