'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image'; // For optimized image handling

interface ImageCarouselProps {
  images: string[]; // Array of image URLs
  sectionTitle?: string; // Optional title for the section
  sectionDescription?: string; // Optional description
}

const ImageCarousel = ({ images, sectionTitle, sectionDescription }: ImageCarouselProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: "linear"
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        {sectionTitle && (
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{sectionTitle}</h2>
            {sectionDescription && <p className="text-xl text-gray-600">{sectionDescription}</p>}
          </div>
        )}
        <div className="max-w-4xl mx-auto">
          <Slider {...settings}>
            {images.map((imageSrc, index) => (
              // 1. We've changed the container to have a fixed height for better size control.
              <div key={index} className="relative w-full h-96"> {/* e.g., 24rem height */}
                <Image
                  src={imageSrc}
                  alt={`Hospital Image ${index + 1}`}
                  fill // Fills the parent div
                  // 2. Change 'cover' to 'contain' to prevent cropping.
                  style={{ objectFit: 'contain' }} 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;