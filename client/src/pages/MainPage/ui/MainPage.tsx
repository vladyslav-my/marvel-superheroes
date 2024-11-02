import {
	ActionIcon, Button, Card, Container, Group, Image, Menu,
	rem,
	SimpleGrid,
	Text,
} from "@mantine/core";
import {
	IconDots, IconEye, IconTrash,
} from "@tabler/icons-react";
import { AppLayout } from "@/widgets/AppLoyout";
import { superheroApi } from "@/entities/Superhero";
import { SwiperSlider } from "@/shared/components/sliders";
import cls from "./MainPage.module.scss";

const images = [
	"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
	"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
	"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
];

const UiCard = () => {
	return (
		<Card withBorder shadow="sm" radius="md">
			<Card.Section withBorder inheritPadding py="xs">
				<Group justify="space-between">
					<Text fw={500}>Review pictures</Text>
					<Menu withinPortal position="bottom-end" shadow="sm">
						<Menu.Target>
							<ActionIcon variant="subtle" color="gray">
								<IconDots style={{ width: rem(16), height: rem(16) }} />
							</ActionIcon>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}>
								Preview all
							</Menu.Item>
							<Menu.Item
								leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
								color="red"
							>
								Delete all
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Card.Section>

			<Text mt="sm" c="dimmed" size="sm">
				<Text span inherit c="var(--mantine-color-anchor)">
					200+ images uploaded
				</Text>{" "}
				since last visit, review them to select which one should be added to your gallery
			</Text>

			<Card.Section mt="sm">
				<SwiperSlider />
			</Card.Section>
			<Button color="blue" fullWidth mt="md" radius="md">
				View Details
			</Button>
		</Card>
	);
};

export const MainPage = () => {
	// const {
	// 	data, isFetching, isLoading, error,
	// } = superheroApi.useGetAllQuery({
	// 	page: 1,
	// 	limit: 10,
	// });

	return (
		<AppLayout className={cls.MainPage}>
			<h1>Marvel information</h1>
			<div className={cls.MainPage__cards}>
				<UiCard />
				<UiCard />
				<UiCard />
				<UiCard />
				<UiCard />
				<UiCard />
				<UiCard />
				<UiCard />
				<UiCard />
				<UiCard />
				<UiCard />
			</div>
		</AppLayout>
	);
};
