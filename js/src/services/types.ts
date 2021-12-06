export type PostAnswer = (Pick<Answer, "questionID" | "answerText" | "answerPrivacy"> & { answerID?: number });
export type PostQuestion = (Pick<Question, "questionText"> & { blockID: number });
export type UpdateQuestion = Pick<Question, "questionText" | "questionPrivacy" | "questionID">;

export interface Question {
    questionID: number
    questionText: string
    questionPrivacy: "Private" | "Public"
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
    setAnswer(answer: PostAnswer): void
    answer?: PostAnswer
}

export interface PublicQuestionProps {
    questions: Question[]
}

export interface QuestionTableProps {
    questions: Question[]
    setAnswer(answer: PostAnswer): void
}