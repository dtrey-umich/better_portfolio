# Google Drive Image Sync Setup

This script syncs images from a Google Drive folder to `/public/images`.

## Setup Instructions

### 1. Create Google Cloud Project & Enable Drive API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"

### 2. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External (for personal use)
   - Add your email as a test user
4. Application type: "Desktop app"
5. Name it something like "Portfolio Image Sync"
6. Click "Create"
7. Download the credentials JSON file
8. Save it as `scripts/gdrive-credentials.json`

### 3. Get Your Google Drive Folder ID

1. Open Google Drive in your browser
2. Navigate to the folder you want to sync
3. The folder ID is in the URL:
   ```
   https://drive.google.com/drive/folders/FOLDER_ID_HERE
   ```
4. Copy the folder ID

### 4. Authorize the App (First Time Only)

```bash
# Install dependencies (if not already installed)
npm install googleapis

# Run the sync script with your folder ID
npm run sync-images YOUR_FOLDER_ID
```

This will print an authorization URL. Visit it, grant permissions, and copy the authorization code.

Then run:
```bash
node scripts/save-gdrive-token.js YOUR_AUTH_CODE
```

### 5. Run Sync Anytime

```bash
# Sync with folder ID as argument
npm run sync-images YOUR_FOLDER_ID

# Or set environment variable
export GDRIVE_FOLDER_ID=YOUR_FOLDER_ID
npm run sync-images
```

## How It Works

The script:
- ✅ Downloads new files from Google Drive
- ✅ Updates modified files (compares MD5 checksums)
- ✅ Deletes local files that were removed from Drive
- ✅ Preserves folder structure
- ✅ Shows detailed progress

## Security Notes

- `gdrive-credentials.json` and `gdrive-token.json` are git-ignored
- Never commit these files to your repository
- Keep your credentials secure

## Troubleshooting

**"Token has been expired or revoked"**
- Delete `scripts/gdrive-token.json`
- Re-run the authorization flow

**"Access denied"**
- Make sure your email is added as a test user in OAuth consent screen
- Check that Google Drive API is enabled

**"Folder not found"**
- Verify the folder ID is correct
- Make sure the folder is shared with your Google account
