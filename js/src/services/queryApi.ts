import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Answer,
  MemberRequestType,
  PostAnswer,
  Question,
  Organisation,
} from "./types";

export const queryApi = createApi({
  reducerPath: "questionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/page-api/" }),
  tagTypes: ["Questions", "Requests"],
  endpoints: (builder) => ({
    getQuestions: builder.query<Question[], number>({
      query: (blockID) => `q-and-a/get-questions?blockID=${blockID}`,
      providesTags: ["Questions"],
    }),
    submitAnswer: builder.mutation<any, PostAnswer>({
      query: (answer) => ({
        url: "q-and-a/create-answer",
        method: "POST",
        body: answer,
      }),
      invalidatesTags: ["Questions"],
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
  }),
});

export const {
  useGetQuestionsQuery,
  useSubmitAnswerMutation,
  useGetMemberRequestsQuery,
  useAcceptMemberRequestMutation,
  useDeleteMemberRequestMutation
} = queryApi;
