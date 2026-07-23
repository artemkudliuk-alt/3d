import fs from 'fs';
import path from 'path';
import https from 'https';

const FONTS = [
  { url: 'https://cdn.prod.website-files.com/69f1c9530d79cd8950e607b9/69f1c9530d79cd8950e607c8_JetBrainsMono-Medium.woff2', name: 'JetBrainsMono-Medium.woff2' },
  { url: 'https://cdn.prod.website-files.com/69f1c9530d79cd8950e607b9/69f1c9530d79cd8950e60871_aeonik-regular.woff2', name: 'aeonik-regular.woff2' },
  { url: 'https://cdn.prod.website-files.com/69f1c9530d79cd8950e607b9/69f1c9530d79cd8950e60872_aeonik-medium.woff2', name: 'aeonik-medium.woff2' },
  { url: 'https://cdn.prod.website-files.com/69f1c9530d79cd8950e607b9/69f1c9530d79cd8950e60873_Bw%20Gradual%20-%20ExtraBold.woff2', name: 'bw-gradual-extrabold.woff2' },
  { url: 'https://cdn.prod.website-files.com/69f1c9530d79cd8950e607b9/69f1c9530d79cd8950e60874_Bw%20Gradual%20-%20Bold.woff2', name: 'bw-gradual-bold.woff2' }
];

const DIR = path.join(process.cwd(), 'public', 'fonts');

if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR, { recursive: true });
}

async function download(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(path.join(DIR, filename));
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Downloading fonts...');
  await Promise.all(FONTS.map(f => download(f.url, f.name)));
  console.log('Done.');
}

main().catch(console.error);
