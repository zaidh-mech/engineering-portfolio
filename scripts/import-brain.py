"""Import original portfolio media and index public engineering source evidence.
Usage: python scripts/import-brain.py --brain /path/to/GitHub\ Brain --cv /path/to/cv.pdf
"""
import argparse, json, re, shutil
from pathlib import Path
from urllib.parse import quote

parser = argparse.ArgumentParser()
parser.add_argument('--brain', required=True, type=Path)
parser.add_argument('--cv', required=True, type=Path)
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
public = root / 'public'
public.mkdir(exist_ok=True)
sources = args.brain / '90 Sources'
portfolio = sources / 'zaidh-mech.github.io'
shutil.copytree(portfolio / 'images' / 'projects', public / 'images' / 'projects', dirs_exist_ok=True)
shutil.copytree(portfolio / 'documents', public / 'documents', dirs_exist_ok=True)
shutil.copy2(args.cv, public / 'Zaidh-Rizme-CV.pdf')

catalog = []
repositories = ['PROJECTS', 'Industrial-Innovation-Project---6MA038', 'Industrial-Training-Reports', 'sense-oil-business-report']
categories = {
 'CAD': {'.sldprt','.sldasm','.slddrw','.step','.stp','.stl','.dxf'},
 'Electronics': {'.kicad_pcb','.kicad_sch','.kicad_pro','.gbr','.drl','.pos','.wrl'},
 'Code': {'.cpp','.c','.h','.hpp','.py','.m','.ino','.slx','.ini'},
 'Documents': {'.pdf','.docx','.pptx','.xlsx','.md','.txt'},
 'Data': {'.csv','.json','.mat'},
 'Media': {'.png','.jpg','.jpeg','.webp','.svg','.mp4'},
}
for repo in repositories:
    note = (args.brain / '10 Projects' / (repo+'.md')).read_text(encoding='utf-8')
    if 'visibility: "public"' not in note: continue
    sha = re.search(r'snapshot_commit: "([a-f0-9]+)"', note).group(1)
    for p in sorted((sources / repo).rglob('*')):
        if not p.is_file(): continue
        rel = p.relative_to(sources / repo).as_posix()
        if any(part.startswith('.') or part in ['node_modules','__pycache__'] for part in Path(rel).parts): continue
        if p.name.startswith('~') or 'secret' in p.name.lower(): continue
        if p.suffix.lower() in ['.exe','.dll','.pyc','.bak','.zip']: continue
        group = next((k for k,v in categories.items() if p.suffix.lower() in v),'Other')
        project = 'tof-slam'
        if repo == 'sense-oil-business-report': project = 'sense-oil'
        elif 'FLOD' in rel: project = 'flod-hopper'
        elif 'Iron' in rel: project = 'modified-iron'
        elif repo == 'Industrial-Training-Reports': project = 'industrial-training'
        if 'ESP32_SLAM_PCB_DESIGN' in rel or 'Advanced_4Layer' in rel: project='pcb-advanced'
        elif 'Time-of-Flight Project Build' in rel or 'Implemented_Two_Layer' in rel: project='pcb-first'
        catalog.append({'name':p.name,'path':rel,'repository':repo,'project':project,'category':group,'extension':p.suffix.lstrip('.').upper() or 'FILE','size':p.stat().st_size,'url':f'https://github.com/zaidh-mech/{repo}/blob/{sha}/{quote(rel,safe="/")}'})
for p in sorted((public/'documents').rglob('*')):
    if not p.is_file(): continue
    rel=p.relative_to(public).as_posix()
    project='modified-iron' if '/iron/' in rel else 'pcb-advanced' if 'advanced' in p.name else 'pcb-first' if 'first' in p.name else 'tof-slam'
    catalog.append({'name':p.name,'path':rel,'repository':'Drawing library','project':project,'category':'Documents' if p.suffix!='.csv' else 'Data','extension':p.suffix.lstrip('.').upper(),'size':p.stat().st_size,'url':'/'+rel})
for p in sorted((public/'images'/'projects').rglob('*')):
    if not p.is_file(): continue
    rel=p.relative_to(public).as_posix()
    project='modified-iron' if '/iron/' in rel else 'sense-oil' if '/oil/' in rel else 'flod-hopper' if '/hopper/' in rel else 'pcb-advanced' if 'advanced' in rel else 'pcb-first' if 'small' in rel or 'first' in rel else 'tof-slam'
    catalog.append({'name':p.name,'path':rel,'repository':'Project image library','project':project,'category':'Media','extension':p.suffix.lstrip('.').upper(),'size':p.stat().st_size,'url':'/'+rel})
(public/'catalog.json').write_text(json.dumps(catalog,ensure_ascii=False),encoding='utf-8')
(root/'data').mkdir(exist_ok=True)
(root/'data'/'archive-stats.json').write_text(json.dumps({'files':len(catalog),'repositories':len(repositories),'imported':'2026-10-07','categories':{k:sum(x['category']==k for x in catalog) for k in categories}}),encoding='utf-8')
print(json.dumps({'files':len(catalog),'media':len(list((public/'images'/'projects').rglob('*')))}))
