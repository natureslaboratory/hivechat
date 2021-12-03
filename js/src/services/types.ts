export type PostAnswer = Pick<Answer, "questionID" | "answerText" | "answerPrivacy">;

// Need member name, member message, date created, requestID
export type MemberRequestType = {
    requestID: number,
    requestText: string,
    dateCreated: string,
    member: MemberType
}

export type MemberType = {
    memberEmail: string,
    memberID: number,
    memberProperties: MemberPropertiesType
}

export type MemberPropertiesType = {
    first_name?: string,
    last_name?: string,
    gdpr_check?: number,
    job_title?: string,
    organisation?: string,
    phone?: string,
    website?: string
}

export type Organisation = {
    organisationID: number
}

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