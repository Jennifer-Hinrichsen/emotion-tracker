import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import Image from "next/image";
import styled from "styled-components";

export default function SwiperSlider() {
  const images = [
    { id: 1, src: "/images/Slider-1.svg" },
    { id: 2, src: "/images/Slider-2.svg" },
    { id: 3, src: "/images/Slider-3.svg" },
  ];
  return (
    <StyledSlider>
      <Swiper
        modules={[FreeMode, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        freeMode={true}
        pagination={{ clickable: true, type: "bullets" }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <ImageWrapper>
              <Image src={image.src} alt={image.id} width={400} height={150} />
            </ImageWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledSlider>
  );
}

const StyledSlider = styled.div`
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background-color: var(--color-secondary);
    border-radius: 50%;
  }

  .swiper-pagination {
    bottom: -2px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
