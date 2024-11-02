import { Button } from "@mantine/core";
import clsx from "clsx";
import { ComponentProps, FC, useCallback } from "react";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { featureSuperheroActions } from "../../model/slices/featureSuperheroSlice";
import cls from "./OpenCreateSuperheroModal.module.scss";

interface OpenCreateSuperheroModalProps extends ComponentProps<typeof Button> {
	className?: string
}

export const OpenCreateSuperheroModal: FC<OpenCreateSuperheroModalProps> = ({ className, ...otherProps }) => {
	const dispatch = useAppDispatch();

	const onClick = useCallback(() => {
		dispatch(featureSuperheroActions.isOpenModal(true));
	}, [dispatch]);

	return (
		<Button
			className={clsx(cls.OpenCreateSuperheroModal, {}, [className])}
			onClick={onClick}
			{...otherProps}
		>
			Create hero
		</Button>
	);
};
