export type PostAnswer = Pick<Answer, "questionID" | "answerText" | "answerPrivacy">;

export interface Question {
    questionID: number
    questionText: number
    dateCreated: string
    memberName: string
    answers: Answer[]
}

export interface Answer {
    answerID: number
    questionID: number
    answerPrivacy: "Private" | "Public"
    answererID: number
    answerText: string
    dateCreated: string
    answererName: string
}

export interface AnswerListProps {
    selectedQuestion: Question
}

export interface AnswerFormProps {
    setAnswer(answer: string) : void
    setPrivacy(answerPrivacy: "Private" | "Public") : void
    privacy: "Private" | "Public"
    answer: string
}