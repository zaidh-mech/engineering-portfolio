'use client';
import {useState} from 'react';
import Link from 'next/link';
import {Layers,Box,Cpu,Plus,X,MoveUpRight,MousePointer2} from 'lucide-react';
import {asset} from '@/lib/paths';
import ReactiveSurface from './reactive-surface';

const views=[
  {label:'Assembly',src:'robot-cad-open.webp',icon:Layers,description:'Under the shell. Every subsystem, together.',detail:'Mechanical assembly / SolidWorks',notes:[{name:'Scanning sensor',text:'The VL53L8CX ToF sensor is mounted on a stepper-driven scanner, sweeping across a 120° field.',x:27,y:54},{name:'Control electronics',text:'A custom two-layer control PCB brings the ESP32, power conversion and motor interfaces together.',x:50,y:25},{name:'Differential drive',text:'Two independently driven wheels connect commanded motion with encoder-based odometry.',x:65,y:73}]},
  {label:'Enclosure',src:'robot-cad-main.webp',icon:Box,description:'Built around the hardware. Designed for access.',detail:'Custom enclosure / SolidWorks',notes:[{name:'Sensor opening',text:'A dedicated opening keeps the scanner’s field of view clear while protecting the control assembly.',x:34,y:40},{name:'Serviceable shell',text:'The enclosure preserves access to the board, battery and layered chassis underneath.',x:57,y:29},{name:'Wheel clearance',text:'The wheel position and body envelope were coordinated in the mechanical assembly.',x:72,y:71}]},
  {label:'Control PCB',src:'pcb-first.webp',icon:Cpu,description:'Power. Motion. Sensing. One control board.',detail:'100 × 100 mm / two-layer PCB',notes:[{name:'ESP32 control',text:'The ESP32 development module handles acquisition and motor control, separate from desktop mapping.',x:47,y:34},{name:'Defined interfaces',text:'Connectors organize the scanning sensor, motor drivers and differential-drive hardware.',x:69,y:53},{name:'Power distribution',text:'Power conversion and distribution share the same board envelope as the control interfaces.',x:32,y:69}]}
];

export default function Assembly() {
  const [index,setIndex]=useState(0),[note,setNote]=useState<number|null>(null);
  const view=views[index];
  function select(i:number){setIndex(i);setNote(null)}
  return <ReactiveSurface className="assembly">
    <div className="assembly-top"><span><span className="status-dot"/>ToF SLAM mobile robot</span><span className="assembly-type">Explore the system</span></div>
    <div className="assembly-controls" role="group" aria-label="Robot assembly view">{views.map((v,i)=><button key={v.label} aria-pressed={i===index} onClick={()=>select(i)}><v.icon size={16}/><span>{v.label}</span></button>)}</div>
    <div className={'assembly-visual view-'+index}>
      <div className="stage-orbit" aria-hidden="true"/><div className="stage-crosshair" aria-hidden="true"/>
      <div className="assembly-model" key={view.src}><img src={asset('/images/projects/tof/'+view.src)} alt={view.description} width="1130" height="666" fetchPriority="high"/>
        {view.notes.map((n,i)=><button className={'component-pin '+(note===i?'active':'')} style={{left:n.x+'%',top:n.y+'%'}} key={n.name} onClick={()=>setNote(note===i?null:i)} aria-label={'Inspect '+n.name} aria-expanded={note===i}>{note===i?<X size={14}/>:<Plus size={14}/>}</button>)}
      </div>
      <span className="stage-caption">{view.detail}</span><span className="stage-coordinate" aria-hidden="true">X <span/> Y</span>
      {note!==null&&<div className="component-note" role="status"><strong>{view.notes[note].name}</strong><p>{view.notes[note].text}</p><button onClick={()=>setNote(null)} aria-label="Close component note"><X size={16}/></button></div>}
    </div>
    <div className="assembly-bottom"><div><p aria-live="polite">{view.description}</p><span><MousePointer2 size={13}/>Select a point to inspect a component</span></div><Link href="/projects/tof-slam/" aria-label="Read the ToF SLAM project"><MoveUpRight size={23}/></Link></div>
  </ReactiveSurface>;
}
