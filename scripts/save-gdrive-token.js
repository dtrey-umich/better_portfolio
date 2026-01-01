const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const CREDENTIALS_PATH = path.join(__dirname, 'gdrive-credentials.json');
const TOKEN_PATH = path.join(__dirname, 'gdrive-token.json');

async function saveToken() {
  const code = process.argv[2];
  
  if (!code) {
    console.error('Usage: node scripts/save-gdrive-token.js <authorization-code>');
    process.exit(1);
  }

  try {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
    console.log('✅ Token saved successfully to', TOKEN_PATH);
    console.log('You can now run: npm run sync-images <folder-id>');
  } catch (err) {
    console.error('Error saving token:', err.message);
    process.exit(1);
  }
}

saveToken();
