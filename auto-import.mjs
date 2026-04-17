import fs from 'fs';
import path from 'path';

const downloadsDir = 'c:\\\\Users\\\\siric\\\\Downloads';
const projectProductsDir = path.join(process.cwd(), 'public', 'products');
const projectVideosDir = path.join(process.cwd(), 'public', 'videos');

// Create dirs if not exist
if (!fs.existsSync(projectProductsDir)) fs.mkdirSync(projectProductsDir, { recursive: true });
if (!fs.existsSync(projectVideosDir)) fs.mkdirSync(projectVideosDir, { recursive: true });

const folders = fs.readdirSync(downloadsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .filter(name => name.includes('BRAND') || name.includes('NEW ARRIVAL') || name.includes('__') || name.includes('Watches') || name.includes('Perfume') || name.includes('BMW') || name.includes('LOUIS VUITTON'));

const newProducts = [];
let idCounter = 1;

for (const folderName of folders) {
  // Skip extracted folders that are just wrapper dirs
  if (folderName === 'Watches_extracted' || folderName === 'digitaldost_extracted' || folderName.includes('.app')) continue;
  
  const sourcePath = path.join(downloadsDir, folderName);
  const files = fs.readdirSync(sourcePath);
  
  const images = [];
  let videoPath = null;
  
  // Parse name for price and category
  let price = "₹1,999";
  let priceNum = 1999;
  
  // Try to find a number followed by ₹ or +$ or ending with that
  const priceMatch = folderName.match(/(\\d{3,4})(?:[₹\$]|\\+\\$|\\.\\+)/);
  if (priceMatch) {
    priceNum = parseInt(priceMatch[1], 10);
    price = `₹${priceNum.toLocaleString()}`;
  } else {
    // Other patterns like "Price_ 800" or "PRICE ONLY 800"
    const pMatch = folderName.match(/(?:price|₹)[^\\d]*(\\d{3,4})/i);
    if (pMatch) {
      priceNum = parseInt(pMatch[1], 10);
      price = `₹${priceNum.toLocaleString()}`;
    }
  }
  
  let category = 'eyewear';
  if (folderName.toLowerCase().includes('watch') || folderName.toLowerCase().includes('cartier') || folderName.toLowerCase().includes('rado') || folderName.toLowerCase().includes('rolex') || folderName.toLowerCase().includes('rm')) category = 'watches';
  else if (folderName.toLowerCase().includes('perfume')) category = 'perfume';
  else if (folderName.toLowerCase().includes('shoe') || folderName.toLowerCase().includes('birkenstock') || folderName.toLowerCase().includes('puma') || folderName.toLowerCase().includes('nike')) category = 'footwear';

  // Determine brand
  let brand = 'Premium';
  if (folderName.toLowerCase().includes('armani')) brand = 'Armani';
  else if (folderName.toLowerCase().includes('celine')) brand = 'Celine';
  else if (folderName.toLowerCase().includes('marc jacobs')) brand = 'Marc Jacobs';
  else if (folderName.toLowerCase().includes('prada')) brand = 'Prada';
  else if (folderName.toLowerCase().includes('louis vuitton')) brand = 'Louis Vuitton';
  else if (folderName.toLowerCase().includes('dior')) brand = 'Dior';
  else if (folderName.toLowerCase().includes('bmw')) brand = 'BMW';
  else if (folderName.toLowerCase().includes('cartier')) brand = 'Cartier';
  else if (folderName.toLowerCase().includes('rado')) brand = 'Rado';
  else if (folderName.toLowerCase().includes('rolex')) brand = 'Rolex';
  else if (folderName.toLowerCase().includes('nike')) brand = 'Nike';

  const productId = `imported-${category}-${idCounter++}`;
  let cleanName = folderName.replace(/_/g, ' ').replace(/-2026.*/, '').replace(/[^a-zA-Z0-9 ]/g, '').replace(/\\s+/g, ' ').substring(0, 30).trim();
  if (cleanName.length < 3) cleanName = `${brand} Product`;

  let imgCounter = 1;
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const oldPath = path.join(sourcePath, file);
    
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp') {
      const newImgName = `${productId}-${imgCounter++}${ext}`;
      fs.copyFileSync(oldPath, path.join(projectProductsDir, newImgName));
      images.push(`/products/${newImgName}`);
    } else if (ext === '.mp4' || ext === '.mov') {
      const newVidName = `${productId}-video${ext}`;
      fs.copyFileSync(oldPath, path.join(projectVideosDir, newVidName));
      videoPath = `/videos/${newVidName}`;
    }
  }
  
  if (images.length > 0) {
    const descText = folderName.replace(/_/g, ' ').replace(/-2026.*/, '').trim() + "\\n\\nA premium, high-quality product guaranteed to deliver excellence. Authentic styling and incredible attention to detail.";
    newProducts.push({
      id: productId,
      name: cleanName,
      brand,
      type: "Premium Selection",
      category,
      price,
      priceNum,
      images,
      video: videoPath,
      description: descText,
      featured: true
    });
  }
}

// Generate the updated products.ts
const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.ts');
let productsContent = fs.readFileSync(productsFilePath, 'utf8');

// replace the products array with new array
const injectionString = `export const products: Product[] = ${JSON.stringify(newProducts, null, 2)};`;

// Simple replacement: remove everything starting from 'export const products' and ending at 'export const getFeaturedProducts'
productsContent = productsContent.replace(/export const products: Product\\[\\] = \\[\\s\\S]*?export const getFeaturedProducts/m, `${injectionString}\\n\\nexport const getFeaturedProducts`);

fs.writeFileSync(productsFilePath, productsContent);

console.log(`Successfully imported ${newProducts.length} products!`);
