import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from 'src/lib/prisma';
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export default NextAuth({
  session: {
    strategy: 'jwt'
  },

  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        console.log("credentials: ", credentials);

        const user = await prisma.user.findMany({ where: { email, password } })
        const userIsExist = user.length > 0;

        console.log('users: ', user[0])
        if (!userIsExist) throw new Error("invalid credentials");
        console.log(user[0])
        if (userIsExist) return user[0];
      }
    })
  ],
  pages: {
    signIn: '/pages/login',
    error: '/500',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, user, token }) {
      return token
    },
  },
})
