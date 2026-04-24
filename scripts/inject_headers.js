import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.join(__dirname, '..', 'src');

function getAllJsxFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  let filesArray = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      filesArray = getAllJsxFiles(dirPath + "/" + file, filesArray);
    } else if (file.endsWith('.jsx')) {
      filesArray.push(path.join(dirPath, file));
    }
  });
  return filesArray;
}

const jsxFiles = getAllJsxFiles(SRC_DIR);
let modCount = 0;

for (const file of jsxFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Header Banners globais (w-full com h-40, h-44, h-56, h-60, etc.)
  content = content.replace(/(<img[^>]+className=\"[^\"]*w-full[^\"]*h-\d+[^\"]*object-cover[^\"]*\")([^>]*>)/g, function(match, p1, p2) {
    if (match.includes('width=')) return match;
    return `${p1} width="1920" height="400"${p2}`;
  });
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    modCount++;
    console.log(`Banners hero modificados: ${path.basename(file)}`);
  }
}
console.log(`\nTotal headers modificados: ${modCount}`);
