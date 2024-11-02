import { AppLayout } from "@/widgets/AppLoyout";
import { UpdateSuperheroForm } from "@/features/Superhero";
import cls from "./SuperheroDetailsPage.module.scss";

export const SuperheroDetailsPage = () => {
	return (
		<AppLayout className={cls.SuperheroDetailsPage}>
			<UpdateSuperheroForm />
		</AppLayout>

	);
};
