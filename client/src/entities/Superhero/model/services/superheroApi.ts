import { File } from "buffer";
import { rtkApi } from "@/shared/api/rtkApi";
import {
	CreateSuperheroRequest, MessageResponse, SuperheroGetAllResponse, SuperheroGetOneResponse,
	UpdateSuperheroRequest,
} from "../types";

export const superheroApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getAll: build.query<SuperheroGetAllResponse, { page?: number, limit?: number }>({
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

		getOne: build.query<SuperheroGetOneResponse, { id: number }>({
			providesTags: ["superhero"],
			query: ({ id }) => ({
				url: `superhero/${id}`,
				method: "GET",
			}),
		}),

		create: build.mutation<MessageResponse, { formData: CreateSuperheroRequest }>({
			invalidatesTags: ["superhero"],
			query: ({ formData }) => ({
				url: "superhero",
				method: "POST",
				body: formData,
			}),
		}),

		update: build.mutation<MessageResponse, { id: number, formData: UpdateSuperheroRequest }>({
			invalidatesTags: ["superhero"],
			query: ({ id, formData }) => ({
				url: `superhero/${id}`,
				method: "PATCH",
				body: formData,
			}),
		}),

		delete: build.mutation<MessageResponse, { id: number }>({
			invalidatesTags: ["superhero"],
			query: ({ id }) => ({
				url: `superhero/${id}`,
				method: "DELETE",
			}),
		}),

		addImages: build.mutation<MessageResponse, { id: number, images: File[] }>({
			invalidatesTags: ["superhero"],
			query: ({ id, images }) => ({
				url: `superhero/${id}/images`,
				method: "POST",
				body: { images },
			}),
		}),

		deleteImages: build.mutation<MessageResponse, { id: number, imageIds: number[] }>({
			// invalidatesTags: ["superhero"],
			query: ({ id, imageIds }) => ({
				url: `superhero/${id}/images`,
				method: "DELETE",
				body: { imageIds },
			}),
		}),
	}),
	overrideExisting: false,
});
