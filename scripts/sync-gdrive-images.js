const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const crypto = require('crypto');

// Load environment variables from .env.local for local testing
try {
  require('dotenv').config({ path: '.env.local' });
} catch (error) {
  console.log('No .env.local file found, assuming we are in CI environment');
}

// Configuration
const LOCAL_IMAGE_DIR = path.join(__dirname, '../public/images');
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const TOKEN_PATH = path.join(__dirname, 'gdrive-token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'gdrive-credentials.json');

// Get Google Drive folder ID from environment or command line
const GDRIVE_FOLDER_ID = process.env.GDRIVE_FOLDER_ID || process.argv[2];

if (!GDRIVE_FOLDER_ID) {
  console.error('Error: Google Drive folder ID not provided.');
  console.error('Usage: npm run sync-images <folder-id>');
  console.error('Or set GDRIVE_FOLDER_ID environment variable');
  process.exit(1);
}

/**
 * Calculate MD5 hash of a local file
 */
function getLocalFileMD5(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

/**
 * Get all files in a local directory recursively
 */
function getLocalFiles(dir, baseDir = dir) {
  const files = {};
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.relative(baseDir, fullPath);
    
    if (item.isDirectory()) {
      Object.assign(files, getLocalFiles(fullPath, baseDir));
    } else {
      files[relativePath] = {
        path: fullPath,
        md5: getLocalFileMD5(fullPath),
        size: fs.statSync(fullPath).size
      };
    }
  }
  
  return files;
}

/**
 * Authorize with Google Drive
 */
async function authorize() {
  let credentials;
  try {
    credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  } catch (err) {
    console.error('Error loading credentials file:', CREDENTIALS_PATH);
    console.error('Please download OAuth 2.0 credentials from Google Cloud Console');
    console.error('and save them as scripts/gdrive-credentials.json');
    process.exit(1);
  }

  const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have a token
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  // Need to generate new token
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  
  console.error('Authorize this app by visiting this url:', authUrl);
  console.error('Then run the script: node scripts/save-gdrive-token.js <code>');
  process.exit(1);
}

/**
 * List all files in a Google Drive folder recursively
 */
async function listGDriveFiles(drive, folderId, basePath = '') {
  const files = {};
  
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, md5Checksum, size)',
      pageSize: 1000,
    });

    for (const file of response.data.files) {
      const filePath = basePath ? `${basePath}/${file.name}` : file.name;
      
      if (file.mimeType === 'application/vnd.google-apps.folder') {
        // Recursively list files in subdirectories
        const subFiles = await listGDriveFiles(drive, file.id, filePath);
        Object.assign(files, subFiles);
      } else {
        files[filePath] = {
          id: file.id,
          name: file.name,
          md5: file.md5Checksum,
          size: parseInt(file.size || '0'),
        };
      }
    }
  } catch (err) {
    console.error('Error listing files from Google Drive:', err.message);
    process.exit(1);
  }

  return files;
}

/**
 * Download a file from Google Drive
 */
async function downloadFile(drive, fileId, destPath) {
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const dest = fs.createWriteStream(destPath);
  
  try {
    const response = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );
    
    return new Promise((resolve, reject) => {
      response.data
        .on('end', () => {
          console.log(`  ✓ Downloaded: ${path.basename(destPath)}`);
          resolve();
        })
        .on('error', err => {
          console.error(`  ✗ Error downloading ${path.basename(destPath)}:`, err.message);
          reject(err);
        })
        .pipe(dest);
    });
  } catch (err) {
    console.error(`  ✗ Error downloading ${path.basename(destPath)}:`, err.message);
    throw err;
  }
}

/**
 * Main sync function
 */
async function syncImages() {
  console.log('🔄 Starting Google Drive image sync...\n');

  // Authorize
  const auth = await authorize();
  const drive = google.drive({ version: 'v3', auth });

  // Get local files
  console.log('📂 Scanning local files...');
  let localFiles = {};
  if (fs.existsSync(LOCAL_IMAGE_DIR)) {
    localFiles = getLocalFiles(LOCAL_IMAGE_DIR);
  } else {
    fs.mkdirSync(LOCAL_IMAGE_DIR, { recursive: true });
  }
  console.log(`  Found ${Object.keys(localFiles).length} local files\n`);

  // Get Google Drive files
  console.log('☁️  Scanning Google Drive...');
  const gdriveFiles = await listGDriveFiles(drive, GDRIVE_FOLDER_ID);
  console.log(`  Found ${Object.keys(gdriveFiles).length} remote files\n`);

  // Compare and sync
  const toDownload = [];
  const toDelete = [];
  let upToDate = 0;

  // Check for files to download or update
  for (const [relativePath, gdriveFile] of Object.entries(gdriveFiles)) {
    const localPath = path.join(LOCAL_IMAGE_DIR, relativePath);
    const localFile = localFiles[relativePath];

    if (!localFile) {
      // File doesn't exist locally
      toDownload.push({ gdriveFile, localPath, relativePath, reason: 'new' });
    } else if (localFile.md5 !== gdriveFile.md5) {
      // File exists but is different
      toDownload.push({ gdriveFile, localPath, relativePath, reason: 'modified' });
    } else {
      upToDate++;
    }
  }

  // Check for files to delete (exist locally but not in GDrive)
  for (const [relativePath, localFile] of Object.entries(localFiles)) {
    if (!gdriveFiles[relativePath]) {
      toDelete.push({ localFile, relativePath });
    }
  }

  // Report findings
  console.log('📊 Sync Summary:');
  console.log(`  ✓ Up to date: ${upToDate}`);
  console.log(`  ⬇ To download: ${toDownload.length}`);
  console.log(`  🗑 To delete: ${toDelete.length}\n`);

  if (toDownload.length === 0 && toDelete.length === 0) {
    console.log('✨ Everything is in sync!');
    return;
  }

  // Download new/modified files
  if (toDownload.length > 0) {
    console.log('⬇️  Downloading files...');
    for (const { gdriveFile, localPath, relativePath, reason } of toDownload) {
      const action = reason === 'new' ? 'New' : 'Updated';
      console.log(`  [${action}] ${relativePath}`);
      await downloadFile(drive, gdriveFile.id, localPath);
    }
    console.log();
  }

  // Delete removed files
  if (toDelete.length > 0) {
    console.log('🗑️  Removing deleted files...');
    for (const { localFile, relativePath } of toDelete) {
      try {
        fs.unlinkSync(localFile.path);
        console.log(`  ✓ Deleted: ${relativePath}`);
        
        // Remove empty directories
        let dir = path.dirname(localFile.path);
        while (dir !== LOCAL_IMAGE_DIR && fs.readdirSync(dir).length === 0) {
          fs.rmdirSync(dir);
          dir = path.dirname(dir);
        }
      } catch (err) {
        console.error(`  ✗ Error deleting ${relativePath}:`, err.message);
      }
    }
    console.log();
  }

  console.log('✅ Sync complete!');
}

// Run
syncImages().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
