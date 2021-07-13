import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Answer, PostAnswer, PostQuestion, Question } from "./types";

export const queryApi = createApi({
    reducerPath: 'questionApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/page-api/" }),
    tagTypes: ["Questions"],
    endpoints: (builder) => ({
        getQuestions: builder.query<Question[], number>({
            query: (blockID) => `q-and-a/get-questions?blockID=${blockID}`,
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
    })
})

export const { useGetQuestionsQuery, useSubmitAnswerMutation, useUpdateAnswerMutation, useCreateQuestionMutation } = queryApi;