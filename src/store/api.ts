import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TAG_TYPES = [
  "AdminVideo",
  "Dancers",
  "Video",
]

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: TAG_TYPES,
  endpoints: () => ({}),
});
