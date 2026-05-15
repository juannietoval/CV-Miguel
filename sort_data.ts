import fs from 'fs';
import path from 'path';

const months: Record<string, number> = {
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
  julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12
};

function parseDateScore(item: any): number {
  let dateStr = "";
  if (item.date) dateStr += item.date + " ";
  if (item.period) dateStr += item.period + " ";
  if (item.end) dateStr += item.end + " "; 
  if (item.start) dateStr += item.start + " ";
  if (item.year) dateStr += item.year + " ";
  
  if (!dateStr.trim()) return 0;
  
  dateStr = String(dateStr).toLowerCase();
  
  // Si dice "actual" o "actualidad", se prioriza como lo más reciente (año 9999)
  if (dateStr.includes('actual') || dateStr.includes('presente')) {
    return 999900; 
  }
  
  let year = 0;
  const yearMatch = dateStr.match(/\b(19|20)\d{2}\b/g);
  if (yearMatch) {
    year = Math.max(...yearMatch.map(Number));
  }
  
  let month = 0;
  for (const [mName, mNum] of Object.entries(months)) {
    if (dateStr.includes(mName)) {
      month = Math.max(month, mNum);
    }
  }
  
  // Si tiene formato YYYY-MM-DD
  const isoMatch = dateStr.match(/\b((19|20)\d{2})-(\d{2})-(\d{2})\b/);
  if (isoMatch) {
    year = Math.max(year, parseInt(isoMatch[1]));
    month = Math.max(month, parseInt(isoMatch[3]));
  }
  
  return year * 100 + month;
}

async function main() {
  const dir = path.join(process.cwd(), 'src', 'data', 'sections');
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (!file.endsWith('.ts') || file === 'basicInfoData.ts') continue;
    
    const filePath = path.join(dir, file);
    // Dynamically import using file:// protocol for Windows absolute paths
    const fileUrl = `file:///${filePath.replace(/\\/g, '/')}`;
    
    try {
      // Agregamos un timestamp para evitar cache del import dinámico
      const module = await import(`${fileUrl}?t=${Date.now()}`);
      
      const exportName = Object.keys(module)[0];
      const data = module[exportName];
      
      if (Array.isArray(data)) {
        // Orden descendente: el de mayor score (fecha más reciente) va primero
        data.sort((a, b) => parseDateScore(b) - parseDateScore(a));
        
        const fileContent = `export const ${exportName} = ${JSON.stringify(data, null, 2)};\n`;
        fs.writeFileSync(filePath, fileContent, 'utf8');
        console.log(`✅ Ordenado cronológicamente: ${file}`);
      }
    } catch (e) {
      console.error(`Error procesando ${file}:`, e);
    }
  }
}

main().then(() => console.log('Proceso de ordenamiento finalizado.')).catch(console.error);
