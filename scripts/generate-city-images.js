import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const sizes = [400, 800, 1200];
const inputDir = './public/assets';
const outputDir = './public/assets';

async function generateImages() {
  try {
    const files = await readdir(inputDir);
    const cityFiles = files.filter(f => f.startsWith('city') && f.endsWith('.webp'));
    
    if (cityFiles.length === 0) {
      console.log('No city*.webp files found in', inputDir);
      return;
    }

    console.log(`Found ${cityFiles.length} city image(s) to process...`);
    
    for (const file of cityFiles) {
      const inputPath = join(inputDir, file);
      const baseName = file.replace('.webp', '');
      
      console.log(`Processing ${file}...`);
      
      // Get original image dimensions
      const metadata = await sharp(inputPath).metadata();
      const aspectRatio = metadata.width / metadata.height;
      
      for (const width of sizes) {
        const height = Math.round(width / aspectRatio);
        const outputFile = `${baseName}-${width}.webp`;
        const outputPath = join(outputDir, outputFile);
        
        await sharp(inputPath)
          .resize(width, height, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: 75 })
          .toFile(outputPath);
        
        console.log(`  ✓ Generated ${outputFile} (${width}x${height})`);
      }
    }
    
    console.log('\n✅ All responsive images generated successfully!');
  } catch (error) {
    console.error('Error generating images:', error);
    process.exit(1);
  }
}

generateImages();

