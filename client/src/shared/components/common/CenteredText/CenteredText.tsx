import { Text } from "@mantine/core";
import clsx from "clsx";
import { ComponentProps, FC, ReactNode } from "react";
import cls from "./CenteredText.module.scss";

type TextProps = Omit<ComponentProps<typeof Text>, "children">;

interface CenteredTextProps {
	className?: string;
	textProps?: TextProps;
	children: ReactNode;
}

export const CenteredText: FC<CenteredTextProps> = ({ className, textProps, children }) => {
	return (
		<div className={clsx(cls.CenteredText, {}, [className])}>
			<Text {...textProps}>
				{children}
			</Text>
		</div>
	);
};
