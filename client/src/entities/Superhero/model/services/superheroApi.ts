import { File } from "buffer";
import { rtkApi } from "@/shared/api/rtkApi";
import { SuperheroBody } from "../types";

export const superheroApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getAll: build.query<any[], { page?: number, limit?: number }>({
			providesTags: ["superhero"],
			query: ({ page, limit }) => ({
				url: "superhero",
				method: "GET",
				params: {
					page,
					limit,
				},
			}),
		}),

		getOne: build.query<any, { id: number }>({
			providesTags: ["superhero"],
			query: ({ id }) => ({
				url: `superhero/${id}`,
				method: "GET",
			}),
		}),

		create: build.mutation<any, any>({
			query: ({ formData }) => ({
				invalidatesTags: ["superhero"],
				url: "superhero",
				method: "POST",
				data: formData,
			}),
		}),

		update: build.mutation<any, any>({
			query: ({ id, formData }) => ({
				invalidatesTags: ["superhero"],
				url: `superhero/${id}`,
				method: "PATCH",
				data: formData,
			}),
		}),

		delete: build.mutation<any, { id: number }>({
			invalidatesTags: ["superhero"],
			query: ({ id }) => ({
				url: `superhero/${id}`,
				method: "DELELE",
			}),
		}),

		addImages: build.mutation<any, { id: number, images: File[] }>({
			query: ({ id, images }) => ({
				invalidatesTags: ["superhero"],
				url: `superhero/${id}/images`,
				method: "POST",
				body: { images },
			}),
		}),

		deleteImages: build.mutation<any, { id: number, imageIds: number[] }>({
			query: ({ id, imageIds }) => ({
				invalidatesTags: ["superhero"],
				url: `superhero/${id}/images`,
				method: "DELETE",
				data: { imageIds },
			}),
		}),
	}),
	overrideExisting: false,
});
