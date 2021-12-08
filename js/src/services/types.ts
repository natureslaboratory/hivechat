export type PostAnswer = (Pick<Answer, "questionID" | "answerText" | "answerPrivacy"> & { answerID?: number });
export type PostQuestion = (Pick<Question, "questionText"> & { blockID: number });
export type UpdateQuestion = Pick<Question, "questionText" | "questionPrivacy" | "questionID">;

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

export type OrganisationType = {
    organisationID: number
    organisationSlug: string
    organisationDesc: string
    organisationName: string
    organisationLogo: string
    organisationScope: string
}

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

export type MemberOrganisation = {
    organisationName: string
    memberRole: string
    organisationSlug: string
}

export type LoginType = {
    email: string
    password: string
}
