import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"

export const { handle } = SvelteKitAuth({
    providers: [GitHub],
    // Auth.js docs say that this should be set to true. But for some reason, it isn't!
    // The Discord server shows several people using SvelteKit facing this issue.
    trustHost: true
})