import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export interface NotionContentProps {
  blocks: BlockObjectResponse[];
}

export interface NotionBlockContent {
  type: string;
  paragraph?: {
    rich_text: Array<{
      type: string;
      text: {
        content: string;
        link: null | { url: string };
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
    }>;
  };
  heading_1?: {
    rich_text: Array<{
      type: string;
      text: {
        content: string;
      };
    }>;
  };
  heading_2?: {
    rich_text: Array<{
      type: string;
      text: {
        content: string;
      };
    }>;
  };
  heading_3?: {
    rich_text: Array<{
      type: string;
      text: {
        content: string;
      };
    }>;
  };
}

export interface NotionPage {
  id: string;
  properties: {
    Name: {
      title: Array<{
        text: {
          content: string;
        };
      }>;
    };
    Description: {
      rich_text: Array<{
        text: {
          content: string;
        };
      }>;
    };
    "Publish Status": {
      select: {
        name: string;
      };
    };
  };
} 