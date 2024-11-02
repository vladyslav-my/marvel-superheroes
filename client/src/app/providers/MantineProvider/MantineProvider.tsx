import { em, createTheme, MantineProvider as MantineProviderCore } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { FC, ReactNode } from "react";

const theme = createTheme({
	fontFamily: "Rubik, sans-serif",
	fontFamilyMonospace: "Monaco, Courier, monospace",
	headings: { fontFamily: "Greycliff CF, sans-serif" },
	breakpoints: {
		xs: em(480),
		sm: em(768),
		md: em(992),
		lg: em(1200),
		xl: em(1440),
	},
});

interface MantineProviderProps {
	children: ReactNode;
}

export const MantineProvider: FC<MantineProviderProps> = ({ children }) => {
	return (
		<MantineProviderCore theme={theme} defaultColorScheme="dark">
			<Notifications />
			{children}
		</MantineProviderCore>
	);
};
