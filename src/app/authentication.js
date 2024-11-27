import { comparePass } from "@/lib/auth"
import { ConnectToDb } from "@/lib/db"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    session:{
        jwt:true
    },
  providers: [
    Credentials({
      async authorize(credentials) {
        const client = await ConnectToDb()
        const collection = client.db('MyShoppe').collection('Users')
        const user =await collection.findOne({email:credentials.email})
        if(!user){
            client.close()
            throw new Error('Email not found')
        }

        const valid = await comparePass(credentials.password,user.password)
       
        if(!valid){
            client.close()
            throw new Error('Could not log you in')
        }

        client.close()
        return { id: user._id, email: user.email,name:user.name };



      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
        token.email = user.email; 
        token.name = user.name; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; 
        session.user.email = token.email; 
        session.user.name = token.name; 
      }
      return session;
    },
  },
})