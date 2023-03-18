// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],
//   session: {
//     jwt: true,
//   },
//   callbacks: {
//     async jwt(token, user, account) {
//       // Add access_token to the token right after signin
//       if (account?.accessToken) {
//         token.accessToken = account.accessToken;
//       }
//       return token;
//     },
//     async session(session, token) {
//       // Add property to session, like an access_token from a provider.
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
// });

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET
    
})