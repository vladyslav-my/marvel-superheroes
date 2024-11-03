import { UnstyledButton } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import clsx from "clsx";
import {
	FC, memo, useEffect, useMemo,
	useRef,
} from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import PlaceHolderHeroImage from "../assets/placeholder-hero.jpg";
import cls from "./SwiperSlider.module.scss";

interface SwiperSliderProps {
	className?: string;
	images?: {
		id: number;
		url: string;
	}[];
}

export const SwiperSlider: FC<SwiperSliderProps> = memo(({ className, images }) => {
	const hasImages = images && images.length > 0;
	const isSingleImage = images && images.length <= 1;

	const swiperSlidesItems = useMemo(() => {
		return (hasImages ? images : [{ id: 0, url: PlaceHolderHeroImage }]).map((image) => (
			<li className="swiper-slide" key={image.id}>
				<img src={image.url} alt="slide" className={cls.Image} />
			</li>
		));
	}, [images, hasImages]);

	const swiperContainerRef = useRef(null);
	const nextButtonRef = useRef(null);
	const prevButtonRef = useRef(null);
	const paginationRef = useRef(null);
	const swiperInstanceRef = useRef<any>(null);

	useEffect(() => {
		if (swiperInstanceRef.current) {
			swiperInstanceRef.current.destroy(true, true);
		}

		if (swiperContainerRef.current) {
			swiperInstanceRef.current = new Swiper(swiperContainerRef.current, {
				spaceBetween: 5,
				slidesPerView: 1,
				navigation: {
					nextEl: nextButtonRef.current,
					prevEl: prevButtonRef.current,
				},
				modules: [Navigation, Pagination],
				pagination: {
					el: paginationRef.current,
					clickable: true,
					type: "bullets",
					bulletClass: `${cls.Bullets__bullet}`,
					bulletActiveClass: `${cls.Bullets__bullet_active}`,
					bulletElement: "li",
				},
				centeredSlides: true,
				breakpoints: {},
				enabled: !isSingleImage,
			});
		}

		return () => {
			if (swiperInstanceRef.current) {
				swiperInstanceRef.current.destroy(true, true);
			}
		};
	}, [images, isSingleImage]);

	return (
		<div
			className={clsx(cls.SwiperSlider, "swiper-container", className)}
			ref={swiperContainerRef}
		>
			<div className={clsx("swiper-wrapper", cls.SwiperSlider__swiperWrapper, {
				[cls.SwiperSlider__swiperWrapper_disableGrab]: isSingleImage,
			})}
			>
				{swiperSlidesItems}
			</div>
			{!isSingleImage && (
				<div className={cls.SwiperSlider__navigation}>
					<UnstyledButton aria-label="prev-slide" className={clsx(cls.ArrowButton)} ref={prevButtonRef}>
						<IconArrowLeft />
					</UnstyledButton>

					<ul
						className={clsx(
							cls.Bullets,
							[cls.SwiperSlider__pagination],
						)}
						ref={paginationRef}
					/>
					<UnstyledButton aria-label="next-slide" className={clsx(cls.ArrowButton)} ref={nextButtonRef}>
						<IconArrowRight />
					</UnstyledButton>
				</div>
			)}
		</div>
	);
});
