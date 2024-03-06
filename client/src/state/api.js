import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Products", "Customers"],
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
    getProducts: build.query({
      query: (id) => `client/products`,
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => `client/customers`,
      providesTags: ["Customers"],
    }),
  }),
});

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery } =
  api;
