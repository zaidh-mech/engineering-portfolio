'use client';
import {useState} from 'react';
import Link from 'next/link';
import {MoveUpRight,Images,SlidersHorizontal} from 'lucide-react';
import {asset} from '@/lib/paths';
import {projects} from '@/data/projects';
import ReactiveSurface from './reactive-surface';
const groups:Record<string,string[]>={'Robotics':['tof-slam','posture-research'],'Mechanical':['modified-iron','flod-hopper'],'Electronics':['sense-oil','pcb-first','pcb-advanced']};
const cover:Record<string,string>={'modified-iron':'/images/projects/iron/iron-prototype.webp','flod-hopper':'/images/projects/hopper/photo-side-window.webp','sense-oil':'/images/projects/oil/oil-assembly.webp'};
export default function ProjectGrid() {
  const [filter,setFilter]=useState('All work');
  const visible=projects.filter(p=>filter==='All work'||groups[filter].includes(p.slug));
  return <><div className="work-toolbar"><div className="filter-group" role="group" aria-label="Filter projects">{['All work',...Object.keys(groups)].map(f=><button key={f} onClick={()=>setFilter(f)} aria-pressed={f===filter}>{f}</button>)}</div><span className="result-count"><SlidersHorizontal size={14}/><span aria-live="polite">{visible.length} projects</span></span></div>
    <div className={'project-grid '+(filter==='All work'?'exhibition':'filtered-grid')} key={filter}>{visible.map(p=><Link className={'project-tile tile-'+p.slug} key={p.slug} href={'/projects/'+p.slug+'/'} aria-label={'Read '+p.title}>
      <ReactiveSurface className="project-image"><div className="project-image-inner">
        {p.image?<><img className={'project-cover '+(cover[p.slug]?'photo':'cad')} src={asset(cover[p.slug]||p.image)} alt={p.title+' engineering project'} loading="lazy" width="1130" height="800"/>{cover[p.slug]&&<img className="project-alternate" src={asset(p.image)} alt={p.title+' CAD design'} loading="lazy" width="1130" height="800"/>}</>:<div className="research-art" aria-hidden="true"><div className="magnetic-field"><span/><span/><span/></div><div className="research-core"/><span>Magnetic sensing<br/>for wearable research</span></div>}
      </div><span className="project-status"><span/>{p.status}</span><span className="project-open"><MoveUpRight size={23}/></span>{p.gallery.length>0&&<span className="project-media-count"><Images size={14}/>{p.gallery.length} images</span>}
      {cover[p.slug]&&<span className="project-image-hint">Prototype / hover to see CAD</span>}
      </ReactiveSurface>
      <div className="project-caption"><div><p>{p.category}</p><h3>{p.title}</h3></div><span>{p.period.includes('2026')?'2026':p.period.includes('2025')?'2025':'2024'}</span></div><p className="project-summary">{p.summary}</p><div className="project-tools">{p.tools.slice(0,3).map(t=><span key={t}>{t}</span>)}<span className="read-story">Read project story<MoveUpRight size={14}/></span></div>
    </Link>)}</div>
  </>;
}
