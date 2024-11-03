import { useParams } from "react-router-dom";
import { AppLayout } from "@/widgets/AppLoyout";
import { UpdateSuperheroForm } from "@/features/Superhero";
import cls from "./SuperheroDetailsPage.module.scss";

export const SuperheroDetailsPage = () => {
	const { id } = useParams();
	return (
		<AppLayout className={cls.SuperheroDetailsPage}>
			<UpdateSuperheroForm id={+id!} />
		</AppLayout>

	);
};
