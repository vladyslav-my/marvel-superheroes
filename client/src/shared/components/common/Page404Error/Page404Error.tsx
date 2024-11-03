import { Image, Loader } from "@mantine/core";
import clsx from "clsx";
import { FC, memo } from "react";
import Error404Image from "@/shared/assets/error-404.webp";
import cls from "./Page404Error.module.scss";

interface Page404ErrorProps {
	className?: string;
}

export const Page404Error: FC<Page404ErrorProps> = memo(({ className }) => (
	<div className={clsx(cls.Page404Error, {}, [className])}>
		<Image src={Error404Image} />
	</div>
));
