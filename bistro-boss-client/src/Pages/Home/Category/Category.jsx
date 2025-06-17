// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

export default function Category() {
  return (
    <section className="my-10">
      <SectionTitle
        title={"Order Online"}
        subtitle={"From 11.00 AM to 10.00 PM"}
      />

      <div className="my-10">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={slide1} alt="" />
            <h3 className="text-3xl uppercase text-center -mt-20 font-bold text-white">
              Salad
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide2} alt="" />
            <h3 className="text-3xl uppercase text-center -mt-20 font-bold text-white">
              Pizza
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide3} alt="" />
            <h3 className="text-3xl uppercase text-center -mt-20 font-bold text-white">
              Soup
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide4} alt="" />
            <h3 className="text-3xl uppercase text-center -mt-20 font-bold text-white">
              Pestry
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide5} alt="" />
            <h3 className="text-3xl uppercase text-center -mt-20 font-bold text-white">
              Salad
            </h3>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
