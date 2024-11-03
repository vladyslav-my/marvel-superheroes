import {
	Switch, useMantineTheme, rem, useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { FC } from "react";

interface ThemeSwitcherProps {
	className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
	const theme = useMantineTheme();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});

	const sunIcon = (
		<IconSun
			style={{ width: rem(16), height: rem(16) }}
			stroke={2.5}
			color={theme.colors.yellow[4]}
		/>
	);

	const moonIcon = (
		<IconMoonStars
			style={{ width: rem(16), height: rem(16) }}
			stroke={2.5}
			color={theme.colors.blue[6]}
		/>
	);

	return (
		<Switch
			className={className}
			size="md"
			color="dark.4"
			onLabel={sunIcon}
			offLabel={moonIcon}
			checked={colorScheme === "dark"}
			onChange={() => toggleColorScheme()}
		/>
	);
};
