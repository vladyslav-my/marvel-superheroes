import { Pagination } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { AppLayout } from "@/widgets/AppLoyout";
import { superheroApi, SuperheroCard } from "@/entities/Superhero";
import { PageLoader } from "@/shared/components/common";
import cls from "./MainPage.module.scss";

export const MainPage = () => {
	const [currentPage, setCurrentPage] = useState(1);
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
	}, []);

	return (
		<AppLayout className={cls.MainPage}>
			<div className={cls.MainPage__content}>
				<div className={cls.MainPage__cards}>
					<AnimatePresence mode="wait">
						{superheroesCards}
					</AnimatePresence>
				</div>
				{isFetching || isLoading && <PageLoader />}
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
