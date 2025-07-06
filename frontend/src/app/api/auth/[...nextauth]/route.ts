import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";


// Valida as env vars ANTES de exportar o handler
if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error("Missing GitHub OAuth environment variables");
}


const handler = NextAuth ({
    providers: [
        GithubProvider({
            
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
});

export {handler as GET , handler as POST};