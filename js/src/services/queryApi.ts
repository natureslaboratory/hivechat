import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Answer, MemberRequestType, MemberType, PostAnswer, PostQuestion, Question, UpdateQuestion } from "./types";

export const queryApi = createApi({
    reducerPath: 'questionApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/page-api/" }),
    tagTypes: ["Questions", "Requests"],
    endpoints: (builder) => ({
        getQuestions: builder.query<Question[], number>({
            query: (blockID) => `q-and-a/get-questions?blockID=${blockID}`,
            providesTags: ["Questions"]
        }),
        getPublicQuestions: builder.query<Question[], number>({
            query: (blockID) => `q-and-a/get-public-questions?blockID=${blockID}`,
            providesTags: ["Questions"]
        }),
        submitAnswer: builder.mutation<any, PostAnswer>({
            query: (answer) => ({
                url: "q-and-a/create-answer",
                method: "POST",
                body: answer
            }),
            invalidatesTags: ["Questions"]
        }),
        updateAnswer: builder.mutation<any, PostAnswer>({
            query: (answer) => ({
                url: `q-and-a/update-answer`,
                method: "POST",
                body: answer
            }),
            invalidatesTags: ["Questions"]
        }),
        createQuestion: builder.mutation<any, PostQuestion>({
            query: (question) => ({
                url: "q-and-a/create-question",
                method: "POST",
                body: question
            }),
            invalidatesTags: ["Questions"]
        }),
        updateQuestion: builder.mutation<any, UpdateQuestion>({
            query: (question) => ({
                url: "q-and-a/update-question",
                method: "POST",
                body: question
            }),
            invalidatesTags: ["Questions"]
        }),
        getMemberRequests: builder.query<MemberRequestType[], number>({
          query: (orgID) => `member-requests/get?orgID=${orgID}`,
          providesTags: ["Requests"],
        }),
        acceptMemberRequest: builder.mutation<any, MemberRequestType>({
          query: (request) => ({
            url: "member-requests/accept",
            method: "POST",
            body: request,
          }),
          invalidatesTags: ["Requests"],
        }),
        deleteMemberRequest: builder.mutation<any, MemberRequestType>({
          query: (request) => ({
            url: "member-requests/delete",
            method: "POST",
            body: request,
          }),
          invalidatesTags: ["Requests"],
        }),
        getMemberDetails: builder.query<MemberType, any>({
          query: () => `member-requests/`,
          providesTags: ["Requests"],
        }),
    })
})

export const { 
    useGetQuestionsQuery, 
    useSubmitAnswerMutation,
    useUpdateAnswerMutation, 
    useCreateQuestionMutation, 
    useUpdateQuestionMutation, 
    useGetPublicQuestionsQuery,
    useGetMemberRequestsQuery,
    useAcceptMemberRequestMutation,
    useDeleteMemberRequestMutation
} = queryApi;