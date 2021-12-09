import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Answer, LoginType, MemberInvite, MemberOrganisation, MemberRequestType, MemberType, OrganisationMembersType, OrganisationType, PostAnswer, PostQuestion, Question, UpdateQuestion } from "./types";

export const newApi = createApi({
    reducerPath: 'newApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
    tagTypes: ["User", "Organisation", "Member Organisations", "Member Invites", "OrgMembers"],
    endpoints: (builder) => ({
        getMemberDetails: builder.query<MemberType, any>({
            query: () => `auth/get-logged-in`,
            providesTags: ["User"],
        }),
        getOrganisation: builder.query<OrganisationType, string>({
            query: (organisationSlug) => `organisations/get?slug=${organisationSlug}`,
            providesTags: (result, error, arg) => [{type: "Organisation", id: arg}],
        }),
        getMemberOrganisations: builder.query<MemberOrganisation[], any>({
            query: () => 'organisations/get-member-organisations',
            providesTags: ["Member Organisations"]
        }),
        getMemberInvites: builder.query<MemberInvite[], any>({
            query: () => 'organisations/invites/get-member-invites',
            providesTags: ["Member Invites"]
        }),
        getOrganisationMembers: builder.query<OrganisationMembersType, { slug: string, page: number, search?: string }>({
            query: ({ slug, page, search = "" }) => `organisations/get-members?slug=${slug}&page=${page}&s=${search}`,
            providesTags: (result, error, args) => [{ type: "OrgMembers", id: `${args.slug}_${args.page}` }]
        }),
        login: builder.mutation<any, LoginType>({
            query: (details) => ({
                url: `auth/login`,
                method: "POST",
                body: details,
                responseHandler: "text"
            }),
            invalidatesTags: ["User"]
        }),
        logout: builder.mutation<any, any>({
            query: () => ({
                url: `auth/logout`,
                method: "POST",
                responseHandler: "text"
            }),
            invalidatesTags: ["User"]
        }),
    })
})

export const {
    useGetMemberDetailsQuery,
    useGetOrganisationQuery,
    useGetMemberOrganisationsQuery,
    useGetMemberInvitesQuery,
    useGetOrganisationMembersQuery,
    useLoginMutation,
    useLogoutMutation,
} = newApi;