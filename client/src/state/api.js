import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User"],
  //   prepareHeaders: (headers, { getState }) => {
  //     headers.set("x-api-key", `YOUR-KEY-HERE`);
  //     headers.set("Content-Type", "application/json");
  //     headers.set("Access-Control-Allow-Origin", "*");
  //     return headers;
  //   },
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = api;
