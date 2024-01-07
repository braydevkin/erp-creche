import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialProvider from "next-auth/providers/credentials";

import { db as prisma } from "@/lib/db";

import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  // @ts-ignore
  adapter: PrismaAdapter(prisma as any),
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Dados de Login necessarios");

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Usuários não registrado através de credenciais");
        }

        const matchPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!matchPassword) throw new Error("Senha incorreta");

        return user;
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: {
          email: token?.email as string,
        },
      });

      const { email, name, role }: User = user as User;

      return { ...session, user: { name, email, role } };
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/signin",
  },
};
