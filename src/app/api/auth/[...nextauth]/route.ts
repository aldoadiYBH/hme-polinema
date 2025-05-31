import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const hardcodedUser = {
          id: "1",
          name: "Admin",
          username: process.env.LOGIN_ADMIN,
          password: process.env.LOGIN_PASSWORD,
        }

        if (
          credentials?.username === hardcodedUser.username &&
          credentials?.password === hardcodedUser.password
        ) {
          return {
            id: hardcodedUser.id,
            name: hardcodedUser.name,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      if (token.user) session.user = token.user
      return session
    },
  },
} satisfies NextAuthOptions)

export { handler as GET, handler as POST }
