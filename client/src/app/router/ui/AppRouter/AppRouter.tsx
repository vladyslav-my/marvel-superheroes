import { Suspense, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "@/shared/components/common";
import { AppRouteProps, routes } from "../../routes/routes";

const AppRouter = () => {
	const RouteItems = useMemo(() => {
		return routes.map((route: AppRouteProps) => {
			const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;

			return (
				<Route
					element={element}
					key={route.path}
					path={route.path}
				/>
			);
		});
	}, []);

	return (
		<Routes>{RouteItems}</Routes>
	);
};

export default AppRouter;
