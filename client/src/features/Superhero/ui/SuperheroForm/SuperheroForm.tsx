import {
	Textarea, TextInput,
	Button,
} from "@mantine/core";
import clsx from "clsx";
import {
	FC, useCallback, useEffect, useState,
} from "react";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { superheroApi } from "@/entities/Superhero";
import { ImageUploader } from "../ImageUploader/ImageUploader";
import cls from "./SuperheroForm.module.scss";

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
interface SuperheroFormProps {
	className?: string;
	isLoading: boolean;
	onSubmit: (data: SuperheroFormInputs) => void;
	form: UseFormReturn<any, any, undefined>;
	images: ImageType[];
	setImages: any;
	isEditMode?: boolean;
	toogleEditMode?: (open: boolean) => void;
}

export const SuperheroForm: FC<SuperheroFormProps> = ({
	className, isLoading, onSubmit, form, isEditMode = true, setImages, images, toogleEditMode,
}) => {
	const ConditionButtons = useCallback(() => {
		if (toogleEditMode) {
			return (
				<>
					<Button
						className={clsx(cls.Button, {
							[cls.Button_hide]: !isEditMode,
						})}
						type="submit"
						loading={isLoading}
					>
						Save
					</Button>
					<Button
						className={clsx(cls.Button, {
							[cls.Button_hide]: !isEditMode,
						})}
						type="button"
						onClick={() => toogleEditMode(false)}
					>
						Cancel
					</Button>
					<Button
						className={clsx(cls.Button, {
							[cls.Button_hide]: isEditMode,
						})}
						type="button"
						onClick={() => toogleEditMode(true)}
					>
						Edit
					</Button>
				</>
			);
		} else {
			return (
				<Button type="submit" loading={isLoading}>
					Create
				</Button>
			);
		}
	}, [isEditMode, isLoading, toogleEditMode]);

	return (
		<form className={clsx(cls.SuperheroForm, {}, [className])} onSubmit={form.handleSubmit(onSubmit)}>
			<div className={cls.SuperheroForm__fields}>
				<Controller
					name="nickname"
					control={form.control}
					render={({ field }) => <TextInput readOnly={!isEditMode} variant={isEditMode ? "filled" : "unstyled"} size="md" label="Nickname" {...field} required />}
				/>
				<Controller
					name="real_name"
					control={form.control}
					render={({ field }) => <TextInput readOnly={!isEditMode} variant={isEditMode ? "filled" : "unstyled"} size="md" label="Real Name" {...field} />}
				/>
				<Controller
					name="origin_description"
					control={form.control}
					render={({ field }) => <Textarea readOnly={!isEditMode} variant={isEditMode ? "filled" : "unstyled"} size="md" label="Origin Description" {...field} />}
				/>
				<Controller
					name="catch_phrase"
					control={form.control}
					render={({ field }) => <Textarea readOnly={!isEditMode} variant={isEditMode ? "filled" : "unstyled"} size="md" label="Catch Phrase" {...field} />}
				/>
				<Controller
					name="superpowers"
					control={form.control}
					render={({ field }) => <Textarea readOnly={!isEditMode} variant={isEditMode ? "filled" : "unstyled"} size="md" label="Superpowers" {...field} />}
				/>

				{isEditMode && (
					<ImageUploader form={form} setImages={setImages} images={images} />
				)}
			</div>
			<div className={clsx(cls.Buttons, cls.SuperheroForm__buttons)}>
				<ConditionButtons />
			</div>
		</form>
	);
};
