import fs from 'fs';
import path from 'path';

function fixEncodingInDir(dirPath: string) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      fixEncodingInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // If the file contains typical mojibake characters
      if (content.includes('Ã³') || content.includes('Ã¡') || content.includes('â€¢') || content.includes('Ã')) {
        try {
          // Convert from broken utf8-interpreted-as-latin1 back to correct utf8
          const fixedContent = Buffer.from(content, 'latin1').toString('utf8');
          
          // Verify that we didn't just break the file (e.g. if it had valid characters that became replacement characters )
          if (!fixedContent.includes('')) {
            fs.writeFileSync(fullPath, fixedContent, 'utf8');
            console.log(`✅ Fixed encoding in: ${fullPath}`);
          } else {
            console.log(`⚠️ Skipped ${fullPath} (conversion resulted in invalid characters)`);
          }
        } catch (e) {
          console.error(`Error fixing ${fullPath}:`, e);
        }
      }
    }
  }
}

// We only want to target the components folder to avoid breaking our newly generated data files
const targetDirs = [
  path.join(process.cwd(), 'src', 'components'),
  path.join(process.cwd(), 'src', 'App.tsx') // and App.tsx just in case
];

for (const target of targetDirs) {
  if (fs.existsSync(target)) {
    if (fs.statSync(target).isDirectory()) {
      fixEncodingInDir(target);
    } else {
      // it's a file
      const content = fs.readFileSync(target, 'utf8');
      if (content.includes('Ã³') || content.includes('Ã¡') || content.includes('â€¢') || content.includes('Ã')) {
        const fixedContent = Buffer.from(content, 'latin1').toString('utf8');
        if (!fixedContent.includes('')) {
          fs.writeFileSync(target, fixedContent, 'utf8');
          console.log(`✅ Fixed encoding in: ${target}`);
        }
      }
    }
  }
}

console.log('Proceso de reparación de textos finalizado.');
