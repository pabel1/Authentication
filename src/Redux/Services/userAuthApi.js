import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://user-authentication-demo-api.herokuapp.com/" }),
  endpoints: (builder) => ({
    userRegistration: builder.mutation({
      query: (newData) => {
        return {
          url: "user/signup",
          method: "POST",
          body: newData,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    userLogin: builder.mutation({
      query: (newData) => {
        return {
          url: "user/login",
          method: "POST",
          body: newData,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (newData) => {
        return {
          url: "user/resetpassword",
          method: "POST",
          body: newData,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    resetPasswordByLink: builder.mutation({
      query: ({ newData, id, token }) => {
        return {
          url: `user/resetpassword/${id}/${token}`,
          method: "POST",
          body: newData,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getLogedUser: builder.query({
      query: (token) => {
        return {
          url: "user/logeduser",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    changePassword: builder.mutation({
      query: ({ newData, token }) => {
        return {
          url: "user/changepassword",
          method: "POST",
          body: newData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});
export const {
  useUserRegistrationMutation,
  useUserLoginMutation,
  useResetPasswordMutation,
  useResetPasswordByLinkMutation,
  useGetLogedUserQuery,
  useChangePasswordMutation,
} = userAuthApi;
