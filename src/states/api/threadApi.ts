import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ThreadDetail } from "../../utils/api";

export const threadApi = createApi({
  reducerPath: "threadApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://forum-api.dicoding.dev/v1" }),
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getThreadDetail: builder.query<ThreadDetail, string>({
      query: (threadId) => `/threads/${threadId}`,
      transformResponse: (response: { data: { detailThread: ThreadDetail } }) => response.data.detailThread,
    }),
  }),
});

export const { useGetThreadDetailQuery } = threadApi;
