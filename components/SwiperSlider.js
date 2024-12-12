import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import Image from "next/image";
import styled from "styled-components";

export default function SwiperSlider() {
  const images = [
    "/images/wave1.jpg",
    "/images/wave2.jpg",
    "/images/wave3.jpg",
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
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <ImageWrapper>
              <Image
                src={src}
                alt={`Test image ${index + 1}`}
                width={400}
                height={150}
              />
            </ImageWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledSlider>
  );
}

const StyledSlider = styled.div`
  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background-color: var(--color-secondary);
    border-radius: 50%;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
