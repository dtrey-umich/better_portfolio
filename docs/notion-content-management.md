# Notion Content Management System

## Overview
This document outlines how content will be managed through Notion and how it will be displayed on the website. The system is designed to give content creators flexibility while maintaining consistent, high-quality layouts.

## Content Structure in Notion

### Page Properties
Each page in the Notion database should have the following properties:
- **Title**: The main title of the page
- **Slug**: The URL-friendly version of the title (e.g., "my-awesome-post")
- **Featured Image**: A reference to the image file name (e.g., "hero-image.jpg")
- **Publish Status**: Select field with options:
  - Published
  - Draft
  - Archive
- **Category**: The type of content (e.g., Blog, Project, About)

### Content Structure
The main content area of each Notion page should be structured as follows:

1. **Hero Section**
   - Title (H1)
   - Subtitle (optional)
   - Featured image reference

2. **Main Content**
   - Text content with basic formatting (headings, paragraphs, lists)
   - Code blocks for layout control (see Layout Control section below)
   - Links to external resources

3. **Metadata**
   - Tags
   - Related content references
   - Author information

## Layout Control

### Code Block Layout System
To control image placement and layout, use code blocks in your Notion content with the following syntax:

```layout
[image:filename.jpg]
[layout:layout-type]
```

Available layout types:
- `full-width`: Image spans the full width of the content area
- `grid-{rows}x{columns}`: Creates a grid with specified dimensions (e.g., `grid-2x3` for 2 rows and 3 columns)
- `side-by-side`: Image and text side by side
- `centered`: Centered image with max-width
- `gallery`: Multiple images in a gallery view

Image size options:
- `size:{width}x{height}`: Specifies exact dimensions (e.g., `size:800x600`)
- `fit:{cover|contain|fill}`: Controls how the image fits within its container
  - `cover`: Image covers the entire area, may be cropped
  - `contain`: Image is fully visible, may have empty space
  - `fill`: Image is stretched to fill the area

Automatic Image Handling:
When no size is specified, the system will:
1. Load the image's natural dimensions
2. Calculate appropriate display size based on:
   - The layout type (grid, full-width, etc.)
   - The container's available space
   - The image's aspect ratio
3. Maintain the image's aspect ratio to prevent distortion
4. Optimize the image for the display size to ensure fast loading

Example usage:

Simple image display (automatic sizing):
```markdown
[image:photo.jpg]
[layout:centered]
```

Creates a 2x2 grid with automatic image sizing:
```markdown
[image:top-left.jpg]
[image:top-right.jpg]
[image:bottom-left.jpg]
[image:bottom-right.jpg]
[layout:grid-2x2]
```

Creates a 2x2 grid with specific image sizes:
```markdown
[image:top-left.jpg]
[size:400x300]
[image:top-right.jpg]
[size:400x300]
[image:bottom-left.jpg]
[size:400x300]
[image:bottom-right.jpg]
[size:400x300]
[layout:grid-2x2]
```

Puts the image to the right of the text with automatic sizing:
```markdown
[image:sample.jpg]
[text]
[layout:side-by-side]
```

Creates a full-width hero image (automatic height):
```markdown
[image:hero.jpg]
[layout:full-width]
```

Creates an image gallery with automatic sizing:
```markdown
[image:gallery1.jpg]
[image:gallery2.jpg]
[image:gallery3.jpg]
[image:gallery4.jpg]
[image:gallery5.jpg]
[image:gallery6.jpg]
[layout:gallery]
```

### Layout Rules
1. Each code block should start with `markdown` as the language identifier
2. Image references should match the filenames in your `public/images` directory
3. Layout instructions apply ONLY to the content block directly above the code block
4. Text content should be written normally outside of code blocks
5. Multiple images can be grouped in a single code block (e.g., for grid or gallery layouts)
6. Text blocks must be referenced individually (one code block per text block)
7. The order of code blocks in your content determines the order of elements on the page
8. Image size and fit options are optional - if not specified, the system will automatically handle sizing
9. When size is specified, it should be before the layout type
10. If no fit option is specified, `contain` will be used by default to maintain aspect ratio

### Element Ordering
Elements are always arranged in the following order:
1. Left to right first
2. Then top to bottom

Examples:
- In a 2x1 grid (two columns, one row):
  ```markdown
  [image:left.jpg]
  [image:right.jpg]
  [layout:grid-1x2]
  ```

- In a 2x2 grid (two columns, two rows):
  ```markdown
  [image:top-left.jpg]
  [image:top-right.jpg]
  [image:bottom-left.jpg]
  [image:bottom-right.jpg]
  [layout:grid-2x2]
  ```

- In a side-by-side layout:
  ```markdown
  [text:This text]
  [image:right.jpg]
  [layout:side-by-side]
  ```

The order of elements in your Notion content directly determines their position in the layout. For example:
```markdown
[image:first.jpg]
[image:second.jpg]
[image:third.jpg]
[image:fourth.jpg]
[image:fifth.jpg]
[image:sixth.jpg]
[layout:grid-2x3]
```
Will create a grid where:
- First row: first.jpg, second.jpg, third.jpg
- Second row: fourth.jpg, fifth.jpg, sixth.jpg

## Image Management

### Image Storage
- All images will be stored in the project's `public/images` directory
- Images should be organized in subdirectories by content type (e.g., `blog`, `projects`)
- Image naming convention: `[content-slug]-[image-number].[extension]`

### Image Requirements
- Recommended formats: JPG, PNG, WebP
- Maximum file size: 2MB
- Recommended dimensions:
  - Hero images: 1920x1080px
  - Content images: 1200x800px
  - Thumbnails: 400x300px

## Content Creation Workflow

1. **Create Content in Notion**
   - Create a new page in the database
   - Fill in all required properties
   - Write and format the content
   - Add image references

2. **Prepare Images**
   - Optimize images for web use
   - Upload images to the project's `public/images` directory
   - Ensure image names match the references in Notion

3. **Publish Content**
   - Set the status to "Published" in Notion
   - The website will automatically fetch and display the new content

## Best Practices

1. **Content Organization**
   - Keep content well-structured with clear headings
   - Use consistent formatting
   - Break content into digestible sections

2. **Image Management**
   - Always optimize images before uploading
   - Use descriptive file names
   - Maintain consistent image dimensions

3. **SEO Considerations**
   - Include relevant metadata
   - Use descriptive titles and slugs
   - Add alt text for images

## Technical Implementation

The website will:
1. Fetch content from Notion API
2. Match image references with local files
3. Apply the specified layout
4. Render the content with consistent styling

## Future Enhancements

Potential future improvements:
- Image upload interface
- Content preview
- Draft mode
- Custom layout builder
- Analytics integration 