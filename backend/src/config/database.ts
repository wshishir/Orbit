import { PrismaClient } from '@prisma/client';

declare global{
    var db :PrismaClient;
}

let prisma:PrismaClient;

if(process.env.NODE_ENV==='production'){
    prisma=new PrismaClient();
}else {
    if(!global.db){
        global.db= new PrismaClient({
            log:['query','error','warn'], //enable logging in development
        });
    }
    prisma = global.db;
}

//graveful shutdown 
process.on('beforeExit', async ()=> {
    await prisma.$disconnect();
});

export { prisma };