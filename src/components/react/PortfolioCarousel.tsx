import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface Portfolio {
  url: string;
  imgSrc: string;
  title: string;
  desc: string;
  technologies: string[],
  build: string;
}

export default function PortfolioCarousel({ portfolios }: { portfolios: Portfolio[] }) {
  const [appear, setAppear] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAppear(true), 100 );
    return() => clearTimeout(timer);
  }, []);

  return (
    <Swiper 
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false}}
      spaceBetween={-70}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 }
      }}
      className=
        {`
          w-full md:w-[85%] lg:w-[80%] xl:w-[75%] h-full
          transform transition duration-700 ease-out ${
            appear? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10' }
        `}
    >
    {portfolios.map((portfolio) => (
      <SwiperSlide key={portfolio.title} className='flex h-full'>
        <div className="flex flex-col items-center bg-(--border-color) rounded-2xl shadow-2xl mt-[8%] mx-15 h-full">
          <div className="border-2 border-(--border-color) w-[90%] -mt-[8%] h-auto flex items-center justify-center overflow-hidden rounded-lg">
            <img src={portfolio.imgSrc} loading="lazy" />
          </div>
          <div className="
            w-[90%]
            bg-(--border-color) text-black p-1 rounded-lg
            flex flex-col mx-[5%] py-4 gap-4 lg:py-8 lg:gap-8 min-h-[315px] md:min-h-[350px] lg:min-h-[375px] 2xl:min-h-[400px]
          ">
            <div className="flex flex-col gap-2 flex-1 h-full">
              <h1 className="font-semibold">
                {portfolio.title}
              </h1>
              <p className="grow text-(--text-color) text-sm md:text-base text-justify">
                {portfolio.desc}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <p>Made Width : </p>
              <div className="flex flex-row gap-2">
                {portfolio.technologies.map((tech) => (
                  <img 
                    key={tech}
                    src={`/svg/tecs/${tech}.svg`} 
                    className="h-auto w-6 lg:w-8"
                    loading="lazy" 
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <a href={portfolio.url} target="_blank" className="button w-[48%]">Resipotery</a>
              {portfolio.build && (
                <a href={portfolio.build} target="_blank" className="button w-[48%]">Product</a>
              )}
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))}
    </Swiper>
  )
}