export type Answer = {
    correct: boolean, 
    answerText: string
}

export type Challenge = {
    id: string, 
    text: string, 
    options: string[]
}

export type ApplicationContext = {
    selectedAnswers: Answer[],
    opponentAnswers: Answer[],
    currentQuestionId?: string,
    currentSelectedAnswer?: Answer,
    selectedChallenge?: any
}