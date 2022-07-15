import {Telegraf} from "telegraf"
import { removeBackground, removeBackgroundNeuralNetwork } from "./backgroundRemoval";

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
            
            removeBackgroundNeuralNetwork(url.toString(), (result:string)=>{
                ctx.replyWithDocument( {source: Buffer.from(result, 'base64'), filename: `result.png`}, {caption: 'Done!'} )
            }, (ex:any)=>{
                ctx.reply(`Error happend:(`)
            })
        })
        
        ctx.reply('Image received. Working..')
    });

    bot.launch();

    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
}