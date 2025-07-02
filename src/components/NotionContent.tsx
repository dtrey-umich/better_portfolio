'use client';

import { BlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';
import React from 'react';
import PhotoAlbum from 'react-photo-album';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import type { Photo, RenderPhotoProps } from 'react-photo-album';

interface NotionContentProps {
  blocks: BlockObjectResponse[];
}

interface ColumnBlock {
  id: string;
  children?: BlockObjectResponse[];
}

interface ColumnListBlock {
  id: string;
  column_list: {
    children?: ColumnBlock[];
  };
}

function renderRichText(richText: RichTextItemResponse[]) {
  return richText.map((text, index) => {
    if (text.type !== 'text') {
      // Handle other rich text types (mentions, equations, etc.) if needed
      return null;
    }
    
    const { content, link } = text.text;
    const { bold, italic, strikethrough, underline, code, color } = text.annotations;
    
    let className = '';
    if (bold) className += 'font-bold ';
    if (italic) className += 'italic ';
    if (strikethrough) className += 'line-through ';
    if (underline) className += 'underline ';
    if (code) className += 'font-mono bg-gray-100 px-1 rounded ';
    if (color !== 'default') className += `text-${color} `;

    const textElement = <span key={index} className={className.trim()}>{content}</span>;
    
    return link ? (
      <a key={index} href={link.url} className="text-blue-600 hover:underline">
        {textElement}
      </a>
    ) : textElement;
  });
}

export function NotionContent({ blocks }: { blocks: BlockObjectResponse[] }) {
  console.log('Rendering blocks:', JSON.stringify(blocks, null, 2));

  const renderBlock = (block: BlockObjectResponse) => {
    console.log('Rendering block:', JSON.stringify(block, null, 2));
    
    switch (block.type) {
      case 'paragraph':
        return (
          <p className="mb-4">
            {block.paragraph.rich_text.map((text, i) => (
              <span key={i}>{text.plain_text}</span>
            ))}
          </p>
        );
      case 'heading_1':
        return (
          <h1 className="text-4xl font-bold mb-6">
            {block.heading_1.rich_text.map((text, i) => (
              <span key={i}>{text.plain_text}</span>
            ))}
          </h1>
        );
      case 'heading_2':
        return (
          <h2 className="text-3xl font-bold mb-4">
            {block.heading_2.rich_text.map((text, i) => (
              <span key={i}>{text.plain_text}</span>
            ))}
          </h2>
        );
      case 'heading_3':
        return (
          <h3 className="text-2xl font-bold mb-3">
            {block.heading_3.rich_text.map((text, i) => (
              <span key={i}>{text.plain_text}</span>
            ))}
          </h3>
        );
      case 'bulleted_list_item':
        return (
          <li className="ml-6 mb-2">
            {block.bulleted_list_item.rich_text.map((text, i) => (
              <span key={i}>{text.plain_text}</span>
            ))}
          </li>
        );
      case 'numbered_list_item':
        return (
          <li className="ml-6 mb-2">
            {block.numbered_list_item.rich_text.map((text, i) => (
              <span key={i}>{text.plain_text}</span>
            ))}
          </li>
        );
      case 'image':
        console.log('Processing image block:', JSON.stringify(block, null, 2));
        const imageUrl = block.image.type === 'external' 
          ? block.image.external.url 
          : block.image.file.url;
        console.log('Image URL:', imageUrl);
        
        // For Notion images, we'll use a regular img tag with a proxy
        if (imageUrl.includes('prod-files-secure.s3.us-west-2.amazonaws.com')) {
          console.log('Using regular img tag for Notion image');
          return (
            <div className="my-4">
              <img
                src={imageUrl}
                alt={block.image.caption?.[0]?.plain_text || 'Image'}
                className="max-w-full h-auto rounded-lg"
                loading="lazy"
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  const img = e.target as HTMLImageElement;
                  console.log('Failed image src:', img.src);
                  // Try to load the image directly from the URL
                  fetch(imageUrl)
                    .then(response => {
                      if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                      }
                      return response.blob();
                    })
                    .then(blob => {
                      const url = URL.createObjectURL(blob);
                      img.src = url;
                    })
                    .catch(error => {
                      console.error('Error fetching image:', error);
                    });
                }}
              />
            </div>
          );
        }
        
        // For other images, use Next.js Image component
        console.log('Using Next.js Image component');
        return (
          <div className="my-4">
            <Image
              src={imageUrl}
              alt={block.image.caption?.[0]?.plain_text || 'Image'}
              width={800}
              height={600}
              className="max-w-full h-auto rounded-lg"
              onError={(e) => {
                console.error('Next.js Image failed to load:', e);
              }}
            />
          </div>
        );
      case 'column_list':
        console.log('Processing column list:', JSON.stringify(block, null, 2));
        const columnList = block as any;
        if (columnList.column_list?.children) {
          console.log('Column list children:', JSON.stringify(columnList.column_list.children, null, 2));
          return (
            <div className="flex flex-col md:flex-row gap-4 my-4">
              {columnList.column_list.children.map((column: any, index: number) => {
                console.log('Processing column:', JSON.stringify(column, null, 2));
                return (
                  <div key={index} className="flex-1">
                    {column.children?.map((child: BlockObjectResponse, childIndex: number) => {
                      console.log('Processing column child:', JSON.stringify(child, null, 2));
                      return <div key={childIndex}>{renderBlock(child)}</div>;
                    })}
                  </div>
                );
              })}
            </div>
          );
        }
        return null;
      case 'column':
        console.log('Processing column:', JSON.stringify(block, null, 2));
        const column = block as any;
        if (column.children) {
          console.log('Column children:', JSON.stringify(column.children, null, 2));
          return (
            <div className="flex-1">
              {column.children.map((child: BlockObjectResponse, index: number) => (
                <div key={index}>{renderBlock(child)}</div>
              ))}
            </div>
          );
        }
        return null;
      case 'code': {
        // Only handle code blocks with our custom layout/image language
        const codeText = block.code.rich_text.map(rt => rt.plain_text).join('');
        // Parse lines
        const lines: string[] = codeText.split(/\r?\n/).map(line => line.trim()).filter((l): l is string => !!l);
        // Parse commands
        const images: { src: string; size?: { width: number; height: number } | 'match-last'; fit?: string }[] = [];
        let layout: string | null = null;
        let text: string | null = null;
        let lastImageIdx = -1;
        for (const line of lines) {
          if (line.startsWith('[image:')) {
            const src = line.match(/\[image:(.+?)\]/)?.[1]?.trim();
            if (!src) throw new Error('Malformed [image:] command');
            images.push({ src });
            lastImageIdx = images.length - 1;
          } else if (line.startsWith('[size:')) {
            if (line === '[size:match-last]' && lastImageIdx >= 0) {
              images[lastImageIdx].size = 'match-last';
            } else {
              const sizeMatch = line.match(/\[size:(\d+)x(\d+)\]/);
              if (sizeMatch && lastImageIdx >= 0) {
                images[lastImageIdx].size = { width: parseInt(sizeMatch[1]), height: parseInt(sizeMatch[2]) };
              }
            }
          } else if (line.startsWith('[fit:')) {
            const fitMatch = line.match(/\[fit:(cover|contain|fill)\]/);
            if (fitMatch && lastImageIdx >= 0) {
              images[lastImageIdx].fit = fitMatch[1];
            }
          } else if (line.startsWith('[layout:')) {
            layout = line.match(/\[layout:([\w\-x]+)\]/)?.[1]?.trim() || null;
          } else if (line.startsWith('[text:')) {
            text = line.match(/\[text:(.+)\]/)?.[1]?.trim() || null;
          }
        }
        images.forEach(img => {
          if (!img.src) throw new Error('Image src missing in code block');
        });
        const defaultSize = { width: 800, height: 600 };
        // If layout is grid, gallery, or similar, use PhotoAlbum + PhotoSwipe
        if ((layout && layout.startsWith('grid-')) || layout === 'gallery') {
          // Map images to PhotoAlbum format
          const photos = images.map(img => {
            let width = defaultSize.width;
            let height = defaultSize.height;
            if (img.size && typeof img.size === 'object' && isImageSizeObject(img.size)) {
              width = img.size.width;
              height = img.size.height;
            }
            return {
              src: `/images/${img.src}`,
              width,
              height,
              alt: img.src,
              key: img.src,
            };
          });
          return (
            <div className="my-6">
              <Gallery>
                <PhotoAlbum
                  layout="columns"
                  photos={photos}
                  columns={2}
                  spacing={32}
                  renderPhoto={({ photo, wrapperStyle, imageProps }: RenderPhotoProps) => (
                    <div
                      style={wrapperStyle}
                      className="overflow-hidden rounded-2xl bg-white shadow-lg"
                    >
                      <Item
                        original={photo.src}
                        thumbnail={photo.src}
                        width={photo.width}
                        height={photo.height}
                        alt={photo.alt}
                      >
                        {({ ref, open }) => (
                          <Image
                            ref={ref as any}
                            src={photo.src}
                            alt={photo.alt}
                            width={photo.width}
                            height={photo.height}
                            onClick={open}
                            className="rounded-2xl cursor-pointer transition-transform duration-200 hover:scale-105"
                            style={{ objectFit: 'cover', ...imageProps.style }}
                            {...imageProps}
                          />
                        )}
                      </Item>
                    </div>
                  )}
                />
              </Gallery>
            </div>
          );
        }
        // Render logic
        if (layout === 'side-by-side' && images.length && text) {
          return (
            <div className="flex flex-row items-center gap-4 my-4">
              <div className="flex-1">
                <Image
                  src={`/images/${images[0].src}`}
                  alt={text}
                  width={images[0].size?.width || defaultSize.width}
                  height={images[0].size?.height || defaultSize.height}
                  style={{ objectFit: (images[0].fit || 'contain') as any }}
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="flex-1">
                <span>{text}</span>
              </div>
            </div>
          );
        }
        if (layout && layout.startsWith('grid-')) {
          // e.g., grid-2x2
          const gridMatch = layout.match(/grid-(\d+)x(\d+)/);
          const rows = gridMatch ? parseInt(gridMatch[1]) : 1;
          const cols = gridMatch ? parseInt(gridMatch[2]) : images.length;

          // Group images into rows
          const imageRows: Array<typeof images> = [];
          for (let i = 0; i < images.length; i += cols) {
            imageRows.push(images.slice(i, i + cols));
          }

          return (
            <div
              className="grid gap-4 my-4 items-end"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
              }}
            >
              {imageRows.map((row, rowIdx) => (
                <React.Fragment key={rowIdx}>
                  <GridImageRow row={row} rowIdx={rowIdx} defaultSize={defaultSize} />
                </React.Fragment>
              ))}
            </div>
          );
        }
        if (layout === 'full-width' && images.length) {
          return (
            <div className="w-full my-4">
              <Image
                src={`/images/${images[0].src}`}
                alt={images[0].src}
                width={images[0].size?.width || 1920}
                height={images[0].size?.height || 1080}
                style={{ objectFit: (images[0].fit || 'cover') as any }}
                className="rounded-lg w-full h-auto"
              />
            </div>
          );
        }
        if (layout === 'centered' && images.length) {
          return (
            <div className="flex justify-center my-4">
              <Image
                src={`/images/${images[0].src}`}
                alt={images[0].src}
                width={images[0].size?.width || defaultSize.width}
                height={images[0].size?.height || defaultSize.height}
                style={{ objectFit: (images[0].fit || 'contain') as any }}
                className="rounded-lg"
              />
            </div>
          );
        }
        if (layout === 'gallery' && images.length) {
          return (
            <div className="grid grid-cols-3 gap-4 my-4">
              {images.map((img, i) => {
                let width = defaultSize.width;
                let height = defaultSize.height;
                if (isImageSizeObject(img.size)) {
                  width = img.size.width;
                  height = img.size.height;
                }
                return (
                  <Image
                    key={i}
                    src={`/images/${img.src}`}
                    alt={img.src}
                    width={width}
                    height={height}
                    style={{ objectFit: (img.fit || 'contain') as any }}
                    className="rounded-lg w-full h-auto"
                  />
                );
              })}
            </div>
          );
        }
        // Fallback: just render images in a column
        if (images.length) {
          return (
            <div className="flex flex-col gap-4 my-4">
              {images.map((img, i) => {
                let width = defaultSize.width;
                let height = defaultSize.height;
                if (isImageSizeObject(img.size)) {
                  width = img.size.width;
                  height = img.size.height;
                }
                return (
                  <Image
                    key={i}
                    src={`/images/${img.src}`}
                    alt={img.src}
                    width={width}
                    height={height}
                    style={{ objectFit: (img.fit || 'contain') as any }}
                    className="rounded-lg w-full h-auto"
                  />
                );
              })}
            </div>
          );
        }
        // If nothing matches, render the code block as preformatted text
        return <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{codeText}</pre>;
      }
      default:
        console.log('Unhandled block type:', block.type);
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        console.log('Processing block at index', index, ':', JSON.stringify(block, null, 2));
        return <div key={index}>{renderBlock(block)}</div>;
      })}
    </div>
  );
}

