export async function load() {
  const path = await import('path');
  const fs = await import('fs');

  const filePath = path.join(process.cwd(), 'public', 'cedict.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const cedict = JSON.parse(fileContents) as Cedict;

  return cedict;
}
