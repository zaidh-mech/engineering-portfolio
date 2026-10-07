'use client';
import {useEffect,useRef,useState,type PointerEvent} from 'react';
import {ZoomIn,ZoomOut,X,ChevronLeft,ChevronRight,Maximize2,FileText,Image as ImageIcon} from 'lucide-react';
import type {GalleryItem} from '@/data/projects';
import {asset} from '@/lib/paths';
const kinds=[{name:'All images',value:'all'},{name:'CAD',value:'cad'},{name:'Prototype',value:'photo'},{name:'Diagrams',value:'diagram'}];
export default function Gallery({items}:{items:GalleryItem[]}) {
  const [selected,setSelected]=useState(0),[opened,setOpened]=useState(false),[zoom,setZoom]=useState(false),[filter,setFilter]=useState('all');
  const dialog=useRef<HTMLDialogElement>(null),frame=useRef<HTMLDivElement>(null);
  const drag=useRef<{x:number;y:number;left:number;top:number}|null>(null);
  useEffect(()=>{
    if(!opened)return;
    const d=dialog.current;d?.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';
    return()=>{document.body.style.overflow=old;if(d?.open)d.close()};
  },[opened]);
  useEffect(()=>{const el=frame.current;if(!el)return;el.scrollLeft=zoom?(el.scrollWidth-el.clientWidth)/2:0;el.scrollTop=zoom?(el.scrollHeight-el.clientHeight)/2:0},[zoom,opened]);
  if(!items.length)return null;
  const item=items[selected],available=items.map((it,i)=>({it,i})).filter(({it})=>filter==='all'||it.kind===filter);
  function choose(i:number){setSelected(i);setZoom(false)}
  function step(direction:number){const position=available.findIndex(x=>x.i===selected);choose(available[(position+direction+available.length)%available.length].i)}
  function kind(value:string){setFilter(value);const i=items.findIndex(it=>value==='all'||it.kind===value);choose(i<0?0:i)}
  function pointerDown(e:PointerEvent<HTMLDivElement>){if(!zoom)return;e.currentTarget.setPointerCapture(e.pointerId);drag.current={x:e.clientX,y:e.clientY,left:e.currentTarget.scrollLeft,top:e.currentTarget.scrollTop}}
  function pointerMove(e:PointerEvent<HTMLDivElement>){if(!drag.current)return;e.currentTarget.scrollLeft=drag.current.left-(e.clientX-drag.current.x);e.currentTarget.scrollTop=drag.current.top-(e.clientY-drag.current.y)}
  return <div className="gallery-inspector">
    <div className="gallery-toolbar"><div className="gallery-kinds" role="group" aria-label="Filter gallery images">{kinds.filter(k=>k.value==='all'||items.some(it=>it.kind===k.value)).map(k=><button key={k.value} onClick={()=>kind(k.value)} aria-pressed={filter===k.value}>{k.name}</button>)}</div><span><ImageIcon size={15}/>{available.length} images</span></div>
    <div className={'gallery-stage '+(item.kind||'cad')}>
      <button className="gallery-image" onClick={()=>{setZoom(false);setOpened(true)}} aria-label={'Enlarge '+item.caption}><img key={item.src} src={asset(item.src)} alt={item.caption} width="1600" height="1000" fetchPriority="high"/><span className="gallery-expand"><Maximize2 size={18}/><span>Explore image</span></span></button>
      {available.length>1&&<><button className="gallery-step previous" onClick={()=>step(-1)} aria-label="Previous gallery image"><ChevronLeft size={21}/></button><button className="gallery-step next" onClick={()=>step(1)} aria-label="Next gallery image"><ChevronRight size={21}/></button></>}
      <span className="gallery-stage-label">{item.kind==='photo'?'Original prototype photo':item.kind==='diagram'?'Engineering documentation':'Original CAD render'}</span>
    </div>
    <div className="gallery-caption"><div><span>{String(available.findIndex(x=>x.i===selected)+1).padStart(2,'0')} / {String(available.length).padStart(2,'0')}</span><p aria-live="polite">{item.caption}</p></div>{item.href&&<a href={asset(item.href)} target="_blank" rel="noopener noreferrer"><FileText size={16}/>Open drawing</a>}</div>
    <div className="gallery-filmstrip" aria-label="Project image selection">{available.map(({it,i})=><button key={it.src} className={'gallery-thumbnail '+(i===selected?'selected':'')} onClick={()=>choose(i)} aria-label={'Show '+it.caption} aria-pressed={i===selected}><img src={asset(it.src)} alt="" loading="lazy" width="220" height="140"/><span>{it.kind==='photo'?'Prototype':it.kind==='diagram'?'Diagram':'CAD'}</span></button>)}</div>
    <dialog ref={dialog} className="lightbox" onCancel={()=>setOpened(false)} onClose={()=>setOpened(false)} onClick={e=>{if(e.target===dialog.current)setOpened(false)}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1)}if(e.key==='ArrowLeft'){e.preventDefault();step(-1)}}} aria-label="Project image viewer">
      <div className="lightbox-header"><span>Project image viewer</span><div><button onClick={()=>setZoom(!zoom)} aria-label={zoom?'Zoom out':'Zoom in'} aria-pressed={zoom}>{zoom?<ZoomOut size={20}/>:<ZoomIn size={20}/>}<span>{zoom?'Fit image':'Zoom 2×'}</span></button><button className="lightbox-close" onClick={()=>setOpened(false)} aria-label="Close image viewer"><X size={23}/></button></div></div>
      <div ref={frame} className={'lightbox-frame '+(zoom?'zoomed':'')} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}}><div className={'lightbox-canvas '+(zoom?'zoomed':'')}><img src={asset(item.src)} alt={item.caption} draggable={false}/></div></div>
      <div className="lightbox-controls"><button onClick={()=>step(-1)} aria-label="Previous image"><ChevronLeft size={22}/></button><p>{item.caption}<span>{available.findIndex(x=>x.i===selected)+1} / {available.length}{zoom?' / Drag to inspect':' / Use arrow keys to browse'}</span></p><button onClick={()=>step(1)} aria-label="Next image"><ChevronRight size={22}/></button></div>
    </dialog>
  </div>;
}
