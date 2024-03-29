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
    isAdmin: boolean
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
    isAdmin: boolean
    organisationSlug: string
}

export type LoginType = {
    email: string
    password: string
}

export type MemberInvite = {
    inviteID: number
    organisationName: string
    senderName: string
}

export type OrganisationMemberType = MemberType & { isAdmin: boolean };

export type ManageOrganisationParams = {
    slug: string
}

export type OrganisationMembersType = {
    pages: number
    members: OrganisationMemberType[]
}

export interface IPaginatedResponse {
    pages: number
}

export interface IPaginatedNewResponse<DataType> {
    pages: number
    result: DataType[]
}

export interface ITableControls {
    page: number;
    decrementPage: () => void;
    incrementPage: () => void;
    isLoading: boolean;
    isFetching: boolean;
    hasMoreData: boolean;
    search: string;
    setSearch: (s: string) => void;
    executeSearch: () => void;
}

export type SocialType = {
    socialLink: string
    socialType: "Facebook" | "Twitter" | "LinkedIn"
    organisationID: number
    socialID: number
    dateCreated: string
}

export type NewSocialType = Pick<SocialType, "socialLink" | "socialType" | "organisationID">

export type DataChild = {
    isParentFetching?: boolean,
    redirect: string
}

export type OrganisationInviteType = {
    inviteID: number
    memberEmail: string
    senderID: number
    organisationID: number
    dateCreated: string
    sender_first_name: string
    sender_last_name: string
}