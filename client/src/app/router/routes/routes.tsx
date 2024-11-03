import { RouteProps } from "react-router-dom";
import { SuperheroDetailsPage } from "@/pages/DetailsHeroPage";
import { MainPage } from "@/pages/MainPage";
import {
	getMainRoutePath,
	getSuperheroRoutePath,
} from "@/shared/routes/path";

export type AppRouteProps = RouteProps & {
};

export const routes: AppRouteProps[] = [
	{
		path: getSuperheroRoutePath(),
		element: <MainPage />,
	},
	{
		path: getSuperheroRoutePath(":id"),
		element: <SuperheroDetailsPage />,
	},
];
