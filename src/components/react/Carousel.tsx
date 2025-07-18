import { useState, useEffect } from "react";

interface Image {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: Image[];
}

export default function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [appear, setAppear] = useState(false);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => setAppear(true), 100);
    return() => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex flex-col items-center relative w-full max-w-lg mx-auto
      transform transition duration-700 ease-out ${
        appear? `opacity-100 translate-y-0 lg:translate-x-0` : `translate-y-20 lg:translate-y-0 opacity-0 lg:-translate-x-20 -translate-x-0`
      }
    `}>
      <div className="relative w-full h-[200px] lg:h-[300px] flex items-center justify-center overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className={`border-4 border-(--border-color) absolute w-auto max-h-[200px] lg:max-h-[300px] object-contain transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
        ))}
      </div>

      <div className="absolute bottom-[-30px] lg:bottom-[1%] xl:bottom-[-30px] flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full duration-500 transition-all ${
              index === currentIndex ? "bg-(--primary-color)" : "bg-(--border-color)"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
