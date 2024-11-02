import "swiper/css";

import { UnstyledButton } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import clsx from "clsx";
import {
	FC, memo, useEffect, useMemo,
	useRef,
} from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import cls from "./SwiperSlider.module.scss";

interface SwiperSliderProps {
	className?: string;
	images?: string[];
}

const images = [ // !hardcore
	"https://kartinki.pics/uploads/posts/2022-03/1647619378_1-kartinkin-net-p-petukhi-kartinki-1.jpg",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxHpRFPjKzOsmAUfJtb913G3agNMlKdzOQdsLRMEIpWkKKPTGvnRvyFUH18DNbfX0Z5hw&usqp=CAU",
	"https://cdn.abo.media/upload/article/res/770-430/ffxcd3hf1bms2au1hc5u.jpg",
];

export const SwiperSlider: FC<SwiperSliderProps> = memo(({ className }) => {
	const swiperSlidesItems = useMemo(() => {
		return images?.map((image, i) => {
			return (
				<li className="swiper-slide" key={i}>
					<img
						src={image}
						alt=""
						className={cls.Image}
					/>
				</li>
			);
		});
	}, []);

	const swiperContainerRef = useRef(null);
	const nextButtonRef = useRef(null);
	const prevButtonRef = useRef(null);
	const paginationRef = useRef(null);
	const swiperInstanceRef = useRef<any>(null);

	useEffect(() => {
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
				breakpoints: {
					// 768: {
					// 	slidesPerView: "auto",
					// },
				},
			});
		}

		return () => {
			if (swiperInstanceRef.current) {
				swiperInstanceRef.current.destroy(true, true);
			}
		};
	}, []);

	return (
		<div
			className={clsx(cls.SwiperSlider, "swiper-container", className)}
			ref={swiperContainerRef}
		>
			<div className="swiper-wrapper">
				{swiperSlidesItems}
			</div>
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
		</div>
	);
});
