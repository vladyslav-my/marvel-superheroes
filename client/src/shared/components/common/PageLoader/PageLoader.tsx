import { Loader } from "@mantine/core";
import clsx from "clsx";
import { FC, memo } from "react";
import cls from "./PageLoader.module.scss";

interface PageLoaderProps {
	className?: string;
}

export const PageLoader: FC<PageLoaderProps> = memo(({ className }) => (
	<Loader className={clsx(cls.PageLoader, {}, [className])} />
));
