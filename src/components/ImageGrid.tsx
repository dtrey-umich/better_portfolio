'use client';
import { useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface ImageGridProps {
  photos: Photo[];
  columns?: number;
  spacing?: number;
  layout?: 'rows' | 'columns' | 'masonry' | 'carousel';
}

export default function ImageGrid({ photos, layout = 'rows', columns = 2, spacing = 32 }: ImageGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  // Carousel layout
  if (layout === 'carousel') {
    const currentPhoto = photos[currentIndex];
    return (
      <div className="w-full">
        <Gallery
          withCaption
          options={{ 
            showHideAnimationType: 'fade',
            bgOpacity: 0.9
          }}
        >
          <div className="relative w-full flex items-center justify-center">
            {/* Previous button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image */}
            <Item
              original={currentPhoto.src}
              thumbnail={currentPhoto.src}
              width={currentPhoto.width}
              height={currentPhoto.height}
              caption={currentPhoto.alt}
            >
              {({ ref, open }) => (
                <div className="w-full max-w-4xl mx-12">
                  <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                    <Image
                      ref={ref as any}
                      src={currentPhoto.src}
                      alt={currentPhoto.alt}
                      width={currentPhoto.width}
                      height={currentPhoto.height}
                      className="rounded-2xl cursor-pointer transition-transform duration-200 hover:scale-105 w-full h-auto"
                      onClick={open}
                    />
                  </div>
                </div>
              )}
            </Item>

            {/* Next button */}
            <button
              onClick={goToNext}
              className="absolute right-4 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Page indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'w-8 bg-gray-800' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Image counter */}
          <div className="text-center mt-2 text-sm text-gray-600">
            {currentIndex + 1} / {photos.length}
          </div>
        </Gallery>
      </div>
    );
  }

  // Grid layouts (rows, columns, masonry)

  return (
    <div className="w-full">
      <Gallery
        withCaption
        options={{ 
          showHideAnimationType: 'fade',
          bgOpacity: 0.9
        }}
      >
        <PhotoAlbum
          layout={layout}
          photos={photos}
          columns={columns}
          spacing={spacing}
          onClick={({ index }) => console.log(`Photo ${index} clicked`)}
          componentsProps={{ containerProps: { style: { width: '100%' } } }}
          renderPhoto={({ photo, imageProps }) => (
            <Item
              original={photo.src}
              thumbnail={photo.src}
              width={photo.width}
              height={photo.height}
              caption={photo.alt}
            >
              {({ ref, open }) => (
                <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                  <Image
                    ref={ref as any}
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="rounded-2xl cursor-pointer transition-transform duration-200 hover:scale-105 w-full h-auto"
                    style={imageProps.style}
                    onClick={open}
                  />
                </div>
              )}
            </Item>
          )}
        />
      </Gallery>
    </div>
  );
} 