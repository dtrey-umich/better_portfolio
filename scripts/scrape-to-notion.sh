#!/bin/bash

# Read environment variables
source .env.local

# URLs to scrape
urls=(
  "http://www.yellowboltart.com/gallery-photography/ink"
  "http://www.yellowboltart.com/gallery-assorted-projects/3d-checkers"
  "http://www.yellowboltart.com/gallery-robotics-projects/robot-arm"
  "http://www.yellowboltart.com/gallery-product-ocean/the-ocean"
  "http://www.yellowboltart.com/gallery-robotics-projects/reach"
)

for url in "${urls[@]}"; do
  echo "Fetching content from: $url"
  
  # Get the title from the URL
  title=$(echo "$url" | awk -F'/' '{print $NF}' | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')
  
  # Fetch the content and extract paragraphs
  content=$(curl -s "$url" | grep -o '<p>[^<]*</p>' | sed 's/<[^>]*>//g')
  
  if [ ! -z "$content" ]; then
    echo "Creating Notion page for: $title"
    
    # Create the JSON payload
    json='{
      "parent": { "database_id": "'"$NOTION_DATABASE_ID"'" },
      "properties": {
        "Name": {
          "title": [{ "text": { "content": "'"$title"'" } }]
        }
      },
      "children": [
        {
          "object": "block",
          "type": "paragraph",
          "paragraph": {
            "rich_text": [{ 
              "type": "text",
              "text": { "content": "'"$content"'" }
            }]
          }
        }
      ]
    }'
    
    # Send to Notion API
    curl -X POST 'https://api.notion.com/v1/pages' \
      -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
      -H 'Content-Type: application/json' \
      -H 'Notion-Version: 2022-06-28' \
      -d "$json"
    
    echo "Page created for: $title"
    sleep 1
  fi
done

echo "Content migration complete!"