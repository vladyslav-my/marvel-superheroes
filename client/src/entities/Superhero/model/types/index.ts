export interface CreateSuperheroRequest {
	nickname?: string;
	real_name?: string;
	origin_description?: string;
	superpowers?: string;
	catch_phrase?: string;
	images?: File[];
}

export interface UpdateSuperheroRequest extends CreateSuperheroRequest {}

export interface SuperheroGetOneShortResponse {
	id: number;
	nickname: string;
	origin_description: string;
	images: SuperheroImageResponse[]
}
export interface SuperheroGetAllResponse {
	data: SuperheroGetOneShortResponse[],
	totalCount: number;
	currentPage: number;
	totalPages: number;
}

export interface SuperheroGetOneResponse {
	id: number;
	nickname: string;
	real_name: string;
	origin_description: string;
	catch_phrase: string;
	superpowers: string;
	images: SuperheroImageResponse[];
}

export interface SuperheroImageResponse {
	id: number;
	url: string;
}

export interface MessageResponse {
	message: string;
}
