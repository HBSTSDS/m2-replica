import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sizeOf from 'image-size';

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '..', 'src');

// Function to synchronously find all .jsx files
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

// Function to fetch external image dimensions
async function getExternalImageDimensions(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return sizeOf(buffer);
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return null;
  }
}

async function processFiles() {
  const jsxFiles = getAllJsxFiles(SRC_DIR);
  console.log(`Encontrados ${jsxFiles.length} arquivos .jsx.`);
  
  let modifiedCount = 0;
  let imgCount = 0;

  for (const file of jsxFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let hasModifications = false;

    // Regex to match <img ... /> or <Img ... />
    // It captures the entire tag, looking for src="URL" or src={'URL'}
    const imgRegex = /<(img|Img)([^>]+)>/gi;
    
    // We can't use simple string replace directly with async, so we'll collect changes
    const matches = [...content.matchAll(imgRegex)];
    if (matches.length === 0) continue;

    for (const match of matches) {
      const fullTag = match[0];
      const tagContent = match[2];
      
      imgCount++;

      // Se já tem width ou height bruto, pular
      if (tagContent.match(/\bwidth=/i) || tagContent.match(/\bheight=/i)) {
        continue;
      }

      // Procurar pela URL na propriedade src
      let url = null;
      
      // Tentar src="..."
      const srcMatch1 = tagContent.match(/src="([^"]+)"/i);
      if (srcMatch1) url = srcMatch1[1];
      
      // Tentar src={'...'}
      if (!url) {
        const srcMatch2 = tagContent.match(/src=\{'([^']+)'\}/i);
        if (srcMatch2) url = srcMatch2[1];
      }
      
      // Tentar src={`...`} (apenas se for puramente estático sem ${})
      if (!url) {
        const srcMatch3 = tagContent.match(/src=\{`([^$]+)`\}/i);
        if (srcMatch3) url = srcMatch3[1];
      }

      // NOVO: Adicionar suporte para helper remoteAsset(...)
      if (!url) {
        const srcMatch4 = tagContent.match(/remoteAsset\(\s*["'`]?([^"'`)]+)["'`]?\s*\)/i);
        if (srcMatch4) {
          let cleanUrl = srcMatch4[1].startsWith('/') ? srcMatch4[1].slice(1) : srcMatch4[1];
          // Trata URLs encodadas como "sinaliza%C3%A7%C3%A3o" 
          url = "https://flaviobrick.com.br/assets_externos/assets/" + cleanUrl;
        }
      }

      if (!url || !url.startsWith('http')) {
        // Pular dinâmicos puros
        continue;
      }

      // Codificador extra para o fetch não bugar com espaços
      const fetchUrl = url.includes('%') ? url : encodeURI(url);

      console.log(`Medindo a imagem: ${fetchUrl}`);
      let dimensions = await getExternalImageDimensions(fetchUrl);
      
      if (dimensions) {
        const replacementTag = match[0].replace(
          /<(img|Img)\s+/i, 
          `<$1 width="${dimensions.width}" height="${dimensions.height}" `
        );
        content = content.replace(match[0], replacementTag);
        hasModifications = true;
        console.log(`[Sucesso] Adicionado ${dimensions.width}x${dimensions.height}`);
      }
    }

    if (hasModifications) {
      fs.writeFileSync(file, content, 'utf8');
      modifiedCount++;
      console.log(`[Salvo] Arquivo alterado: ${path.basename(file)}`);
    }
  }

  console.log(`\nFinalizado! Analisadas ${imgCount} tags. Arquivos alterados: ${modifiedCount}`);
}

processFiles();
