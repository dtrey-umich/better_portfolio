# Technical Specification

## Proposed Technology Stack

### Frontend
- **Framework**: Next.js (React)
  - Provides server-side rendering
  - Excellent performance
  - Great developer experience
  - Built-in routing
  - Easy deployment options

- **Styling**: 
  - Tailwind CSS for utility-first styling
  - Framer Motion for animations
  - CSS Modules for component-specific styles

- **State Management**:
  - React Context for global state
  - React Query for data fetching

### Backend
- **API**: Next.js API routes
- **Database**: 
  - MongoDB for flexible content structure
  - Or Sanity.io for headless CMS
- **Content Management**:
  - Notion as primary CMS
  - Notion API for content sync
  - Automatic content updates

### Notion Integration
- **Content Structure**:
  - Projects database in Notion
  - Categories database
  - About page content
  - Writings/blog content
  - Homepage scoring system

- **Homepage Dynamic Organization**:
  - **Scoring System**:
    - Category relevance scores (0-100)
    - Visual weight scores
    - Featured status
    - Date-based relevance
    - Custom tag weights
  
  - **Filter Categories**:
    - Robotics
    - Art
    - Collections
    - Other categories
    - Custom tags
  
  - **Scoring Properties**:
    - Primary category score
    - Secondary category scores
    - Visual prominence score
    - Featured status
    - Last updated date
    - Custom tag weights
    - Manual override options

  - **Dynamic Sorting**:
    - Weighted scoring algorithm
    - Multi-factor relevance calculation
    - Real-time filter updates
    - Smooth transition animations
    - Fallback sorting options

- **Sync Strategy**:
  - Real-time or periodic content updates
  - Caching layer for performance
  - Webhook support for instant updates
  - Fallback content for offline access

- **Content Types**:
  - Project pages
  - Category pages
  - About page
  - Blog/Writings
  - Media assets

- **Implementation Details**:
  - Notion API client setup
  - Content transformation layer
  - Caching strategy
  - Error handling
  - Rate limiting consideration
  - Scoring system implementation
  - Dynamic sorting algorithm

### Deployment
- Vercel (optimized for Next.js)
- Or Netlify

## Key Features Implementation

### Dynamic Project Grid
- CSS Grid/Flexbox for layout
- Framer Motion for smooth transitions
- Intersection Observer for lazy loading
- Debounced filter updates

### Content Management
- Notion as primary content source
- Automatic content sync
- Markdown support
- Image optimization with next/image
- Content caching
- Incremental Static Regeneration (ISR)

### Performance Optimizations
- Image lazy loading
- Code splitting
- Static page generation where possible
- Caching strategies
- Progressive Web App capabilities

## Development Phases

1. **Setup & Infrastructure**
   - Project initialization
   - Development environment
   - Basic routing
   - Component architecture
   - Notion API integration

2. **Core Features**
   - Home page grid
   - Filtering system
   - Project pages
   - About page
   - Notion content sync

3. **Enhancement**
   - Animations
   - Responsive design
   - Performance optimization
   - SEO implementation
   - Content update system

4. **Content & Polish**
   - Content migration to Notion
   - Testing
   - Documentation
   - Deployment

## Development Guidelines
- Component-first architecture
- Mobile-first responsive design
- Accessibility standards (WCAG 2.1)
- Performance budgets
- Code documentation
- Git workflow 

## Notion Integration Guidelines
1. **Content Structure**
   - Use Notion databases for structured content
   - Implement consistent page templates
   - Set up proper relations between databases
   - Define clear content types
   - Create scoring system properties

2. **Scoring System Setup**
   - Define scoring categories
   - Set up scoring properties
   - Create scoring guidelines
   - Implement scoring validation
   - Set up scoring templates

3. **Sync Process**
   - Implement efficient content fetching
   - Set up proper caching
   - Handle rate limits
   - Implement error recovery

4. **Content Management**
   - Document Notion setup process
   - Create content templates
   - Define content guidelines
   - Set up content validation

5. **Performance Considerations**
   - Implement efficient caching
   - Use incremental static regeneration
   - Optimize image loading
   - Handle API rate limits

## Homepage Dynamic Organization

### Scoring System
1. **Category Rankings**
   - Each project has a rank (1-100) in each category
   - Higher rank = more relevant to that category
   - Projects can have different ranks in different categories
   - Rank of 0 means not relevant to that category

2. **Filter Application**
   - When filters are selected, sum the ranks for those categories
   - Example: If a project has:
     - Robotics rank: 80
     - Art rank: 20
     - Collections rank: 0
     - Other rank: 10
   - And user selects "Robotics" and "Art" filters:
     - Total score = 80 + 20 = 100
   - Projects are sorted by total score (highest to lowest)

3. **Visual Implementation**
   - Grid-based layout
   - Size can be proportional to total score
   - Smooth animations during reordering
   - Responsive design
   - Loading states

### Notion Database Structure
1. **Projects Database**
   - Title
   - Description
   - Content
   - Robotics Rank (0-100)
   - Art Rank (0-100)
   - Collections Rank (0-100)
   - Other Rank (0-100)
   - Featured Status (boolean)
   - Last Updated
   - Custom Tags
   - Manual Override Options

2. **Categories Database**
   - Name
   - Description
   - Visual Style
   - Related Categories

3. **Tags Database**
   - Name
   - Category
   - Description

### Implementation Details
1. **Scoring Process**
   - Fetch project ranks from Notion
   - Calculate total score based on selected filters
   - Sort projects by total score
   - Apply visual transformations
   - Animate position changes

2. **Performance Considerations**
   - Cache project ranks
   - Optimize sorting algorithm
   - Use efficient animations
   - Implement lazy loading
   - Handle edge cases

