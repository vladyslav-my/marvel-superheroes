import clsx from "clsx";
import { FC } from "react";
import cls from "./SuperheroForm.module.scss";

interface SuperheroFormProps {
	className?: string
}

export const SuperheroForm: FC<SuperheroFormProps> = ({ className }) => {
	return (
		<div className={clsx(cls.SuperheroForm, {}, [className])} />
	);
};