// Helper to preload an image and get its natural size
function getImageNaturalSize(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
  });
}

// Helper type guard
function isImageSizeObject(size: any): size is { width: number; height: number } {
  return (
    typeof size === 'object' &&
    size !== null &&
    typeof size.width === 'number' &&
    typeof size.height === 'number'
  );
}

// Grid row component that preloads all images and renders only when all sizes are known
function GridImageRow({ row, rowIdx, defaultSize }: { row: any[]; rowIdx: number; defaultSize: { width: number; height: number } }) {
  const [sizes, setSizes] = React.useState<({ width: number; height: number } | null)[]>(Array(row.length).fill(null));
  React.useEffect(() => {
    let isMounted = true;
    Promise.all(row.map(img => getImageNaturalSize(`/images/${img.src}`))).then(results => {
      if (isMounted) setSizes(results);
    });
    return () => { isMounted = false; };
  }, [row]);
  // Only render when all sizes are known
  if (sizes.some(s => !s)) return null;
  // Determine row height from first explicitly sized image, else use first image's natural height, else default
  let rowHeight: number = defaultSize.height;
  for (let i = 0; i < row.length; ++i) {
    if (row[i].size && isImageSizeObject(row[i].size)) {
      rowHeight = row[i].size.height;
      break;
    }
  }
  if (rowHeight === defaultSize.height && sizes[0]) rowHeight = sizes[0]!.height;
  return (
    <>
      {row.map((img, i) => {
        let width = defaultSize.width;
        let height = defaultSize.height;
        if (img.size && isImageSizeObject(img.size)) {
          width = img.size.width;
          height = img.size.height;
        } else if (img.size === 'match-last') {
          height = rowHeight;
          if (sizes[i]) {
            width = Math.round((sizes[i]!.width / sizes[i]!.height) * height);
          } else {
            width = defaultSize.width;
          }
        } else if (sizes[i]) {
          width = sizes[i]!.width;
          height = sizes[i]!.height;
        }
        return (
          <Image
            key={`${rowIdx}-${i}`}
            src={`/images/${img.src}`}
            alt={img.src}
            width={width}
            height={height}
            style={{ objectFit: (img.fit || 'contain') as any }}
            className="rounded-lg w-full h-auto"
          />
        );
      })}
    </>
  );
} 