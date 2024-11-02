import clsx from "clsx";
import { FC } from "react";
import { ModalCreateSuperhero, OpenCreateSuperheroModal } from "@/features/Superhero";
import cls from "./Header.module.scss";

interface HeaderProps {
	className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
	return (
		<>
			<ModalCreateSuperhero />
			<header className={clsx(cls.Header, {}, [className])}>
				<OpenCreateSuperheroModal />
			</header>
		</>
	);
};
