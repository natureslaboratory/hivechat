import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Answer, IPaginatedNewResponse, IPaginatedResponse, LoginType, MemberInvite, MemberOrganisation, MemberRequestType, MemberType, NewSocialType, OrganisationInviteType, OrganisationMembersType, OrganisationMemberType, OrganisationType, PostAnswer, PostQuestion, Question, SocialType, UpdateQuestion } from "./types";

export const newApi = createApi({
    reducerPath: 'newApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
    tagTypes: [
        "User", 
        "Organisation", 
        "Member Organisations", 
        "Member Invites", 
        "OrgMembers", 
        "Organisations", 
        "OrgSocials",
        "OrgInvites",
        "OrgInvitesSearch"
    ],
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
        getOrganisationMembers: builder.query<IPaginatedNewResponse<OrganisationMemberType>, { slug: string, page: number, search?: string }>({
            query: ({ slug, page, search = "" }) => `organisations/get-members?slug=${slug}&page=${page}&s=${search}`,
            providesTags: (result, error, args) => [{ type: "OrgMembers", id: `${args.slug}_${args.page}` }]
        }),
        getOrganisations: builder.query<IPaginatedNewResponse<OrganisationType>, { page: number, search: string}>({
            query: ({ page = 1, search = "" }) => `organisations/get-organisations?page=${page}&s=${search}`,
            providesTags: (result, error, { search, page }) => search ? [{type: "Organisations", id: `${search}_${page}`}] : [{type: "Organisations", id: `${page}`}]
        }),
        updateOrganisation: builder.mutation<any, OrganisationType>({
            query: (organisation) => ({
                url: `organisations/update-organisation`,
                method: "POST",
                body: organisation,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, { organisationSlug }) => [{ type: "Organisation", id: organisationSlug }]
        }),
        getOrganisationSocials: builder.query<SocialType[], number>({
            query: (organisationID) => `organisations/socials/get?id=${organisationID}`,
            providesTags: (result, error, organisationID) => [{type: "OrgSocials", id: organisationID}]
        }),
        addOrganisationSocial: builder.mutation<any, NewSocialType>({
            query: (social) => ({
                url: `organisations/socials/add`,
                method: "POST",
                body: social,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, { organisationID }) => [{ type: "OrgSocials", id: organisationID }]
        }),
        updateOrganisationSocial: builder.mutation<any, SocialType>({
            query: (social) => ({
                url: `organisations/socials/update`,
                method: "POST",
                body: social,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, { organisationID }) => [{ type: "OrgSocials", id: organisationID }]
        }),
        deleteOrganisationSocial: builder.mutation<any, SocialType>({
            query: (social) => ({
                url: `organisations/socials/delete`,
                method: "POST",
                body: social,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, { organisationID }) => [{ type: "OrgSocials", id: organisationID }]
        }),
        getOrganisationInvites: builder.query<IPaginatedNewResponse<OrganisationInviteType>, { organisationID: number, searchTerm: string, page: number}>({
            query: ({ organisationID, searchTerm, page }) => `organisations/invites/get-organisation-invites?id=${organisationID}&s=${searchTerm}&page=${page}`,
            providesTags: (result, error, { organisationID, searchTerm, page }) => {
                if (searchTerm) {
                    return [{ type: "OrgInvitesSearch", id: searchTerm }]
                } else {
                    return [{ type: "OrgInvites", id: organisationID }]
                }
            }
        }),
        createOrganisationInvite: builder.mutation<any, (Pick<OrganisationInviteType, "memberEmail" | "organisationID"> & { send_email: string })>({
            query: (invite) => ({
                url: `organisations/invites/create`,
                method: "POST",
                body: invite,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, { organisationID }) => [{ type: "OrgInvites", id: organisationID }]
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
    useGetOrganisationsQuery,
    useUpdateOrganisationMutation,
    useGetOrganisationSocialsQuery,
    useUpdateOrganisationSocialMutation,
    useAddOrganisationSocialMutation,
    useDeleteOrganisationSocialMutation,
    useGetOrganisationInvitesQuery,
    useCreateOrganisationInviteMutation,
    useLoginMutation,
    useLogoutMutation,
} = newApi;