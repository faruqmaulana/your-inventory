import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from 'src/lib/prisma';

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

        const user = await prisma.user.findMany({ where: { email, password } })
        const userIsExist = user.length > 0;
        delete user[0].password;

        if (!userIsExist) throw new Error("invalid credentials");
        if (userIsExist) return user[0];
      }
    })
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
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
