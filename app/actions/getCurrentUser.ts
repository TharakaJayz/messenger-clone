
import getSession from "./getSession";

const getCurrentUser = async()  =>{
    try {
        const session = await getSession()
        if(!session?.user?.email){
            return null;
        }

        const currentUser = await prisma?.user.findUnique({
            where:{
                email:session.user.email as string
            }
        })

        if(!currentUser){
            return null;
        }


        return currentUser;
    } catch (error) {
        return null; // this is not API route this is server action so dont throw errors
    }
}

export default getCurrentUser;