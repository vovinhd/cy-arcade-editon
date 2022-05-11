export type Answer = {
    correct: boolean, 
    answerText: string
}
export type FollowupOption = {
    option: string, delay: number
}
export type Challenge = {
    id: string, 
    text: string, 
    options: FollowupOption[]
}

export type QuizNext = {
    [questionId: string]: string,
}

export type ApplicationContext = {
    selectedAnswers: Answer[],
    opponentAnswers: Answer[],
    quiz?: QuizNext,
    currentQuestionId?: string,
    currentSelectedAnswer?: Answer,
    selectedChallenge?: Challenge,
    selectedFollowupOption?: FollowupOption
    singlePlayer: boolean
}