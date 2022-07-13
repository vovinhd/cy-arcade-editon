export type Answer = {
    correct: boolean;
    answerText: string;
};
export type FollowupOption = {
    option: string;
    delay: number;
};
export type Challenge = {
    id: string;
    text: string;
    options: FollowupOption[];
    explanation?: any;
};

export type QuizNext = {
    [questionId: string]: string;
};

export type ApplicationContext = {
    selectedAnswers: Answer[];
    opponentAnswers: Answer[];
    quiz?: QuizNext;
    currentQuestionId?: string;
    currentSelectedAnswer?: Answer;
    selectedChallenge?: Challenge;
    selectedFollowupOption?: FollowupOption;
    singlePlayer: boolean;
    quizStart: string;
    result: number;
    reason?: string;
};

export type OutlinkState = {
    href: string;
    text: string;
    show: boolean;
};

export interface MatchState {
    answers: Answers;
    current_answer_time_left: number;
    current_question_time_left: number;
    loopHandler: LoopHandler;
    match_started: boolean;
    match_state: string;
    num_questions: number;
    presences: Presences;
    questions: Questions;
    ready_next_question: number;
    time_limit_answer: number;
    time_limit_question: number;
}

interface Questions {
    [next: string]: string;
}

interface Presences {
    [presenceId: string]: Presence;
}

interface Presence {
    node: string;
    ready: boolean;
    reason: number;
    session_id: string;
    user_id: string;
    username: string;
}

interface LoopHandler {
    match_complete: string;
}

interface Answers {
    '1': PresenceResults;
    '2': PresenceResults;
    '3': PresenceResults;
}

interface PresenceResults {
    [presenceId: string]: PresenceResult;
}

interface PresenceResult {
    answer: Answer;
    correct: boolean;
    question_index: string;
    session_id: string;
}
