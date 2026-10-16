const fs = require('node:fs');
const path = require('node:path');
const sharp = require('C:/Users/Gaah_/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root = path.resolve(__dirname, '..');
const manifestPath = process.argv[2];
(async () => {
  const bundle = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const records = JSON.parse(fs.readFileSync(path.join(root, 'docs/portfolio-origem.json'), 'utf8'));
  const assets = bundle.assets.filter(a => a.kind === 'image');
  const available = new Map();
  for (const asset of assets) {
    const basename = path.basename(new URL(asset.url).pathname, '.jpg');
    const filename = basename === 'image02' ? 'bruna-festa.webp' : `${basename}.webp`;
    await sharp(asset.path).webp({ quality: 87 }).toFile(path.join(root, 'assets', filename));
    available.set(asset.url, `assets/${filename}`);
  }
  const works = records.map((record, index) => {
    const match = record.title.match(/^(.*?)\s*\((.*?)\s*•\s*(\d{2}\/\d{2}\/\d{4})\)$/);
    if (!match) throw new Error(`Formato inesperado: ${record.title}`);
    const [,title,publisher,date] = match;
    const format = publisher === 'TikTok' ? 'video' : publisher === 'Rádio Gazeta' ? 'audio' : 'texto';
    let subject = 'Cultura pop';
    if (/games|critica/.test(record.url)) subject = 'Games & crítica';
    if (/animes|animacao/.test(record.url)) subject = 'Anime & animação';
    if (publisher === 'CNN Brasil') subject = 'Jornalismo';
    if (publisher === 'FapUnifesp') subject = 'Institucional';
    if (/a-torre-negra/.test(record.url)) subject = 'Cinema & literatura';
    if (/nierautomata/.test(record.url)) subject = 'Anime & crítica';
    if (format === 'audio') subject = 'Radiojornalismo';
    if (format === 'video') subject = 'Games em vídeo';
    return {id:index+1,title,publisher,date,year:date.slice(-4),format,subject,url:record.url,image:available.get(record.sourceImage)||null};
  });
  fs.writeFileSync(path.join(root, 'portfolio.data.js'), `window.BRUNA_WORKS = ${JSON.stringify(works,null,2)};\n`);
  fs.writeFileSync(path.join(root, 'docs/creditos-imagens.json'),JSON.stringify(assets.map(a=>({source:a.url,local:available.get(a.url)})),null,2));
  console.log(`${works.length} trabalhos e ${assets.length} imagens reais preparados.`);
})().catch(error => {console.error(error);process.exitCode=1;});
