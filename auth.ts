import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { resolveAuthProviderConfig } from '@/lib/auth/provider-config';
import { getPrisma } from '@/lib/prisma';

export const authProviderConfig = resolveAuthProviderConfig(process.env);

const providers = [];

if (authProviderConfig.googleEnabled) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  );
}

if (authProviderConfig.resendEnabled) {
  providers.push(
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: authProviderConfig.resendFrom!,
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(getPrisma()),
  session: {
    strategy: 'database',
  },
  providers,
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
  },
});

export const googleCredentialsConfigured = authProviderConfig.googleEnabled;
export const resendCredentialsConfigured = authProviderConfig.resendEnabled;
