import  prisma  from "@/prisma/client";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 

const login = async (credentials:any) => {

    try {

        const user = await prisma.users.findUnique({
            where:{username: credentials.username}
        });

        if(!user) throw new Error("Wrong credentials");

        const isPasswordCorrect = user.password === credentials.password && true;

        if(!isPasswordCorrect) throw new Error("Wrong credentials");

        return user;

    } catch (error:any) {
        throw new Error(error);
    }

}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
      },
      authorize: async (credentials) => {
        
        try {
            const user = await login(credentials);
            return user;

        } catch (error:any) {
            throw new Error(error)
        }
      },
    }),
  ],
})