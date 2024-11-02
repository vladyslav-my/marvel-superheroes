import {
	combineSlices, configureStore,
} from "@reduxjs/toolkit";
import { $api } from "@/shared/api/api";
import { rtkApi } from "@/shared/api/rtkApi";
import { ExtraArgumentType } from "../types/index";

export const createReduxStore = () => {
	const rootReducer = combineSlices(
		{
			[rtkApi.reducerPath]: rtkApi.reducer,
		},
	);

	const extraArgument: ExtraArgumentType = {
		api: $api,
	};

	const store = configureStore({
		reducer: rootReducer,
		devTools: __IS_DEV__,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: { extraArgument },
			serializableCheck: false,
		}).concat(rtkApi.middleware),
	});

	return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
export type RootState = ReturnType<ReturnType<typeof createReduxStore>["getState"]>;
