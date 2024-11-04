import {
	ActionIcon, Button, Card, Group, Menu,
	rem, Text,
} from "@mantine/core";
import { IconDots, IconEye, IconTrash } from "@tabler/icons-react";
import clsx from "clsx";
import { FC, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { SwiperSlider } from "@/shared/components/sliders";
import { getSuperheroRoutePath } from "@/shared/routes/path";
import { superheroApi } from "../../model/services/superheroApi";
import { SuperheroGetOneShortResponse } from "../../model/types";
import cls from "./SuperheroCard.module.scss";

interface SuperheroCardProps {
	className?: string;
	entity: SuperheroGetOneShortResponse
}

export const SuperheroCard: FC<SuperheroCardProps> = ({ className, entity }) => {
	const [deleteSuperhero, { isLoading }] = superheroApi.useDeleteMutation();
	const onClickDelete = useCallback(() => {
		deleteSuperhero({ id: entity.id });
	}, [deleteSuperhero, entity.id]);

	return (
		<Card
			className={clsx(cls.SuperheroCard, {}, [className])}
			withBorder
			shadow="sm"
			radius="md"
		>
			<Card.Section withBorder inheritPadding py="xs">
				<Group justify="space-between">
					<Text fw={500}>{entity.nickname}</Text>
					<Menu withinPortal position="bottom-end" shadow="sm">
						<Menu.Target>
							<ActionIcon variant="subtle" color="gray">
								<IconDots style={{ width: rem(16), height: rem(16) }} />
							</ActionIcon>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item
								component={NavLink}
								to={getSuperheroRoutePath(entity.id)}
								leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}
							>
								Preview
							</Menu.Item>
							<Menu.Item
								onClick={onClickDelete}
								leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
								color="red"
							>
								Delete
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Card.Section>
			<Text className={cls.SuperheroCard__desc} c="dimmed" size="sm">
				{entity.origin_description}
			</Text>
			<Card.Section px={5}>
				<SwiperSlider images={entity.images} />
			</Card.Section>
			<Button
				className={cls.SuperheroCard__button}
				component={NavLink}
				to={getSuperheroRoutePath(entity.id)}
				loading={isLoading}
				color="blue"
				fullWidth
				radius="md"
			>
				View Details
			</Button>
		</Card>

	);
};
