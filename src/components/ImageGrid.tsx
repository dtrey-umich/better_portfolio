'use client';
import PhotoAlbum from 'react-photo-album';
import Image from 'next/image';

const photos = [
  {
    src: '/images/test_image_1.jpg',
    width: 800,
    height: 600,
    alt: 'Test Image 1',
  },
  {
    src: '/images/test_image_2.jpg',
    width: 800,
    height: 600,
    alt: 'Test Image 2',
  },
];

export default function ImageGrid() {
  return (
    <div className="my-12">
      <PhotoAlbum
        layout="rows"
        photos={photos}
        columns={2}
        spacing={32}
        renderPhoto={({ photo, imageProps }) => (
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg h-full w-full flex items-stretch">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="rounded-2xl cursor-pointer transition-transform duration-200 hover:scale-105 object-cover w-full h-full"
              style={{ ...(imageProps.style || {}), width: '100%', height: '100%' }}
              onClick={imageProps.onClick}
            />
          </div>
        )}
      />
    </div>
  );
} 