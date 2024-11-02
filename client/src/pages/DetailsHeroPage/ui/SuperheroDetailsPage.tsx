import { File } from "buffer";
import {
	Button,
	Container, Input, Text, Textarea, TextInput, Image,
	Group,
	UnstyledButton,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { superheroApi } from "@/entities/Superhero";
import { SwiperSlider } from "@/shared/components/sliders";
import cls from "./SuperheroDetailsPage.module.scss";

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

export const SuperheroDetailsPage = ({ id = 1 }: { id: number }) => {
	const { data: superhero, refetch } = superheroApi.useGetOneQuery({ id });
	const [updateSuperhero] = superheroApi.useUpdateMutation();
	const [deleteImages] = superheroApi.useDeleteImagesMutation();
	const [images, setImages] = useState<ImageType[]>([]);
	const [isEditMode, setIsEditMode] = useState(false);

	const {
		handleSubmit, control, setValue, getValues, reset,
	} = useForm<SuperheroFormInputs>({
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

	const onSubmit = useCallback(async (data: SuperheroFormInputs) => {
		const formData = new FormData();
		formData.append("nickname", data.nickname);
		formData.append("real_name", data.real_name);
		formData.append("origin_description", data.origin_description);
		formData.append("superpowers", data.superpowers);

		// @ts-ignore
		data.addedImagesFiles.forEach((file) => formData.append("images", file));

		if (data.deletedImageIds.length > 0) {
			await deleteImages({ id, imageIds: data.deletedImageIds });
		}

		await updateSuperhero({ id, formData });
		refetch();
		setIsEditMode(false);
	}, [deleteImages, id, refetch, updateSuperhero]);

	useEffect(() => {
		if (superhero) {
			reset({
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
	}, [superhero, reset]);

	const cancelEditMode = useCallback(() => {
		setIsEditMode(false);
	}, []);

	const enableEditMode = useCallback(() => {
		setIsEditMode(true);
	}, []);

	return (
		<div className={cls.SuperheroDetailsPage}>
			<Container>
				<SwiperSlider />
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="nickname"
						control={control}
						render={({ field }) => <TextInput readOnly={!isEditMode} label="Nickname" {...field} required />}
					/>
					<Controller
						name="real_name"
						control={control}
						render={({ field }) => <TextInput readOnly={!isEditMode} label="Real name" {...field} />}
					/>
					<Controller
						name="origin_description"
						control={control}
						render={({ field }) => <Textarea readOnly={!isEditMode} label="Origin description" {...field} />}
					/>
					<Controller
						name="catch_phrase"
						control={control}
						render={({ field }) => <Textarea readOnly={!isEditMode} label="Catch phrase" {...field} />}
					/>
					<Controller
						name="superpowers"
						control={control}
						render={({ field }) => <Textarea readOnly={!isEditMode} label="Superpowers" {...field} />}
					/>

					{isEditMode && (
						<Controller
							control={control}
							name="addedImagesFiles"
							render={({ field }) => (
								<div className={cls.ImagesPicker}>
									<ul className={cls.ImagesPicker__list}>
										{images.map((item, index) => (
											<li key={index} className={cls.ImagesPicker__item}>
												<UnstyledButton
													onClick={() => {
														setImages(images.filter((_, i) => i !== index));
														if (!item.isNew) {
															setValue("deletedImageIds", [
																...getValues("deletedImageIds"),
																item.id,
															]);
														}
													}}
													className={cls.ImagesPicker__removeButton}
												>
													<Image
														className={cls.ImagesPicker__image}
														src={item.url}
														radius="sm"
													/>
													<IconX className={cls.ImagesPicker__removeIcon} />
												</UnstyledButton>
											</li>
										))}
									</ul>
									<Dropzone
										classNames={{ root: cls.ImagesPicker__dropzone }}
										onDrop={(files) => {
										// Добавление новых изображений как локальных (isNew: true)
											const newImages = files.map((file) => ({
												id: new Date().getTime(),
												url: URL.createObjectURL(file),
												isNew: true,
											}));
											setImages([...images, ...newImages]);

											// Сохраняем файлы для загрузки на сервер
											field.onChange([...getValues("addedImagesFiles"), ...files]);
										}}
										accept={{ "image/*": [] }}
									>
										<IconPlus />
									</Dropzone>
								</div>
							)}
						/>
					)}

					<div>
						{isEditMode
							? (
								<>
									<Button type="submit">Save</Button>
									<Button type="button" onClick={cancelEditMode}>Cancel</Button>
								</>
							)
							: (
								<>
									<Button type="submit" onClick={enableEditMode}>Save</Button>
									<Button type="button" onClick={enableEditMode}>Edit</Button>
								</>
							)}
					</div>
				</form>
			</Container>
		</div>
	);
};
