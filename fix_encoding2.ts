import fs from 'fs';
import path from 'path';

const replacements: Record<string, string> = {
  'Ã¡': 'á',
  'Ã©': 'é',
  'Ã­': 'í',
  'Ã³': 'ó',
  'Ãº': 'ú',
  'Ã±': 'ñ',
  'Ã': 'Á',
  'Ã‰': 'É',
  'Ã': 'Í',
  'Ã“': 'Ó',
  'Ãš': 'Ú',
  'Ã‘': 'Ñ',
  'â€¢': '•',
  'â€œ': '“',
  'â€': '”',
  'â€“': '–',
  'â€”': '—',
  'Â¿': '¿',
  'Â¡': '¡'
};

function fixEncodingInDir(dirPath: string) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      fixEncodingInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const [broken, fixed] of Object.entries(replacements)) {
        content = content.split(broken).join(fixed);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Fixed text in: ${fullPath}`);
      }
    }
  }
}

const targetDirs = [
  path.join(process.cwd(), 'src', 'components'),
  path.join(process.cwd(), 'src', 'App.tsx')
];

for (const target of targetDirs) {
  if (fs.existsSync(target)) {
    if (fs.statSync(target).isDirectory()) {
      fixEncodingInDir(target);
    } else {
      let content = fs.readFileSync(target, 'utf8');
      let originalContent = content;
      
      for (const [broken, fixed] of Object.entries(replacements)) {
        content = content.split(broken).join(fixed);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(target, content, 'utf8');
        console.log(`✅ Fixed text in: ${target}`);
      }
    }
  }
}

console.log('Proceso de reparación de textos finalizado exitosamente.');
