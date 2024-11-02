import { Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import clsx from "clsx";
import {
	ComponentProps, FC, useCallback, useState,
} from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { superheroApi } from "@/entities/Superhero";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { featureSuperheroActions, featureSuperheroSelectors } from "../../model/slices/featureSuperheroSlice";
import { SuperheroForm } from "../SuperheroForm/SuperheroForm";
import cls from "./ModalCreateSuperhero.module.scss";

interface ModalCreateSuperheroProps extends Omit<ComponentProps<typeof Modal>, "opened" | "onClose"> {
}

type SuperheroFormInputs = {
	nickname: string;
	real_name: string;
	origin_description: string;
	catch_phrase: string;
	superpowers: string;
	addedImagesFiles: File[];
};

type ImageType = { id: number; url: string; isNew?: boolean };

export const ModalCreateSuperhero: FC<ModalCreateSuperheroProps> = ({ className, ...otherProps }) => {
	const dispatch = useAppDispatch();
	const isOpenModal = useSelector(featureSuperheroSelectors.isOpenModal);

	const [CreateSuperhero, { isLoading }] = superheroApi.useCreateMutation();
	const [images, setImages] = useState<ImageType[]>([]);

	const form = useForm<SuperheroFormInputs>({
		defaultValues: {
			nickname: "",
			real_name: "",
			origin_description: "",
			catch_phrase: "",
			superpowers: "",
			addedImagesFiles: [],
		},
	});

	const onSubmit = useCallback(async (data: SuperheroFormInputs) => {
		const formData = new FormData();
		formData.append("nickname", data.nickname);
		formData.append("real_name", data.real_name);
		formData.append("origin_description", data.origin_description);
		formData.append("superpowers", data.superpowers);

		data.addedImagesFiles.forEach((file) => formData.append("images", file));

		await CreateSuperhero({ formData }).then(() => {
			dispatch(featureSuperheroActions.isOpenModal(false));
			notifications.show({
				title: "Success create superhero",
				message: "Your superhero in your collection",
			});
		}).catch(() => {
			dispatch(featureSuperheroActions.isOpenModal(false));
			notifications.show({
				title: "Do not create superhero",
				message: "Unexpected error occurred",
			});
		}).finally(() => {
			form.reset();
			setImages([]);
		});
	}, [CreateSuperhero, dispatch, form]);

	const onCloseModal = useCallback(() => {
		dispatch(featureSuperheroActions.isOpenModal(false));
	}, [dispatch]);

	return (
		<Modal
			className={clsx(cls.ModalCreateSuperhero, {}, [className])}
			title="Create Superhero"
			{...otherProps}
			onClose={onCloseModal}
			opened={isOpenModal}
			centered
		>
			<SuperheroForm
				className={clsx(cls.CreateSuperheroForm, {}, [className])}
				form={form}
				isLoading={isLoading}
				onSubmit={onSubmit}
				images={images}
				setImages={setImages}
			/>
		</Modal>
	);
};
