'use client';
import {useState} from 'react';
import {Maximize2,Images} from 'lucide-react';
import type {GalleryItem} from '@/data/projects';
import {asset} from '@/lib/paths';
import ReactiveSurface from './reactive-surface';

export default function ProjectPreview({items}:{items:GalleryItem[]}) {
  const views=['cad','photo','diagram'].map(kind=>items.find(it=>it.kind===kind)).filter((it):it is GalleryItem=>Boolean(it));
  const [selected,setSelected]=useState(Math.max(0,views.findIndex(it=>it.kind==='photo')));
  const item=views[selected];
  if(!item)return null;
  return <div className="project-preview"><div className="preview-toolbar"><span><Images size={15}/>Original project imagery</span><div role="group" aria-label="Project preview">{views.map((v,i)=><button key={v.src} aria-pressed={selected===i} aria-label={'Preview '+(v.kind==='photo'?'Prototype':v.kind==='diagram'?'Diagram':'CAD')} onClick={()=>setSelected(i)}>{v.kind==='photo'?'Prototype':v.kind==='diagram'?'Diagram':'CAD'}</button>)}</div></div><ReactiveSurface className="preview-stage"><a href="#gallery" aria-label="Explore the complete project gallery"><img key={item.src} src={asset(item.src)} alt={item.caption} width="1200" height="900" fetchPriority="high"/><span className="preview-expand"><Maximize2 size={18}/></span></a></ReactiveSurface><div className="preview-caption"><p aria-live="polite">{item.caption}</p><a href="#gallery">Open gallery<Maximize2 size={13}/></a></div></div>;
}
