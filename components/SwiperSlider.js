import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
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
        modules={[FreeMode, Pagination]}
        spaceBetween={10}
        slidesPerView={2}
        freeMode={true}
        pagination={{ clickable: true, type: "bullets" }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <StyledImage
              src={src}
              alt={`Test image ${index + 1}`}
              width={200}
              height={100}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledSlider>
  );
}

const StyledSlider = styled.div`
  padding: 20px;
  .swiper-pagination {
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 10;
  }

  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    margin: 0 5px;
    background-color: red;
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 8px;
`;
