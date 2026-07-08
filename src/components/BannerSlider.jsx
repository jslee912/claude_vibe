import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./BannerSlider.css";

const slides = [
  {
    id: 1,
    eyebrow: "커뮤니티 소식",
    title: "이번 주 인기글 TOP 5 모아보기",
    image: "https://picsum.photos/seed/board-banner-community/1200/400",
    overlay: "linear-gradient(120deg, rgba(83,58,253,0.65) 0%, rgba(102,94,253,0.55) 100%)",
  },
  {
    id: 2,
    eyebrow: "이벤트",
    title: "댓글 남기고 커피 쿠폰 받아가세요",
    image: "https://picsum.photos/seed/board-banner-event/1200/400",
    overlay: "linear-gradient(120deg, rgba(28,30,84,0.7) 0%, rgba(68,52,212,0.6) 100%)",
  },
  {
    id: 3,
    eyebrow: "안내",
    title: "새로워진 글쓰기 에디터를 사용해보세요",
    image: "https://picsum.photos/seed/board-banner-editor/1200/400",
    overlay: "linear-gradient(120deg, rgba(68,52,212,0.65) 0%, rgba(234,34,97,0.55) 100%)",
  },
];

export default function BannerSlider() {
  return (
    <Swiper
      className="banner-slider"
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      loop
      slidesPerView={1}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="banner-slide"
            style={{
              backgroundImage: `${slide.overlay}, url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className="banner-eyebrow">{slide.eyebrow}</span>
            <h2 className="banner-title">{slide.title}</h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