3. **User Experience**
   - Instant filter updates
   - Smooth transitions
   - Clear visual hierarchy
   - Responsive layout
   - Loading indicators 

### Notion Integration Challenges & Solutions

1. **Content Structure**
   - **Challenge**: Notion's rigid database structure vs. flexible web content
   - **Solution**: 
     - Create a clear mapping between Notion properties and website components
     - Use Notion databases for structured data (scores, categories, metadata)
     - Use Notion pages for flexible content
     - Implement a content transformation layer

2. **Rich Text & Formatting**
   - **Challenge**: Notion's rich text format vs. HTML/CSS
   - **Solution**:
     - Use Notion's block-based content as a foundation
     - Create custom components for special formatting
     - Implement a markdown-like transformation system
     - Use CSS to enhance Notion's basic styling

3. **Media Handling**
   - **Challenge**: Notion's media storage vs. optimized web assets
   - **Solution**:
     - Store images in the repository's `/public/images` directory
     - Reference images in Notion by filename only
     - Use Next.js Image component for optimization
     - Implement a media processing pipeline
     - Cache processed images
     - Use CDN for delivery

### Image Management Strategy

1. **Repository Structure**
   ```
   public/
   └── images/
       ├── projects/
       │   ├── project-1/
       │   │   ├── hero.jpg
       │   │   ├── detail-1.jpg
       │   │   └── detail-2.jpg
       │   └── project-2/
       │       ├── hero.jpg
       │       └── gallery/
       │           ├── image-1.jpg
       │           └── image-2.jpg
       ├── collections/
       └── about/
   ```

2. **Notion Integration**
   - Store only image filenames in Notion
   - Use consistent naming conventions
   - Example Notion property:
     ```typescript
     interface ProjectImage {
       hero: string;        // e.g., "hero.jpg"
       gallery: string[];   // e.g., ["image-1.jpg", "image-2.jpg"]
       details: string[];   // e.g., ["detail-1.jpg", "detail-2.jpg"]
     }
     ```

3. **Image Processing Pipeline**
   - Maintain original images in repository
   - Use Next.js Image component for:
     - Automatic optimization
     - Responsive sizing
     - Lazy loading
     - WebP conversion
   - Implement custom image components for:
     - Consistent styling
     - Loading states
     - Error handling
     - Fallback images

4. **Image Component Implementation**
   ```typescript
   interface ImageProps {
     src: string;           // Filename from Notion
     alt: string;           // Alt text from Notion
     project: string;       // Project identifier
     type: 'hero' | 'gallery' | 'detail';
     className?: string;    // Custom styling
   }

   const ProjectImage: React.FC<ImageProps> = ({
     src,
     alt,
     project,
     type,
     className
   }) => {
     const imagePath = `/images/projects/${project}/${type}/${src}`;
     
     return (
       <div className={`image-container ${className}`}>
         <Image
           src={imagePath}
           alt={alt}
           width={...}
           height={...}
           loading="lazy"
           placeholder="blur"
         />
       </div>
     );
   };
   ```

5. **Image Optimization Strategy**
   - Use consistent image sizes for each type
   - Implement responsive breakpoints
   - Optimize for different devices
   - Maintain aspect ratios
   - Use appropriate compression

6. **Workflow**
   1. Add images to repository
   2. Reference in Notion by filename
   3. Code handles optimization and display
   4. Easy to update images by replacing files

7. **Benefits**
   - Full control over image presentation
   - Consistent image handling
   - Better performance
   - Easier version control
   - Simplified backup process
   - Direct access to original files

8. **Considerations**
   - Repository size management
   - Image version control
   - Backup strategy
   - CDN integration
   - Build time optimization

### Layout & Design
   - **Challenge**: Notion's layout limitations vs. custom web design
   - **Solution**:
     - Use Notion for content only
     - Implement custom layouts in Next.js
     - Use CSS Grid/Flexbox for complex layouts
     - Create reusable components for common patterns

### Performance
   - **Challenge**: API calls and content processing
   - **Solution**:
     - Implement efficient caching
     - Use Incremental Static Regeneration (ISR)
     - Optimize API calls
     - Process content at build time when possible

### Content Transformation Strategy

1. **Database to Component Mapping**
   ```typescript
   interface ProjectData {
     title: string;
     description: string;
     content: NotionBlock[];
     scores: {
       robotics: number;
       art: number;
       collections: number;
       other: number;
     };
     // ... other properties
   }
   ```

2. **Content Processing Pipeline**
   - Fetch raw content from Notion
   - Transform Notion blocks to HTML
   - Apply custom styling
   - Optimize media
   - Cache processed content

3. **Update Strategy**
   - Use webhooks for real-time updates
   - Implement background processing
   - Handle failed transformations gracefully
   - Maintain content versioning

### Implementation Approach

1. **Phase 1: Basic Integration**
   - Set up Notion API connection
   - Create basic database structure
   - Implement simple content fetching
   - Test basic transformations

2. **Phase 2: Enhanced Features**
   - Add rich text support
   - Implement media processing
   - Create custom components
   - Set up caching

3. **Phase 3: Optimization**
   - Implement ISR
   - Add performance monitoring
   - Optimize API calls
   - Enhance error handling

4. **Phase 4: Advanced Features**
   - Add real-time updates
   - Implement advanced caching
   - Add content validation
   - Create admin interface

### Fallback Strategy

1. **Content Fallbacks**
   - Maintain local content versions
   - Implement graceful degradation
   - Use static fallbacks when needed
   - Handle API failures gracefully

2. **Performance Fallbacks**
   - Use static generation when possible
   - Implement progressive loading
   - Cache aggressively
   - Use CDN for static assets

3. **Error Handling**
   - Log transformation errors
   - Provide fallback content
   - Implement retry mechanisms
   - Monitor API limits 