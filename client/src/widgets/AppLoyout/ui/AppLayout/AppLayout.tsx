import { Container } from "@mantine/core";
import clsx from "clsx";
import { FC, ReactNode } from "react";
import { Header } from "../Header/Header";
import cls from "./AppLayout.module.scss";

interface AppLayoutProps {
	className?: string;
	children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ className, children }) => {
	return (
		<Container className={clsx(cls.AppLayout, {}, [className])}>
			<Header />
			<main>
				{children}
			</main>
		</Container>
	);
};
