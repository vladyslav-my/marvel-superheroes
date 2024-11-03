import { Pagination } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import {
	useCallback, useMemo, useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppLayout } from "@/widgets/AppLoyout";
import { superheroApi, SuperheroCard } from "@/entities/Superhero";
import { CenteredText, PageLoader } from "@/shared/components/common";
import cls from "./MainPage.module.scss";

export const MainPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const initialPage = useMemo(() => {
		const params = new URLSearchParams(location.search);
		return parseInt(params.get("page") || "1", 10);
	}, [location.search]);

	const [currentPage, setCurrentPage] = useState(initialPage);
	const {
		data: superheroData, isFetching, isLoading,
	} = superheroApi.useGetAllQuery({
		page: currentPage,
		limit: 9,
	});

	const superheroesCards = useMemo(() => {
		return superheroData?.data.map((entity, index) => (
			<motion.div
				key={`${entity.id}-${currentPage}`}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: index * 0.1 }}
				exit={{ opacity: 0, y: -20 }}
			>
				<SuperheroCard className={cls.SuperheroCard} key={entity.id} entity={entity} />
			</motion.div>
		));
	}, [currentPage, superheroData?.data]);

	const onChangePage = useCallback((page: number) => {
		setCurrentPage(page);
		navigate(`?page=${page}`, { replace: true });
	}, [navigate]);

	const TextMessage = useMemo(() => {
		if (!superheroData?.totalPages || currentPage > superheroData?.totalPages) {
			return <CenteredText>Page not found</CenteredText>;
		} else if (!superheroData?.data.length) {
			return <CenteredText>Superhero collections is empty</CenteredText>;
		}
	}, [currentPage, superheroData?.data.length, superheroData?.totalPages]);

	return (
		<AppLayout className={cls.MainPage}>
			<div className={cls.MainPage__content}>
				<div className={cls.MainPage__cards}>
					<AnimatePresence mode="wait">
						{superheroesCards}
					</AnimatePresence>
				</div>
				{isFetching || isLoading && <PageLoader />}
				{TextMessage}
			</div>
			{superheroData && superheroData?.totalPages > 1 && (
				<Pagination
					classNames={{ root: cls.MainPage__pagination }}
					total={superheroData?.totalPages}
					value={currentPage}
					onChange={onChangePage}
				/>
			)}
		</AppLayout>
	);
};
