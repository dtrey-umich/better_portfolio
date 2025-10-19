import { NotionContent } from '@/components/NotionContent';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const mockBlocks = [
  {
    object: "block",
    id: "test-column-list",
    parent: { type: "page_id", page_id: "test-page" },
    created_time: "2024-01-01T00:00:00.000Z",
    last_edited_time: "2024-01-01T00:00:00.000Z",
    created_by: { object: "user", id: "test-user" },
    last_edited_by: { object: "user", id: "test-user" },
    has_children: true,
    archived: false,
    type: "column_list",
    column_list: {
      children: [
        {
          object: "block",
          id: "column-1",
          parent: { type: "block_id", block_id: "test-column-list" },
          created_time: "2024-01-01T00:00:00.000Z",
          last_edited_time: "2024-01-01T00:00:00.000Z",
          created_by: { object: "user", id: "test-user" },
          last_edited_by: { object: "user", id: "test-user" },
          has_children: true,
          archived: false,
          type: "column",
          column: {
            children: [
              {
                object: "block",
                id: "text-1",
                parent: { type: "block_id", block_id: "column-1" },
                created_time: "2024-01-01T00:00:00.000Z",
                last_edited_time: "2024-01-01T00:00:00.000Z",
                created_by: { object: "user", id: "test-user" },
                last_edited_by: { object: "user", id: "test-user" },
                has_children: false,
                archived: false,
                type: "paragraph",
                paragraph: {
                  rich_text: [
                    {
                      type: "text",
                      text: { content: "This is the left column text", link: null },
                      annotations: {
                        bold: false,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: "default"
                      },
                      plain_text: "This is the left column text",
                      href: null
                    }
                  ],
                  color: "default"
                }
              }
            ]
          }
        },
        {
          object: "block",
          id: "column-2",
          parent: { type: "block_id", block_id: "test-column-list" },
          created_time: "2024-01-01T00:00:00.000Z",
          last_edited_time: "2024-01-01T00:00:00.000Z",
          created_by: { object: "user", id: "test-user" },
          last_edited_by: { object: "user", id: "test-user" },
          has_children: true,
          archived: false,
          type: "column",
          column: {
            children: [
              {
                object: "block",
                id: "text-2",
                parent: { type: "block_id", block_id: "column-2" },
                created_time: "2024-01-01T00:00:00.000Z",
                last_edited_time: "2024-01-01T00:00:00.000Z",
                created_by: { object: "user", id: "test-user" },
                last_edited_by: { object: "user", id: "test-user" },
                has_children: false,
                archived: false,
                type: "paragraph",
                paragraph: {
                  rich_text: [
                    {
                      type: "text",
                      text: { content: "This is the right column text", link: null },
                      annotations: {
                        bold: false,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: "default"
                      },
                      plain_text: "This is the right column text",
                      href: null
                    }
                  ],
                  color: "default"
                }
              }
            ]
          }
        }
      ]
    }
  }
] as unknown as BlockObjectResponse[];

export default function TestPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Column Layout Test</h1>
      <NotionContent blocks={mockBlocks} />
    </div>
  );
}