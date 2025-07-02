'use client';

import { BlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';
import React from 'react';
import ImageGrid from './ImageGrid';

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
        const codeText = block.code.rich_text.map(rt => rt.plain_text).join('');
        
        // Check if this is an ImageGrid code block
        if (codeText.includes('<ImageGrid') && codeText.includes('photos={[')) {
          try {
            // Extract the photos array from the code
            const photosMatch = codeText.match(/photos=\{(\[[\s\S]*?\])\}/);
            if (photosMatch) {
              const photosArrayString = photosMatch[1];
              // Parse the photos array (this is a simplified parser)
              const photos = eval(photosArrayString);
              
              // Extract layout prop if present
              const layoutMatch = codeText.match(/layout="([^"]+)"/);
              const layout = layoutMatch ? layoutMatch[1] : 'rows';
              
              // Extract columns prop if present
              const columnsMatch = codeText.match(/columns=\{?(\d+)\}?/);
              const columns = columnsMatch ? parseInt(columnsMatch[1]) : 2;
              
              // Extract spacing prop if present
              const spacingMatch = codeText.match(/spacing=\{?(\d+)\}?/);
              const spacing = spacingMatch ? parseInt(spacingMatch[1]) : 32;
              
              return (
                <ImageGrid 
                  photos={photos}
                  layout={layout as 'rows' | 'columns' | 'masonry'}
                  columns={columns}
                  spacing={spacing}
                />
              );
            }
                     } catch (error) {
             console.error('Error parsing ImageGrid code block:', error);
             return <pre className="bg-red-100 p-2 rounded text-xs overflow-x-auto text-red-800">Error parsing ImageGrid: {error instanceof Error ? error.message : 'Unknown error'}</pre>;
           }
        }
        
        // If not an ImageGrid block, render as regular code
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

 