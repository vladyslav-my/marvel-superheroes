import { Text } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { ThemeSwitcher } from "@/features/common";
import { ModalCreateSuperhero, OpenCreateSuperheroModal } from "@/features/Superhero";
import { getSuperheroRoutePath } from "@/shared/routes/path";
import cls from "./Header.module.scss";

interface HeaderProps {
	className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
	return (
		<>
			<ModalCreateSuperhero />
			<header className={clsx(cls.Header, {}, [className])}>
				<Text component={NavLink} to={getSuperheroRoutePath()} fw={800} size="sm">Marvel information</Text>
				<div className={cls.Header__actions}>
					<OpenCreateSuperheroModal />
					<ThemeSwitcher />
				</div>
			</header>
		</>
	);
};
