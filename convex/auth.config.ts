
if(!process.env.CLERK_ISSUE_URL){
    throw new Error("CLERK_ISSUE_URL is not set in the environment variables")
}

const authConfig =  {
    providers: [
        {
            domain:process.env.CLERK_ISSUE_URL,
            applicationId:"convex",
        }
    ]
}

export default authConfig;