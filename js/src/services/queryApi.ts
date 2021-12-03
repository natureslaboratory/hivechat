import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Answer, PostAnswer, Question } from "./types";

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
    })
})

export const { useGetQuestionsQuery, useSubmitAnswerMutation } = queryApi;