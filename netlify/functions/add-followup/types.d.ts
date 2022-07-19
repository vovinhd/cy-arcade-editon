export type Challenge = "wlist" | "bike" | "oekostrom"
export type ChallengeData = {
    challengeTitle: string,
    challengeText: string
}

export type FollowUp = {
    id: number,
    created_at: Date,
    email: string,
    challenge?: Challenge,
    delay?: number,
    remind_at: Date,
    reminder_sent: boolean
}


declare module "*.hbs";