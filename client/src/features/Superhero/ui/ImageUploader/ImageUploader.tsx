import { UnstyledButton, Image } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { IconPlus, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import {
	FC, useCallback, useMemo,
} from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { ImageType } from "../SuperheroForm/SuperheroForm";
import cls from "./ImageUploader.module.scss";

interface ImageUploaderProps {
	className?: string;
	form: UseFormReturn<any, any, undefined>;
	setImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
	images: ImageType[];
}

export const ImageUploader: FC<ImageUploaderProps> = ({
	className, form, images, setImages,
}) => {
	const onDrop = useCallback((field: any) => (files: FileWithPath[]) => {
		const newImages = files.map((file) => ({
			id: new Date().getTime(),
			url: URL.createObjectURL(file),
			isNew: true,
		}));
		setImages([...images, ...newImages]);
		field.onChange([...form.getValues("addedImagesFiles"), ...files]);
	}, [form, images, setImages]);

	const onClickRemove = useCallback((item: any) => () => {
		setImages(images.filter((image: any) => image.id !== item.id));
		if (!item.isNew) {
			form.setValue("deletedImageIds", [
				...form.getValues("deletedImageIds"),
				item.id,
			]);
		}
	}, [setImages, images, form]);

	const imagesItems = useMemo(() => {
		return images.map((item: any, index: number) => (
			<li key={index} className={cls.ImageUploader__item}>
				<UnstyledButton
					onClick={onClickRemove(item)}
					className={cls.ImageUploader__removeButton}
				>
					<Image className={cls.ImageUploader__image} src={item.url} radius="sm" />
					<IconX className={cls.ImageUploader__removeIcon} />
				</UnstyledButton>
			</li>
		));
	}, [images, onClickRemove]);

	return (
		<Controller
			control={form.control}
			name="addedImagesFiles"
			render={({ field }) => (
				<div className={clsx(cls.ImageUploader, {}, [className])}>
					<ul className={cls.ImageUploader__list}>
						{imagesItems}
					</ul>
					<Dropzone
						classNames={{ root: cls.ImageUploader__dropzone }}
						onDrop={onDrop(field)}
						accept={{ "image/*": [] }}
					>
						<IconPlus />
					</Dropzone>
				</div>
			)}
		/>
	);
};
