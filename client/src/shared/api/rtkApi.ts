import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rtkApi = createApi({
	tagTypes: ["superhero"],
	reducerPath: "rtkApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${__API__}/api` }),
	endpoints: () => ({}),
});
