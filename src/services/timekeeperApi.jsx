import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const timekeeperApi = createApi({
  reducerPath: 'timekeeperApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://boiling-river-55915.herokuapp.com/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user.accessToken;
      if (token) {
        headers.set('x-access-token', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Client', 'User', 'Time'],
  endpoints: (builder) => ({
    clients: builder.query({
      query: (arg) => `/clients?${arg}`,
      providesTags: ['Client'],
    }),
    client: builder.query({
      query: (_id) => `/clients/${_id}`,
      providesTags: ['Client'],
    }),
    addClient: builder.mutation({
      query: (client) => ({
        url: '/clients',
        method: 'POST',
        body: client,
      }),
      invalidatesTags: ['Client'],
    }),
    deleteClient: builder.mutation({
      query: (_id) => ({
        url: `/clients/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Client'],
    }),
    updateClient: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/clients/${_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Client'],
    }),
    times: builder.query({
      query: (arg) => `/time?${arg}`,
      providesTags: ['Time'],
    }),
    time: builder.query({
      query: (_id) => `/time/${_id}`,
      providesTags: ['Time'],
    }),
    addTime: builder.mutation({
      query: (time) => ({
        url: '/time',
        method: 'POST',
        body: time,
      }),
      invalidatesTags: ['Time'],
    }),
    deleteTime: builder.mutation({
      query: (_id) => ({
        url: `/time/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Time'],
    }),
    updateTime: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/time/${_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Time'],
    }),
    users: builder.query({
      query: (arg) => `/users?${arg}`,
      providesTags: ['User'],
    }),
    user: builder.query({
      query: (_id) => `/users/${_id}`,
      providesTags: ['User'],
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (_id) => ({
        url: `/users/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/users/${_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['User'],
    }),
    roles: builder.query({
      query: () => `/users/roles`,
    }),
  }),
});

export const {
  useClientsQuery,
  useClientQuery,
  useAddClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
  useTimesQuery,
  useTimeQuery,
  useAddTimeMutation,
  useDeleteTimeMutation,
  useUpdateTimeMutation,
  useUsersQuery,
  useUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useRolesQuery,
} = timekeeperApi;
