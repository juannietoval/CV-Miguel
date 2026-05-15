import fs from 'fs';
import path from 'path';
import { PROFESSOR_DATA } from './src/data/professorData';

// If using ES modules, use process.cwd() instead of __dirname
const outputDir = path.join(process.cwd(), 'src/data/sections');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Extract basic info
const basicInfoKeys = ['name', 'title', 'profileImage', 'bio', 'email', 'faculty', 'department', 'location', 'social'];
const basicInfo: any = {};
for (const key of basicInfoKeys) {
  if (key in PROFESSOR_DATA) {
    basicInfo[key] = (PROFESSOR_DATA as any)[key];
  }
}

fs.writeFileSync(
  path.join(outputDir, 'basicInfoData.ts'),
  `export const basicInfoData = ${JSON.stringify(basicInfo, null, 2)};\n`
);

const arrayKeys = Object.keys(PROFESSOR_DATA).filter(k => !basicInfoKeys.includes(k));

for (const key of arrayKeys) {
  const data = (PROFESSOR_DATA as any)[key];
  const fileName = `${key}Data.ts`;
  fs.writeFileSync(
    path.join(outputDir, fileName),
    `export const ${key}Data = ${JSON.stringify(data, null, 2)};\n`
  );
  console.log(`Extracted ${key} to ${fileName}`);
}

// Write the new professorData.ts
let newMainFileContent = `// --- DATA CONFIGURATION (El profesor puede editar esto fácilmente) ---\n`;
newMainFileContent += `import { basicInfoData } from './sections/basicInfoData';\n`;

for (const key of arrayKeys) {
  newMainFileContent += `import { ${key}Data } from './sections/${key}Data';\n`;
}

newMainFileContent += `\nexport const PROFESSOR_DATA = {\n`;
newMainFileContent += `  ...basicInfoData,\n`;
for (const key of arrayKeys) {
  newMainFileContent += `  ${key}: ${key}Data,\n`;
}
newMainFileContent += `};\n`;

fs.writeFileSync(
  path.join(process.cwd(), 'src/data/professorData.ts'),
  newMainFileContent
);
console.log('Successfully refactored src/data/professorData.ts');
