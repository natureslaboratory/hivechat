import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Answer, MemberRequestType, MemberType, OrganisationType, PostAnswer, PostQuestion, Question, UpdateQuestion } from "./types";

export const newApi = createApi({
    reducerPath: 'newApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
    tagTypes: ["User", "Organisation"],
    endpoints: (builder) => ({
        getMemberDetails: builder.query<MemberType, any>({
            query: () => `auth/get-logged-in`,
            providesTags: ["User"],
        }),
        getOrganisation: builder.query<OrganisationType, string>({
            query: (organisationSlug) => `organisations/get?slug=${organisationSlug}`,
            providesTags: (result, error, arg) => [{type: "Organisation", id: arg}],
        }),
    })
})

export const {
    useGetMemberDetailsQuery,
    useGetOrganisationQuery
} = newApi;