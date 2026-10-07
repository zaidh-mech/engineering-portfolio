'use client';
import {useRef,type ReactNode,type PointerEvent} from 'react';

export default function ReactiveSurface({children,className=''}:{children:ReactNode;className?:string}) {
  const frame=useRef<number>(0);
  function move(event:PointerEvent<HTMLDivElement>) {
    if(event.pointerType!=='mouse'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const el=event.currentTarget,rect=el.getBoundingClientRect();
    const x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;
    cancelAnimationFrame(frame.current);
    frame.current=requestAnimationFrame(()=>{
      el.style.setProperty('--rx',`${(0.5-y)*5}deg`);el.style.setProperty('--ry',`${(x-0.5)*7}deg`);
      el.style.setProperty('--mx',`${x*100}%`);el.style.setProperty('--my',`${y*100}%`);
    });
  }
  function reset(event:PointerEvent<HTMLDivElement>) {
    cancelAnimationFrame(frame.current);
    event.currentTarget.style.setProperty('--rx','0deg');event.currentTarget.style.setProperty('--ry','0deg');
    event.currentTarget.style.setProperty('--mx','50%');event.currentTarget.style.setProperty('--my','50%');
  }
  return <div className={`reactive-surface ${className}`} onPointerMove={move} onPointerLeave={reset}>{children}</div>;
}
