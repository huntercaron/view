import NextAuth from "next-auth"

export const authOptions = {
    providers: [
        {
            id: "arena",
            name: "Are.na",
            type: "oauth",
            idToken: true,
            authorization: {
                url: "https://dev.are.na/oauth/authorize",
                params: { scope: null },
            },
            token: "https://dev.are.na/oauth/token",
            clientId: "jmEpZLGfNXA566QNOS8zAm6gO9XB_K28oF6gohIEbZQ",
            // params: {},
        },
    ],
    // useSecureCookies: true,
}
export default NextAuth(authOptions)
