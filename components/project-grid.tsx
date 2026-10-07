'use client';
import {useState} from 'react';
import Link from 'next/link';
import {MoveUpRight,ChevronLeft,ChevronRight,ArrowRight,Layers} from 'lucide-react';
import {asset} from '@/lib/paths';
import {projects,type Project,type GalleryItem} from '@/data/projects';
const groups:Record<string,string[]>={'Robotics':['tof-slam','posture-research'],'Mechanical':['modified-iron','flod-hopper'],'Electronics':['sense-oil','pcb-first','pcb-advanced']};

function ProjectCard({project,priority=false}:{project:Project;priority?:boolean}) {
  const choices:GalleryItem[]=project.gallery.length?project.gallery.slice(0,4):[];
  const initial=choices.findIndex(it=>it.kind==='photo');
  const preferred=choices.findIndex(it=>it.src===project.image);
  const [selected,setSelected]=useState(initial>=0?initial:Math.max(0,preferred));
  const item=choices[selected];
  const year=project.period.includes('2026')?'2026':project.period.includes('2025')?'2025':'2024';
  const href='/projects/'+project.slug+'/';
  function step(direction:number){setSelected((selected+direction+choices.length)%choices.length)}
  return <article className={'project-tile feed-card tile-'+project.slug}>
    <div className={'feed-media '+(item?.kind||'research')} role="group" aria-roledescription={choices.length>1?'carousel':undefined} aria-label={project.title+' image preview'} onKeyDown={e=>{if(choices.length>1&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){e.preventDefault();step(e.key==='ArrowRight'?1:-1)}}}>
      <Link className="project-main-link" href={href} aria-label={'Read '+project.title}>
        {item?<>{item.kind==='photo'&&<img className="feed-atmosphere" src={asset(item.src)} alt="" aria-hidden="true" loading="lazy" width="1200" height="800"/>}<img key={item.src} className="feed-image" src={asset(item.src)} alt={item.caption} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} width="1600" height="1000"/></>:<div className="research-art"><div className="magnetic-field" aria-hidden="true"><span/><span/><span/></div><div className="research-core" aria-hidden="true"/><span>Wearable posture sensing</span><p>Hall-effect sensors / magnetic field research</p></div>}
        <span className="feed-image-open"><MoveUpRight size={20}/><span>Open project</span></span>
      </Link>
      <span className="feed-status"><span/>{project.status}</span>
      {item&&<span className="feed-image-caption" aria-live="polite">{item.kind==='photo'?'Prototype photo':item.kind==='diagram'?'Engineering detail':'CAD render'}<span>{selected+1} / {choices.length}</span></span>}
      {choices.length>1&&<><div className="feed-arrows"><button onClick={()=>step(-1)} aria-label={'Previous '+project.title+' image'}><ChevronLeft size={19}/></button><button onClick={()=>step(1)} aria-label={'Next '+project.title+' image'}><ChevronRight size={19}/></button></div><div className="feed-dots" aria-label={project.title+' image selection'}>{choices.map((it,i)=><button key={it.src} onClick={()=>setSelected(i)} aria-label={'Show '+project.title+' image '+(i+1)} aria-pressed={selected===i}><span/></button>)}</div></>}
    </div>
    <div className="feed-card-body"><div className="feed-title"><p>{project.category}<span>{year}</span></p><Link href={href}><h3>{project.title}</h3></Link><div className="feed-tools">{project.tools.slice(0,3).map(t=><span key={t}>{t}</span>)}</div></div><div className="feed-excerpt"><div className="feed-byline"><span className="author-mark">ZR</span><span>Zaidh Rizme<span>{project.context}</span></span></div><p>{project.summary}</p><Link className="feed-story" href={href}>Read project story<ArrowRight size={16}/></Link></div></div>
  </article>;
}

export default function ProjectGrid({featured=false}:{featured?:boolean}) {
  const [filter,setFilter]=useState('All work');
  const featuredSlugs=['tof-slam','modified-iron','sense-oil'];
  const visible=projects.filter(p=>(!featured||featuredSlugs.includes(p.slug))&&(filter==='All work'||groups[filter].includes(p.slug)));
  return <>{!featured&&<div className="feed-filter-row"><div className="filter-group" role="group" aria-label="Filter projects">{['All work',...Object.keys(groups)].map(f=><button key={f} onClick={()=>setFilter(f)} aria-pressed={f===filter}>{f}</button>)}</div><span className="feed-result" aria-live="polite">{visible.length} projects</span></div>}<div className="project-feed" key={filter}>{visible.map((p,i)=><ProjectCard key={p.slug} project={p} priority={i===0}/>)}</div>{featured&&<div className="all-projects-link"><Link href="/projects/"><Layers size={16}/>Browse all seven projects<ArrowRight size={17}/></Link><span>Robotics, mechanical design, electronics & research</span></div>}</>;
}
