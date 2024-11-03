import { notifications } from "@mantine/notifications";
import { IconError404, IconError404Off } from "@tabler/icons-react";
import clsx from "clsx";
import {
	FC, useCallback, useEffect, useState,
} from "react";
import { useForm } from "react-hook-form";
import { superheroApi } from "@/entities/Superhero";
import { Page404Error, PageLoader } from "@/shared/components/common";
import { SwiperSlider } from "@/shared/components/sliders";
import { SuperheroForm } from "../SuperheroForm/SuperheroForm";
import cls from "./UpdateSuperheroForm.module.scss";

interface UpdateSuperheroFormProps {
	className?: string;
	id: number;
}

type SuperheroFormInputs = {
	nickname: string;
	real_name: string;
	origin_description: string;
	catch_phrase: string;
	superpowers: string;
	deletedImageIds: number[];
	addedImagesFiles: File[];
};

type ImageType = { id: number; url: string; isNew?: boolean };

export const UpdateSuperheroForm: FC<UpdateSuperheroFormProps> = ({ className, id }) => {
	const { data: superhero, isLoading: dataIsLoading, isFetching: dataIsFetching } = superheroApi.useGetOneQuery({ id });
	const [updateSuperhero, { isLoading }] = superheroApi.useUpdateMutation();
	const [deleteImages] = superheroApi.useDeleteImagesMutation();
	const [images, setImages] = useState<ImageType[]>([]);
	const [editMode, setEditMode] = useState<boolean>(false);

	const form = useForm<SuperheroFormInputs>({
		defaultValues: {
			nickname: "",
			real_name: "",
			origin_description: "",
			catch_phrase: "",
			superpowers: "",
			addedImagesFiles: [],
			deletedImageIds: [],
		},
	});

	const toogleEditMode = useCallback((open: boolean) => {
		setEditMode(open);
	}, []);

	const onSubmit = useCallback(async (data: SuperheroFormInputs) => {
		try {
			const formData = new FormData();
			formData.append("nickname", data.nickname);
			formData.append("real_name", data.real_name);
			formData.append("origin_description", data.origin_description);
			formData.append("superpowers", data.superpowers);

			data.addedImagesFiles.forEach((file) => formData.append("images", file));

			if (data.deletedImageIds.length > 0) {
				await	deleteImages({ id, imageIds: data.deletedImageIds });
			}

			// @ts-ignore
			await updateSuperhero({ id, formData });

			notifications.show({
				title: "Success updated superhero",
				message: "Your updated superhero in your collection",
			});
		} catch (error) {
			notifications.show({
				title: "Do not updated superhero",
				message: "Unexpected error occurred",
			});
		} finally {
			toogleEditMode(false);
		}
	}, [updateSuperhero, id, deleteImages, toogleEditMode]);

	useEffect(() => {
		if (superhero) {
			form.reset({
				nickname: superhero.nickname,
				real_name: superhero.real_name,
				origin_description: superhero.origin_description,
				catch_phrase: superhero.catch_phrase,
				superpowers: superhero.superpowers,
				addedImagesFiles: [],
				deletedImageIds: [],
			});
			setImages(superhero.images.map((img: any) => ({ id: img.id, url: img.url, isNew: false })));
		}
	}, [superhero, form]);

	if (dataIsLoading || dataIsFetching) {
		return <PageLoader />;
	}

	if (!superhero) {
		return <Page404Error />;
	}

	return (
		<div className={clsx(cls.UpdateSuperheroForm, {}, [className])}>
			<SwiperSlider className={cls.UpdateSuperheroForm__slider} images={superhero?.images} />
			<SuperheroForm
				className={cls.UpdateSuperheroForm__form}
				form={form}
				isLoading={isLoading}
				onSubmit={onSubmit}
				images={images}
				setImages={setImages}
				isEditMode={editMode}
				toogleEditMode={toogleEditMode}
			/>
		</div>
	);
};
