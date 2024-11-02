import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";

const initialState: FeatureSuperheroSchema = {
	isOpenModal: false,
};

export const featureSuperheroSlice = createSliceWithThunk({
	name: "featureSuperheroSlice",
	initialState,
	reducers: (create) => ({
		isOpenModal: create.reducer((state, action: PayloadAction<boolean>) => {
			state.isOpenModal = action.payload;
		}),
	}),

	selectors: {
		isOpenModal: (state) => state.isOpenModal,
	},
});

export const { actions: featureSuperheroActions, selectors: featureSuperheroSelectors } = featureSuperheroSlice;
