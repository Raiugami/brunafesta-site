from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import json

ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.paths=[]; self.anchors=[]; self.images=[]; self.h1=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'): self.ids.append(a['id'])
        if tag=='h1': self.h1+=1
        if tag=='img': self.images.append(a)
        for k in ('src','href'):
            v=a.get(k,'')
            if v.startswith('#'): self.anchors.append(v[1:])
            elif v and not urlsplit(v).scheme: self.paths.append(urlsplit(v).path)
p=Page(); html=(ROOT/'index.html').read_text(encoding='utf8'); p.feed(html)
assert len(p.ids)==len(set(p.ids)), 'IDs repetidos'
assert p.h1==1, 'Conferir H1'
assert all(x in p.ids for x in p.anchors), 'Ancora sem destino'
assert all((ROOT/x).is_file() for x in p.paths), 'Arquivo local ausente'
assert all('alt' in a and 'width' in a and 'height' in a for a in p.images), 'Imagem sem alt/dimensoes'
works_data=json.loads((ROOT/'data/works.json').read_text(encoding='utf8'))
works=works_data['items']
content=json.loads((ROOT/'data/site-content.json').read_text(encoding='utf8'))
assert len(works)==41
assert all(urlsplit(x['url']).scheme=='https' for x in works)
assert all(not x['image'] or (ROOT/x['image']).is_file() for x in works)
assert all(len(x['date'])==10 and x['date'][4]=='-' and x['date'][7]=='-' for x in works)
assert {f:sum(x['format']==f for x in works) for f in ('texto','video','audio')}=={'texto':38,'video':2,'audio':1}
assert (ROOT/content['hero']['portrait']).is_file()
assert (ROOT/content['profile']['portrait']).is_file()
assert len(content['profile']['paragraphs'])==2
assert len(content['references']['items'])==4
assert not (ROOT/'portfolio.data.js').exists(), 'Remover a fonte antiga para evitar conteúdo duplicado'
assert 'prefers-reduced-motion' in (ROOT/'style.css').read_text(encoding='utf8')
assert 'bruna_festa@outlook.com' in html
assert '5511966360508' not in html and 'imprimase' not in html
total=sum(x.stat().st_size for x in (ROOT/'assets').rglob('*') if x.is_file())
print(f'OK: {len(p.paths)} referencias locais, {len(p.anchors)} ancoras, {len(p.images)} imagens HTML e {len(works)} trabalhos editáveis. Assets: {total:,} bytes.')
