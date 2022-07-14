import {Telegraf} from "telegraf"
import { RemoveBgResult, RemoveBgError } from "remove.bg";
import { removeBackground } from "./backgroundRemoval";

const token = '5412507398:AAHcH3AbHsfWY7WHmd6a2Lh1rG2RDnrvmz0';

export async function intializeBot(){
    const bot = new Telegraf(token);
   
    bot.start(async (ctx) => {
        ctx.reply("Hey, drop your image to bot and it will remove background for ya!");
    });

    bot.on('photo', async (ctx)=>{

        //@ts-ignore
        let fileId:string = ctx.message.photo.pop().file_id;
        ctx.telegram.getFileLink(fileId).then(async url => {    
            removeBackground(url.toString(), './out/temp/temp.png', (result:RemoveBgResult)=>{
                ctx.replyWithDocument( {source: Buffer.from((<RemoveBgResult>result).base64img, 'base64'), filename: `result.png`}, {caption: 'Done!'} )
            }, (errors:Array<RemoveBgError>)=>{
                const description:string = (<RemoveBgError>errors[0]).detail != undefined ? (<RemoveBgError>errors[0]).detail : ''
                ctx.reply(`🤬🤬🤬\n\n‼️**${(<RemoveBgError>errors[0]).title}**‼️\n${description}\n\nYou can still get the job done [here](https://www.remove.bg/)`, {parse_mode:"MarkdownV2"})
            });
        })
        
        ctx.reply('Image received. Working..')
    });

    bot.launch();

    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
}