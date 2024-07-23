import prisma from '@/app/libs/prismadb';

const getMessages  =async (conversationId:string) =>{
    try {
        const message = await prisma.message.findMany({
            where:{
                conversationId:conversationId
            },include:{
                sender:true,
                seen:true
            },
            orderBy:{
                createdAt:"asc"
            }
        })

        // if(!message){
        //     return []
        // }

        return message
    } catch (error) {
        return []
    }
}

export default getMessages