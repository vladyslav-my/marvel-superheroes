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
		<Container className={cls.AppLayout}>
			<Header className={cls.AppLayout__header} />
			<main className={clsx(cls.AppLayout__main, className)}>
				{children}
			</main>
		</Container>
	);
};
