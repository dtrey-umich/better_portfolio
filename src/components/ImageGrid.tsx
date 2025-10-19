'use client';
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
  layout?: 'rows' | 'columns' | 'masonry';
}

export default function ImageGrid({ photos, layout = 'rows', columns = 2, spacing = 32 }: ImageGridProps) {
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
                <div className="overflow-hidden rounded-2xl bg-white shadow-lg h-full w-full flex items-stretch">
                  <Image
                    ref={ref as any}
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="rounded-2xl cursor-pointer transition-transform duration-200 hover:scale-105 object-cover"
                    style={{ 
                      ...imageProps.style,
                      width: '100%',
                      height: '100%',
                      maxWidth: '100%',
                      objectFit: 'cover',
                      aspectRatio: `${photo.width} / ${photo.height}`
                    }}
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